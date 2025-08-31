import { Request, Response } from "express";
// import { AddItemService } from "../../services/items/AddItemService";
import { AddItemService } from "../../services/items/CreateItemService";

class AddItemController {
    async handle(req: Request, res: Response) {
        const { order_id, quantity, product_id } = req.body;
        const addItemService = new AddItemService();
        try {
            const newItem = await addItemService.execute({
                order_id,
                quantity,
                product_id
            });
            return res.json(newItem);
        } catch (error: any) {
            return res.status(500).json({ error: "Erro ao adicionar item", details: error?.message || String(error) });
        }
    }
}

export {AddItemController}