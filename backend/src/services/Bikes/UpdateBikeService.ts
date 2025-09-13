import { prismaDB } from "../../prisma";
import { UpdateBikeRequest } from "../../interfaces/UpdateBikeRequest";

class UpdateBikeService {
    async execute({ id, model, owner_id }: UpdateBikeRequest) {
        if (!model || !owner_id) {
            throw new Error("Modelo e owner_id são obrigatórios");
        }

        // Verificar se o cliente (owner) existe
        const clientExists = await prismaDB.client.findUnique({
            where: { id: owner_id }
        });

        if (!clientExists) {
            throw new Error("Cliente não encontrado");
        }

        const bike = await prismaDB.bike.update({
            where: { id },
            data: { 
                model: String(model), 
                owner_id: String(owner_id),
                update_at: new Date()
            }
        });
        return bike;
    }
}

export { UpdateBikeService };
