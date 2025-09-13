import { prismaDB } from "../../prisma";

class ListCategoryService {
    async execute() {
        const categories = await prismaDB.category.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        
        return categories;
    }
}

export { ListCategoryService };
