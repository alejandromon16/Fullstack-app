const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			maxHeight: {
				0: '0',
				xl: '36rem',
			},
			colors: {
				'blue-bus': '#2596be',
				'blue-letters': '#132968'
			},

			height: {
				15: '3.3rem',
				sm: '34rem'
			},
			fontFamily: {
				gt: ['"GT Walsheim Pro"', 'Arial'],
				mn: ['"Manrope"']
			},
			width: {
				100: '704px'
			},
			minWidth: {
				1: '56px'
			},
			minHeight: {
				1: '56px'
			},
			screens: {
				xss: '322px',
				xs: '390px',
				'i7': { 'raw': '(max-height: 670px)' },
				// => @media (min-height: 800px) { ... }
				'iX': { 'raw': '(min-height: 670px)' },
			  }
		}
	},

	plugins: [
		require('tailwind-scrollbar-hide'),
	]
};

module.exports = config;
