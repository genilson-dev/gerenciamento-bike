import { prismaDB } from "../../prisma";
import { AuthRequest } from "../../interfaces/AuthRequest";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

class LoginUserService{
    async execute({email, password}: AuthRequest){
        const user = await prismaDB.user.findFirst({
            where: {
                email: email
            }
        })
        if (!user){
            throw new Error("Email ou senha nao conferem!");
        }
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch){
            throw new Error("Email ou senha nao conferem");
        }
        const token = sign({
            name: user.name,
            email: user.email
        }, 
        process.env.JWT_SECRET as string,
        {
            subject: user.id,
            expiresIn: '120d'

        })
        return {
            id: user.id,
            name: user.name,
            email:user.email,
            token: token
        }
    }
}

export {LoginUserService}