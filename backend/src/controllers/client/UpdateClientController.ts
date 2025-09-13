import { Request, Response } from "express";
import { UpdateClientService } from "../../services/client/UpdateClientService";

class UpdateClientController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email } = req.body;

            if (!id) {
                return res.status(400).json({ error: "ID do cliente é obrigatório" });
            }

            if (!name || !email) {
                return res.status(400).json({ error: "Nome e email são obrigatórios" });
            }

            const updateClientService = new UpdateClientService();
            const client = await updateClientService.execute({ id, name, email });

            return res.json(client);
        } catch (error: any) {
            console.error("Erro ao atualizar cliente:", error);
            return res.status(500).json({ error: error.message || "Erro interno do servidor" });
        }
    }
}

export { UpdateClientController };
