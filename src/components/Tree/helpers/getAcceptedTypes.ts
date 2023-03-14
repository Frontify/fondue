/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CollisionPosition } from '../types';

type Accepts =
    | { within?: string | string[]; after?: string | string[]; before?: string | string[] }
    | string
    | string[];

export const getSupportedDrop = <T extends Nullish<Accepts>>(accepts: T, type: Nullish<string>) => {
    const accepted: Record<CollisionPosition, boolean> = {
        before: true,
        within: true,
        after: true,
    };

    if (!accepts || !type) {
        return accepted;
    }

    if (typeof accepts === 'string') {
        accepted.before = accepted.within = accepted.after = accepts === type;
    } else if (Array.isArray(accepts)) {
        accepted.before = accepted.within = accepted.after = accepts.includes(type) ?? false;
    } else {
        accepted.before =
            (accepts.before instanceof Array ? accepts.before.includes(type) : accepts.before === type) ?? false;
        accepted.within =
            (accepts.within instanceof Array ? accepts.within.includes(type) : accepts.within === type) ?? false;
        accepted.after =
            (accepts.after instanceof Array ? accepts.after.includes(type) : accepts.after === type) ?? false;
    }

    return accepted;
};
