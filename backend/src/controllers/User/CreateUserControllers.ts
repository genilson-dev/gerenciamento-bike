import { Request, Response } from 'express';
import { CreateUserServices } from './../../services/User/CreateUserServices';
class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const createUserService = new CreateUserServices();

        // 'user' não existe na tipagem padrão do Request, mas é adicionado via middleware de autenticação
        const user = await createUserService.execute({
            user_id: (req as any).user?.id, // Adiciona o user_id conforme requerido pelo tipo UserRequest
            name,
            email,
            password,
        });

        return res.json(user);
    }
}
export { CreateUserController };

