import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
	const { message = '' } = await request.json();
	const trimmed = String(message).trim();

	if (trimmed && trimmed.length < 10) {
		return json({ error: 'Bitte beschreibe dein Feedback etwas genauer.' }, { status: 400 });
	}

	return json({
		success: true,
		message: 'Feedback wurde im Prototyp simuliert.',
		userId: locals.user.id
	});
}
