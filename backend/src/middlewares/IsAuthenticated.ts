import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Payload } from "../interfaces/payload";

export function isAuthenticated(req: Request, res: Response,next: NextFunction){
    // Recebendo o token
    const authToken = req.headers.authorization;
    if(!authToken){
        return res.status(401).json({message: "Token missing"});
    }
    const [, token] = authToken.split(" ");
    // Validando o token
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ message: "JWT secret not configured" });
        }
        const { sub } = verify(token, jwtSecret) as Payload;
        req.user_id = sub;
        return next();
    } catch (err) {
        return res.status(401).end({message: "Invalid token"});
    }
}

