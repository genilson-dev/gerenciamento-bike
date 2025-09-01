import { Request, Response } from "express";
import { RemoverItemService } from "../../services/items/RemoverItemService";

class RemoverItemController{
    async handle(req: Request, res:Response){
        const item_id = req.query.item_id as string;

        if (!item_id) {
            return res.status(400).json({ error: "Parâmetro 'item_id' é obrigatório." });
        }

        const removerItem = new RemoverItemService();
        try {
            // Usando a propriedade correta esperada por ItemRequest, que é 'id'
            const item = await removerItem.execute({ id: item_id });
            return res.json(item);
        } catch (error: any) {
            return res.status(500).json({ error: "Erro ao remover o item.", details: error?.message });
        }
    }
}

export { RemoverItemController };
