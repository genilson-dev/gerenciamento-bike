import { prismaDB } from "../../prisma";
import { UpdateClientRequest } from "../../interfaces/UpdateClientRequest";

class UpdateClientService {
    async execute({ id, name, email }: UpdateClientRequest) {
        // Verificar se o email já existe em outro cliente
        const existingClient = await prismaDB.client.findFirst({
            where: {
                email,
                NOT: { id }
            }
        });

        if (existingClient) {
            throw new Error("Email já está sendo usado por outro cliente");
        }

        const client = await prismaDB.client.update({
            where: { id },
            data: { 
                name, 
                email,
                update_at: new Date()
            }
        });
        return client;
    }
}

export { UpdateClientService };
