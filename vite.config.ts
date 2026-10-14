import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig(({ mode }) => ({
	plugins: [
		enhancedImages(),
		tailwindcss(),
		sveltekit({
			adapter: adapter(),
			inlineStyleThreshold: Infinity,
			preprocess: vitePreprocess()
		}),
		...(mode === 'analyze' ? [visualizer()] : [])
	],
	build: {
		sourcemap: false
	},
	server: {
		allowedHosts: true
	}
}));
