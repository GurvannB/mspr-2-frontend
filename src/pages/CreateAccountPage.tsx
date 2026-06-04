import "./styles/CreateAccountPage.css";
import { Link } from "react-router-dom";
import CreateAccount from "../components/CreateAccount";

export default function CreateAccountPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Créer un compte</h1>
      </div>

      <CreateAccount />

      <Link to="/" className="back-link">
        ← Retour à l'accueil
      </Link>
    </div>
  );
}
