import { Request, Response } from "express";
import { ListAllProducts } from "../../services/produtos/ListProductService";

class ListAllProductsController {
    async handle(req: Request, res: Response) {
        try {
            const listAllProducts = new ListAllProducts();
            const products = await listAllProducts.execute();
            return res.json(products);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao listar produtos" });
        }
    }
}

export { ListAllProductsController };
