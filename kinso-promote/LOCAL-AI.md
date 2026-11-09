# Local AI image and video for kinso-promote

27 October 2026. Research and scan. **Update 2026-10-27 (later): both models downloaded and hash-checked, venvs installed, see `tools/INSTALLED.md`. Speed tests not run yet (held by the lead, Mac hot), so the [Guess] figures below are still guesses. Two run-time downloads the plan missed: the default video decoder fetches `taew2_2.pth`, and `--fast` fetches RIFE weights; use `--decode-backend wan-vae` and no `--fast` until approved.**

This Mac: Apple M4 Pro, 24 GB unified memory, 210 GB free disk.

Files from this work:
- Hugging Face file lists (sizes, SHA-256, gated flag): `kinso-promote/research/local-ai/hf.jsonl`, `pages2.jsonl`
- Searches and pages read: `kinso-promote/research/local-ai/search.jsonl`, `pages.jsonl`, `pages3.jsonl`
- Scan reports: `tools/scan/reports/apps/` (`ours-*.json` our scanner, `*-skillspector.json` and `.log` SkillSpector)

## Recommendation

**Image: mflux + FLUX.2 [klein] 4B.**
- Licence: Apache-2.0 for both the code (mflux is MIT) and the weights. Commercial use is allowed. The 9B klein is non-commercial - do not use it.
- No login and no licence click on Hugging Face (`gated: false`).
- Smallest good download: 15.97 GB, all safetensors.
- mflux is native MLX for Apple silicon. It is a command-line tool and a Python API. mflux pins each Hugging Face repo to a fixed commit.
- mflux itself calls FLUX.1 "legacy" and FLUX.2 klein its "fastest + smallest" model.
- Memory: loaded weights 8.0 GB with `-q 8` (mflux README, measured on an M4 Pro). Fits 24 GB.
- Speed: 33.5 s for one image, FLUX.2 klein 4B in mflux on an M1 Max 64 GB (lilting.ch, article dated 19 Oct 2026). **[Guess]** 25 to 40 s for 1024 x 1024 on this M4 Pro, plus model load time.

**Video: FastVideo (MLX path) + FastMetal-5B-QAD.**
- FastMetal-5B-QAD is Wan 2.2 TI2V 5B, distilled to 3 steps and quantized to INT8 for Apple silicon, by Hao AI Lab.
- Licence: Apache-2.0 for the code and the weights. Commercial use is allowed.
- No login and no licence click (`gated: false`). All weights are safetensors. Download: 19.51 GB.
- Default output is 832 x 448, 121 frames at 24 fps = 5.0 seconds. That is the 5-second clip we need.
- Memory: peak 9.54 GiB on a 24 GB MacBook Air M5 (Hao AI Lab, 10 Aug 2026, via modelfit.io, read 24 Oct 2026). The model card says "16 GB+ class Macs".
- Speed (Hao AI Lab, 10 Aug 2026): 1280 x 704, 81 frames - 151 s on an M4 Max 36 GB, 200 s on an M5 Air 24 GB; 47 s and 91 s with `--fast`. **[Guess]** 2 to 4 minutes for a 5-second clip at the default 832 x 448 on this M4 Pro; under 2 minutes with `--fast`.
- Why not the full Wan 2.2 5B: on a Mac it peaked at 56.4 GB (mlx-video, M3 Max 64 GB, 10 Oct 2026) and took about 18 minutes for 41 frames. PyTorch on MPS was killed by macOS. That does not fit 24 GB.

**Why not ComfyUI for both:** on Apple silicon, Wan 2.2 in ComfyUI has open bugs (issue 15010: banding and colour errors on an M4 Max; issue 9255: fp8 files fail on MPS; issue 14837: silent MPS attention errors on long video). Two small command-line tools are easier to scan, sandbox and script than ComfyUI plus its custom-node ecosystem.

## All candidates

| Candidate | Licence (weights / code) | Login or click on HF | Download | Fits 24 GB | Script control | Result |
|---|---|---|---|---|---|---|
| **mflux + FLUX.2 klein 4B** | Apache-2.0 / MIT | No | 15.97 GB | Yes, 8.0 GB loaded at `-q 8` | CLI + Python | **Image pick** |
| **FastVideo + FastMetal-5B-QAD** | Apache-2.0 / Apache-2.0 | No | 19.51 GB | Yes, 9.5 GiB peak | Python script | **Video pick** |
| mflux + Z-Image-Turbo (6B) | Apache-2.0 | No | 32.8 GB (transformer is float32) | Likely at `-q 8` [Guess] | CLI + Python | Backup image model. Twice the download of klein. |
| mflux + FLUX.1 [schnell] (12B) | Apache-2.0 | Yes, licence click (`gated: auto`) | 33.7 GB (diffusers files) | At `-q 4` or `-q 8` | CLI + Python | Ruled out: older ("legacy" in mflux), twice the size, needs login. |
| ComfyUI + FLUX.1 schnell fp8 | Apache-2.0 / GPL-3.0 | No (Comfy-Org repack) | 17.24 GB single file | Yes | API workflow JSON | Ruled out: see ComfyUI below. |
| ComfyUI (repo) and ComfyUI Desktop | GPL-3.0 | - | - | - | HTTP API + workflow JSON | Ruled out: Wan bugs on Apple silicon (above); ComfyUI-Manager downloads code at run time. SkillSpector: "DO_NOT_INSTALL", score 100 (not checked by hand, since ruled out). |
| Wan 2.2 TI2V 5B, official | Apache-2.0 | No | 34.2 GB, includes 2 pickle `.pth` files | No: 56.4 GB peak on a Mac | Python | Ruled out: memory, and pickle files. |
| Wan 2.2 5B, Comfy-Org repack | Apache-2.0 | No | 18.2 GB safetensors | Unknown, banding bug on Mac | ComfyUI | Ruled out with ComfyUI. |
| Wan 2.1 T2V 1.3B | Apache-2.0 | No | 17.6 GB official, includes 2 `.pth` files | Yes, 16 GB stated with mlx-video 4-bit | Python | Ruled out: older, 480p only; FastMetal is the same family and newer. |
| LTX-Video 0.9.8 (2B, 13B) | Custom Lightricks licence (`license: other`) | No | 4.5 to 28.6 GB per file | 2B yes | ComfyUI or Python | Ruled out: not Apache; licence needs a lawyer read for client work. |
| LTX-2 / LTX-2.3 (19B) | LTX-2 Community License Agreement | No | 20 to 43 GB per file + 50 GB text encoder | Only int4 MLX packs | Python | Ruled out: community licence, very large. |
| Draw Things (Mac app) | App: free, closed binary; community repo GPL-3.0 | App downloads its own models | - | Yes | HTTP server inside the running app | Ruled out: a GUI app; the binary we would run is not the code we can scan. |
| DiffusionKit (Argmax) | Apache-2.0 / MIT | No | 24.1 GB (FLUX.1 schnell MLX) | Yes | CLI + Python | Ruled out: its MLX FLUX weights were last updated 29 Aug 2024; mflux replaces it. |
| SD 3.5 Medium | Stability Community Licence (free only under US$1M yearly revenue) | Yes, licence click | 5.1 GB + encoders | Yes | Many | Ruled out: revenue limit, our clients may pass it. |
| SDXL-Turbo | `sai-nc-community`: non-commercial | No | 6.9 GB | Yes | Many | Ruled out: non-commercial. |

## Scans

Method as in `SCAN-REPORT.md`: SkillSpector (`--no-llm`) from the GitHub link through `kinso-frontend/tools/sandbox/run.sh tools/scan/reports/home ...`, reports moved to `tools/scan/reports/apps/`; our scanner `python3 -I tools/scan/scan.py <owner>/<repo> --ref <commit>` in memory, no `--save`. Every flagged line in the code path we would run was read by hand from an in-memory copy of the archive. Nothing written to disk except the reports.

| Repo | Commit | Licence | Archive SHA-256 | SkillSpector | Our scan |
|---|---|---|---|---|---|
| mflux-community/mflux (was filipstrand/mflux) | `ee17012bf1252ee1331f551ed4ab0ed62f1c6ba6` | MIT | `a04eafc0e40db0716f178e6564ff468304c1ea747d36b7a005b409be376599ac` | **Did not finish**: "byte_budget_exhausted" on the whole repo, `src/`, `models/flux2` and `models/common` | 1,575 files. No unsafe paths, no executables. 11 links (agent-skill folders). 1 hidden character. |
| hao-ai-lab/FastVideo | `465654d9000d9847710e0fa643c04e1b218a441d` | Apache-2.0 | `7863bbb4c0e6b5207dceade085977334f7dee5b060c0f35fb4b1d3dbcf9ad356` | **Did not finish**: "byte_budget_exhausted" on the whole repo, `fastvideo/mlx_runtime` and `examples/inference/basic` | 3,172 files, 192 MB. 77 executable shell scripts (CI and Docker). 1 link to a developer's own path (`docs/node_modules`). No hidden characters. |

SkillSpector could not scan either repo. Both are too large for its download budget, even folder by folder. Our scanner and the hand check below are the only code review. **Your call** whether that is enough.

**mflux, checked by hand:**
- Hidden character: U+FEFF in `src/mflux/utils/metadata_builder.py:85`. It is the standard marker inside an XMP metadata header. Safe.
- `aimed_at_ai`: `lens_prompt_template.py:26` is the system prompt of the Lens model's text encoder ("You are ChatGPT..."). Not used by klein.
- `eval`: all 93 hits are `mx.eval(...)` or `.eval()` (MLX and model methods). No Python `eval()` or `exec()` of text.
- `runs_commands`: `pmset -g batt` (battery saver), `sysctl` (chip name), shell completions, and release scripts. None download or run remote code.
- Network: `snapshot_download` / `hf_hub_download` from Hugging Face only, with fixed commits (`model_revisions.py`: FLUX.2-klein-4B pinned to `e7b7dc27f91deacad38e78976d1f2b499d76a294`). `requests` is used only in `src/mflux/release/` (maintainer release tools).
- Pickle: `weight_loader.py:339` uses `torch.load(..., weights_only=False)` for PyTorch-format files. Klein loads safetensors through `mx.load`, so this line is not reached. Do not use mflux models that ship `.pt`/`.pth` (Depth Pro, HED, OpenPose, PiD decoder).
- No telemetry. The only `telemetry` hit is in a README of an agent skill.
- Run-time code download: none. "Plugins" are separate pip packages you would have to install yourself.

**FastVideo MLX path, checked by hand** (`examples/inference/basic/mlx_wan22_generate.py`, `mlx_wan_prompt_to_video.py`, `fastvideo/mlx_runtime/`):
- `snapshot_download` runs **only when a model folder is not given**. It would then fetch `FastVideo/FastWan2.2-TI2V-5B-FullAttn-Diffusers`. Always pass `--text-encoder-root`, `--mlx-checkpoint` and `--vae-root`.
- `subprocess.run([sys.executable, ...])` in `mlx_wan_prompt_to_video.py:215` reruns its own script to encode the prompt (opt-in mode). Not remote code.
- Prompt enhancer: opt-in (`--enhance-prompt`), local only (mlx-lm or a template). Leave it off: the mlx-lm backend would download a model.
- `telemetry` hit in `fastwan.py:319` is a local counter. No telemetry calls found in the MLX path.
- `torch.load` in `wan_vae.py:244` uses `weights_only=True`. FastMetal's VAE is safetensors anyway. `np.load` uses `allow_pickle=False`.
- Network calls in `minimax_h3_reference.py` and `minimax_h3_taeh3.py` belong to a different model (MiniMax H3). Not used.
- `curl | sh`, `rm -rf`, secret names and wandb are in CI, Docker and training scripts only. Not used.
- Watch: importing `fastvideo.mlx_runtime` also runs `fastvideo/__init__.py`, which imports the general `VideoGenerator`. That is a large code surface (configs, entrypoints). It was not read line by line.

Also scanned with SkillSpector before the scope was narrowed (reports kept in `tools/scan/reports/apps/`, not checked by hand, all ruled out): `comfyanonymous_ComfyUI`, `Comfy-Org_desktop`, `argmaxinc_DiffusionKit`, `Lightricks_LTX-Video`, `Wan-Video_Wan2.2`. The `drawthingsai_draw-things-community` run did not finish.

## Download list for approval

Nothing below is downloaded yet. SHA-256 values are the Hugging Face LFS hashes, read from the Hugging Face API on 27 Oct 2026. Sizes in decimal GB.

**1. FLUX.2 [klein] 4B** - `huggingface.co/black-forest-labs/FLUX.2-klein-4B`, commit `e7b7dc27f91deacad38e78976d1f2b499d76a294`, Apache-2.0, no login.

| File | Size | SHA-256 |
|---|---|---|
| `transformer/diffusion_pytorch_model.safetensors` | 7.75 GB | `9f29f9edcfdae452a653ffb51a534ca4decd389952c225724ff3b94042612a6e` |
| `text_encoder/model-00001-of-00002.safetensors` | 4.97 GB | `8c0506e7f4936fa7e26183a4fd8da4e2bdbc5990ba64ae441f965d51228f36ea` |
| `text_encoder/model-00002-of-00002.safetensors` | 3.08 GB | `82f2bd839378541b0557bfabaf37c7d3d637071fdcb73302dedd7cf61162ce07` |
| `vae/diffusion_pytorch_model.safetensors` | 0.17 GB | `ca70d2202afe6415bdbcb8793ba8cd99fd159cfe6192381504d6c4d3036e0f04` |
| small `*.json` configs and tokenizer files | < 0.02 GB | no LFS hash; pinned by the commit |

Do not download `flux-2-klein-4b.safetensors` (7.75 GB). It is the same transformer as one file, for ComfyUI.

**2. FastMetal-5B-QAD** - `huggingface.co/FastVideo/FastMetal-5B-QAD`, commit `5e4819ec9c8dd062443cf015bd9022c700eca458`, Apache-2.0, no login.

| File | Size | SHA-256 |
|---|---|---|
| `mlx_dit.safetensors` | 5.31 GB | `652c322e954046dfea2fe5e5e239c2284ee5d8bcd18d40ed57d9c6cdf95b930a` |
| `text_encoder/model-00001-of-00003.safetensors` | 4.94 GB | `a8e861969c7433e707cc5a74065d795d36cca07ec96eb6763eb4083df7248f58` |
| `text_encoder/model-00002-of-00003.safetensors` | 4.98 GB | `d57d948ece4837d850b7a859a4415121d57cacf8b9ee1d4db200c67f592902d7` |
| `text_encoder/model-00003-of-00003.safetensors` | 1.44 GB | `0da9ee284e21d1406df708788db1d502d95d75f69faa25cd26151bf8829b7c5f` |
| `vae/diffusion_pytorch_model.safetensors` | 2.82 GB | `62cd18f19438e35b32ac63020e2852f566e9b02f46b6cdbd87972a356e3c6f4b` |
| `tokenizer/tokenizer.json` | 0.02 GB | `20a46ac256746594ed7e1e3ef733b83fbc5a6f0922aa7480eda961743de080ef` |
| `tokenizer/spiece.model` | < 0.01 GB | `e3909a67b780650b35cf529ac782ad2b6b26e6d1f849d3fbb6a872905f452458` |
| `mlx_dit.json`, `scheduler/`, other small configs | < 0.01 GB | no LFS hash; pinned by the commit |

**3. Code**
- mflux from PyPI, the release that matches commit `ee17012` (check the version and its wheel hash on PyPI before install). Python 3.11+.
- FastVideo, GitHub archive of commit `465654d9000d9847710e0fa643c04e1b218a441d`, saved through the sandbox with `--expect-sha 7863bbb4c0e6b5207dceade085977334f7dee5b060c0f35fb4b1d3dbcf9ad356`. Not pip-installed; run from the folder.
- Python packages from PyPI for FastVideo's MLX path: `torch transformers mlx safetensors av imageio imageio-ffmpeg`, pinned with hashes.

## Total disk

| Item | Size |
|---|---|
| FLUX.2 klein 4B weights | 15.97 GB |
| FastMetal-5B-QAD weights | 19.51 GB |
| Optional: mflux `-q 8` saved copy of klein (faster load) | about 8 GB [Guess] |
| Python environments (mlx, torch, transformers) | about 3 GB [Guess] |
| FastVideo source | 0.19 GB |
| **Total** | **about 39 GB, or 47 GB with the saved copy** |

210 GB free now. This leaves over 160 GB.

## Steps after download

1. **Hash check.** Run `shasum -a 256` on every file in the tables above. Stop if any hash differs.
2. **Safetensors only.** List the model folders. Delete nothing, but refuse to run if any `.ckpt`, `.pt`, `.pth`, `.bin` or `.pkl` file is present.
3. **No ComfyUI, no ComfyUI-Manager, no plugins.** Do not install mflux plugins or `mflux.web` packages. Do not use FastVideo's `--enhance-prompt`.
4. **Run only through the sandbox:** `kinso-frontend/tools/sandbox/run.sh <run folder> ...`. The sandbox sets `HOME` to the run folder, so the Hugging Face cache stays inside it.
5. **Network off while generating.** Set `HF_HUB_OFFLINE=1 TRANSFORMERS_OFFLINE=1`, and pass local model folders. The current `run.sh` profile allows network; a variant with `(deny network*)` for generation runs is a small change - not made, your call.
6. **How kinso-promote calls them** (no clicking):

```bash
# Image, 1024 x 1024, 4 steps
HF_HUB_OFFLINE=1 mflux-generate-flux2 --model <klein folder> --base-model flux2-klein-4b \
  --prompt "..." --width 1024 --height 1024 --steps 4 --seed 42 -q 8 --output out.png

# Video, 5 seconds (832 x 448, 121 frames, 24 fps)
HF_HUB_OFFLINE=1 TRANSFORMERS_OFFLINE=1 python examples/inference/basic/mlx_wan22_generate.py \
  --text-encoder-root <FastMetal folder> --mlx-checkpoint <FastMetal folder> \
  --vae-root <FastMetal folder>/vae --prompt "..." --output-path clip.mp4 [--fast]
```

7. **One model at a time.** Never run mflux, FastVideo and Ollama together (`../RULES-RESEARCH.md` section 4). Close Chrome and VS Code before a video run.
8. **First run is a test.** Time one image and one clip on this Mac and replace the [Guess] figures above.

## Open points

- SkillSpector could not complete on either chosen repo. Only our scanner and a hand check of the run path cover the code.
- FastMetal is a distilled derivative: 3 steps instead of Wan's 50. Quality is not the same as full Wan 2.2. Its training data is synthetic video made with Wan 2.2 (`FastVideo/Wan2.2-Syn-121x704x1280_32k`).
- No source times klein 4B on a 24 GB M4 Pro. The closest is an M1 Max.
