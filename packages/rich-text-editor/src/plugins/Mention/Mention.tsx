/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin, type EditProps, type RtePlugin } from '#/core';

import { MentionDraft } from './components/MentionDraft';
import { MentionLink } from './components/MentionLink';
import {
    assertMentionTrigger,
    type MentionContentOptions,
    mentionContent,
    mentionValueOf,
    safeMentionHref,
} from './content';
import { type MentionItem, type MentionItems, type MentionValue } from './types';

export type MentionPluginOptions = MentionContentOptions & {
    /**
     * Who can be mentioned. A list is searched by username and name, ignoring
     * case. A function is handed what has been typed after the trigger and
     * returns the matches, or a promise of them to search on a server; an
     * answer that arrives after the query moved on is dropped.
     */
    items: readonly MentionItem[] | MentionItems;
};

/** Everyone in a fixed list whose username or name contains the query. */
export const searchIn =
    (list: readonly MentionItem[]): MentionItems =>
    (query) => {
        const needle = query.toLowerCase();
        return list.filter(
            (item) => item.username.toLowerCase().includes(needle) || item.name.toLowerCase().includes(needle),
        );
    };

/**
 * A mention: the username as a link to the person (or group), full name on hover.
 *
 * The editor does no mention-specific work: the trigger inserts an empty mention
 * through an ordinary hotkey, and the `edit` view draws the query, list and choice.
 */
export const mentionPlugin = (options: MentionPluginOptions): RtePlugin => {
    const { href, trigger = '@' } = options;
    assertMentionTrigger(trigger, 'mentionPlugin');
    const items = typeof options.items === 'function' ? options.items : searchIn(options.items);

    // `value` is null until someone is chosen.
    const MentionEditor = ({
        value,
        setValue,
        isFocused,
        remove,
        api,
    }: EditProps<MentionValue, MentionValue | null>) => {
        if (value === null) {
            return (
                <MentionDraft
                    trigger={trigger}
                    items={items}
                    focused={isFocused}
                    onChoose={(person) => {
                        setValue(mentionValueOf(person));
                        // Return the caret to after the mention; the space keeps typing outside it.
                        api.focus();
                        api.insertText(' ');
                    }}
                    onCancel={(text) => {
                        remove();
                        api.focus();
                        api.insertText(text);
                    }}
                    onRemove={() => {
                        remove();
                        api.focus();
                    }}
                />
            );
        }
        return <MentionLink value={value} href={safeMentionHref(href, value)} trigger={trigger} />;
    };

    return definePlugin({
        content: mentionContent({ href, trigger }),
        edit: { mention: MentionEditor },
        hotkeys: {
            // Inserts an empty mention that the `edit` view takes over.
            [trigger]: (api) => api.insert('mention'),
        },
    });
};
