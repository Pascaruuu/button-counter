import { getDataFromDB, incrementCounter } from '$lib/server/db_controllers';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

function getSocketIO(platform: any) {
  // Production (Adapter Node)
  if (platform?.req?.io) return platform.req.io;

  // Development (Vite Global Hack)
  // @ts-ignore
  if (globalThis.io) return globalThis.io;
  return null;
}

export const load: PageServerLoad = async () => {
  const countData = await getDataFromDB();
  return { countData };
};

export const actions = {
  // The default action for the page
  default: async ({ platform }) => {
    try {
      await incrementCounter();
      const countData = await getDataFromDB();

      const io = getSocketIO(platform);
      if (io) {
        io.emit('new-count', countData);
      }

      return { success: true };
    } catch (e) {
      return fail(500, { message: 'Could not update counter' });
    }
  },
} satisfies Actions;
