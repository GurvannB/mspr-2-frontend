import { useState } from "react";
import { authenticate } from "../api";
import { useNavigate } from "react-router-dom";

export default function Authenticate() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handle = async () => {
    setLoading(true);
    setResult(null);

    try {
      const data = await authenticate(username, password, totp);
      setResult(data);

      // ✅ si succès → redirection
      if (!data.error) {
        setTimeout(() => {
          navigate("/success");
        }, 800);
      }
    } catch (err) {
      setResult({ error: "Erreur serveur" });
    }

    setLoading(false);
  };

  return (
    <section className="card">
      <div className="form-col">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <input
          type="text"
          placeholder="Code TOTP (6 chiffres)"
          value={totp}
          onChange={(e) => setTotp(e.target.value)}
          maxLength={6}
        />

        <button
          onClick={handle}
          disabled={loading || !username || !password || !totp}
        >
          {loading ? "Vérification..." : "S'authentifier"}
        </button>
      </div>

      {result && (
        <div className={`result ${result.error ? "error" : "success"}`}>
          {result.error ? <p>❌ {result.error}</p> : <p>✅ {result.message}</p>}

          {result.action && (
            <p className="action">→ Action requise : {result.action}</p>
          )}
        </div>
      )}
    </section>
  );
}
