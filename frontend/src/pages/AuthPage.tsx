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

  const navigate = useNavigate();

  const handleRequest = async (img: string) => {
    if (!username) {
      setError("Please enter a username first");
      return;
    }

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

      if (res.data?.success) {
        const token = res.data?.access_token;

        if (token) {
          localStorage.setItem("token", token);
        }

        setMessage(res.data.message || "Success");

        setTimeout(() => {
          navigate("/dashboard");
        }, 600);
      } else {
        setError(res.data?.message || "Something went wrong");
      }
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* LEFT SIDE */}
      <div className="auth-hero">
        <div className="auth-hero-content">
          <h1>Secure Identity Login</h1>
          <p>
            Log in or register using facial verification. A faster and more secure way to access your account.
          </p>

          <div className="auth-bullets">
            <span>✔ Biometric authentication</span>
            <span>✔ Instant access</span>
            <span>✔ No passwords needed</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{mode === "login" ? "Welcome back" : "Create account"}</h2>
            <p>{mode === "login" ? "Login with your face" : "Register your identity"}</p>
          </div>

          <div className="mode-switch">
            <button
              className={mode === "login" ? "active" : ""}
              onClick={() => setMode("login")}
              disabled={loading}
            >
              Login
            </button>
            <button
              className={mode === "register" ? "active" : ""}
              onClick={() => setMode("register")}
              disabled={loading}
            >
              Register
            </button>
          </div>

          <AuthForm
            username={username}
            setUsername={setUsername}
            loading={loading}
            message={message}
            error={error}
          />

          <div className="camera-section">
            <div className="camera-title">
              Verify identity with camera
            </div>

            <CameraView onCapture={handleRequest} />
          </div>

          {loading && <div className="status loading">Processing...</div>}
          {message && <div className="status success">{message}</div>}
          {error && <div className="status error">{error}</div>}
        </div>
      </div>
    </div>
  );
}