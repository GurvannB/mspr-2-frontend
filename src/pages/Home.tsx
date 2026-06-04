import "./styles/Home.css";
import { Link } from "react-router-dom";
import { ShieldCheck, UserPlus } from "lucide-react";

export default function Home() {
  return (
    <div className="home-page">
      <div className="hero-card">
        <div className="logo-section">
          <div className="logo-icon">
            <ShieldCheck size={42} />
          </div>

          <h1>COFRAP</h1>

          <p className="subtitle">
            Plateforme sécurisée de gestion des authentifications
          </p>
        </div>

        <div className="action-section">
          <div className="button-group">
            <Link to="/login" className="action-btn primary">
              <ShieldCheck size={18} />
              Se connecter
            </Link>

            <Link to="/create-account" className="action-btn secondary">
              <UserPlus size={18} />
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
