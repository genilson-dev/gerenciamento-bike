import { Request, Response } from "express";
import { CreateClientService } from "../../services/client/CreateClientServer";


class CreateClientController {
    async handle(req: Request, res: Response) {
        const { name, email } = req.body;
        const createClientService = new CreateClientService();
        const client = await createClientService.execute({ name, email });
        return res.json(client);
    }
}
export { CreateClientController };


