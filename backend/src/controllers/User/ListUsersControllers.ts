import { Request, Response } from 'express';
import { ListUsersServices } from '../../services/User/ListUsersServices';

class ListUsersControllers {
    async handle(req: Request, res: Response) {
        const listUsersServices = new ListUsersServices();

        const user = await listUsersServices.execute();

        return res.json(user);
    }
}   
export { ListUsersControllers };
