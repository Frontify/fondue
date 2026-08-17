/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/core';

import { Combobox } from './components/Combobox';
import styles from './mention.module.scss';

/** The void inline this plugin adds. */
export type MentionInline = {
    type: 'mention';
    id: string;
    label: string;
};

/** Someone (or something) that can be mentioned. `hint` shows as secondary text in the picker. */
export type MentionItem = {
    id: string;
    label: string;
    hint?: string;
};

/** How many candidates are offered at once. */
const COMBOBOX_LIMIT = 8;

type MentionPluginOptions = {
    items: readonly MentionItem[];
    /** The character that opens the picker. `@` unless the app needs something else. */
    trigger?: string;
};

/**
 * Typing `@` opens a picker at the caret; choosing an entry inserts a mention
 * element. The candidates are a required option, because whom you can mention
 * is not something the package can know.
 *
 * A mention is indivisible: clicking it puts the caret after it (as for every
 * void inline element) and Backspace there takes the whole mention, rather than
 * leaving text that no longer matches its id. To change one, delete it and type
 * `@` again.
 */
export const mentionPlugin = ({ items, trigger = '@' }: MentionPluginOptions): RtePlugin => ({
    id: 'mention',
    schema: [
        {
            kind: 'inline',
            type: 'mention',
            attributes: {
                id: { parseFromDomAttribute: 'data-mention-id' },
                label: { parseFromDomAttribute: 'data-mention-label' },
            },
            toDom: (attrs) => {
                const mention = attrs as Partial<MentionInline>;
                const id = typeof mention.id === 'string' ? mention.id : '';
                const label = typeof mention.label === 'string' ? mention.label : '';
                return {
                    tag: 'span',
                    attrs: {
                        'data-mention-id': id,
                        'data-mention-label': label,
                        class: styles.mention ?? '',
                    },
                    children: `${trigger}${label}`,
                };
            },
            renderComponent: ({ node }) => {
                const mention = node as MentionInline;
                return (
                    <span data-mention-id={mention.id} data-mention-label={mention.label} className={styles.mention}>
                        {trigger}
                        {mention.label}
                    </span>
                );
            },
            parseRules: [{ tag: 'span[data-mention-id]' }],
        },
    ],
    autocomplete: {
        trigger,
        component: (context) => {
            const needle = context.query.toLowerCase();
            const found = items.filter((item) => item.label.toLowerCase().includes(needle)).slice(0, COMBOBOX_LIMIT);
            // Nothing to offer means no picker, so what was typed stays
            // ordinary text.
            return found.length === 0 ? null : (
                <Combobox
                    context={context}
                    items={found}
                    label={`${trigger} suggestions`}
                    onSelect={(item, api) => {
                        api.insert('mention', { id: item.id, label: item.label });
                        // A space after the mention, so typing continues
                        // outside it.
                        api.insertText(' ');
                    }}
                />
            );
        },
    },
});
