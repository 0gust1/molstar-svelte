/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,md}'],
	theme: {
		extend: {}
	},
	plugins: [
		// ...
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography')
	]
};
