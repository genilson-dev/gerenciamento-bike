import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ListMusicosService {
    async execute() {
        const musicos = await prisma.musico.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return musicos;
    }
}

export { ListMusicosService };
