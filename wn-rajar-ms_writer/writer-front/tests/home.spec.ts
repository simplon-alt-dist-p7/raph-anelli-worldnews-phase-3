// test : scénario utilisateur
import { test, expect } from "@playwright/test";

test("la page d'accueil se charge", async ({ page }) => {
    // page correspond à un navigateur contrôlé automatiquement
    await page.goto("http://localhost:5173");   // On ouvre le site
    await expect(page).toHaveURL("http://localhost:5173/articles");  // Vérifie que la page a bien été chargée
});