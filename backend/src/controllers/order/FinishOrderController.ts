import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController {
    async handle(req: Request, res: Response) {
        try {
            const { orderId } = req.params;

            if (!orderId) {
                return res.status(400).json({ error: "ID da ordem é obrigatório" });
            }

            const finishOrderService = new FinishOrderService();
            const order = await finishOrderService.execute(orderId);

            return res.json({ 
                message: "Ordem concluída com sucesso", 
                order 
            });
        } catch (error: any) {
            console.error("Erro ao finalizar ordem:", error);
            return res.status(400).json({ error: error.message || "Erro interno do servidor" });
        }
    }
}

export { FinishOrderController };

