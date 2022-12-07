import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import logger from './config/logger';
import appDataSource from './config/data-source';
import config from './config/config';
import userRoute from './routes/user.route';
import messageRoute from './routes/message.route';

export default class App {
	private express: express.Application;

	constructor() {
		this.express = express();
		this.listen();
		this.middlewares();
		this.database();
		this.routes();
	}

	public getApp(): express.Application {
		return this.express;
	}

	private middlewares(): void {
		this.express.use(express.json());
		this.express.use(cors());
	}

	private listen(): void {
		this.express.listen(config.port, () => {
			logger.info(`Server running on: http://localhost:${config.port}`);
		});
	}

	private async database(): Promise<void> {
		try {
			await appDataSource.initialize();
			logger.info('DataSource initalized successfully');
		} catch (e) {
			logger.error(`There was an error initializing DataSource: ${e}`);
		}
	}

	private routes(): void {
		this.express.use('/users', userRoute);
		this.express.use('/messages', messageRoute);
	}
}