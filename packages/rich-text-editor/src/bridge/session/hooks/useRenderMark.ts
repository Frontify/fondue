/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';

import { ReactWorkContext } from '../helpers/devChecks';

import { useClientLayoutEffect } from './useClientLayoutEffect';

/**
 * Marks the render of the part that calls it until its commit; a render that never commits closes at the next
 * microtask, so no event handler finds it open.
 */
export const useRenderMark = (): void => {
    const work = useContext(ReactWorkContext);
    if (work !== undefined && !work.rendering) {
        work.rendering = true;
        // oxlint-disable-next-line @eslint-react/purity -- a render that never commits runs no effect to close its mark.
        queueMicrotask(() => {
            work.rendering = false;
        });
    }

    useClientLayoutEffect(() => {
        if (work !== undefined) {
            work.rendering = false;
        }
    });
};
