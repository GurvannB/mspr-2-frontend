import "./styles/Login.css";
import { Link } from "react-router-dom";
import Authenticate from "../components/Authenticate";

export default function Login() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Connexion</h1>
      </div>

      <Authenticate />

      <div className="recovery-actions">
        <Link to="/password" className="recovery-card">
          <span>🔑</span>
          <div>
            <strong>Mot de passe oublié</strong>
            <p>Régénérer votre mot de passe</p>
          </div>
        </Link>

        <Link to="/2fa" className="recovery-card">
          <span>📱</span>
          <div>
            <strong>Code 2FA perdu</strong>
            <p>Récupérer votre QR Code TOTP</p>
          </div>
        </Link>
      </div>

      <Link to="/" className="back-link">
        ← Retour à l'accueil
      </Link>
    </div>
  );
}
