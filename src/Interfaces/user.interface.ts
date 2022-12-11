import MessageInterface from './message.interface';

interface UserInterface {
	id: number,
	username: string,
	password: string,
	avatar: string,
	messages?: MessageInterface[]
}

export default UserInterface;