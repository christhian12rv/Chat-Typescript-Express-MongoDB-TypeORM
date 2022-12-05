declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: number;
			DB_PORT: number;
			DB_HOST: string;
			DB_USERNAME: string;
			DB_PASSWORD: string;
			DB_DATABASE: string;
			JWT_SECRET: string;
		}
	}
}

export {};