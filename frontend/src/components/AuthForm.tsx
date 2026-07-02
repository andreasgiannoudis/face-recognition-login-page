type Props = {
  mode: "login" | "register";
  setMode: (mode: "login" | "register") => void;
  username: string;
  setUsername: (val: string) => void;
  loading: boolean;
  message: string | null;
  error: string | null;
};

export default function AuthForm({
  mode,
  setMode,
  username,
  setUsername,
  loading,
  message,
  error,
}: Props) {
  return (
    <>
      <h1>Face Authentication</h1>

      <div className="mode-switch">
        <button
          className={mode === "login" ? "active" : ""}
          onClick={() => setMode("login")}
        >
          Login
        </button>

        <button
          className={mode === "register" ? "active" : ""}
          onClick={() => setMode("register")}
        >
          Register
        </button>
      </div>

      <input
        className="input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />

      {loading && <div className="info">Processing face...</div>}
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}
    </>
  );
}