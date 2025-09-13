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

class ListAllProducts{
    async execute(){
        const products = await prismaDB.product.findMany({
            include: {
                category: true
            },
            orderBy: {
                name: 'asc'
            }
        })
        return products;
    }
}

export {ListProductByCategory, ListAllProducts}
