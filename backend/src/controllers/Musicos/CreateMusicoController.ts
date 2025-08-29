import { Request, Response } from 'express';
import { CreateMusicoService } from '../../services/Musicos/CreateMusicoService';

class CreateMusicoController {
    async handle(req: Request, res: Response) {
        try {
            const {
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
            } = req.body;

            const createMusicoService = new CreateMusicoService();

            const musico = await createMusicoService.execute({
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
