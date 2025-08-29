import { Request, Response } from 'express';
import { CreateMusicoService } from '../../services/Musicos/CreateMusicoService';

class CreateMusicoController {
    async handle(req: Request, res: Response) {
        try {
            const {
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
            } = req.body;

            const createMusicoService = new CreateMusicoService();

            const musico = await createMusicoService.execute({
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
            });

            return res.status(201).json(musico);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export { CreateMusicoController };
