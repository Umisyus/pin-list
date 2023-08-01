import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
	server: {
		https: {
			cert: '/home/umit/Node Projects/pin-list/certificate.crt',
			key: '/home/umit/Node Projects/pin-list/private.key'
		}

	},
	plugins: [sveltekit(), basicSsl()]
});
