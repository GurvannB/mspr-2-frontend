import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Success from "../Success";

describe("Success page", () => {
  it("affiche le message de succès et le lien retour", () => {
    render(
      <MemoryRouter>
        <Success />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: /connexion réussie/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Votre authentification a été validée avec succès."),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /retour à l'accueil/i,
      }),
    ).toBeInTheDocument();
  });
});
