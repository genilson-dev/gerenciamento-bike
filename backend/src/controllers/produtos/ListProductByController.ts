import { Request, Response } from "express";
import { ListProductByCategory } from "../../services/produtos/ListProductService";


class ListProductByCategoryController {
    async handle(req: Request, res: Response){
        const category_id = req.query.category_id as string;

        const listCategory = new ListProductByCategory();
        // Corrigindo para passar um objeto que contenha as propriedades esperadas por ProductRequest
        const product = await listCategory.execute({ name: "", price: 0, category_id });

        return res.json(product);
    }
}
