// describe : conteneur, sert à organiser/regrouper les tests, à structurer et à rendre la lecture claire
// it : test individuel, avec à l'intérieur ce qu'on veut vérifier
// expect : premet la vérification du résultat d'un test
// vi : permet de remplacer des fonctions et/ou des modules par des versions simulées pour les tests
// beforeEach : permet d'exécuter quelque chose avant chaque test dans un describe
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../services/article.service.js", () => {   // On mock le service article
    return {
        articleService: {   // On importe le service mocké
            getArticleById: vi.fn(),
        },
    };
});
import { articleService } from "../services/article.service.js";

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

    it("Test avec id à 0 = retourne une erreur 400", async () => {
        const req = {
            params: { id: "0" }     // On met en paramètre un id = 0
        } as any;

        const res = {   // faux res, 
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as any;

        const next = vi.fn();

        await articleController.getArticle(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith({
            error: "ID d'article invalide",
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("Test de succès - doit retourner un code 200 si l'id de l'article est valide", async () => {
        const req = {
            params: { id: "1" },
        } as any;

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as any;

        const next = vi.fn();

        const mockArticle = {
            id: 1,
            title: "Titre test",
            subtitle: "Sous-titre test",
            subhead: "Chapeau test",
            body: "Contenu test",
            categoryId: 1,
        };

        vi.mocked(articleService.getArticleById).mockResolvedValue(mockArticle as any);

        await articleController.getArticle(req, res, next);

        expect(articleService.getArticleById).toHaveBeenCalledWith(1);  // On s'attends à ce que la fonction a été appelé avec id = 1 et que le parseInt a fonctionné, et que le controller a bien joué son rôle

        expect(res.status).toHaveBeenCalledWith(200);   // On s'attends à un code HTTP 200

        expect(res.json).toHaveBeenCalledWith({data: mockArticle}); // On s'attends à ce que ça renvoie l'article obtenu du service

        expect(next).not.toHaveBeenCalled();
    });
});