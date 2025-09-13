import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";
import { AuthenticatedRequest } from "../../middlewares/IsAuthenticated";

class CreateOrderController {
    async handle(req: AuthenticatedRequest, res: Response) {
        const { status, client_id, bike_id } = req.body;
        const { user_id } = req;
        const createOrderService = new CreateOrderService();
        const order = await createOrderService.execute({ status, client_id, user_id, bike_id });
        return res.json(order);
    }
}

export { CreateOrderController };

