import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Article } from "../models/article.model.js";
import { Category } from "../models/category.model.js";

dotenv.config();
const isTestEnv = process.env.NODE_ENV === "test";    // Crée un booléen : true si NOD_ENV est égal à test, sinon il sera à false

// Validation des variables d'environnement obligatoires
const requiredEnvVars = [
  "DB_HOST",
  "DB_PORT",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`❌ Variable d'environnement manquante: ${envVar}`);
  }
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: isTestEnv ? process.env.DB_HOST_TEST! : process.env.DB_HOST!,   // Si isEnvTest = true, on utilise la variable de test. Sinon celle de developpement
  port: Number(isTestEnv ? process.env.DB_PORT_TEST : process.env.DB_PORT),
  database: isTestEnv ? process.env.DB_NAME_TEST! : process.env.DB_NAME!,
  username: isTestEnv ? process.env.DB_USER_TEST! : process.env.DB_USER!,
  password: isTestEnv ? process.env.DB_PASSWORD_TEST! : process.env.DB_PASSWORD!,

  // Liste de toutes vos entities
  entities: [Article, Category],

  // Synchronisation automatique des schémas (⚠️ DANGER en production)
  synchronize: false, // Toujours false, utilisez les migrations !

  // Logs des requêtes SQL générées
  logging: true,

  // Pool de connexions
  extra: {
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
});

export const connectDB = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("✅ TypeORM connecté à PostgreSQL avec succès");
  } catch (error) {
    console.error("❌ Erreur de connexion TypeORM:", error);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log("🔒 TypeORM déconnecté");
  }
  process.exit(0);
});

process.on("SIGTERM", async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log("🔒 TypeORM déconnecté");
  }
  process.exit(0);
});
