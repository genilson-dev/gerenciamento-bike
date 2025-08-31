import { prismaDB } from "../../prisma";
import { ItemRequest } from "../../interfaces/ItemRequest";

class AddItemService{
    async execute({order_id, product_id, quantity}: ItemRequest) {
        const order = await prismaDB.orderItem.create({
            data: {
                order_id: order_id,
                product_id: product_id,
                quantity: quantity
            },
            select: {
                order: true,
                product: true,
                quantity: true
            }
        });
        return order;
    }
}

export {AddItemService}
