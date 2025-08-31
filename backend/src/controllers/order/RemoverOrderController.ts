import { Request, Response } from "express";
import { RemoverOrderService } from "../../services/order/RemoveOrdemService";

class RemoverOrderController{
    async handle(req: Request, res: Response){
        const order_id = req.query.order_id as string;
        let status: false;
        if (req.query.status === 'false') {
            status = false;
        } else {
            throw new Error("O parâmetro 'status' deve ser 'false'.");
        }
        const removerOrder = new RemoverOrderService();
        const order = await removerOrder.execute({ order_id, status });
        return res.json(order);

    }
}

export {RemoverOrderController}