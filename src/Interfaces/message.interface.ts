import UserInterface from './user.interface';

interface MessageInterface {
	id: string,
	text: string,
	sender: UserInterface,
	receiver: UserInterface,
}

export default MessageInterface;