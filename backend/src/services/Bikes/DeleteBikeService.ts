import { prismaDB } from "../../prisma";
import { DeleteBikeRequest } from "../../interfaces/DeleteBikeRequest";

class DeleteBikeService {
    async execute({ id }: DeleteBikeRequest) {
        // Verificar se a bike tem ordens associadas
        const ordersCount = await prismaDB.order.count({
            where: { bike_id: id }
        });

        if (ordersCount > 0) {
            throw new Error("Não é possível excluir bike com ordens associadas");
        }

        const bike = await prismaDB.bike.delete({
            where: { id }
        });
        return bike;
    }
}

export { DeleteBikeService };

