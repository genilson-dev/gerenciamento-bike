import { Request, Response } from "express";
import { DeleteUserService } from "../../services/User/DeleteUserService";

class DeleUserController{
    async handle(req: Request, res: Response){
        const user_id = req.query.user_id as string;
        const removerUser = new DeleteUserService();
        try {
            const user = await removerUser.execute({ user_id, name: "", email: "", password: "" });
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
export {DeleUserController}