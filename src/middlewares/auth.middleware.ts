import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import appDataSource from '../config/data-source';
import logger from '../config/logger';
import User from '../entity/user.entity';
import UserInterface from '../Interfaces/user.interface';

class AuthMiddleware {
	public async authorizeUserByToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const token = req.query.token || req.headers['x-access-token'];

		if (!token) {
			logger.error(`Error on access route ${req.originalUrl}: restricted access`);
			return res.status(401).send({ message: `Error on access route ${req.originalUrl}: restricted access`, });
		}

		const userRepository = appDataSource.getRepository(User);

		try {
			const userToken = jwt.verify(token.toString(), config.jwtSecret) as unknown as UserInterface;
			const user = await userRepository.findOneBy({ id: userToken.id, });
			if (!user)
				return res.status(400).send({ message: 'User not found', });

			req.user = user;

			return next();
		} catch (e) {
			return res.status(401).send({ message: 'Invalid token', });
		}		
	}

	public async authorizeUserByParams(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

		const { id, } = req.params;

		const userRepository = appDataSource.getRepository(User);

		try {
			const user = await userRepository.findOneBy({ id: parseInt(id), });
			if (!user)
				return res.status(400).send({ message: 'User not found', });

			req.userChat = user;

			return next();
		} catch (e) {
			return res.status(401).send({ message: 'Invalid user', });
		}		
	}
}

export default new AuthMiddleware();