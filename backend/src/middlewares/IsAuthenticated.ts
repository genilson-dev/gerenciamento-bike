import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

// Estender a interface Request para incluir user_id
interface AuthenticatedRequest extends Request {
    user_id: string;
}

export interface Payload {
    sub: string;
}

export function isAuthenticated(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    // Receber o token
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    
    const [, token] = authToken?.split(" ");
    
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: "JWT_SECRET não configurado" });
    }
    
    try {
        // Validar esse token
        const {sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;
        // Recuperar o id do token e colocar dentro de uma variavel user_id dentro do req
        req.user_id = sub;
        return next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido" });
    }
}


