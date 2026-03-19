// render : affiche le composant dans le faux DOM
// screen : sert à chercher des éléments dans le DOM
import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import userEvent from "@testing-library/user-event";    // Simule les actions réelles d'un utilisateur
import { vi } from "vitest"; //permet de remplacer des fonctions et/ou des modules par des versions simulées pour les tests
import { useState } from "react";

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

        expect(mockOnQueryChange).toHaveBeenLastCalledWith("e"); // On vérifie que le dernier appel de la fonction a été fait avec le "e" de technologie
    });

    // Tester la recherche sur un mot complet
    it("Test de onQueryChange avec la valeur cumulée", async () => {
        // Simulation d'un parent React
        const Wrapper = () => {
            const [query, setQuery] = useState("");
            return (
                <SearchBar
                    searchBar={{ query }}
                    onQueryChange={setQuery}
                    onSearch={() => { }}
                />
            )
        };

        render(<Wrapper />);

        const input = screen.getByPlaceholderText("Rechercher un article...");

        await userEvent.type(input, "Technologie");

        // On vérifie si l'input a la valeure attendue
        expect(input).toHaveValue("Technologie");
    });

    it("Test affichage du bouton clear et le déclenche correctement", async () => {
        const mockOnQueryChange = vi.fn();
        const mockOnSearch = vi.fn();   // Mock de onSearch qui lance la recherche

        render(
            <SearchBar
                searchBar={{ query: "React" }}
                onQueryChange={mockOnQueryChange}
                onSearch={mockOnSearch}
            />
        );

        const clearButton = screen.getByLabelText("Effacer la recherche");  // On cherche le label avec le text correspondant

        expect(clearButton).toBeInTheDocument();

        // 👆 clic utilisateur
        await userEvent.click(clearButton); // On attend le clic utilisateur

        expect(mockOnQueryChange).toHaveBeenCalledWith(""); // On vérifie que onQueryChange est vide
        expect(mockOnSearch).toHaveBeenCalled();    // La recherche a bien été déclanchée
    });

    // Tester le bouton Rechercher et le déclanchement de onSearch
    it("Test de onSearch lors du submit", async () => {
        const mockOnSearch = vi.fn();

        render(
            <SearchBar
                searchBar={{ query: "Technologie" }}
                onQueryChange={() => { }}
                onSearch={mockOnSearch}
            />
        );

        const button = screen.getByRole("button", { name: "Rechercher" });  // getByRole trouve le button qui a le texte "Rechercher"

        await userEvent.click(button);

        expect(mockOnSearch).toHaveBeenCalled();
    });
})