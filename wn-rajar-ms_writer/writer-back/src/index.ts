import "reflect-metadata";
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import routes from "./routes/index.js";
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

export const app = express();   // export pour pouvoir l'utiliser dans les tests
const PORT = process.env.PORT;

// Configuration CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // ou FRONT_URL selon ce que tu as dans ton .env
    // origin: ["http://localhost:5173", "http://localhost:5174", "https://votredomaine.com", "http://reader-front:5174"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Bienvenue sur l'API wm-rajar-ms_writer",
    status: "running",
  });
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Impossible de démarrer le serveur:", error);
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== "test") {  // On vérifie qu'on n'est pas dans un environnement de test avant de lancer le serveur
  startServer();
}