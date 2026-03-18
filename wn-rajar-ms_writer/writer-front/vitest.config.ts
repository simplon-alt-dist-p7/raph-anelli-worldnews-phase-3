// defineConfig : défini une configuration pour les tests effectué avec Vitest dans ce projet
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",   // permet la simulation de navigateur pour les tests
    globals: true,  // permet d'utiliser describe, it et expect sans avoir à les importer
    setupFiles: "./src/setupTests.ts",  // On utilise le fichier setupTests dans tous nos tests
  },
});