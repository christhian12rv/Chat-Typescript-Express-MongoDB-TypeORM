import { Router } from 'express';
import userController from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';

const userRoute = Router();

userRoute.post('/register', userController.register);

userRoute.post('/login', userController.login);

userRoute.get('/:id', authMiddleware.authorizeUserByParams, authMiddleware.authorizeUserByToken, userController.getById);

userRoute.get('/', authMiddleware.authorizeUserByToken, userController.list);

export default userRoute;