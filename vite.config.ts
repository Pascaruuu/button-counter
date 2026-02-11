import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { Server } from 'socket.io';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: any) {
		if (!server.httpServer) return;

		const io = new Server(server.httpServer);
		
		io.on('connection', (socket) => {
			socket.join('global-counter');
		});

        // ⚠️ Attach IO to the global process so we can find it in SvelteKit
        // This is a "Dev-only" hack. In prod, we use the middleware.
        globalThis.io = io;
	}
};

export default defineConfig({
	plugins: [sveltekit(), webSocketServer]
});
