// Types
import type { RequestHandler } from '@sveltejs/kit';

// Environment variables
import { ANTHROPIC_API_KEY, ALLIFY_URL } from '$env/static/private';

const ALLOWED_ORIGINS = [ALLIFY_URL];

export const POST: RequestHandler = async ({ request }) => {
	const origin = request.headers.get('origin');

	if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
		return new Response(JSON.stringify({ error: 'Forbidden' }), {
			status: 403
		});
	}

	const { mostListenedTracks, mostListenedArtists } = await request.json();

	if (!mostListenedTracks || !mostListenedArtists) {
		return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
	}

	const prompt = `
		Most listened artists: ${mostListenedArtists.join(', ')}.
		Most listened songs: ${mostListenedTracks.join(', ')}.

		Suggest exactly 5 songs and 5 artists the user will like.
		DO NOT include any artist or song from the lists above.
		Do not include an artist in "artists" if they already appear in "songs".
	`;

	try {
		const response = await fetch('https://api.anthropic.com/v1/messages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': ANTHROPIC_API_KEY,
				'anthropic-version': '2023-06-01'
			},
			body: JSON.stringify({
				model: 'claude-haiku-4-5-20251001',
				max_tokens: 1000,
				tools: [
					{
						name: 'music_suggestions',
						description: 'Returns music recommendations for the user.',
						input_schema: {
							type: 'object',
							properties: {
								tracks: {
									type: 'array',
									items: { type: 'string' },
									description: 'List of 5 songs in "Song Name - Artist Name" format'
								},
								artists: {
									type: 'array',
									items: { type: 'string' },
									description: 'List of 5 artist names'
								}
							},
							required: ['songs', 'artists']
						}
					}
				],
				tool_choice: { type: 'tool', name: 'music_suggestions' },
				messages: [{ role: 'user', content: prompt }]
			})
		});

		if (!response.ok) {
			return new Response(JSON.stringify({ error: 'Failed to call Claude API' }), {
				status: response.status
			});
		}

		const data = await response.json();

		const toolUse = data.content?.find((b: { type: string }) => b.type === 'tool_use');

		if (!toolUse?.input) {
			return new Response(JSON.stringify({ error: 'No tool response from Claude' }), {
				status: 500
			});
		}

		return new Response(JSON.stringify(toolUse.input), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: (error as Error).message }), {
			status: 500
		});
	}
};
