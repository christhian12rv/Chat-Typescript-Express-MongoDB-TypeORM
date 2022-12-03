import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import User from './User';


@Entity()
export default class Message {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	text: string;

	@ManyToOne(() => User, (user) => user.messages)
	user: User;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}