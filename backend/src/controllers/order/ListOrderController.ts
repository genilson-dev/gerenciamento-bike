import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/ListOrderService";

class ListOrderController {
    async handle(req: Request, res: Response) {
        try {
            const listOrderService = new ListOrderService();
            const orders = await listOrderService.execute();
            return res.json(orders);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao listar ordens" });
        }
    }
}

export { ListOrderController };
