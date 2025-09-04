import { Request, Response } from "express";
import { CreateBikeService } from "../../services/Bikes/CereateBikeService";
class CreateBikeController {
    async handle(req: Request, res: Response) {
        const { model, owner_id } = req.body;
        const createBikeService = new CreateBikeService();
        const bike = await createBikeService.execute({ model, owner_id });
        return res.json(bike);
    }
}
export { CreateBikeController };

