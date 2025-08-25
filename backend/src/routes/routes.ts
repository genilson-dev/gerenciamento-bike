import {Router} from 'express';
import { CreateUserController } from '../controllers/User/CreateUserControllers';


const router = Router();

// Requisição para testar se a rota está funcionando ok
router.get('/teste', (req, res) => {
    console.log('Esta funcionando a rota de teste');
    return res.send({
        message: 'Rota de teste funcionando!'
    })
})

router.post('/users', new CreateUserController().handle)

export {router};