import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import logger from './logger';
import appDataSource from './data-source';
import config from './config';

export class App {
	private express: express.Application;

	constructor() {
		this.express = express();
		this.listen();
		this.middlewares();
		this.database();
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
			logger.info(`Servidor rodando em: http://localhost:${config.port}`);
		});
	}

	private async database(): Promise<void> {
		try {
			await appDataSource.initialize();
			logger.info('DataSource inicializado com sucesso');
		} catch (e) {
			logger.error(`Houve um erro ao inicializar DataSource: ${e}`);
		}
	}
}