import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
	plugins: [
		enhancedImages(),
		tailwindcss(),
		sveltekit(),
		...(mode === 'analyze' ? [visualizer()] : [])
	],
	css: {
		transformer: 'lightningcss'
	},
	build: {
		sourcemap: false
	},
	server: {
		allowedHosts: true
	}
}));
