// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Environment variable
import { ALLIFY_URL } from '$env/static/private';

export const GET: RequestHandler = async () => {
	const pages = [
		'',
		'/my-musical-profile',
		'/discoveries',
		'/music-community',
		'/profile',
		'/settings',
		'/privacy-policy',
		'/terms-of-service',
		'/data-usage'
	];

	const lastmod = '2026-05-12';

	const body = `<?xml version="1.0" encoding="UTF-8" ?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${pages
			.map(
				(page) => `
			<url>
				<loc>${ALLIFY_URL}${page}</loc>
				<lastmod>${lastmod}</lastmod>
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
