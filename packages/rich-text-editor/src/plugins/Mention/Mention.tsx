/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineInline, definePlugin, type RtePlugin } from '#/core';

import { MentionEditor } from './components/MentionEditor';
import { MentionLink } from './components/MentionLink';
import { mentionAttributes, mentionDisplay } from './helpers/display';
import styles from './mention.module.scss';
import { type MentionHref, type MentionItem, type MentionItems, type MentionValue } from './types';

export type MentionContentOptions = {
    /**
     * Returns where a mention links to, such as the profile of a person or group.
     * Without it, or where it returns `undefined`, the mention is plain text.
     */
    href?: MentionHref;
    /**
     * The single character that starts a mention
     * @default '@'
     */
    trigger?: string;
};

/**
 * Throws unless the trigger is exactly one character
 */
const assertMentionTrigger = (trigger: string, factory: string): void => {
    // The hotkey fires on a single typed character, so a longer trigger could never start a mention.
    if ([...trigger].length !== 1) {
        throw new Error(`${factory}: \`trigger\` must be exactly one character, got "${trigger}".`);
    }
};

/**
 * A mention, shown as the username linked to the person or group, with the full name on hover
 */
export const mentionContent = ({ href, trigger = '@' }: MentionContentOptions = {}) => {
    assertMentionTrigger(trigger, 'mentionContent');
    return defineContent({
        inlines: {
            mention: defineInline<MentionValue>({
                // Portable markup for the clipboard: a plain link (or text, with
                // nowhere to link to), no tooltip.
                toHtml: (mention) => {
                    const shown = mentionDisplay(mention, { href, trigger });
                    return {
                        tag: shown.href === undefined ? 'span' : 'a',
                        attrs: {
                            href: shown.href,
                            title: shown.title,
                            ...mentionAttributes(mention),
                            class: styles.mention ?? '',
                        },
                        children: [{ tag: 'bdi', children: shown.label }],
                    };
                },

                // Pasted HTML never creates a mention: its id is not trusted, so the
                // markup reads as the link or text it is, and only the picker inserts one.
                parse: [],

                render: {
                    component: ({ value }) => (
                        <MentionLink
                            value={value}
                            display={mentionDisplay(value, { href, trigger })}
                            placesCaret={false}
                        />
                    ),
                },
            }),
        },
    });
};

export type MentionPluginOptions = MentionContentOptions & {
    /**
     * Who can be mentioned. A list is searched by username and name, ignoring case.
     * A function receives the text typed after the trigger and returns the matches, or a promise of them.
     */
    items: readonly MentionItem[] | MentionItems;
};

/**
 * Returns a search over a fixed list, matching the query in username or name
 */
export const searchIn =
    (list: readonly MentionItem[]): MentionItems =>
    (query) => {
        const needle = query.toLowerCase();
        return list.filter(
            (item) => item.username.toLowerCase().includes(needle) || item.name.toLowerCase().includes(needle),
        );
    };

/**
 * Mentions a person or group: typing the trigger (`@` by default) opens a list to choose from
 */
export const mentionPlugin = (options: MentionPluginOptions): RtePlugin => {
    const { href, trigger = '@' } = options;
    assertMentionTrigger(trigger, 'mentionPlugin');
    let items: MentionItems;
    if (typeof options.items === 'function') {
        items = options.items;
    } else {
        items = searchIn(options.items);
    }

    return definePlugin({
        content: mentionContent({ href, trigger }),
        edit: {
            mention: (props) => <MentionEditor {...props} items={items} trigger={trigger} href={href} />,
        },
        hotkeys: {
            // Inserts an empty mention that the `edit` view takes over.
            [trigger]: { label: 'Mention someone', run: (api) => api.insert('mention') },
        },
    });
};
