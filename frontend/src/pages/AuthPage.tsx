import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import CameraView from "../components/Camera";
import axios from "axios";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRequest = async (img: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const url =
        mode === "login"
          ? "http://127.0.0.1:8000/login"
          : "http://127.0.0.1:8000/register";

      const res = await axios.post(url, {
        username,
        image: img,
      });

      if (res.data.success) {
            setMessage(res.data.message);
            localStorage.setItem(
            "token",
            res.data.access_token
        );

        navigate("/dashboard");

        if (res.data.access_token) {
          localStorage.setItem("token", res.data.access_token);
        }
      } else {
        setError(res.data.message);
      }
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <AuthForm
          mode={mode}
          setMode={setMode}
          username={username}
          setUsername={setUsername}
          loading={loading}
          message={message}
          error={error}
        />

        <CameraView onCapture={handleRequest} />
      </div>
    </div>
  );
}