import { prismaDB } from "../../prisma";
import { OrderRequest } from "../../interfaces/OrderRequest";

class CreateOrderService {
    async execute({ status, client_id, user_id, bike_id }: OrderRequest) {
        if (!client_id || !user_id || !bike_id) {
            throw new Error("client_id, user_id e bike_id são obrigatórios.");
        }

        const order = await prismaDB.order.create({
            data: { status, client_id, user_id, bike_id }
        });
        return order;
    }
}
export { CreateOrderService };