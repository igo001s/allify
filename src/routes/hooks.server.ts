// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    return resolve(event, {
        transformPageChunk: ({ html }: { html: string }): string => {
            return html.replace(
                /<link\b[^>]*rel="stylesheet"[^>]*>/g,
                (tag: string): string => {
                    if (tag.includes('disabled') || tag.includes('media="print"')) return tag;

                    const preloadTag = tag
                        .replace('rel="stylesheet"', 'rel="preload" as="style"')
                        .replace('>', ` onload="this.onload=null;this.rel='stylesheet'">`);

                    return `${preloadTag}<noscript>${tag}</noscript>`;
                }
            );
        }
    });
};