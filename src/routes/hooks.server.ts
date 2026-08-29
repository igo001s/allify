// Svelte
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		transformPageChunk: ({ html }: { html: string }): string => {
			return html.replace(
				/<link rel="stylesheet"([^>]*?)>/g,
				(match: string, attrs: string): string => {
					if (attrs.includes('media="print"')) return match;
					return (
						`<link rel="preload" as="style"${attrs} onload="this.onload=null;this.rel='stylesheet'">` +
						`<noscript><link rel="stylesheet"${attrs}></noscript>`
					);
				}
			);
		}
	});
};
