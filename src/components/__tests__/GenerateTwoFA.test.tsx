import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import GenerateTwoFA from "../GenerateTwoFA";
import * as api from "../../api";

vi.mock("../../api", async () => {
  const actual = await vi.importActual<typeof import("../../api")>("../../api");

  return {
    ...actual,
    generateTwoFA: vi.fn(),
  };
});

describe("GenerateTwoFA", () => {
  const mockedGenerateTwoFA = vi.mocked(api.generateTwoFA);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche le formulaire", () => {
    render(<GenerateTwoFA />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /générer 2fa/i,
      }),
    ).toBeInTheDocument();
  });

  it("désactive le bouton si le username est vide", () => {
    render(<GenerateTwoFA />);

    expect(
      screen.getByRole("button", {
        name: /générer 2fa/i,
      }),
    ).toBeDisabled();
  });

  it("appelle generateTwoFA avec le bon username", async () => {
    const user = userEvent.setup();

    mockedGenerateTwoFA.mockResolvedValue({
      message: "2FA généré",
    });

    render(<GenerateTwoFA />);

    await user.type(screen.getByPlaceholderText("Username"), "john");

    await user.click(
      screen.getByRole("button", {
        name: /générer 2fa/i,
      }),
    );

    expect(mockedGenerateTwoFA).toHaveBeenCalledWith("john");
  });

  it("affiche le QR code 2FA", async () => {
    const user = userEvent.setup();

    mockedGenerateTwoFA.mockResolvedValue({
      message: "2FA généré",
      qrcode_base64: "totpQR",
    });

    render(<GenerateTwoFA />);

    await user.type(screen.getByPlaceholderText("Username"), "john");

    await user.click(
      screen.getByRole("button", {
        name: /générer 2fa/i,
      }),
    );

    expect(await screen.findByAltText("QR 2FA")).toBeInTheDocument();
  });

  it("affiche une erreur", async () => {
    const user = userEvent.setup();

    mockedGenerateTwoFA.mockResolvedValue({
      error: "Utilisateur introuvable",
    });

    render(<GenerateTwoFA />);

    await user.type(screen.getByPlaceholderText("Username"), "john");

    await user.click(
      screen.getByRole("button", {
        name: /générer 2fa/i,
      }),
    );

    expect(
      await screen.findByText(/utilisateur introuvable/i),
    ).toBeInTheDocument();
  });
});
