import 'dotenv/config';

export default {
	port: process.env.PORT,
	dbPort: process.env.DB_PORT,
	dbHost: process.env.DB_HOST,
	dbUsername: process.env.DB_USERNAME,
	dbPassword: process.env.DB_PASSWORD,
	dbDatabase: process.env.DB_DATABASE,
	jwtSecret: process.env.JWT_SECRET,
};