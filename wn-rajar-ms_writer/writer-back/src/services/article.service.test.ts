// describe : conteneur, sert à organiser/regrouper les tests, à structurer et à rendre la lecture claire
// it : test individuel, avec à l'intérieur ce qu'on veut vérifier
// expect : premet la vérification du résultat d'un test
import { describe, it, expect } from "vitest";
import { articleService } from "./article.service.js";
import { ValidationError } from "./../errors/ValidationError.js";

describe("ArticleService", () => { // Conteneur groupant les tests
    it("Doit envoyer ValidationError si le titre est vide", async () => { // test individuel
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

})