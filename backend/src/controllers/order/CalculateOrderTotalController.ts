import { Request, Response } from "express";
import { CalculateOrderTotalService } from "../../services/order/CalculateOrderTotalService";

class CalculateOrderTotalController {
    async handle(req: Request, res: Response) {
        try {
            const { orderId } = req.params;

            if (!orderId) {
                return res.status(400).json({ error: "ID da ordem é obrigatório" });
            }

            const calculateOrderTotalService = new CalculateOrderTotalService();
            const result = await calculateOrderTotalService.execute(orderId);

            return res.json(result);
        } catch (error: any) {
            console.error("Erro ao calcular total da ordem:", error);
            return res.status(500).json({ error: error.message || "Erro interno do servidor" });
        }
    }
}

export { CalculateOrderTotalController };
