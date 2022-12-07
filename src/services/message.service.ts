import { ObjectID } from 'mongodb';
import appDataSource from '../config/data-source';
import Message from '../entity/message.entity';
import User from '../entity/user.entity';
import BadRequestError from '../errors/BadRequestError';
import BadRequestMultipleErrors from '../errors/BadRequestMultipleErrors';
import MessageInterface from '../Interfaces/message.interface';
import validate from '../utils/validate';

class MessageService {
	public async send(text: string, senderId: string, receiverId: string) : Promise<MessageInterface> {
		const userRepository = appDataSource.getMongoRepository(User);
		const messageRepository = appDataSource.getRepository(Message);

		const userReceiver = await userRepository.findOneBy({ _id: new ObjectID(receiverId), });
		if (!userReceiver)
			throw new BadRequestError('User receiver not found');

		const message = new Message();
		message.text = text;
		message.sender = await userRepository.findOneBy({ _id: new ObjectID(senderId), });
		message.receiver = userReceiver;

		const errors = await validate(message);
		if (errors.length > 0)
			throw new BadRequestMultipleErrors('Occurred some errors when sending message', errors);

		try {
			await messageRepository.save(message);
			return message;
		} catch (e) {
			throw new BadRequestError('Occurred an error when sending message');
		}
	}
}

export default new MessageService();