import { Request, Response } from "express";
import { UpdateBikeService } from "../../services/Bikes/UpdateBikeService";

class UpdateBikeController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { model, owner_id } = req.body;

            if (!id) {
                return res.status(400).json({ error: "ID da bike é obrigatório" });
            }

            if (!model || !owner_id) {
                return res.status(400).json({ error: "Modelo e owner_id são obrigatórios" });
            }

            const updateBikeService = new UpdateBikeService();
            const bike = await updateBikeService.execute({ id, model, owner_id });

            return res.json(bike);
        } catch (error: any) {
            console.error("Erro ao atualizar bike:", error);
            return res.status(400).json({ error: error.message || "Erro interno do servidor" });
        }
    }
}

export { UpdateBikeController };

