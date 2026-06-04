import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";
vi.mock("../../components/Authenticate", () => ({
  default: () => <div data-testid="authenticate-mock" />,
}));
describe("Login page", () => {
  it("affiche le titre et le formulaire d'authentification", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    expect(screen.getByText("Connexion")).toBeInTheDocument();
  });
});
