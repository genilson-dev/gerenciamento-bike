import { Request, Response } from "express";
import { ListBikeService } from "../../services/Bikes/ListBikeService";

class ListBikeController {
    async handle(req: Request, res: Response) {
        try {
            const listBikeService = new ListBikeService();
            const bikes = await listBikeService.execute();
            return res.json(bikes);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao listar bikes" });
        }
    }
}

export { ListBikeController };
