import {Router} from 'express';
import { CreateUserController } from '../controllers/User/CreateUserControllers';
import { ListUsersControllers } from '../controllers/User/ListUsersControllers';
import { UpDateUserController } from '../controllers/User/UpDateUserControllers';
import { DeleUserController } from '../controllers/User/DeleteUserController';
import { LoginUserController } from '../controllers/User/AuthUserLogin';
import { CreateMusicoController } from '../controllers/Musicos/CreateMusicoController';
import { ListMusicosController } from '../controllers/Musicos/ListMusicosController';
import { isAuthenticated, withAuth } from '../middlewares/IsAuthenticated';

const router = Router();

// Requisição para testar se a rota está funcionando ok
router.get('/teste', (req, res) => {
    console.log('Esta funcionando a rota de teste');
    return res.send({
        message: 'Rota de teste funcionando!'
    })
})

// Rotas para usuários
router.post('/users', new CreateUserController().handle);
router.get('/users', isAuthenticated, withAuth(new ListUsersControllers().handle));
router.put('/users/:user_id', isAuthenticated, withAuth(new UpDateUserController().handle));
router.delete("/users/:user_id", isAuthenticated, withAuth(new DeleUserController().handle));
router.post('/login', new LoginUserController().handleLogin);

// Rotas para músicos
router.post('/musicos', new CreateMusicoController().handle);
router.get('/musicos', new ListMusicosController().handle);

export {router};