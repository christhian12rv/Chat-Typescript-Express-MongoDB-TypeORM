import { Router } from 'express';
import messageController from '../controllers/message.controller';
import authMiddleware from '../middlewares/auth.middleware';

const messageRoute = Router();

messageRoute.post('/:id', authMiddleware.authorizeUserByToken, messageController.send);

export default messageRoute;