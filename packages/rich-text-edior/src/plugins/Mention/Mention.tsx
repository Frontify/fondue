/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

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

/**
 * Typing `@` opens a picker at the caret; choosing an entry inserts a mention
 * element. The candidates come from the app, so this is a factory: whom you can
 * mention is not something the package can know.
 */
export const createMentionPlugin = ({
    items,
    trigger = '@',
}: {
    items: readonly MentionItem[];
    /** The character that opens the picker. `@` unless the app needs something else. */
    trigger?: string;
}): RtePlugin => ({
    id: 'mention',
    schema: {
        inlines: [
            {
                type: 'mention',
                attributes: {
                    id: { parseFromDomAttribute: 'data-mention-id' },
                    label: { parseFromDomAttribute: 'data-mention-label' },
                },
                render: ({ node }) => {
                    // A render function knows what it declared, so it reads its own inline type.
                    const mention = node as MentionInline;
                    return (
                        <span
                            data-mention-id={mention.id}
                            data-mention-label={mention.label}
                            className={styles.mention}
                        >
                            {trigger}
                            {mention.label}
                        </span>
                    );
                },
                parseRules: [{ tag: 'span[data-mention-id]' }],
            },
        ],
    },
    combobox: {
        trigger,
        items: (query) => {
            const needle = query.toLowerCase();
            return items.filter((item) => item.label.toLowerCase().includes(needle));
        },
        onSelect: (item, api) => {
            api.insert('mention', { id: item.id, label: item.label });
            // A space after the mention, so typing continues outside it.
            api.insertText(' ');
        },
    },
});
