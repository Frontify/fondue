/* (c) Copyright Frontify Ltd., all rights reserved. */

/** A source of DOM `id` parts for one session: its own session ID plus a count, so two sessions never share one. */
export const createDomIds = (sessionId: string): (() => string) => {
    let count = 0;
    return () => {
        count += 1;
        return `${sessionId}-${count}`;
    };
};
