/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CommandArgs, type CommandKey, type CommandState, type ShippedCommands } from '#/runtime/port';

import { useCommandQuery } from './useCommandQuery';

/** A command's state for `args`, which rerenders the caller only when it changes; not ready until the session starts. */
export const useCommandState = <C extends object = ShippedCommands, K extends CommandKey<C> = CommandKey<C>>(
    id: K,
    ...args: CommandArgs<C, K>
): CommandState => useCommandQuery(id, ...args);
