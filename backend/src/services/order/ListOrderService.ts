import { prismaDB } from "../../prisma";

class ListOrderService {
    async execute() {
        const orders = await prismaDB.order.findMany({
            include: {
                client: true,
                user: true,
                bike: true,
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });
        
        return orders;
    }
}

export { ListOrderService };
