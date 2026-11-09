"""Build models/voices.npz from the raw float32 .bin voice files (Kokoro-82M-v1.0-ONNX).
Each .bin is 510 x 1 x 256 float32 values. No pickle is used."""
import sys, pathlib
import numpy as np

voice_dir = pathlib.Path(sys.argv[1])
out = pathlib.Path(sys.argv[2])
voices = {}
for f in sorted(voice_dir.glob("*.bin")):
    arr = np.fromfile(f, dtype="<f4")
    assert arr.size == 510 * 256, (f, arr.size)
    voices[f.stem] = arr.reshape(510, 1, 256)
np.savez(out, **voices)
print("wrote", out, sorted(voices))
