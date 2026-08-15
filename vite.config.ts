import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
	plugins: [
		tailwindcss(),
		sveltekit(),
		enhancedImages(),
		...(mode === 'analyze' ? [visualizer()] : [])
	],
	build: {
		sourcemap: false
	},
	server: {
		allowedHosts: true
	}
}));
