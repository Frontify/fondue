/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineInline, definePlugin, type RtePlugin } from '#/core';

import { MentionEditor } from './components/MentionEditor';
import { BIDI_ISOLATE_TAG, MentionLink } from './components/MentionLink';
import { linkTarget, mentionAttributes, mentionDisplay, storedKind } from './helpers/display';
import { mentionValueOf } from './helpers/mention';
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
                    const target = linkTarget(shown);
                    return {
                        tag: target === undefined ? 'span' : 'a',
                        attrs: {
                            href: target,
                            title: shown.title,
                            ...mentionAttributes(mention),
                            class: styles.mention ?? '',
                        },
                        children: [{ tag: BIDI_ISOLATE_TAG, children: shown.label }],
                    };
                },

                // Reads back what `toHtml` wrote, so a copied mention pastes as a
                // mention. Without an id and a username it names nobody, and
                // stays the link or text it is. A kind this version does not know
                // reads as a person.
                parse: [
                    {
                        tag: 'a[data-mention-id], span[data-mention-id]',
                        value: (element) => {
                            const id = element.dataset.mentionId ?? '';
                            const username = element.dataset.mentionUsername ?? '';
                            const kind = storedKind(element.dataset.mentionKind);
                            if (id === '' || username === '') {
                                return null;
                            }
                            return mentionValueOf({ id, username, name: element.title, kind });
                        },
                    },
                ],

                render: {
                    component: ({ value }) => (
                        <MentionLink value={value} display={mentionDisplay(value, { href, trigger })} />
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
