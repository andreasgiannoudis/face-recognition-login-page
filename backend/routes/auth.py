from fastapi import APIRouter, Body

from services.face_service import (
    decode_image,
    register_face,
    authenticate_face
)

router = APIRouter()


@router.post("/register")
def register(data: dict = Body(...)):
    username = data["username"]
    image = decode_image(data["image"])

    success, message = register_face(username, image)

    return {
        "success": success,
        "message": message
    }


@router.post("/login")
def login(data: dict = Body(...)):
    username = data["username"]
    image = decode_image(data["image"])

    success, similarity, message = authenticate_face(username, image)

    return {
        "success": success,
        "similarity": similarity,
        "message": message
    }