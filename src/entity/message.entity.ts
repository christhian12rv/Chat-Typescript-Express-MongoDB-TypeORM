import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from './baseEntity.entity';
import User from './user.entity';

@Entity()
export default class Message extends BaseEntity {
	@Column()
	@IsNotEmpty()
	text: string;

	@ManyToOne(() => User, (user) => user.messages)
	@IsNotEmpty()
	sender: User;

	@ManyToOne(() => User, (user) => user.messages)
	@IsNotEmpty()
	receiver: User;
}