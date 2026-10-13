/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineInline, type RtePlugin } from '#/core';

import { MentionDraft } from './components/MentionDraft';
import { MentionLink } from './components/MentionLink';
import styles from './mention.module.scss';
import { type MentionItem, type MentionItems, type MentionValue } from './types';

type MentionPluginOptions = {
    /** The people matching a query. `filterByName(list)` covers a fixed list. */
    items: MentionItems;
    /** Where a mention links to — the person's profile. */
    href: (mention: MentionValue) => string;
    /** The character that starts a mention. `@` unless the app needs something else. */
    trigger?: string;
};

/** `items` for a fixed list: everyone whose username or name contains the query. */
export const filterByName =
    (list: readonly MentionItem[]): MentionItems =>
    (query) => {
        const needle = query.toLowerCase();
        return list.filter(
            (item) => item.username.toLowerCase().includes(needle) || item.name.toLowerCase().includes(needle),
        );
    };

/**
 * A mention is the username as a link to the person, with their full name on
 * hover.
 *
 * The editor does no mention-specific work. Typing the trigger inserts an empty
 * mention through an ordinary hotkey, and from then on the plugin's
 * `render.edit` draws everything — the query input, the flyout, the list —
 * from the handful of props the editor gives every node.
 */
export const mentionPlugin = ({ items, href, trigger = '@' }: MentionPluginOptions): RtePlugin => ({
    id: 'mention',
    inlines: {
        mention: defineInline<MentionValue>({
            /**
             * Portable markup: what copying out of the editor puts on the
             * clipboard. A plain link — no tooltip outside the app.
             */
            toHtml: (mention) => ({
                tag: 'a',
                attrs: {
                    href: href(mention),
                    title: mention.name,
                    'data-mention-id': mention.id,
                    'data-mention-username': mention.username,
                    class: styles.mention ?? '',
                },
                children: `${trigger}${mention.username}`,
            }),

            /** Read back from what `toHtml` wrote, so a copied mention pastes as a mention. */
            parse: [
                {
                    tag: 'a[data-mention-id]',
                    value: (element) => ({
                        id: element.dataset.mentionId ?? '',
                        username: element.dataset.mentionUsername ?? '',
                        name: element.title,
                    }),
                },
            ],

            render: {
                /** Readonly: the link with the person's full name in a Tooltip. */
                component: ({ value }) => <MentionLink value={value} href={href(value)} trigger={trigger} />,

                /**
                 * Everything the editor shows for a mention. `value` is null
                 * until someone is chosen.
                 */
                edit: ({ value, setValue, isFocused, remove, api }) =>
                    value === null ? (
                        <MentionDraft
                            trigger={trigger}
                            items={items}
                            focused={isFocused}
                            onChoose={(person) => {
                                setValue({ id: person.id, username: person.username, name: person.name });
                                // The caret was left after the mention when it was
                                // inserted; going back to the editor puts it there,
                                // and a space keeps typing outside the mention.
                                api.focus();
                                api.insertText(' ');
                            }}
                            onCancel={(text) => {
                                // The mention makes way for what was typed into it.
                                remove();
                                api.focus();
                                api.insertText(text);
                            }}
                            onRemove={() => {
                                remove();
                                api.focus();
                            }}
                        />
                    ) : (
                        <MentionLink value={value} href={href(value)} trigger={trigger} />
                    ),
            },
        }),
    },
    hotkeys: {
        // An empty mention, which its `render.edit` then takes over.
        [trigger]: (api) => api.insert('mention'),
    },
});
