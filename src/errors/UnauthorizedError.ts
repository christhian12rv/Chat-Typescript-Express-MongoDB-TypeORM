export default class UnauthorizedError extends Error {
	status: number;

	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, UnauthorizedError.prototype);
		
		this.status = 400;
	}
}