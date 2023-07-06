import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	async default({ request }) {
		const body = await request.formData();

		return {
			message: `Hello ${body.get('name')}`
		};
	}
};
