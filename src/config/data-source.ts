import { DataSource } from 'typeorm';
import config from './config';
import Message from '../entity/message.entity';
import User from '../entity/user.entity';

const appDataSource = new DataSource({
	type: 'mysql',
	host: config.dbHost,
	port: Number(config.dbPort) ?? 9000,
	username: config.dbUsername,
	password: config.dbPassword,
	database: config.dbDatabase,
	synchronize: true,
	logging: true,
	entities: [User, Message],
	subscribers: [],
	migrations: [],
});

export default appDataSource;