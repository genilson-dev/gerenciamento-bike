import { Response } from "express";
import { UpDateUserService } from "../../services/User/UpDateUserService";
import { AuthenticatedRequest } from "../../middlewares/IsAuthenticated";

class UpDateUserController{
    async handle(req: AuthenticatedRequest, res: Response){
        const { user_id, name, email, password } = req.body;
        const userService = new UpDateUserService();
        try {
            const newUpUser = await userService.execute({ user_id, name, email, password });
            return res.json(newUpUser);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            } else {
                return res.status(400).json({ error: "Ocorreu um erro desconhecido." });
            }
        }
    }
}

export {UpDateUserController}