export default class BadRequestMultipleErrors extends Error {
	status: number;
	errors: string[];

	constructor(message: string, errors: string[]) {
		super(message);
		Object.setPrototypeOf(this, BadRequestMultipleErrors.prototype);
		
		this.status = 400;
		this.errors = errors;
	}
}