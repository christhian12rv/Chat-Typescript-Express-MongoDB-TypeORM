export default {
	useUnifiedTopology: true,
	type: 'mongodb',
	host: 'localhost',
	port: process.env.DB_PORT,
	username: '',
	password: '',
	database: 'chat-typeorm',
	synchronize: true,
	logging: true,
	entities: [],
	subscribers: [],
	migrations: [],
};