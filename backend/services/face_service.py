from core.face_model import face_app
from storage.face_store import load_faces, save_faces
from utils.similarity import cosine_similarity
from auth.jwt import create_access_token


def detect_faces(image):
    return face_app.get(image)


def register_user(username: str, image):
    faces = face_app.get(image)

    if len(faces) != 1:
        return {
            "success": False,
            "message": f"Exactly one face is required. Found {len(faces)}."
        }

    embedding = faces[0].embedding.tolist()

    users = load_faces()
    users[username] = embedding
    save_faces(users)

    return {
        "success": True,
        "message": "Face registered successfully!"
    }


def login_user(username: str, image):
    users = load_faces()

    if username not in users:
        return {
            "success": False,
            "message": "User not found."
        }

    faces = face_app.get(image)

    if len(faces) != 1:
        return {
            "success": False,
            "message": f"Exactly one face is required. Found {len(faces)}."
        }

    current_embedding = faces[0].embedding.tolist()
    stored_embedding = users[username]

    similarity = cosine_similarity(current_embedding, stored_embedding)
    similarity = float(similarity)

    is_match = similarity > 0.6

    # -------------------------
    # ✅ JWT LOGIC GOES HERE
    # -------------------------
    if is_match:
        token = create_access_token(
            data={"sub": username},
            expires_minutes=60
        )

        return {
            "success": True,
            "similarity": similarity,
            "message": "Login successful!",
            "access_token": token,
            "token_type": "bearer"
        }

    return {
        "success": False,
        "similarity": similarity,
        "message": "Face does not match."
    }