import {Router} from 'express';
import { CreateUserController } from '../controllers/User/CreateUserControllers';
import { ListUsersControllers } from '../controllers/User/ListUsersControllers';
import { UpDateUserController } from '../controllers/User/UpDateUserControllers';
import { DeleUserController } from '../controllers/User/DeleteUserController';
import { LoginUserController } from '../controllers/User/AuthUserLogin';
import { CreateMusicoController } from '../controllers/Musicos/CreateMusicoController';
import { ListMusicosController } from '../controllers/Musicos/ListMusicosController';
import { isAuthenticated, withAuth } from '../middlewares/IsAuthenticated';
import { CreateProductController } from '../controllers/produtos/CreateProductController';
import { ListAllProductsController } from '../controllers/produtos/ListAllProductsController';
import { CreateCategoryController } from '../controllers/category/CreateCategoryControllers';
import { ListCategoryController } from '../controllers/category/ListCategoryController';
import { ListClientController } from '../controllers/client/ListClientController';
import { ListBikeController } from '../controllers/Bikes/ListBikeController';
import { AddItemController } from '../controllers/items/CreateItemController';
// import { RemoverOrderController } from '../controllers/order/RemoverOrderController';
import { CreateOrderController } from '../controllers/order/CreateOrderController';
import { ListOrderController } from '../controllers/order/ListOrderController';
import { CreateClientController } from '../controllers/client/CreateClientController';
import { CreateBikeController } from '../controllers/Bikes/CretateBikeController';

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

//Produtos
router.get('/products', new ListAllProductsController().handle)
router.post("/product", isAuthenticated, withAuth(new CreateProductController().handleProduct))

//Categorias
router.post("/category", isAuthenticated, withAuth(new CreateCategoryController().handle))
router.get("/categories", new ListCategoryController().handle)

//Items
router.post("/items", isAuthenticated, withAuth(new AddItemController().handle))
// router.delete("/item", isAuthenticated, withAuth(new RemoverOrderController().handle))

// Clientes
router.get("/clients", new ListClientController().handle)
router.post("/client", isAuthenticated, withAuth(new CreateClientController().handle))

//Orders
router.get("/orders", isAuthenticated, withAuth(new ListOrderController().handle))
router.post("/order", isAuthenticated, withAuth(new CreateOrderController().handle))
// router.delete("/order", isAuthenticated, withAuth(new RemoverOrderController().handle))

//Bikes
router.get("/bikes", new ListBikeController().handle)
router.post("/bike", isAuthenticated, withAuth(new CreateBikeController().handle))
export {router};