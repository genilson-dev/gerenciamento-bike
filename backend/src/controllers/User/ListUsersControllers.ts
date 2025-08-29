import { Response } from 'express';
import { ListUsersServices } from '../../services/User/ListUsersServices';
import { AuthenticatedRequest } from '../../middlewares/IsAuthenticated';

class ListUsersControllers {
    async handle(req: AuthenticatedRequest, res: Response) {
        const listUsersServices = new ListUsersServices();

        const user = await listUsersServices.execute();

        return res.json(user);
    }
}   
export { ListUsersControllers };
