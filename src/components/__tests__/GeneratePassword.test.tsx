import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import GeneratePassword from "../GeneratePassword";
import * as api from "../../api";

vi.mock("../../api", async () => {
  const actual = await vi.importActual<typeof import("../../api")>("../../api");

  return {
    ...actual,
    generatePassword: vi.fn(),
  };
});

describe("GeneratePassword", () => {
  const mockedGeneratePassword = vi.mocked(api.generatePassword);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche le formulaire", () => {
    render(<GeneratePassword />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /générer/i,
      }),
    ).toBeInTheDocument();
  });

  it("désactive le bouton si le username est vide", () => {
    render(<GeneratePassword />);

    expect(
      screen.getByRole("button", {
        name: /générer/i,
      }),
    ).toBeDisabled();
  });

  it("appelle generatePassword avec le bon username", async () => {
    const user = userEvent.setup();

    mockedGeneratePassword.mockResolvedValue({
      message: "Mot de passe généré",
    });

    render(<GeneratePassword />);

    await user.type(screen.getByPlaceholderText("Username"), "john");

    await user.click(
      screen.getByRole("button", {
        name: /générer/i,
      }),
    );

    expect(mockedGeneratePassword).toHaveBeenCalledWith("john");
  });

  it("affiche le QR code du mot de passe", async () => {
    const user = userEvent.setup();

    mockedGeneratePassword.mockResolvedValue({
      message: "Mot de passe généré",
      qrcode_base64: "passwordQR",
    });

    render(<GeneratePassword />);

    await user.type(screen.getByPlaceholderText("Username"), "john");

    await user.click(
      screen.getByRole("button", {
        name: /générer/i,
      }),
    );

    expect(await screen.findByAltText("QR mot de passe")).toBeInTheDocument();
  });

  it("affiche une erreur", async () => {
    const user = userEvent.setup();

    mockedGeneratePassword.mockResolvedValue({
      error: "Utilisateur introuvable",
    });

    render(<GeneratePassword />);

    await user.type(screen.getByPlaceholderText("Username"), "john");

    await user.click(
      screen.getByRole("button", {
        name: /générer/i,
      }),
    );

    expect(
      await screen.findByText(/utilisateur introuvable/i),
    ).toBeInTheDocument();
  });
});
