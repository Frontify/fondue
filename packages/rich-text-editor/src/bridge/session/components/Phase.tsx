/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect } from 'react';

import { type ReactWork } from '../helpers/devChecks';
import { useClientLayoutEffect } from '../hooks/useClientLayoutEffect';

export type PhaseProps = { work: ReactWork; open: boolean };

/**
 * Marks the render, layout effects and effects of the parts between an opening and a closing `Phase`, which React
 * runs in tree order; a render that never commits closes at the next microtask.
 */
export const Phase = ({ work, open }: PhaseProps) => {
    work.phase = open;
    if (open) {
        // oxlint-disable-next-line @eslint-react/purity -- a render that never commits runs no effect to close its mark.
        queueMicrotask(() => {
            work.phase = false;
        });
    }

    useClientLayoutEffect(() => {
        work.phase = open;
    });
    useEffect(() => {
        work.phase = open;
    });

    return null;
};

Phase.displayName = 'Phase';
