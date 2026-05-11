import { fail } from '@sveltejs/kit';
import { registerUser } from '$lib/server/auth.js';

export const actions = {
	default: async ({ request, url }) => {
		const formData = await request.formData();
		const values = {
			displayName: String(formData.get('displayName') || '').trim(),
			username: String(formData.get('username') || '').trim().toLowerCase(),
			email: String(formData.get('email') || '').trim().toLowerCase(),
			password: String(formData.get('password') || ''),
			confirmPassword: String(formData.get('confirmPassword') || '')
		};

		try {
			await registerUser(values, url.origin);
			return {
				success: true,
				email: values.email
			};
		} catch (error) {
			return fail(error.status || 400, {
				error: error.message || 'Registrierung konnte nicht abgeschlossen werden.',
				fieldErrors: error.fieldErrors || {},
				values: {
					displayName: values.displayName,
					username: values.username,
					email: values.email
				}
			});
		}
	}
};
