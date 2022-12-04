import appDataSource from '../config/data-source';
import User from '../entity/user.entity';
import BadRequestError from '../errors/BadRequestError';
import BadRequestMultipleErrors from '../errors/BadRequestMultipleErrors';
import UserInterface from '../Interfaces/user.interface';
import validate from '../utils/validate';

class UserService {
	public async register(username: string, password: string, avatar: string): Promise<UserInterface> {
		const userRepository = appDataSource.getRepository(User);

		const user = new User();
		user.username = username;
		user.password = password;
		user.avatar = avatar;

		const errors = await validate(user);
		
		if (errors.length > 0)
			throw new BadRequestMultipleErrors('Ocurred some errors when creating users', errors);

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
}

export default new UserService();