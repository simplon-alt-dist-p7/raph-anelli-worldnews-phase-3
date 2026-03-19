// test : scénario utilisateur
import { test, expect } from "@playwright/test";

test("Test sur le chargement de la page d'accueil", async ({ page }) => {
    // page correspond à un navigateur contrôlé automatiquement
    await page.goto("http://localhost:5173");   // L'utilisateur ouvre le site

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

test("Test sur la recherche d'article avec un mot clé", async ({page}) =>{
    await page.goto("http://localhost:5173");

    // L'utilisateur remplit la barre de recherche avec le mot "Technologie"
    await page.fill('input[placeholder="Rechercher un article..."]', "Technologie");

    /**
     * On récupère le "button" avec le nom "Rechercher"
     * L'utilisateur clic sur le bouton
     */
    await page.getByRole("button", { name: "Rechercher" }).click();

    // On récupère tous les titres de la class "article-title" qui ont le texte "Technologie" obtenues avec la recherche
    const results = page.locator(".article-title").filter({ hasText: "Technologie" });

    // On vérifie le premier résultat et on s'attend à ce qu'il soit visible à l'écran
    await expect(results.first()).toBeVisible();
});