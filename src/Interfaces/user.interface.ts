import MessageInterface from './message.interface';

interface UserInterface {
	id: number,
	username: string,
	password: string,
	avatar: string,
	messages?: MessageInterface[],
	createdAt?: Date,
	updatedAt?: Date,
	deletedAt?: Date,
}

export default UserInterface;