import { fail, redirect } from '@sveltejs/kit';
import { authenticateUser, createSession, createUserAccount, setSessionCookie } from '$lib/server/auth.js';

function readLoginValues(formData) {
	return {
		username: String(formData.get('username') || '').trim(),
		password: String(formData.get('password') || '').trim()
	};
}

function readSignupValues(formData) {
	return {
		username: String(formData.get('signupUsername') || '').trim(),
		email: String(formData.get('email') || '').trim(),
		password: String(formData.get('signupPassword') || ''),
		confirmPassword: String(formData.get('confirmPassword') || '')
	};
}

async function signInUser(user, cookies) {
	const token = await createSession(user.id);
	setSessionCookie(cookies, token);
	throw redirect(303, '/');
}

export const actions = {
	login: async ({ request, cookies }) => {
		const values = readLoginValues(await request.formData());

		if (!values.username || !values.password) {
			return fail(400, {
				mode: 'login',
				error: 'Bitte gib Benutzername oder E-Mail und Passwort ein.',
				username: values.username
			});
		}

		const user = await authenticateUser(values.username, values.password);
		if (!user) {
			return fail(400, {
				mode: 'login',
				error: 'Benutzername/E-Mail oder Passwort ist falsch.',
				username: values.username
			});
		}

		await signInUser(user, cookies);
	},

	signup: async ({ request, cookies }) => {
		const values = readSignupValues(await request.formData());
		let user;

		try {
			user = await createUserAccount(values);
		} catch (error) {
			return fail(error.status || 400, {
				mode: 'signup',
				error: error.message || 'Account konnte nicht erstellt werden.',
				fieldErrors: error.fieldErrors || {},
				values: {
					username: values.username,
					email: values.email
				}
			});
		}

		await signInUser(user, cookies);
	}
};
