import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import pkg from './package.json' assert { type: 'json' };

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	// https://vitejs.dev/config/shared-options.html#define
	// used to expose info from package.json to app code
	// DO NOT expose secrets here
	define: {
		__PKG_NAME__: `"${pkg.name}"`,
		__VERSION__: `"${pkg.version}"`
	}
});
