import { prismaDB } from "../../prisma";
import { hash } from "bcryptjs";
import { UserRequest } from "../../interfaces/UserRequest";

class CreateUserServices {
    async execute({ name, email, password }: UserRequest) {
        // Verificar se o usuário existe
        const userAlreadyExists = await prismaDB.user.findFirst({
            where: { email },
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        // Criptografar a senha
        const passwordHash = await hash(password, 8);

        // Criar o usuário
        const user = await prismaDB.user.create({
            data: {
                name,
                email,
                password: passwordHash,
            },
        });

        return user;
    }
}
export { CreateUserServices };
