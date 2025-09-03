import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";


class CreateOrderController {
    async handle(req: Request, res: Response) {
        const { order_id, status, client_id, user_id, bike_id } = req.body;
        const createOrderService = new CreateOrderService();
        const order = await createOrderService.execute({ order_id, status, client_id, user_id, bike_id });
        return res.json(order);
    }
}

export { CreateOrderController };

