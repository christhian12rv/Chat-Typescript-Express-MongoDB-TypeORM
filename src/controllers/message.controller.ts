import { Request, Response } from 'express';
import logger from '../config/logger';
import BadRequestError from '../errors/BadRequestError';
import BadRequestMultipleErrors from '../errors/BadRequestMultipleErrors';
import messageService from '../services/message.service';

class MessageController {
	public async send(req: Request, res: Response): Promise<Response> {
		logger.info(`Calling ${req.originalUrl}`);

		const { text, } = req.body;
		const { id, } = req.params; 

		const user = req.user;

		try {
			const messageResponse = await messageService.send(text, user.id, parseInt(id));

			logger.info(`Message sent to ${messageResponse.receiver.username} successfully`);
			return res.status(200).send({ message: `Message sent to ${messageResponse.receiver.username} successfully`, data: { message: messageResponse, }, });
		} catch (e) {
			logger.error(e.message);
			if (e instanceof BadRequestMultipleErrors)
				return res.status(e.status).send({ message: e.message, errors: e.errors, });
			if (e instanceof BadRequestError)
				return res.status(e.status).send({ message: 'Occurred an error when sending message', errors: [e.message], });
			
		}
	}

	public async list(req: Request, res: Response): Promise<Response> {
		const userLoggedId = req.user.id;
		const userChatId = req.userChat.id;

		const messages = await messageService.list(userLoggedId, userChatId);
		return res.status(200).send({ message: 'Messages searched successfully', data: { messages, }, });
	}
}

export default new MessageController();