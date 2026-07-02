import json
import os

DB_FILE = "known_faces.json"


def load_faces():
    if not os.path.exists(DB_FILE):
        return {}

    with open(DB_FILE, "r") as f:
        return json.load(f)


def save_faces(data):
    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=4)