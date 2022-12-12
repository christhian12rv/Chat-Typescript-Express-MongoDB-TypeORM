import UserInterface from './user.interface';

interface MessageInterface {
	id: number,
	text: string,
	sender?: UserInterface,
	receiver?: UserInterface,
	createdAt?: Date,
	updatedAt?: Date,
	deletedAt?: Date,
}

export default MessageInterface;