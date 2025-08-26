import { prismaDB } from "../../prisma";
import { UserRequest } from "../../interfaces/UserRequest";

class DeleteUserService{
    async execute({user_id}:UserRequest){
        const user = await prismaDB.user.delete({
            where:{
                id: user_id
            }
        })
        return user

    }
}

export { DeleteUserService}
