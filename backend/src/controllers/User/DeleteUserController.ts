import { Request, Response } from "express";
import { DeleteUserService } from "../../services/User/DeleteUserService";

class DeleUserController{
    async handle(req: Request, res: Response){
        const { user_id } = req.params;
        
        // Validação para garantir que user_id não seja undefined
        if (!user_id) {
            return res.status(400).json({ error: "ID do usuário é obrigatório na URL" });
        }
        
        const removerUser = new DeleteUserService();
        try {
            // Preenche os campos obrigatórios de UserRequest com valores vazios, já que só o user_id é necessário para deletar
            const user = await removerUser.execute({ user_id, name: "", email: "", password: "" });
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
export {DeleUserController}