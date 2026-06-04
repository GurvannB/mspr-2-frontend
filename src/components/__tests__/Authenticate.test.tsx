import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Authenticate from "../Authenticate";
import * as api from "../../api";

const mockNavigate = vi.fn();

vi.mock("../../api", async () => {
  const actual = await vi.importActual<typeof import("../../api")>("../../api");

  return {
    ...actual,
    authenticate: vi.fn(),
  };
});

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Authenticate", () => {
  const mockedAuthenticate = vi.mocked(api.authenticate);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche le formulaire", () => {
    render(
      <MemoryRouter>
        <Authenticate />
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Mot de passe")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Code TOTP (6 chiffres)"),
    ).toBeInTheDocument();
  });

  it("désactive le bouton si les champs sont vides", () => {
    render(
      <MemoryRouter>
        <Authenticate />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", { name: /s'authentifier/i }),
    ).toBeDisabled();
  });

  it("appelle authenticate avec les bonnes valeurs", async () => {
    const user = userEvent.setup();

    mockedAuthenticate.mockResolvedValue({
      message: "Connexion réussie",
    });

    render(
      <MemoryRouter>
        <Authenticate />
      </MemoryRouter>,
    );

    await user.type(screen.getByPlaceholderText("Username"), "john");

    await user.type(screen.getByPlaceholderText("Mot de passe"), "secret");

    await user.type(
      screen.getByPlaceholderText("Code TOTP (6 chiffres)"),
      "123456",
    );

    await user.click(
      screen.getByRole("button", {
        name: /s'authentifier/i,
      }),
    );

    expect(mockedAuthenticate).toHaveBeenCalledWith("john", "secret", "123456");
  });

  it("affiche un message de succès", async () => {
    const user = userEvent.setup();

    mockedAuthenticate.mockResolvedValue({
      message: "Connexion réussie",
    });

    render(
      <MemoryRouter>
        <Authenticate />
      </MemoryRouter>,
    );

    await user.type(screen.getByPlaceholderText("Username"), "john");

    await user.type(screen.getByPlaceholderText("Mot de passe"), "secret");

    await user.type(
      screen.getByPlaceholderText("Code TOTP (6 chiffres)"),
      "123456",
    );

    await user.click(
      screen.getByRole("button", {
        name: /s'authentifier/i,
      }),
    );

    expect(await screen.findByText(/connexion réussie/i)).toBeInTheDocument();
  });

  it("affiche un message d'erreur", async () => {
    const user = userEvent.setup();

    mockedAuthenticate.mockResolvedValue({
      error: "Code TOTP invalide",
    });

    render(
      <MemoryRouter>
        <Authenticate />
      </MemoryRouter>,
    );

    await user.type(screen.getByPlaceholderText("Username"), "john");

    await user.type(screen.getByPlaceholderText("Mot de passe"), "secret");

    await user.type(
      screen.getByPlaceholderText("Code TOTP (6 chiffres)"),
      "111111",
    );

    await user.click(
      screen.getByRole("button", {
        name: /s'authentifier/i,
      }),
    );

    expect(await screen.findByText(/code totp invalide/i)).toBeInTheDocument();
  });
});
