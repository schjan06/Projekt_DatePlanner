import { json } from '@sveltejs/kit';

export async function readJson(request) {
	try {
		return await request.json();
	} catch {
		const issue = new Error('Ungueltiger JSON-Body.');
		issue.status = 400;
		throw issue;
	}
}

export function jsonError(issue, fallback = 'Anfrage konnte nicht verarbeitet werden.') {
	return json(
		{
			error: issue?.body?.message || issue?.message || fallback,
			fieldErrors: issue?.fieldErrors || {}
		},
		{ status: issue?.status || 500 }
	);
}
