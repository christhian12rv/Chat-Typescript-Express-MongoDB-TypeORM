import { Equal } from 'typeorm';
import appDataSource from '../config/data-source';
import Message from '../entity/message.entity';
import User from '../entity/user.entity';
import BadRequestError from '../errors/BadRequestError';
import BadRequestMultipleErrors from '../errors/BadRequestMultipleErrors';
import MessageInterface from '../Interfaces/message.interface';
import validate from '../utils/validate';

class MessageService {
	public async send(text: string, senderId: number, receiverId: number) : Promise<MessageInterface> {
		const userRepository = appDataSource.getRepository(User);
		const messageRepository = appDataSource.getRepository(Message);

		const userReceiver = await userRepository.findOneBy({ id: receiverId, });
		if (!userReceiver)
			throw new BadRequestError('User receiver not found');

		const message = new Message();
		message.text = text;
		message.sender = await userRepository.findOneBy({ id: senderId, });
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

	public async list(userLoggedId: number, userChatId: number): Promise<MessageInterface[]>{
		const messageRepository = appDataSource.getRepository(Message);
		
		let messages = await messageRepository.find({
			where: [
				{
					sender: Equal(userLoggedId),
					receiver: Equal(userChatId),
				},
				{
					sender: Equal(userChatId),
					receiver: Equal(userLoggedId),
				}
			],
			relations: ['sender', 'receiver'],
			order: {
				createdAt: 'DESC',
			},
		}) as MessageInterface[];

		messages = messages.map(m => ({
			id: m.id,
			text: m.text,
			isSender: m.sender.id === userLoggedId,
			createdAt: m.createdAt,
			updatedAt: m.updatedAt,
		}));

		return messages;
	}
}

export default new MessageService();