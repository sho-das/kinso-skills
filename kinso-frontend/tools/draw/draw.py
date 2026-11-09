import argparse
import colorsys
import json
import random
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TASTE = ROOT / "skills" / "taste-skill" / "library"
HALL = ROOT / "skills" / "hallmark" / "references"
SITES_MD = ROOT.parent / "vendor" / "VoltAgent_awesome-design-md@3b60532" / "design-md"
SEED_REL = "skills/styleseed/workflows/ss-resolve/references/catalog.json"
SEED = ROOT / SEED_REL

# StyleSeed grammars that fit a client website. The console and instrument grammars are for
# product screens; technical-instrument is allowed for tool and AI products only.
SEED_SITE_GRAMMARS = {"expressive-marketing", "editorial-reading", "sequential-story", "commerce-conversion",
                      "consumer-service", "institutional-service"}
SEED_TECH_SECTORS = {"dev-tool", "ai-product", "saas"}
SEED_DOMAIN = {
    "hospitality": "booking", "restaurant": "booking", "event": "booking", "ecommerce": "ecommerce",
    "fashion": "ecommerce", "physical-product": "ecommerce", "finance": "fintech", "health": "health",
    "education": "education", "dev-tool": "developer-tools", "saas": "saas", "ai-product": "ai-assistant",
    "real-estate": "marketplace", "consumer-app": "social",
}

DEFAULT_LOOKS = {"split", "split-text-media", "centred-statement-media-below"}
DEFAULT_DIRECTIONS = {"split-stage"}
DEFAULT_SHAPES = {"15-split-studio", "03-marquee-hero", "16-feature-stack"}

HUES = {
    "red": [(345, 360), (0, 15)], "orange": [(15, 45)], "yellow": [(45, 70)],
    "green": [(70, 170)], "teal": [(170, 200)], "blue": [(200, 250)],
    "purple": [(250, 290)], "pink": [(290, 345)],
}


def load(name):
    return json.loads((TASTE / f"{name}.json").read_text())


def hex_hue_light(h):
    h = h.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    hh, l, s = colorsys.rgb_to_hls(r, g, b)
    return hh * 360, l, s


def hue_named(deg, sat, names):
    if sat < 0.18:
        return False
    return any(lo <= deg < hi for n in names for lo, hi in HUES.get(n, []))


def tone_ok(light, tone):
    if tone == "light":
        return light >= 0.6
    if tone == "dark":
        return light <= 0.35
    return True


def palette_ok(p, args):
    _, bg_l, _ = hex_hue_light(p["bg"])
    a_h, _, a_s = hex_hue_light(p["accent"])
    return tone_ok(bg_l, args.tone) and not hue_named(a_h, a_s, args.avoid)


def theme_ok(t, args):
    band = t["paper"]["band"]
    if args.tone == "light" and band != "light":
        return False
    if args.tone == "dark" and band != "dark":
        return False
    acc = t.get("accent") or {}
    return not hue_named(acc.get("hue", -1), 1.0, args.avoid) if "hue" in acc else True


def words(text):
    return set(re.findall(r"[a-z]{3,}", text.lower()))


def seed_fields(md):
    """Read '- **Key:** text' or '- Key: text' lines from a StyleSeed catalog entry."""
    out = {}
    for m in re.finditer(r"^- (?:\*\*)?([^:*\n]+?)(?:\*\*)?:(?:\*\*)? (.+?)(?=^- |\Z)", md, re.M | re.S):
        out[m.group(1).strip().lower()] = " ".join(m.group(2).split())
    return out


def seed_palettes(cat):
    pals = []
    for pid, md in cat["palettes"].items():
        f = seed_fields(md)
        roles = dict(re.findall(r"(\w+)=(#[0-9A-Fa-f]{6})", f.get("semantic roles", "")))
        if not {"background", "primary", "accent"} <= roles.keys():
            continue
        pals.append({"id": pid, "name": f.get("name", pid), "mode": f.get("mode", ""), "roles": roles,
                     "bias": [x.strip() for x in f.get("recipe bias", "").split(",") if x.strip()],
                     "usage": f.get("usage", ""), "avoid": f.get("avoid in generated media", "")})
    return pals


def seed_palette_ok(p, args):
    _, bg_l, _ = hex_hue_light(p["roles"]["background"])
    return tone_ok(bg_l, args.tone) and not any(
        hue_named(h, s, args.avoid) for h, _, s in (hex_hue_light(p["roles"][k]) for k in ("primary", "accent")))


class Deck:
    def __init__(self, args, rnd):
        self.a, self.r = args, rnd
        self.dirs = load("directions")
        self.heroes = load("heroes")
        self.palettes = load("palettes")
        self.types = load("type")
        self.motions = load("motions")
        self.sites = load("sites")
        self.themes = json.loads((HALL / "themes" / "index.json").read_text())["themes"]
        self.shapes = sorted(p.stem for p in (HALL / "macrostructures").glob("*.md"))
        self.real = sorted(p.name for p in SITES_MD.iterdir() if (p / "DESIGN.md").exists())
        self.seed = json.loads(SEED.read_text()) if SEED.exists() else None
        self.seed_pals = seed_palettes(self.seed) if self.seed else []
        self.used = {k: set() for k in ("layout", "palette", "type", "motion", "site", "theme", "real", "dir",
                                         "grammar", "recipe", "profile")}
        self.brief = words(args.brief)

    def take(self, kind, pool, key):
        free = [x for x in pool if key(x) not in self.used[kind]]
        if not free:
            return None
        x = self.r.choice(free)
        self.used[kind].add(key(x))
        return x

    def motion(self, prefer=None):
        pool = [m for m in self.motions if m["id"] != "stillness" or self.a.motion == "calm"]
        if prefer:
            hit = [m for m in pool if m["id"] == prefer and m["id"] not in self.used["motion"]]
            if hit:
                self.used["motion"].add(prefer)
                return hit[0]
        return self.take("motion", pool, lambda m: m["id"])

    def reference(self, archetype=None):
        pool = [s for s in self.sites if s["score"] >= 7.5]
        near = [s for s in pool if archetype and s.get("archetype") == archetype]
        return self.take("site", near or pool, lambda s: s["id"])

    def taste(self):
        have = set(self.a.have) | {"photography"}
        pool = [d for d in self.dirs if d["id"] not in DEFAULT_DIRECTIONS
                and (self.a.sector in d["sectors"] or "other" in d["sectors"])
                and all(n in have for n in d["needs"])]
        d = self.take("dir", pool, lambda x: x["id"])
        if not d:
            return None
        heroes = [h for h in self.heroes if d["id"] in h["directions"] and h["archetype"] not in DEFAULT_LOOKS
                  and all(n in have for n in h.get("needs", []))]
        hero = self.take("layout", heroes, lambda h: h["archetype"]) or self.take(
            "layout", [h for h in self.heroes if h["archetype"] not in DEFAULT_LOOKS], lambda h: h["archetype"])
        pals = [p for p in self.palettes if palette_ok(p, self.a) and set(p["tags"]) & set(d.get("paletteTags", []))]
        pal = self.take("palette", pals or [p for p in self.palettes if palette_ok(p, self.a)], lambda p: p["id"])
        typ = self.take("type", [t for t in self.types if t["class"] in d.get("typeClasses", [])] or self.types,
                        lambda t: t["id"])
        mot = self.motion(d.get("motion"))
        return {
            "source": "taste-skill",
            "direction": f"{d['id']} - {d['name']}",
            "idea": d["idea"],
            "layout": f"{hero['archetype']} / {hero['id']}: {hero['blueprint'][:400]}" if hero else "",
            "palette": pal and {k: pal[k] for k in ("id", "name", "bg", "surface", "ink", "muted", "accent", "note")},
            "type": typ and f"{typ['id']}: {typ['display']['family']} with {typ['text']['family']} - {typ['display'].get('settings', '')}",
            "motion": mot and f"{mot['id']}: {mot['description']}",
            "pitfalls": d.get("pitfalls"),
            "read": [f"skills/taste-skill/library/directions.json#{d['id']}",
                     f"skills/taste-skill/library/heroes.json#{hero['id']}" if hero else None,
                     "skills/taste-skill/references/motion.md", "skills/taste-skill/SKILL.md (steps 2 to 4)"],
            "_arch": hero and hero["archetype"],
        }

    def hallmark(self):
        shapes = [s for s in self.shapes if s not in DEFAULT_SHAPES]
        shape = self.take("layout", shapes, lambda s: s)
        if not shape:
            return None
        pool = [t for t in self.themes if theme_ok(t, self.a)]
        scored = sorted(pool, key=lambda t: (-len(self.brief & words(" ".join(t["keywords"]) + " " + t["material"])), self.r.random()))
        top = [t for t in scored[:8] if t["slug"] not in self.used["theme"]]
        theme = self.r.choice(top) if top else self.take("theme", pool, lambda t: t["slug"])
        if theme:
            self.used["theme"].add(theme["slug"])
        mot = self.motion()
        return {
            "source": "Hallmark",
            "direction": f"shape {shape}, theme {theme['name'] if theme else '-'}",
            "idea": "Hallmark custom path: one idea true of this client only, run top to bottom (references/direction.md).",
            "layout": f"macrostructure {shape}",
            "palette": theme and {"theme": theme["name"], "paper": theme["paper"], "accent": theme.get("accent"), "material": theme["material"]},
            "type": theme and f"{theme['display']['face']} ({theme['display']['class']}); pairing in the theme file",
            "motion": mot and f"{mot['id']}: {mot['description']}",
            "read": [f"skills/hallmark/references/macrostructures/{shape}.md",
                     theme and f"skills/hallmark/{theme['file']}", theme and f"skills/hallmark/{theme['picture']}",
                     "skills/hallmark/references/direction.md", "skills/hallmark/references/gates.md"],
            "_arch": shape,
        }

    def realsite(self):
        site = self.take("real", self.real, lambda s: s)
        if not site:
            return None
        hero = self.take("layout", [h for h in self.heroes if h["archetype"] not in DEFAULT_LOOKS], lambda h: h["archetype"])
        mot = self.motion()
        return {
            "source": "real site (awesome-design-md)",
            "direction": f"learn from {site}",
            "idea": f"Take the design system of {site} (type, colour logic, spacing, components) as the material, and translate it to this client. Never copy its words, logo or pictures.",
            "layout": f"{hero['archetype']} / {hero['id']}: {hero['blueprint'][:400]}" if hero else "",
            "palette": "from the site's DESIGN.md, filtered by the client limits",
            "type": "from the site's DESIGN.md, swapped to a free face of the same kind",
            "motion": mot and f"{mot['id']}: {mot['description']}",
            "read": [f"vendor/VoltAgent_awesome-design-md@3b60532/design-md/{site}/DESIGN.md",
                     f"skills/taste-skill/library/heroes.json#{hero['id']}" if hero else None],
            "_arch": hero and hero["archetype"],
        }

    def styleseed(self):
        if not self.seed:
            return None
        cat = self.seed
        allowed = SEED_SITE_GRAMMARS | ({"technical-instrument"} if self.a.sector in SEED_TECH_SECTORS else set())
        gpool = [g for g in sorted(cat["grammars"]) if g in allowed and g not in self.used["grammar"]]
        pals = [p for p in self.seed_pals if seed_palette_ok(p, self.a) and f"styleseed:{p['id']}" not in self.used["palette"]]
        if not gpool or not pals:
            return None
        scored = sorted(gpool, key=lambda g: (-len(self.brief & words(cat["grammars"][g])), self.r.random()))
        grammar = self.r.choice(scored[:3])
        self.used["grammar"].add(grammar)
        g = seed_fields(cat["grammars"][grammar])
        pal = self.r.choice(pals)
        self.used["palette"].add(f"styleseed:{pal['id']}")
        domain = SEED_DOMAIN.get(self.a.sector, "content")
        dom = seed_fields(cat["domains"].get(domain, ""))
        hint = re.findall(r"`([a-z-]+)`", dom.get("brand recipe", ""))
        rpool = [r for r in cat["recipes"] if r not in self.used["recipe"]]
        recipe = next((r for r in pal["bias"] + hint if r in rpool), None) or (self.r.choice(rpool) if rpool else None)
        if recipe:
            self.used["recipe"].add(recipe)
        rec = seed_fields(cat["recipes"][recipe]) if recipe else {}
        profile = self.take("profile", sorted(cat["profiles"]), lambda p: p)
        prof = seed_fields(cat["profiles"][profile]) if profile else {}
        hero = self.take("layout", [h for h in self.heroes if h["archetype"] not in DEFAULT_LOOKS], lambda h: h["archetype"])
        mot = self.motion()
        r = pal["roles"]
        return {
            "source": "StyleSeed",
            "direction": f"grammar {grammar}, recipe {recipe or '-'}, palette {pal['id']}, profile {profile or 'none'}",
            "idea": f"StyleSeed fixed judgment: the {grammar} grammar ({g.get('job', '')}) with the {recipe or '-'} brand recipe; "
                    f"one product-specific signature move ({rec.get('characteristic move', 'see the recipe')}).",
            "layout": (f"{hero['archetype']} / {hero['id']}: {hero['blueprint'][:300]}. " if hero else "")
                      + f"Grammar composition: {g.get('composition', '')}",
            "palette": {"id": pal["id"], "name": pal["name"], "mode": pal["mode"], "bg": r["background"],
                        "surface": r.get("surface"), "ink": r.get("foreground"), "muted": r.get("mutedForeground"),
                        "primary": r["primary"], "accent": r["accent"], "note": pal["usage"]},
            "type": f"{g.get('density/type', '')} Recipe: {rec.get('type/icons', '')}"
                    + (f" Profile {profile}: {prof.get('coordinate', '')}." if profile else "")
                    + " Choose a free face of that kind.",
            "motion": mot and f"{mot['id']}: {mot['description']}",
            "avoid": f"{g.get('reject', '')} Palette: {pal['avoid']}. Must pass the stage 3 AI-look gate (7 or more).",
            "read": [f"{SEED_REL}#grammars.{grammar}", f"{SEED_REL}#palettes.{pal['id']}",
                     recipe and f"{SEED_REL}#recipes.{recipe}", profile and f"{SEED_REL}#profiles.{profile}",
                     f"{SEED_REL}#domains.{domain}", f"{SEED_REL}#craft",
                     f"skills/taste-skill/library/heroes.json#{hero['id']}" if hero else None,
                     "skills/styleseed/workflows/ss-tokens/WORKFLOW.md (palette roles only; never run its scripts)"],
            "_arch": hero and hero["archetype"],
        }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sector", required=True)
    ap.add_argument("--brief", default="")
    ap.add_argument("--options", type=int, default=5)
    ap.add_argument("--candidates", type=int, default=3)
    ap.add_argument("--tone", choices=["light", "dark", "any"], default="any")
    ap.add_argument("--avoid", type=lambda s: [x.strip() for x in s.split(",") if x.strip()], default=[])
    ap.add_argument("--have", type=lambda s: [x.strip() for x in s.split(",") if x.strip()], default=[])
    ap.add_argument("--motion", choices=["calm", "some", "lots", "any"], default="any")
    ap.add_argument("--seed", type=int)
    ap.add_argument("--out", required=True)
    a = ap.parse_args()
    seed = a.seed if a.seed is not None else random.SystemRandom().randrange(1, 10**9)
    deck = Deck(a, random.Random(seed))
    makers = [deck.taste, deck.hallmark, deck.realsite, deck.styleseed]
    slots = []
    for i in range(a.options):
        first = i % len(makers)
        cands = []
        for j in range(a.candidates):
            maker = makers[(first + j) % len(makers)]
            c = maker() or next((m() for m in makers if m is not maker), None)
            if c:
                c.pop("_arch", None)
                c["read"] = [x for x in c["read"] if x]
                cands.append(c)
        slots.append(cands)
    out = Path(a.out)
    out.mkdir(parents=True, exist_ok=True)
    data = {"seed": seed, "args": {k: v for k, v in vars(a).items() if k != "out"}, "slots": slots}
    (out / "deck.json").write_text(json.dumps(data, indent=1, ensure_ascii=False))
    lines = [f"# Design deck\n\nSeed {seed}. Rebuild: same arguments with `--seed {seed}`.\n",
             f"Sector {a.sector}. Tone {a.tone}. Avoid {', '.join(a.avoid) or 'none'}. Motion {a.motion}.\n",
             "Every candidate has its own layout, palette, type and motion; no two repeat across the deck.\n"]
    for i, cands in enumerate(slots, 1):
        lines.append(f"\n## Option {i}\n")
        for k, c in enumerate(cands, 1):
            lines.append(f"\n### {i}.{k} - {c['source']}: {c['direction']}\n")
            for f in ("idea", "layout", "palette", "type", "motion", "avoid"):
                v = c.get(f)
                if v:
                    lines.append(f"- **{f}:** {v if isinstance(v, str) else json.dumps(v, ensure_ascii=False)}")
            lines.append(f"- **read:** {'; '.join(c['read'])}")
    (out / "DECK.md").write_text("\n".join(lines) + "\n")
    print(f"seed {seed}: {sum(len(s) for s in slots)} candidates in {len(slots)} options -> {out}/DECK.md")


if __name__ == "__main__":
    sys.exit(main())
