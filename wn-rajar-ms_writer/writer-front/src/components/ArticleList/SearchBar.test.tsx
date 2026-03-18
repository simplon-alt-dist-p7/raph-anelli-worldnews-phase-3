// render : affiche le composant dans le faux DOM
// screen : sert à chercher des éléments dans le DOM
import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import userEvent from "@testing-library/user-event";    // Simule les actions réelles d'un utilisateur
import { vi } from "vitest"; //permet de remplacer des fonctions et/ou des modules par des versions simulées pour les tests

describe("Test de la barre de recherche", () => {
    it("Affichage du champ de recherche", async () => {
        render(
            <SearchBar
                searchBar={{ query: "" }}
                onQueryChange={() => { }}   // Nécessaire mais vide pour le moment
                onSearch={() => { }}    // Nécessaire mais vide pour le moment
            />
        );

        const input = screen.getByPlaceholderText("Rechercher un article...");  // On vérifie si on a bien un placeholder précis

        expect(input).toBeInTheDocument();  // On vérifie si cet élément est bien dans la page
    });

    it("Test de onQueryChange quand on tape dans l'input", async () => {
        const mockOnQueryChange = vi.fn();

        render(
            <SearchBar
                searchBar={{ query: "" }}
                onQueryChange={mockOnQueryChange}
                onSearch={() => { }}
            />
        );

        const input = screen.getByPlaceholderText("Rechercher un article...");

        await userEvent.type(input, "Technologie");   // Simule un utilisateur qui tape "Technologie" dans la barre de recherche

        expect(mockOnQueryChange).toHaveBeenCalled();   // On vérifie que la fonction a été appelée au moins une fois
    });
})