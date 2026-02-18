import { Router } from "express";
import articleRoutes from "../routes/article.route.js";
import categoryRoutes from "../routes/category.route.js";
import geminiRoutes from "../routes/gemini.route.js";

const router = Router();

router.use("/articles", articleRoutes);
router.use("/categories", categoryRoutes);
router.use("/gemini", geminiRoutes);

export default router;
