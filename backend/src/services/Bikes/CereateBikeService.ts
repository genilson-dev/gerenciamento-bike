import { prismaDB } from "../../prisma";
import { BikeRequest } from "../../interfaces/BikeRequest";

class CreateBikeService {
    async execute({ model, owner_id }: BikeRequest) {
        if (!model || !owner_id) {
            throw new Error("model e owner_id são obrigatórios.");
        }

        const bike = await prismaDB.bike.create({
            data: { 
                model: String(model), 
                owner_id: String(owner_id) 
            }
        });
        return bike;
    }
}

export { CreateBikeService };
