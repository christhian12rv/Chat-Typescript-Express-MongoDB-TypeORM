import { DataSource } from 'typeorm';

const appDataSource = new DataSource({
	useUnifiedTopology: true,
	type: 'mongodb',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT) ?? 9000,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	synchronize: true,
	logging: true,
	entities: [],
	subscribers: [],
	migrations: [],
});

export default appDataSource;