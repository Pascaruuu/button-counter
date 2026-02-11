// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Server } from 'socket.io';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	interface Platform {
            req: {
                io: Server;
            }
        }
	}
}

export {};
