import { Request, Response } from "express";
import { LoginUserService } from "../../services/User/AuthUserLogin";


class LoginUserController {
    async handleLogin(req: Request, res: Response){
        const {email, password} = req.body;
        const loginUser = new LoginUserService();
        const login = await loginUser.execute({email,password});
        return res.json(login)
    }
}

export {LoginUserController}
