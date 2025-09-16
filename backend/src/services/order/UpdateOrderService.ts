import { prismaDB } from "../../prisma";
import { UpdateOrderRequest } from "../../interfaces/UpdateOrderRequest";

class UpdateOrderService {
    async execute({ id, status, client_id, bike_id }: UpdateOrderRequest) {
        const updateData: any = {
            status: String(status),
            update_at: new Date()
        };

        if (client_id) {
            updateData.client_id = String(client_id);
        }

        if (bike_id) {
            updateData.bike_id = String(bike_id);
        }

        const order = await prismaDB.order.update({
            where: { id },
            data: updateData,
            include: {
                client: true,
                user: true,
                bike: true,
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        return order;
    }
}

export { UpdateOrderService };

