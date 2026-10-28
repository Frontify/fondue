/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CommandState } from '#/runtime/port';

import { useSessionValue } from '../../session/hooks/useSessionValue';

// What a command reads before the session is ready, as `query` answers during `mounting`.
const NOT_READY: CommandState = { enabled: false, active: false, disabledReason: 'not-ready' };

const sameCommandState = (first: CommandState, second: CommandState) =>
    first.enabled === second.enabled &&
    first.active === second.active &&
    first.disabledReason === second.disabledReason;

/** A command's state for `args`, which rerenders the caller only when the state changes. */
export const useCommandQuery = (id: string, ...args: readonly unknown[]): CommandState =>
    useSessionValue((runtime) => {
        if (runtime === undefined) {
            return NOT_READY;
        }

        return runtime.handle.query(id, ...args);
    }, sameCommandState);
