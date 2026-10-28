/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CommandArgs, type CommandKey, type CommandState, type ShippedCommands } from '#/runtime/port';

import { useCommandQuery } from './useCommandQuery';

/** A command's state for `args`, which rerenders the caller only when it changes; not ready until the session starts. */
export const useCommandState = <
    Commands extends object = ShippedCommands,
    CommandId extends CommandKey<Commands> = CommandKey<Commands>,
>(
    id: CommandId,
    ...args: CommandArgs<Commands, CommandId>
): CommandState => useCommandQuery(id, ...args);
