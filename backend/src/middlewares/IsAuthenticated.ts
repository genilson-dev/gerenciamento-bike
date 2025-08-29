import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

// Estender a interface Request para incluir user_id
export interface AuthenticatedRequest extends Request {
    user_id: string;
}

export interface Payload {
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    // Receber o token
    const authToken = req.headers.authorization;
    if (!authToken) {
        res.status(401).end();
        return;
    }
    
    const [, token] = authToken?.split(" ");
    
    if (!process.env.JWT_SECRET) {
        res.status(500).json({ error: "JWT_SECRET não configurado" });
        return;
    }
    
    try {
        // Validar esse token
        const {sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;
        // Recuperar o id do token e colocar dentro de uma variavel user_id dentro do req
        (req as AuthenticatedRequest).user_id = sub;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token inválido" });
        return;
    }
}

// Função helper para converter tipos
export function withAuth<T extends AuthenticatedRequest>(
    handler: (req: T, res: Response, next: NextFunction) => any
) {
    return (req: Request, res: Response, next: NextFunction) => {
        return handler(req as T, res, next);
    };
}


