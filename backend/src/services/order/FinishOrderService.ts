import { prismaDB } from "../../prisma";

class FinishOrderService {
    async execute(orderId: string) {
        // Verificar se a ordem existe
        const existingOrder = await prismaDB.order.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (!existingOrder) {
            throw new Error("Ordem não encontrada");
        }

        // Verificar se a ordem já está concluída
        if (existingOrder.status === 'concluido') {
            throw new Error("Esta ordem já está concluída");
        }

        // Verificar se a ordem está cancelada
        if (existingOrder.status === 'cancelado') {
            throw new Error("Não é possível concluir uma ordem cancelada");
        }

        // Atualizar o status para concluído
        const updatedOrder = await prismaDB.order.update({
            where: { id: orderId },
            data: { 
                status: 'concluido',
                update_at: new Date()
            },
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

        return updatedOrder;
    }
}

export { FinishOrderService };

