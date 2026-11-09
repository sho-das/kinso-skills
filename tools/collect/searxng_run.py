import os
import runpy
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.abspath(os.path.join(HERE, "..", "..", "vendor", "searxng_searxng@54ca1d9"))
os.environ["SEARXNG_SETTINGS_PATH"] = os.path.join(HERE, "searxng", "settings.yml")
sys.path.insert(0, SRC)
os.chdir(SRC)
runpy.run_module("searx.webapp", run_name="__main__")
