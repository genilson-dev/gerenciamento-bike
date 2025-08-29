import { Request, Response } from 'express';
import { ListMusicosService } from '../../services/Musicos/ListMusicosService';

class ListMusicosController {
    async handle(req: Request, res: Response) {
        try {
            const listMusicosService = new ListMusicosService();
            const musicos = await listMusicosService.execute();

            return res.json(musicos);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export { ListMusicosController };
