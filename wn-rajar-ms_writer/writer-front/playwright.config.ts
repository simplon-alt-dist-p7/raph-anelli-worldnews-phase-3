/*
Fichier de configuration pour Playwright permettant de :
- regarder uniquement les tests dans le dossier './tests'
- ignorer le dossier /src et les autres tests React
Cela permet d'éviter les erreurs de lecture CSS et crée une séparation propres des tests
*/
import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests'
});