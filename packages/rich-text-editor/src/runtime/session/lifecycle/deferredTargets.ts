/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Targets the coordinator captures during a commit, such as from a running command, captured once it ends. */
export const createDeferredTargets = () => {
    const ids: string[] = [];

    return {
        push: (id: string) => {
            ids.push(id);
        },
        shift: () => ids.shift(),
        drop: (id: string) => {
            const waiting = ids.indexOf(id);
            if (waiting >= 0) {
                ids.splice(waiting, 1);
            }
        },
        clear: () => {
            ids.length = 0;
        },
    };
};
