import { getDataFromDB, incrementCounter } from '$lib/server/db_controllers';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
    const count = await getDataFromDB();
    return { count };
};

export const actions = {
    // The default action for the page
    default: async () => {
        try {
            await incrementCounter();
            return { success: true };
        } catch (e) {
            return fail(500, { message: "Could not update counter" });
        }
    }
} satisfies Actions;