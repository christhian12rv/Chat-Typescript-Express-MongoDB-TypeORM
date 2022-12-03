import { DataSource } from 'typeorm';
import config from './config';

const appDataSource = new DataSource({
	useUnifiedTopology: true,
	type: 'mongodb',
	host: config.dbHost,
	port: Number(config.dbPort) ?? 9000,
	username: config.dbUsername,
	password: config.dbPassword,
	database: config.dbDatabase,
	synchronize: true,
	logging: true,
	entities: [],
	subscribers: [],
	migrations: [],
});

export default appDataSource;