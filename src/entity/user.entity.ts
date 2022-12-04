import { Entity, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Length, MinLength } from 'class-validator';
import * as bcrypt from 'bcrypt';
import Message from './message.entity';
import BaseEntity from './baseEntity.entity';

@Entity()
export default class User extends BaseEntity {
	@Column({
		unique: true,
	})
	@MinLength(2, {
		message: 'Username must have at least 2 characters',
	})
	username: string;

	@Column()
	@Length(8, 20, {
		message: 'Password must have at least 8 characters and max 20 characters',
	})
	password: string;

	@Column()
	avatar: string;

	@OneToMany(() => Message, (message) => message.user)
	messages: Message[];

	@BeforeInsert()
	encryptPassword(): void {
		const saltRounds = 10;
		this.password = bcrypt.hashSync(this.password, saltRounds);
	}

	@BeforeInsert()
	generateAvatar(): void {
		const randomId = Math.floor(Math.random() * 1000000) + 1;

		this.avatar = `https://joeschmoe.io/api/v1/${randomId}`;
	}
}