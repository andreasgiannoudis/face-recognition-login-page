type Props = {
  username: string;
  setUsername: (val: string) => void;
  loading: boolean;
  message: string | null;
  error: string | null;
};

export default function AuthForm({
  username,
  setUsername,
  loading,
  message,
  error,
}: Props) {
  return (
    <>
      <h1>Face Authentication</h1>

      <input
        className="input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        disabled={loading}
      />

      {loading && <div className="info">Processing face...</div>}
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}
    </>
  );
}