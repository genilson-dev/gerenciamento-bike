import { prismaDB } from "../../prisma";
import { OrderRequest } from "../../interfaces/OrderRequest";

class UpDateUserService {
    async execute({ user_id, name, email, password }: OrderRequest) {
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
                createdAt: true,
            }
        });
        return user;
    }
}
export { UpDateUserService };
