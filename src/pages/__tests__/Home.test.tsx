import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home";

describe("Page d'accueil", () => {
  it("devrait afficher le titre et le texte", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByText("COFRAP")).toBeInTheDocument();

    expect(
      screen.getByText("Plateforme sécurisée de gestion des authentifications"),
    ).toBeInTheDocument();
  });

  it("devrait afficher les liens de navigation", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", {
        name: /se connecter/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /créer un compte/i,
      }),
    ).toBeInTheDocument();
  });
});
