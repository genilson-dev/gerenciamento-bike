import { prismaDB } from "../../prisma";

class ListUsersServices {
    async execute() {
        const users = await prismaDB.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        });

        return users;
    }
}
export { ListUsersServices };
