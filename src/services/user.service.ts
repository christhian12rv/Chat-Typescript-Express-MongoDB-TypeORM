import { Equal,  Not } from 'typeorm';
import appDataSource from '../config/data-source';
import User from '../entity/user.entity';
import BadRequestError from '../errors/BadRequestError';
import BadRequestMultipleErrors from '../errors/BadRequestMultipleErrors';
import UserInterface from '../Interfaces/user.interface';
import validate from '../utils/validate';
import messageService from './message.service';

class UserService {
	public async register(username: string, password: string, avatar: string): Promise<UserInterface> {
		const userRepository = appDataSource.getRepository(User);

		const user = new User();
		user.username = username;
		user.password = password;
		user.avatar = avatar;

		const errors = await validate(user);
		
		if (errors.length > 0)
			throw new BadRequestMultipleErrors('Occurred some errors when creating users', errors);

		try {
			await userRepository.save(user);
			return {
				id: user.id,
				username: user.username,
				password: user.password,
				avatar: user.avatar,
			};
		} catch (e) {
			throw new BadRequestError('The username already exists');
		}
	}

	public async login(username: string, password: string) : Promise<object> {
		const userRepository = appDataSource.getRepository(User);

		const user = await userRepository.findOneBy({ username, });
		if (!user)
			throw new BadRequestError('User not found');

		const validPassword = await user.comparePasswords(password);
		if (!validPassword)
			throw new BadRequestError('Incorrect password');

		return {
			user: {
				id: user.id,
				username: user.username,
				password: user.password,
				avatar: user.avatar,
			},
			token: user.generateToken(),
		};
	}

	public async list(id: number): Promise<UserInterface[]> {
		const userRepository = appDataSource.getRepository(User);

		let users = await userRepository.find({ 
			where: {
				id: Not(Equal(id)),
			},
		}) as UserInterface[];

		users = (await Promise.all(users.map(async u => {
			const messages = await messageService.list(id, u.id);

			if (messages.length > 0)
				return { ...u, lastMessage: messages[0], };
		}))).filter(u => !!u);

		return users;
	}
	
}

export default new UserService();