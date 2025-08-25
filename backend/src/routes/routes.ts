import {Router} from 'express';
import { CreateUserController } from '../controllers/User/CreateUserControllers';
import { ListUsersControllers } from '../controllers/User/ListUsersControllers';


const router = Router();

// Requisição para testar se a rota está funcionando ok
router.get('/teste', (req, res) => {
    console.log('Esta funcionando a rota de teste');
    return res.send({
        message: 'Rota de teste funcionando!'
    })
})

// Requisição para criar um usuário
router.post('/users', new CreateUserController().handle);
router.get('/users', new ListUsersControllers().handle);

export {router};