import cv2
import numpy as np
import base64
from fastapi import HTTPException


def decode_base64_image(image_data: str):
    try:
        image_data = image_data.split(",")[1]
        image_bytes = base64.b64decode(image_data)
        np_array = np.frombuffer(image_bytes, np.uint8)
        return cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image format")