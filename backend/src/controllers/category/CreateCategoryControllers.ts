import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController{
    async handle(req:Request, res:Response){
        const {name} = req.body;
        const categoryService = new CreateCategoryService();
        const category = await categoryService.execute({
            name
        })
        return res.json(category)

    }
}

export {CreateCategoryController}