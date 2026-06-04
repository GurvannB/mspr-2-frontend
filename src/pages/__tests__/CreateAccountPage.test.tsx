import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreateAccountPage from "../CreateAccountPage";

vi.mock("../../components/CreateAccount", () => ({
  default: () => <div data-testid="create-account-mock" />,
}));

describe("CreateAccountPage", () => {
  it("affiche le titre et le composant de création de compte", () => {
    render(
      <MemoryRouter>
        <CreateAccountPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Créer un compte")).toBeInTheDocument();
    expect(screen.getByTestId("create-account-mock")).toBeInTheDocument();
  });
});
