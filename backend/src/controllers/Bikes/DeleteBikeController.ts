import { Request, Response } from "express";
import { DeleteBikeService } from "../../services/Bikes/DeleteBikeService";

class DeleteBikeController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: "ID da bike é obrigatório" });
            }

            const deleteBikeService = new DeleteBikeService();
            const bike = await deleteBikeService.execute({ id });

            return res.json({ message: "Bike excluída com sucesso", bike });
        } catch (error: any) {
            console.error("Erro ao excluir bike:", error);
            return res.status(400).json({ error: error.message || "Erro interno do servidor" });
        }
    }
}

export { DeleteBikeController };

