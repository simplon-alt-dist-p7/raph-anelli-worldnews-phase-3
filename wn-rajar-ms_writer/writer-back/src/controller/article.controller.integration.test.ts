// describe : conteneur, sert à organiser/regrouper les tests, à structurer et à rendre la lecture claire
// it : test individuel, avec à l'intérieur ce qu'on veut vérifier
// expect : premet la vérification du résultat d'un test
// beforeAll : exécute du code avant tous les tests du fichier
// afterAll : exécute du code après tous les tests du fichier
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { connectDB, AppDataSource } from "../config/database.js";
import request from "supertest";
import { app } from "../index.js";

// Avant les tests, on se connecte à la base de données
beforeAll(async () => {
  await connectDB();
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