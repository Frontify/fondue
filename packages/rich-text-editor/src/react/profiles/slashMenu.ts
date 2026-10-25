/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorApi, type EditorPartSpec, type PluginToolbarEntry } from '#/bridge/plugin';
import { type JsonObject, type TranslationStrings } from '#/model';

import { turnIntoEntries } from '../turnInto';

const INSERTS = /\.insert$/u;

/** A unit as the list reads it: the toolbar entries of its editor part. */
interface Unit {
    readonly editor: Pick<EditorPartSpec, 'toolbar'>;
}

interface Group {
    readonly headingKey: keyof TranslationStrings;
    readonly entries: readonly PluginToolbarEntry[];
}

const labelOf = (api: EditorApi<'commands'>, entry: PluginToolbarEntry): string => {
    if (entry.labelKey === undefined) {
        return entry.label['en-US'];
    }
    return api.t(entry.labelKey as keyof TranslationStrings);
};

const payloadOf = ({ command, payload }: PluginToolbarEntry): JsonObject => {
    if (payload === undefined) {
        return { command };
    }
    return { command, payload };
};

/**
 * The `/` list of an empty paragraph: Turn into holds the block conversions and Insert the node inserts of the
 * toolbar entries of `plugins`, each only while its command is enabled, which also leaves out what the policy refuses.
 */
export const slashMenu = (plugins: readonly Unit[]): Omit<EditorPartSpec<'commands'>, 'commands'> => {
    const entries = plugins.flatMap(({ editor }) => editor.toolbar ?? []).filter(({ node }) => node === undefined);
    const turnInto = turnIntoEntries(plugins.map(({ editor }) => editor));
    const inserts = entries.filter(({ kind, command }) => kind === 'button' && INSERTS.test(command));
    const groups: readonly Group[] = [
        { headingKey: 'RichTextEditor_slashTurnInto', entries: turnInto },
        { headingKey: 'RichTextEditor_slashInsert', entries: inserts },
    ];
    return {
        needs: ['commands'],
        suggestions: [
            {
                trigger: '/',
                labelKey: 'RichTextEditor_suggestions',
                // A space may belong to a label such as "Heading 1", so the list stays until nothing matches.
                rules: { afterPunctuation: false, maxQuery: 32, spaces: true, leadingLetters: 0, emptyBlock: true },
                search: (query, { api }) => {
                    const fold = (text: string) => text.toLocaleLowerCase(api.locale());
                    const wanted = fold(query);
                    const items = groups.flatMap(({ headingKey, entries: listed }) =>
                        listed.flatMap((entry) => {
                            const label = labelOf(api, entry);
                            if (
                                !fold(label).includes(wanted) ||
                                !api.commands.query(entry.command, entry.payload).enabled
                            ) {
                                return [];
                            }
                            return [
                                {
                                    key: entry.id,
                                    label,
                                    payload: payloadOf(entry),
                                    group: api.t(headingKey),
                                },
                            ];
                        }),
                    );
                    return Promise.resolve({ items, nextCursor: null });
                },
                command: 'slash.run',
            },
        ],
    };
};
