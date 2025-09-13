import { Request, Response } from "express";
import { ListClientService } from "../../services/client/ListClientService";

class ListClientController {
    async handle(req: Request, res: Response) {
        try {
            const listClientService = new ListClientService();
            const clients = await listClientService.execute();
            return res.json(clients);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao listar clientes" });
        }
    }
}

export { ListClientController };
