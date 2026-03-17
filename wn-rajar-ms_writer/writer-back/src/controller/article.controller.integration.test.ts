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

// Test route POST
describe("Test d'intégration : POST /articles", () => {
    it("Teste la création d'un nouvel article avec succès", async () => {
        const newArticle = {
            title: "Article test integration",
            subtitle: "Sous-titre test integration",
            subhead: "Chapeau test integration",
            body: "Contenu test integration",
            categoryId: 1
        };

        // Réponse de la requête
        // On envoie les données de newArticle en POST sur la route '/api/articles' pour créer l'article
        const response = await request(app)
            .post("/api/articles")
            .send(newArticle);

        expect(response.status).toBe(201);  // Réponse status 201 attendu
        expect(response.body).toHaveProperty("data");   // On s'attend que le body a une propriété "data"
        expect(response.body.data).toHaveProperty("id");    // On s'attend à ce que dans data, il y ait une propriété "id"
        // On contrôle le contenu du "title" et du "subtitle" pour voir s'ils sont corrects
        expect(response.body.data.title).toBe("Article test integration");
        expect(response.body.data.subtitle).toBe("Sous-titre test integration");
    });

    it("Test de création d'un article puis voir si on le retrouve en base de données", async () => {
        const newArticle = {
            title: "Second article test integration",
            subtitle: "Second sous-titre test integration",
            subhead: "Second chapeau test integration",
            body: "Second contenu test integration",
            categoryId: 1
        };

        const response = await request(app)
            .post("/api/articles")
            .send(newArticle);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("data");

        const createdId = response.body.data.id;    // On récupère l'id
        expect(createdId).toBeDefined();    // On vérifie qu'il existe bien
        expect(typeof createdId).toBe("number");    // On vérifie que ce soit bien un nombre

        // On voit si on retrouve l'article en base de données via l'id qu'on a récupéré
        const getResponse = await request(app)
            .get(`/api/articles/${createdId}`);

        expect(getResponse.status).toBe(200);
        expect(getResponse.body).toHaveProperty("data");
        expect(getResponse.body.data.title).toBe("Second article test integration");
        expect(getResponse.body.data.subtitle).toBe("Second sous-titre test integration");
    });

    it("Test de création d'un article avec un champ manquant (erreur 400 attendue)", async () => {
        const newArticle = {
            title: "Article test erreur 400",
            subtitle: "",
            subhead: "Article test erreur 400",
            body: "Article test erreur 400",
            categoryId: 1
        };

        const response = await request(app)
            .post("/api/articles")
            .send(newArticle);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toContain("Tous les champs sont requis (title, subtitle, subhead, body, categoryId)");
    });

});

describe("Test d'intégration : PUT /articles/:id", () => {
    // Pour le test
    /* Pour le test de modification d'un article, on va :
        - Créer un nouvel article
        - Le récupérer via un GET
        - Modifier cet article
        Cela permet d'effectuer le test, même si la table de la base de données est vide
    */
    it("Modification avec succès", async () => {
        // Création d'un nouvel article pour le test
        const newArticle = {
            title: "Article à modifier",
            subtitle: "Sous-titre à modifier",
            subhead: "Chapeau à modifier",
            body: "Corps à modifier",
            categoryId: 1
        };

        const response = await request(app)
            .post("/api/articles")
            .send(newArticle);

        // Vérification que la création a bien fonctionnée
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("data");

        const createdId = response.body.data.id;    // On récupère l'id
        expect(createdId).toBeDefined();    // On vérifie qu'il existe bien
        expect(typeof createdId).toBe("number");    // On vérifie que ce soit bien un nombre

        // Eléments d'uptade de l'article
        const updatedArticle = {
            title: "Titre mis à jour",
            subtitle: "Sous-titre mis à jour"
        };

        const updateResponse = await request(app)
            .patch(`/api/articles/${createdId}`)
            .send(updatedArticle);

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body).toHaveProperty("data");
    });

    it("ID article non trouvé pour modificaion", async () => {
        // Eléments d'uptade de l'article
        const updatedArticle = {
            title: "Titre mis à jour",
            subtitle: "Sous-titre mis à jour"
        };

        // Tentative de mise à jour d'un article inexistant
        const updateResponse = await request(app)
            .patch(`/api/articles/9999`)
            .send(updatedArticle);

        expect(updateResponse.status).toBe(404);
        expect(updateResponse.body).toEqual({ error: "Article non trouvé"});
    });

    it("ID invalide pour modification", async () => {
        // Eléments d'uptade de l'article
        const updatedArticle = {
            title: "Titre mis à jour",
            subtitle: "Sous-titre mis à jour"
        };

        // Tentative de mise à jour avec un ID invalide
        const updateResponse = await request(app)
            .patch(`/api/articles/0`)
            .send(updatedArticle);

        expect(updateResponse.status).toBe(400);
        expect(updateResponse.body).toEqual({ error: "ID d'article invalide"});
    });
})