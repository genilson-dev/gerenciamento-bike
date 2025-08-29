import {Request, Response} from 'express';
import { CreateProductService } from '../../services/produtos/CreateProductService';

class CreateProductController{
    async handleProduct(req:Request, res: Response){
        const {name, price, category_id} = req.body;
        const newProduct = new CreateProductService();
        const product = await newProduct.execute({
            name,
            price, 
            category_id
        }) 
        return res.json(product)
    }
}

export {CreateProductController}
