import {Router} from 'express';
import { CreateUserController } from '../controllers/User/CreateUserControllers';
import { ListUsersControllers } from '../controllers/User/ListUsersControllers';
import { UpDateUserController } from '../controllers/User/UpDateUserControllers';
import { DeleUserController } from '../controllers/User/DeleteUserController';
import { LoginUserController } from '../controllers/User/AuthUserLogin';
import { isAuthenticated } from '../middlewares/IsAuthenticated';

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
router.get('/users',isAuthenticated, new ListUsersControllers().handle);
router.put('/users/:user_id',isAuthenticated, new UpDateUserController().handle)
router.delete("/users/:user_id",isAuthenticated, new DeleUserController().handle)
router.post('/login', new LoginUserController().handleLogin)

export {router};