import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CreateAccount from "../CreateAccount";
import * as api from "../../api";

vi.mock("../../api", async () => {
  const actual = await vi.importActual<typeof import("../../api")>("../../api");

  return {
    ...actual,
    createAccount: vi.fn(),
  };
});

describe("CreateAccount", () => {
  const mockedCreateAccount = vi.mocked(api.createAccount);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche le formulaire", () => {
    render(<CreateAccount />);

    expect(
      screen.getByPlaceholderText("Username (ex: jean.dupont)"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /créer le compte/i,
      }),
    ).toBeInTheDocument();
  });

  it("désactive le bouton si le username est vide", () => {
    render(<CreateAccount />);

    expect(
      screen.getByRole("button", {
        name: /créer le compte/i,
      }),
    ).toBeDisabled();
  });

  it("appelle createAccount avec le bon username", async () => {
    const user = userEvent.setup();

    mockedCreateAccount.mockResolvedValue({
      message: "Compte créé",
    });

    render(<CreateAccount />);

    await user.type(
      screen.getByPlaceholderText("Username (ex: jean.dupont)"),
      "john",
    );

    await user.click(
      screen.getByRole("button", {
        name: /créer le compte/i,
      }),
    );

    expect(mockedCreateAccount).toHaveBeenCalledWith("john");
  });

  it("affiche les deux QR codes", async () => {
    const user = userEvent.setup();

    mockedCreateAccount.mockResolvedValue({
      message: "Compte créé",
      qrcode_password_base64: "passwordQR",
      qrcode_totp_base64: "totpQR",
    });

    render(<CreateAccount />);

    await user.type(
      screen.getByPlaceholderText("Username (ex: jean.dupont)"),
      "john",
    );

    await user.click(
      screen.getByRole("button", {
        name: /créer le compte/i,
      }),
    );

    expect(await screen.findByAltText("QR mot de passe")).toBeInTheDocument();

    expect(await screen.findByAltText("QR 2FA")).toBeInTheDocument();
  });

  it("affiche une erreur", async () => {
    const user = userEvent.setup();

    mockedCreateAccount.mockResolvedValue({
      error: "Utilisateur déjà existant",
    });

    render(<CreateAccount />);

    await user.type(
      screen.getByPlaceholderText("Username (ex: jean.dupont)"),
      "john",
    );

    await user.click(
      screen.getByRole("button", {
        name: /créer le compte/i,
      }),
    );

    expect(
      await screen.findByText(/utilisateur déjà existant/i),
    ).toBeInTheDocument();
  });
});
