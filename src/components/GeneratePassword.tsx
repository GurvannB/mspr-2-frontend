import { useState } from "react";
import { generatePassword } from "../api";

export default function GeneratePassword() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    setResult(null);
    const data = await generatePassword(username);
    setResult(data);
    setLoading(false);
  };

  return (
    <section className="card">
      <div className="form-row">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handle} disabled={loading || !username}>
          {loading ? "Génération..." : "Générer"}
        </button>
      </div>
      {result?.error && (
        <div className="result error">
          <p>{result.error}</p>
        </div>
      )}

      {result?.qrcode_base64 && (
        <div className="qr-only">
          <img
            src={`data:image/png;base64,${result.qrcode_base64}`}
            alt="QR mot de passe"
          />
        </div>
      )}
    </section>
  );
}
