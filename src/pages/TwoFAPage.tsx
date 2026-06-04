import "./styles/TwoFAPage.css";
import { Link } from "react-router-dom";
import GenerateTwoFA from "../components/GenerateTwoFA";

export default function TwoFAPage() {
  return (
    <div className="twofa-page">
      <div className="twofa-header">
        <h1>Générer mon QRCode TOTP</h1>
      </div>

      <GenerateTwoFA />

      <Link to="/" className="twofa-back-link">
        ← Retour à l'accueil
      </Link>
    </div>
  );
}
