import { Entity, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Length, MinLength } from 'class-validator';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Message from './message.entity';
import BaseEntity from './baseEntity.entity';
import config from '../config/config';

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

	@OneToMany(() => Message, (message) => message.sender || message.receiver)
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

	public comparePasswords(password: string) : boolean {
		return bcrypt.compareSync(password, this.password);
	}

	public generateToken(): string  {
		const decodedToken = {
			id: this.id,
			username: this.username,
			avatar: this.avatar,
		};
		
		return jwt.sign(decodedToken, config.jwtSecret, {
			expiresIn: '1d',
		});
	}
}