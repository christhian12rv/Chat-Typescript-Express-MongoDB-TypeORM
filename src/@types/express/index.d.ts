import UserInterface from '../../Interfaces/user.interface';

declare global {
	namespace Express {
		interface Request {
			user?: UserInterface
		}
	}
}

export {};