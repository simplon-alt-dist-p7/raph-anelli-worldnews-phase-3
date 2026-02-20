// describe : conteneur, sert à organiser/regrouper les tests, à structurer et à rendre la lecture claire
// it : test individuel, avec à l'intérieur ce qu'on veut vérifier
// expect : premet la vérification du résultat d'un test
// vi : permet de remplacer des fonctions et/ou des modules par des versions simulées pour les tests
// beforeEach : permet d'exécuter quelque chose avant chaque test dans un describe
import { describe, it, expect, vi, beforeEach } from "vitest";

import { articleController } from "./article.controller.js";

describe("ArticleController - getArticle", () => {
    it("Si l'ID est manquante, doit retourner une erreur 400 ", async () => {
        const req = {   // on récupère les params de la requête, en recréant uniquement la partie qui nous est utile
            params: {}
        } as any;   // any est là pour simplifier, pour tester la logique, pas Express

        const res = {   // faux res, 
            status: vi.fn().mockReturnThis(),   // Mock de la réponse retourné, mockReturnThis retourne l'objet res quand status est appelé
            json: vi.fn(),
        } as any;

        const next = vi.fn();   // mock de next, afin de vérifier s'il est appelé et avec quel argument

        await articleController.getArticle(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);   // On s'attend à ce que l'erreur 400 soit appelée

        expect(res.json).toHaveBeenCalledWith({     // On s'attend à ce que ce message d'erreur a été appelé
            error: "ID d'article manquant",
        });

        expect(next).not.toHaveBeenCalled();    // On s'attend à ce que 'next' ne soit pas appelé
    });

});