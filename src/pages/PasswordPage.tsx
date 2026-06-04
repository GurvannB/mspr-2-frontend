import "./styles/Page.css";
import "./styles/PasswordPage.css";
import { Link } from "react-router-dom";
import GeneratePassword from "../components/GeneratePassword";

export default function PasswordPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Récupération du mot de passe</h1>
      </div>

      <GeneratePassword />

      <Link to="/" className="back-link">
        ← Retour à l'accueil
      </Link>
    </div>
  );
}
