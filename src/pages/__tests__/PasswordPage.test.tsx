import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PasswordPage from "../PasswordPage";

vi.mock("../../components/GeneratePassword", () => ({
  default: () => <div data-testid="generate-password-mock" />,
}));

describe("PasswordPage", () => {
  it("affiche le titre et le composant de génération de mot de passe", () => {
    render(
      <MemoryRouter>
        <PasswordPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: /récupération du mot de passe/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("generate-password-mock")).toBeInTheDocument();
  });
});
