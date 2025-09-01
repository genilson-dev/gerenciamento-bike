import { prismaDB } from "../../prisma";
import { ItemRequest } from "../../interfaces/ItemRequest";

class RemoverItemService{
    async execute({product_id}: ItemRequest){
        const order = await prismaDB.orderItem.delete({
            where:{
                id: product_id
            },
            select:{
                order_id: true
            }
        })
        return order
    }
}
export {RemoverItemService}

