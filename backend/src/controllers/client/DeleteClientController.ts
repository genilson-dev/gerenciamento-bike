import { Request, Response } from "express";
import { DeleteClientService } from "../../services/client/DeleteClientService";

class DeleteClientController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: "ID do cliente é obrigatório" });
            }

            const deleteClientService = new DeleteClientService();
            const client = await deleteClientService.execute({ id });

            return res.json({ message: "Cliente excluído com sucesso", client });
        } catch (error: any) {
            console.error("Erro ao excluir cliente:", error);
            return res.status(400).json({ error: error.message || "Erro interno do servidor" });
        }
    }
}

export { DeleteClientController };
