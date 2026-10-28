/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TurnIntoEntry } from '#/bridge/chrome/helpers/turnInto';
import { type EditorPartSpec, type PluginToolbarEntry } from '#/bridge/pluginApi/plugin';
import { type CodecContext } from '#/model';

import { translatedLabel } from './toolbarItems';

// The commands of the text style picker and the list buttons, in the order every Turn into menu lists them.
const TURN_INTO = [
    'paragraph.set',
    'heading.set',
    'quote.toggle',
    'code-block.toggle',
    'list.bullet.toggle',
    'list.ordered.toggle',
    'list.task.toggle',
];

/** The block conversions among the toolbar entries of `parts`, which each menu then narrows to what the selection takes. */
export const turnIntoEntries = (parts: readonly Pick<EditorPartSpec, 'toolbar'>[]): readonly PluginToolbarEntry[] =>
    parts
        .flatMap(({ toolbar }) => toolbar ?? [])
        .filter(({ node, command }) => node === undefined && TURN_INTO.includes(command))
        .sort((a, b) => TURN_INTO.indexOf(a.command) - TURN_INTO.indexOf(b.command));

const labelOf = (t: CodecContext['translate'], lang: string, entry: PluginToolbarEntry): string => {
    if (entry.labelKey === undefined) {
        return translatedLabel(entry.label, lang);
    }

    return t(entry.labelKey as `RichTextEditor_${string}`);
};

/** The entries as the chrome's menus list them. */
export const turnIntoMenuEntries = (
    parts: readonly Pick<EditorPartSpec, 'toolbar'>[],
    t: CodecContext['translate'],
    lang: string,
): readonly TurnIntoEntry[] =>
    turnIntoEntries(parts).map((entry) => ({
        key: entry.id,
        command: entry.command,
        payload: entry.payload,
        label: labelOf(t, lang, entry),
    }));
