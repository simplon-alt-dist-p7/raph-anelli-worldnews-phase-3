// test : scénario utilisateur
import { test, expect } from "@playwright/test";

test("la page d'accueil se charge", async ({ page }) => {
    // page correspond à un navigateur contrôlé automatiquement
    await page.goto("http://localhost:5173");   // On ouvre le site

    // Vérification si la page a bien été chargée avec l'élément en question dans l'URL
    /**
     * Version basique
     * await expect(page).toHaveURL("http://localhost:5173/articles");
     * fonctionne mais trop strict car s'il y a un slash en plus qui apparait à la fin ou un paramètres, le test casse
     * Utilisation d'un regex permet d'être plus flexible
     * 
     * Explication du regex :
     * - "/ ...... /" compare un paterne
     * - ".*" n'importe quoi dans cet emplacement
     * - "\/articles" - le \ permet de prendre en compte le /
     */
    await expect(page).toHaveURL(/.*\/articles/);   // URL prenant en compte /articles avec toutes combinaisons de choses avant et après
});