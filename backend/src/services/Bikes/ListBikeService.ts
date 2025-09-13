import { prismaDB } from "../../prisma";

class ListBikeService {
    async execute() {
        const bikes = await prismaDB.bike.findMany({
            include: {
                owner: true
            },
            orderBy: {
                model: 'asc'
            }
        });
        
        return bikes;
    }
}

export { ListBikeService };
