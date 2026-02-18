import { Router } from "express";
import { geminiController } from "../controller/gemini.controller.js";

const router = Router();

router.post('/generate-titre', (req, res, next) =>
    geminiController.generateTitle(req, res, next)
);

router.post('/generate-sous-titre', (req, res, next) =>
    geminiController.generateSubtitle(req, res, next)
);

router.post('/generate-chapeau', (req, res, next) =>
    geminiController.generateSubhead(req, res, next)
);

router.post('/generate-body', (req, res, next) =>
    geminiController.generateBody(req, res, next)
);

export default router;