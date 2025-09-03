import { prismaDB } from "../../prisma";
import { ClientRequest } from "../../interfaces/ClientRequest";


class CreateClientService {
    async execute({ name, email }: ClientRequest) {
        const client = await prismaDB.client.create({
            data: { name, email }
        });
        return client;
    }
}



export { CreateClientService };


