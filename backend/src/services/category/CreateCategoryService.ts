import { prismaDB } from "../../prisma";
import { CategoryRequest } from "../../interfaces/CategoryRequest";

class CreateCategoryService {
    async execute({ name }: CategoryRequest) {
        if (!name) {
            throw new Error("O campo name nao pode ser vacio")
        }
        const category = await prismaDB.category.create({
            data: {
                name: name
            },
            select: {
                id: true,
                name: true,
                created_at: true,
                update_at: true
            }
        })
        return category;
    }
}

export { CreateCategoryService };

