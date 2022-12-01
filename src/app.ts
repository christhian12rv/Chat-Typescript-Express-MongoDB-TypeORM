import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import logger from './logger';
import appDataSource from './data-source';

export class App {
	private express: express.Application;

	constructor() {
		dotenv.config();
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
		this.express.listen(process.env.PORT, () => {
			logger.info(`Servidor rodando em: http://localhost:${process.env.PORT}`);
		});
	}

	private async database(): Promise<void> {
		try {
			await appDataSource.initialize();
			logger.info('DataSource inicializado com sucesso');
		} catch (e) {
			logger.error(`Houve um erro ao inicializar DataSource:${e}`);
		}
	}
}