import { Request, Response, NextFunction } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  // Implementação básica - você pode personalizar conforme necessário
  next();
}