import { json } from '@sveltejs/kit';
import { createActivity, getActivities, getCategories } from '$lib/server/repositories.js';

export async function GET({ url }) {
	const filters = Object.fromEntries(url.searchParams);
	const [activities, categories] = await Promise.all([getActivities(filters), getCategories()]);
	return json({ activities, categories });
}

export async function POST({ request, locals }) {
	try {
		const activity = await createActivity(await request.formData(), locals.user.id);
		return json({ activity }, { status: 201 });
	} catch (issue) {
		return json(
			{
				error: issue.message || 'Aktivität konnte nicht gespeichert werden.',
				fieldErrors: issue.fieldErrors || {}
			},
			{ status: issue.status || 400 }
		);
	}
}
