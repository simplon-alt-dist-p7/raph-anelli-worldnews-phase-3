// describe : conteneur, sert à organiser/regrouper les tests, à structurer et à rendre la lecture claire
// it : test individuel, avec à l'intérieur ce qu'on veut vérifier
// expect : premet la vérification du résultat d'un test
import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../index.js";

// Premier test simple
describe("Test du endpoint health", () => {     // test de GET /health : on vérifie que la route renvoie le code http 200
  it("Doit renvoyer le status : ok", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });
});