import { prismaDB } from "../../prisma";

class ListClientService {
    async execute() {
        const clients = await prismaDB.client.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        
        return clients;
    }
}

export { ListClientService };
