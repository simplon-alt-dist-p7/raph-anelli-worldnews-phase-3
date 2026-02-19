// describe : conteneur, sert à organiser/regrouper les tests, à structurer et à rendre la lecture claire
// it : test individuel, avec à l'intérieur ce qu'on veut vérifier
// expect : premet la vérification du résultat d'un test
// vi : permet de remplacer des fonctions et/ou des modules par des versions simulées pour les tests
import { describe, it, expect, vi } from "vitest";

vi.mock("../repository/article.repository.js", () => {
    return {
        articleRepository: {
            create: vi.fn(),
        },
    };
});
import { articleRepository } from "../repository/article.repository.js";


import { articleService } from "./article.service.js";
import { ValidationError } from "./../errors/ValidationError.js";
import type { Article } from "./../models/article.model.js";


describe("ArticleService", () => { // Conteneur groupant les tests
    it("Test avec titre vide - Doit envoyer ValidationError pour valider le test", async () => { // test individuel
        const invalidData = {
            title: "",
            subtitle: "Sous-titre test",
            subhead: "Chapeau test",
            body: "Corps de test test",
            categoryId: 1,
        };

        const promise = articleService.createArticle(invalidData); // Déclaration unique de createArticle : on stock la promesse

        await expect(promise).rejects.toThrow(ValidationError); // Vérification qu'on passe bien par un ValidationError car il manque une donnée
        await expect(promise).rejects.toThrow("Le titre est requis");   // Vérification du message d'erreur récupéré
    });

    it("Test avec un titre trop long - Doit envoyer ValidationError pour valider le test", async () => { // test individuel

        const tooLongTitle = "a".repeat(301);   // Chaine de caractère qui répète 'a' 301 fois

        const invalidData = {
            title: tooLongTitle,
            subtitle: "Sous-titre test",
            subhead: "Chapeau test",
            body: "Corps de test test",
            categoryId: 1,
        };

        const promise = articleService.createArticle(invalidData); // Déclaration unique de createArticle : on stock la promesse

        await expect(promise).rejects.toThrow(ValidationError); // Vérification qu'on passe bien par un ValidationError car il manque une donnée
        await expect(promise).rejects.toThrow("Le titre ne peut pas dépasser 300 caractères");   // Vérification du message d'erreur récupéré
    });

    it("Création d'un article - Doit envoyer un succès", async () => { // test individuel

        const mockArticle = {
            id: 1,
            title: "Titre valide",
            subtitle: "Sous-titre valide",
            subhead: "Chapeau valide",
            body: "Contenu valide",
            categoryId: 1
        } as unknown; // On suspend le typage


        vi.mocked(articleRepository.create).mockResolvedValue(mockArticle as Article);  //On associe à nouveau avec Article
        const validData = {
            title: "Titre valide",
            subtitle: "Sous-titre valide",
            subhead: "Chapeau valide",
            body: "Contenu valide",
            categoryId: 1,
        };

        const result = await articleService.createArticle(validData);

        expect(result).toEqual(mockArticle);

    });
})