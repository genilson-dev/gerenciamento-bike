import { prismaDB } from "../../prisma";
import { OrderRequest } from "../../interfaces/OrderRequest";

class CreateOrderService {
    async execute({ status, client_id, user_id, bike_id }: OrderRequest) {
        const order = await prismaDB.order.create({
            data: { 
                status: String(status), 
                client_id: String(client_id), 
                user_id: String(user_id), 
                bike_id: String(bike_id) 
            }
        });
        return order;
    }
}
export { CreateOrderService };