import { prismaDB } from "../../prisma";
import { UserRequest } from "../../interfaces/UserRequest";

class UpDateUserService {
    async execute({ user_id, name, email, password }: UserRequest) {
        // Validação para garantir que user_id não seja undefined
        if (!user_id) {
            throw new Error("ID do usuário é obrigatório");
        }

        const user = await prismaDB.user.update({
            where: {
                id: user_id
            },
            data: {
                name,
                email,
                password
            },
            select: {
                name: true,
                email: true,
                password: false,
                created_at: true,
                update_at: true
            }
        });
        return user;
    }
}
export { UpDateUserService };
