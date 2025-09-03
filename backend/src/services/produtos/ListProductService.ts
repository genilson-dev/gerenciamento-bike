import { prismaDB } from "../../prisma";
import { ProductRequest } from "../../interfaces/ProductRequest";

class ListProductByCategory{
    async execute({category_id}: ProductRequest){
        const findByCategory = await prismaDB.product.findMany({
            where:{
                category_id
            }
        })
        return findByCategory;
    }
}

export {ListProductByCategory}
