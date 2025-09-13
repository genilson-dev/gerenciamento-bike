import { prismaDB } from "../../prisma";

class CalculateOrderTotalService {
    async execute(orderId: string) {
        const orderItems = await prismaDB.orderItem.findMany({
            where: { order_id: orderId },
            include: {
                product: true
            }
        });

        let total = 0;
        const itemsWithTotal = orderItems.map(item => {
            const itemPrice = parseFloat(item.product.price) || 0;
            const itemTotal = itemPrice * item.quantity;
            total += itemTotal;

            return {
                ...item,
                itemTotal: itemTotal,
                unitPrice: itemPrice
            };
        });

        return {
            orderId,
            total: total,
            items: itemsWithTotal,
            itemCount: orderItems.length
        };
    }
}

export { CalculateOrderTotalService };
