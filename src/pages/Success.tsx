import "./styles/Success.css";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">🎉</div>

        <h1>Connexion réussie</h1>

        <p>Votre authentification a été validée avec succès.</p>

        <Link to="/" className="success-btn">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
