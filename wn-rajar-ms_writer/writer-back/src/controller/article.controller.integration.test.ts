// describe : conteneur, sert à organiser/regrouper les tests, à structurer et à rendre la lecture claire
// it : test individuel, avec à l'intérieur ce qu'on veut vérifier
// expect : premet la vérification du résultat d'un test
// beforeAll : exécute du code avant tous les tests du fichier
// afterAll : exécute du code après tous les tests du fichier
// beforeEach : permet d'exécuter quelque chose avant chaque test dans un describe
import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { connectDB, AppDataSource } from "../config/database.js";
import request from "supertest";
import { app } from "../index.js";

// Avant les tests, on se connecte à la base de données
beforeAll(async () => {
    await connectDB();
});

// Suppression de toutes les lignes au dela de celles initialisés au départ
beforeEach(async () => {
    await AppDataSource.query(
        'DELETE FROM "writer"."t_articles" WHERE id > 10'
    );
});

// Après les tests, ferme la connexion
afterAll(async () => {
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }
});

// Premier test simple
describe("Test du endpoint health", () => {     // test de GET /health : on vérifie que la route renvoie le code http 200
    it("Doit renvoyer le status : ok", async () => {
        const response = await request(app).get("/health");

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("ok");
    });
});

// Test d'une première route GET
describe("Test d'intégration : GET /articles/:id ", () => {
    it("Retourne un code 404 si l'article n'existe pas", async () => {
        const response = await request(app).get("/api/articles/999999");

        expect(response.status).toBe(404);
    });

    it("Retourne un article s'il le trouve et un code 200", async () => {
        const response = await request(app).get("/api/articles/1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
    });
});

describe("Test d'intégration : POST /articles", () => {
    it("Teste la création d'un nouvel article avec succès", async () => {
        const newArticle = {
            title: "Article test integration",
            subtitle: "Sous-titre test integration",
            subhead: "Chapeau test integration",
            body: "Contenu test integration",
            categoryId: 1
        };

        const response = await request(app)
            .post("/api/articles")
            .send(newArticle);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveProperty("id");
        expect(response.body.data.title).toBe("Article test integration");
        expect(response.body.data.subtitle).toBe("Sous-titre test integration");
    });
});