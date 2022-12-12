import { Request, Response } from 'express';
import BadRequestError from '../errors/BadRequestError';
import BadRequestMultipleErrors from '../errors/BadRequestMultipleErrors';
import logger from '../config/logger';
import userService from '../services/user.service';

class UserController {
	public async register(req: Request, res: Response): Promise<Response> {
		logger.info(`Calling ${req.originalUrl}`);

		const { username, password, avatar, } = req.body;

		try {
			const userResponse = await userService.register(username, password, avatar);

			logger.info('User created successfully');
			return res.status(201).send({ message: 'User created successfully', data: { user: userResponse, }, });
		} catch (e) {
			logger.error(e.message);
			if (e instanceof BadRequestMultipleErrors)
				return res.status(e.status).send({ message: e.message, errors: e.errors, });
			else if (e instanceof BadRequestError)
				return res.status(e.status).send({ message: 'Occurred an error when creating user', errors: [e.message], });
		}
	}

	public async login(req: Request, res: Response) : Promise<Response> {
		logger.info(`Calling ${req.originalUrl}`);

		const { username, password, } = req.body;

		try {
			const serviceResponse = await userService.login(username, password);

			logger.info('User authenticated successfully');
			return res.status(200).send({ message: 'User authenticated successfully', data: serviceResponse, });
		} catch (e) {
			logger.error(e.message);
			if (e instanceof BadRequestError)
				return res.status(e.status).send({ message: 'Occurred an error when authenticate user', errors: [e.message], });
		}
	}

	public async getById(req: Request, res: Response): Promise<Response> {
		logger.info(`Calling ${req.originalUrl}`);

		const userChat = req.userChat;

		logger.info('User searched successfully');
		return res.status(200).send({ message: 'User searched successfully', data: { user: userChat, }, });
	}

	public async list(req: Request, res: Response): Promise<Response> {
		logger.info(`Calling ${req.originalUrl}`);

		const user = req.user;

		const users = await userService.list(user.id);

		logger.info('Users searched successfully');
		return res.status(200).send({ message: 'Users searched successfully', data: { users, }, });
	}
}

export default new UserController();