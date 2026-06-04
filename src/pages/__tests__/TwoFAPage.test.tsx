import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TwoFAPage from "../TwoFAPage";

vi.mock("../../components/GenerateTwoFA", () => ({
  default: () => <div data-testid="generate-twofa-mock" />,
}));

describe("TwoFAPage", () => {
  it("affiche le titre et le composant 2FA", () => {
    render(
      <MemoryRouter>
        <TwoFAPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: /générer mon qrcode totp/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("generate-twofa-mock")).toBeInTheDocument();
  });
});
