import { Request, Response } from "express";
import { UpdateOrderService } from "../../services/order/UpdateOrderService";

class UpdateOrderController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { status, client_id, bike_id } = req.body;

            if (!id) {
                return res.status(400).json({ error: "ID da ordem é obrigatório" });
            }

            if (!status) {
                return res.status(400).json({ error: "Status é obrigatório" });
            }

            const updateOrderService = new UpdateOrderService();
            const order = await updateOrderService.execute({ 
                id, 
                status, 
                client_id, 
                bike_id 
            });

            return res.json(order);
        } catch (error) {
            console.error("Erro ao atualizar ordem:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}

export { UpdateOrderController };
