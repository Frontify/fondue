/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PARAGRAPH, type PluginRegistry, type RteBlockCommand, type RteSelectionSnapshot } from '#/core';
import { localeLabel } from '#/ui/translation';

/**
 * The paragraph is the editor's own block rather than a plugin's, so its
 * command is built in. Always first: it is what every other block turns back
 * into.
 */
export const TEXT_COMMAND: RteBlockCommand = {
    id: 'paragraph',
    label: localeLabel('RichTextEditor_text'),
    keywords: ['paragraph', 'plain'],
    group: 'turnInto',
    // A paragraph inside a list item is the list's, not plain text.
    isActive: (selection) => selection.blocks.length === 1 && selection.block?.type === PARAGRAPH,
    run: (api) => api.blocks.setType(PARAGRAPH),
};

/** A command as the menus show it: its label already resolved for the shown language. */
export type ShownCommand = RteBlockCommand & { label: string };

/** Every command the menus offer: the built-in Text, then the plugins' in mount order. */
export const commandsOf = (registry: PluginRegistry): readonly RteBlockCommand[] => [
    TEXT_COMMAND,
    ...registry.commands,
];

/** What the "Turn into" button offers: only blocks something is converted into. */
export const turnIntoCommands = <TCommand extends RteBlockCommand>(
    commands: readonly TCommand[],
): readonly TCommand[] => commands.filter((command) => command.group === 'turnInto');

/**
 * The command the selection already is, if any. When several say so (a numbered
 * list inside a bulleted item), the one for the innermost block wins: that is
 * the block the caret is actually in.
 */
export const activeCommand = <TCommand extends RteBlockCommand>(
    commands: readonly TCommand[],
    selection: RteSelectionSnapshot,
): TCommand | undefined => {
    const active = commands.filter((command) => command.isActive?.(selection) === true);
    if (active.length <= 1) {
        return active[0];
    }
    // How deep a command's block sits: the first block, innermost first, that
    // alone makes it active.
    const depthOf = (command: RteBlockCommand): number => {
        const depth = selection.blocks.findIndex(
            (block) => command.isActive?.({ ...selection, block, blocks: [block] }) === true,
        );
        return depth === -1 ? Number.POSITIVE_INFINITY : depth;
    };
    return active.reduce((best, command) => (depthOf(command) < depthOf(best) ? command : best));
};

/** The commands that can run on the selection: the menus list only these. */
export const availableCommands = <TCommand extends RteBlockCommand>(
    commands: readonly TCommand[],
    selection: RteSelectionSnapshot,
): TCommand[] => commands.filter((command) => command.isAvailable?.(selection) ?? true);

const wordsOf = (text: string): string[] => text.toLowerCase().split(/\s+/).filter(Boolean);

/**
 * The commands a `/` query narrows to: each word typed has to start some word
 * of the label or the keywords, so `hea` finds every heading and `head 2`
 * finds Heading 2. Case does not matter; no query is every command.
 */
export const matchCommands = <TCommand extends ShownCommand>(
    commands: readonly TCommand[],
    query: string,
): TCommand[] => {
    const typed = wordsOf(query);
    return commands.filter((command) => {
        const words = [...wordsOf(command.label), ...(command.keywords ?? []).flatMap(wordsOf)];
        return typed.every((word) => words.some((candidate) => candidate.startsWith(word)));
    });
};
