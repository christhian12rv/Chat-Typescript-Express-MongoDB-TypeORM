import MessageInterface from './message.interface';

interface UserInterface {
	id: string,
	username: string,
	password: string,
	avatar: string,
	messages?: MessageInterface[]
}

export default UserInterface;