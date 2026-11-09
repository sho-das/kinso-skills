"""Synthesise one sentence with kokoro-onnx. Usage: say.py <model.onnx> <voices.npz> <voice> <lang> <text> <out.wav>"""
import sys, wave
import numpy as np
from kokoro_onnx import Kokoro

model, voices, voice, lang, text, out = sys.argv[1:7]
k = Kokoro(model, voices)
print("voices in file:", k.get_voices())
samples, rate = k.create(text, voice=voice, speed=1.0, lang=lang)
pcm = (np.clip(samples, -1, 1) * 32767).astype("<i2")
with wave.open(out, "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(rate); w.writeframes(pcm.tobytes())
print("wrote", out, f"{len(samples)/rate:.2f}s at {rate} Hz")
