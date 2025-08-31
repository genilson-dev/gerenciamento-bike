import { prismaDB } from "../../prisma";
import { ProductRequest } from "../../interfaces/ProductRequest";

class CreateProductService{
    async execute({name, price, category_id}:ProductRequest){
        const product = await prismaDB.product.create({
            data: {
                name: name,
                price: String(price),
                category_id: category_id
            },
            select: {
                id: true,
                name: true,
                price: true,
                category_id: true,
            }
        })
        return product
    }
}

export {CreateProductService}