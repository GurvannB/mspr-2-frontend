import { useState } from "react";
import { createAccount } from "../api";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    setResult(null);

    const data = await createAccount(username);

    setResult(data);
    setLoading(false);
  };

  return (
    <section className="card">
      <div className="form-row">
        <input
          type="text"
          placeholder="Username (ex: jean.dupont)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={handle} disabled={loading || !username}>
          {loading ? "Création..." : "Créer le compte"}
        </button>
      </div>

      {result && (
        <>
          {result.error ? (
            <div className="result error">
              <p>{result.error}</p>
            </div>
          ) : (
            <div className="account-qr-container">
              <div className="account-qr-grid">
                <div className="account-qr-item">
                  <h3>Mot de passe</h3>

                  <img
                    src={`data:image/png;base64,${result.qrcode_password_base64}`}
                    alt="QR mot de passe"
                  />
                </div>

                <div className="account-qr-item">
                  <h3>Authentification 2FA</h3>

                  <img
                    src={`data:image/png;base64,${result.qrcode_totp_base64}`}
                    alt="QR 2FA"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
