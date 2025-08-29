import { PrismaClient } from '@prisma/client';
import { MusicoRequest } from '../../interfaces/MusicoRequest';

const prisma = new PrismaClient();

class CreateMusicoService {
    async execute({
        name,
        sexo,
        encarregado_local,
        encarregado_regional,
        instrutor,
        examinadora,
        aluno,
        ensaios,
        rjm,
        cultos_oficiais,
        oficializado,
        possui_instrumento_proprio,
        instrumento,
        tonalidade
    }: MusicoRequest) {
        
        // Verificar se já existe um músico com o mesmo nome
        const musicoExistente = await prisma.musico.findFirst({
            where: {
                name: name
            }
        });

        if (musicoExistente) {
            throw new Error('Já existe um músico com este nome');
        }

        // Criar o músico
        const musico = await prisma.musico.create({
            data: {
                name,
                sexo,
                encarregado_local,
                encarregado_regional,
                instrutor,
                examinadora,
                aluno,
                ensaios,
                rjm,
                cultos_oficiais,
                oficializado,
                possui_instrumento_proprio,
                instrumento: instrumento ?? "",
                tonalidade: tonalidade ?? ""
            }
        });

        return musico;
    }
}

export { CreateMusicoService };
