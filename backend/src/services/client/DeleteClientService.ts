import { prismaDB } from "../../prisma";
import { DeleteClientRequest } from "../../interfaces/DeleteClientRequest";

class DeleteClientService {
    async execute({ id }: DeleteClientRequest) {
        // Verificar se o cliente tem ordens associadas
        const ordersCount = await prismaDB.order.count({
            where: { client_id: id }
        });

        if (ordersCount > 0) {
            throw new Error("Não é possível excluir cliente com ordens associadas");
        }

        // Verificar se o cliente tem bikes associadas
        const bikesCount = await prismaDB.bike.count({
            where: { owner_id: id }
        });

        if (bikesCount > 0) {
            throw new Error("Não é possível excluir cliente com bikes associadas");
        }

        const client = await prismaDB.client.delete({
            where: { id }
        });
        return client;
    }
}

export { DeleteClientService };
