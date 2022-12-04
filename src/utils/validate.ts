import { validateOrReject } from 'class-validator';

export default async function validate (data): Promise<string[]> {
	try {
		await validateOrReject(data);
		return [];
	} catch (e) {
		const errors = e.flatMap(err => Object.values(err.constraints));
		return errors;
	}
}