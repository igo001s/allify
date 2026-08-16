// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Environment variable
import { ALLIFY_URL } from '$env/static/private';

export const GET: RequestHandler = async () => {
	const pages = [
		{name: '', lastMod: '2026-08-16'},
		{name: '/my-musical-profile', lastMod: '2026-08-16'},
		{name: '/discoveries', lastMod: '2026-08-16'},
		{name: '/music-community', lastMod: '2026-08-16'},
		{name: '/profile', lastMod: '2026-08-16'},
		{name: '/settings', lastMod: '2026-08-16'},
		{name: '/privacy-policy', lastMod: '2026-08-16'},
		{name: '/terms-of-service', lastMod: '2026-08-16'},
		{name: '/data-usage', lastMod: '2026-08-16'}
	];

	const body = `<?xml version="1.0" encoding="UTF-8" ?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${pages
			.map(
				(page) => `
			<url>
				<loc>${ALLIFY_URL}${page.name}</loc>
				<lastmod>${page.lastMod}</lastmod>
			</url>
		`
			)
			.join('')}
	</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
