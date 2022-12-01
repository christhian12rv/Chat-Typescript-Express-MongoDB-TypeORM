import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import logger from './logger';

export class App {
	private express: express.Application;
	private readonly PORT = 8001;

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
		this.express.listen(this.PORT, () => {
			logger.info(`Servidor rodando em: http://localhost:${this.PORT}`);
		});
	}

	private async database(): Promise<void> {
		try {
			await mongoose.connect('mongodb://localhost:3000/myapp');
			logger.info('Conectado ao banco de dados: mongodb');
		} catch (e) {
			logger.error(`Houve um erro ao se conectar ao MongoDB: ${e}`);
		}
	}
}