// render : affiche le composant dans le faux DOM
// screen : sert à chercher des éléments dans le DOM
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";    // mini-navigateur interne, nécessaire pour tester le router
import EditButton from "./Button";


describe("Test de EditButton", () => {
  it("Doit afficher le bouton Modifier", () => {
    // Affiche le composant dans un faux DOM
    render(
        <MemoryRouter>
            <EditButton articleId={1}/>
        </MemoryRouter>
    );

    // Cherche un élément avec le texte "Modifier"
    const button = screen.getByText("Modifier");
    
    // Vérifie que l'élément existe
    expect(button).toBeInTheDocument();
  });
});