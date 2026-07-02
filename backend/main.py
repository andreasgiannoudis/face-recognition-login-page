from fastapi import FastAPI, Body, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware

from auth.dependencies import get_current_user

from utils.image import decode_base64_image
from services.face_service import (
    detect_faces,
    register_user,
    login_user
)

app = FastAPI(title="Face Login API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Face Login API"}


@app.post("/detect-face")
def detect_face(data: dict = Body(...)):
    image = decode_base64_image(data["image"])
    faces = detect_faces(image)

    return {
        "faceDetected": len(faces) == 1,
        "facesFound": len(faces)
    }


@app.post("/register")
def register(data: dict = Body(...)):
    username = data.get("username")

    if not username:
        raise HTTPException(status_code=400, detail="Username is required")

    image = decode_base64_image(data["image"])

    return register_user(username, image)


@app.post("/login")
def login(data: dict = Body(...)):
    username = data.get("username")

    if not username:
        raise HTTPException(status_code=400, detail="Username is required")

    image = decode_base64_image(data["image"])

    return login_user(username, image)


# -------------------------
# Protected route
# -------------------------
@app.get("/me")
def me(user: str = Depends(get_current_user)):
    return {
        "message": "You are authenticated",
        "user": user
    }