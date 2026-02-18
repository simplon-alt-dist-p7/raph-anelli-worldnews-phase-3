import type { Request, Response, NextFunction } from "express";
import { geminiService } from "../services/gemini.service.js";

class GeminiController {

    async generateTitle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { body } = req.body as { body: string };

            const generatedTitle = await geminiService.generateTitle(body);

            res.status(200).json({
                message: "Titre généré avec succès",
                data: generatedTitle,
            });
        } catch (error) {
            next(error);
        }
    }

    async generateSubtitle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { title, body } = req.body as { title: string,body: string };

            const generatedSubtitle = await geminiService.generateSubtitle(title, body);

            res.status(200).json({
                message: "Sous-titre généré avec succès",
                data: generatedSubtitle,
            });
        } catch (error) {
            next(error);
        }
    }

    async generateSubhead(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { body } = req.body as { body: string };

            const generatedSubhead = await geminiService.generateSubhead(body);

            res.status(200).json({
                message: "Chapeau généré avec succès",
                data: generatedSubhead,
            });
        } catch (error) {
            next(error);
        }
    }
    
    async generateBody(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { body } = req.body as { body: string };

            const generateBody = await geminiService.generateBody(body);

            res.status(200).json({
                message: "Body corrigé avec succès",
                data: generateBody,
            });
        } catch (error) {
            next(error);
        }
    }

}

export const geminiController = new GeminiController();