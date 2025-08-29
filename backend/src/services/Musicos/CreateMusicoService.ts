import { PrismaClient } from '@prisma/client';
import { MusicoRequest } from '../../interfaces/MusicoRequest';

const prisma = new PrismaClient();

class CreateMusicoService {
    async execute({
        name,
        sexo,
        status_aluno,
        status_ensaios,
        status_rjm,
        status_cultos_oficiais,
        status_oficializado,
        organista,
        organista_aluna,
        organista_rjm,
        organista_cultos_oficiais,
        organista_oficializada,
        possui_instrumento_proprio,
        instrumento,
        tonalidade,
        encarregado_local,
        encarregado_regional,
        instrutor,
        examinadora
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
                status_aluno,
                status_ensaios,
                status_rjm,
                status_cultos_oficiais,
                status_oficializado,
                organista,
                organista_aluna,
                organista_rjm,
                organista_cultos_oficiais,
                organista_oficializada,
                possui_instrumento_proprio,
                instrumento,
                tonalidade,
                encarregado_local,
                encarregado_regional,
                instrutor,
                examinadora
            }
        });

        return musico;
    }
}

export { CreateMusicoService };
