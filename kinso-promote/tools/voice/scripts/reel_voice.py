"""Build one reel's voice track with kokoro-onnx, chunk by chunk, and write the timing.

Usage: reel_voice.py <model.onnx> <voices.npz> <voice> <speed> <script.json> <out.wav> <timing.json> [lang]
lang defaults to en-us; use pt-br for pf_dora and pm_alex.

Each chunk's "say" text is spoken on its own, so its start and end are exact.
Gaps: 0.15 s inside a beat, 0.32 s between beats, 0.35 s lead-in.
"""
import json, sys, wave
import numpy as np
from kokoro_onnx import Kokoro

model, voices, voice, speed, script_path, out_wav, out_timing = sys.argv[1:8]
lang = sys.argv[8] if len(sys.argv) > 8 else "en-us"
speed = float(speed)
script = json.load(open(script_path))
k = Kokoro(model, voices)
rate = None
parts, timing = [], []
t = 0.35
lead = None
prev_beat = None
for i, c in enumerate(script["chunks"]):
    samples, rate = k.create(c["say"], voice=voice, speed=speed, lang=lang)
    if lead is None:
        lead = np.zeros(int(0.35 * rate), dtype=np.float32)
        parts.append(lead)
    if prev_beat is not None:
        gap = 0.15 if c["beat"] == prev_beat else 0.32
        parts.append(np.zeros(int(gap * rate), dtype=np.float32))
        t += gap
    dur = len(samples) / rate
    timing.append({"i": i, "beat": c["beat"], "cap": c["cap"], "start": round(t, 3), "end": round(t + dur, 3)})
    parts.append(samples.astype(np.float32))
    t += dur
    prev_beat = c["beat"]

audio = np.concatenate(parts)
peak = float(np.max(np.abs(audio)))
audio = audio / peak * 0.89  # about -1 dB peak
pcm = (np.clip(audio, -1, 1) * 32767).astype("<i2")
with wave.open(out_wav, "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(rate); w.writeframes(pcm.tobytes())
json.dump({"id": script["id"], "voice": voice, "lang": lang, "speed": speed, "voiceEnd": round(t, 3), "chunks": timing},
          open(out_timing, "w"), indent=1)
print(script["id"], f"voice {t:.2f}s", "chunks", len(timing))
