from insightface.app import FaceAnalysis

face_app = FaceAnalysis()
face_app.prepare(ctx_id=0)  # use -1 for CPU