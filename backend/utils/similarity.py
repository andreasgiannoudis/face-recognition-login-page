import numpy as np
from numpy.linalg import norm


def cosine_similarity(vec1, vec2) -> float:
    vec1 = np.array(vec1, dtype=np.float32)
    vec2 = np.array(vec2, dtype=np.float32)

    return float(np.dot(vec1, vec2) / (norm(vec1) * norm(vec2)))