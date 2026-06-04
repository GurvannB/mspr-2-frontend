/*import CreateAccount from "./components/CreateAccount";
import GeneratePassword from "./components/GeneratePassword";
import GenerateTwoFA from "./components/GenerateTwoFA";
import Authenticate from "./components/Authenticate";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>COFRAP — Gestion des comptes</h1>
      <CreateAccount />
      <GeneratePassword />
      <GenerateTwoFA />
      <Authenticate />
    </div>
  );
}

export default App;*/
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Success from "./pages/Success";
import CreateAccountPage from "./pages/CreateAccountPage";
import PasswordPage from "./pages/PasswordPage";
import TwoFAPage from "./pages/TwoFAPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />

        {/* account management */}
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/password" element={<PasswordPage />} />
        <Route path="/2fa" element={<TwoFAPage />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
