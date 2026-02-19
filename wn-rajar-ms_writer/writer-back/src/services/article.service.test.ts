// describe : conteneur, sert à organiser/regrouper les tests, à structurer et à rendre la lecture claire
// it : test individuel, avec à l'intérieur ce qu'on veut vérifier
// expect : premet la vérification du résultat d'un test
import { describe, it, expect } from "vitest";
import { articleService } from "./article.service.js";
import { ValidationError } from "./../errors/ValidationError.js";



describe("ArticleService", () => {
    it("Doit envoyer ValidationError si le titre est vide", async () => {
        const invalidData = {
            title: "",
            subtitle: "Sous-titre test",
            subhead: "Chapeau test",
            body: "Corps de test test",
            categoryId: 1,
        };

        // await expect(
        //     articleService.createArticle(invalidData)
        // ).rejects.toThrow(ValidationError);

        // await expect(
        //     articleService.createArticle(invalidData)
        // ).rejects.toThrow("Le titre est requis");

        const promise = articleService.createArticle(invalidData);

        await expect(promise).rejects.toThrow(ValidationError);
        await expect(promise).rejects.toThrow("Le titre est requis");



    });

})