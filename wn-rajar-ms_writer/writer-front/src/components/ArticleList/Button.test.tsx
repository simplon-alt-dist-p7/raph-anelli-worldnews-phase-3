// render : affiche le composant dans le faux DOM
// screen : sert à chercher des éléments dans le DOM
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";    // mini-navigateur interne, nécessaire pour tester le router
import EditButton from "./Button";
import userEvent from "@testing-library/user-event";    // Simule les actions réelles d'un utilisateur
// vi : permet de remplacer des fonctions et/ou des modules par des versions simulées pour les tests
import { vi } from "vitest";

const mockNavigate = vi.fn();

// Besoin de mocker useNavigate pour vérifier les appels avec la bonne url
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("Test de EditButton", () => {
    it("Doit afficher le bouton Modifier et que la navigation est bien faite", async() => {
        // Affiche le composant dans un faux DOM
        render(
            <MemoryRouter>
                <EditButton articleId={1} />
            </MemoryRouter>
        );

        const button = screen.getByText("Modifier");    // Cherche un élément avec le texte "Modifier"
        await userEvent.click(button);  // On attend le click du bouton de l'utilisateur

        expect(mockNavigate).toHaveBeenCalledWith("/articles/1/edit");  // on vérifie que la fonction navigate est appelée avec cette url

        // Vérifie que l'élément existe
        expect(button).toBeInTheDocument();
    });
});