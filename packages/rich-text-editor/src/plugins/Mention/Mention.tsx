/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineInline, definePlugin, type EditProps, type RtePlugin } from '#/core';

import { isSafeHref } from '../shared/helpers/href';

import { MentionDraft } from './components/MentionDraft';
import { MentionLink } from './components/MentionLink';
import styles from './mention.module.scss';
import { type MentionItem, type MentionItems, type MentionKind, type MentionValue } from './types';

export type MentionContentOptions = {
    /**
     * Returns where a mention links to, such as the profile of a person or group.
     * Without it, or where it returns `undefined`, the mention is plain text.
     */
    href?: (mention: MentionValue) => string | undefined;
    /**
     * The single character that starts a mention
     * @default '@'
     */
    trigger?: string;
};

const KINDS: readonly MentionKind[] = ['user', 'group', 'all'];

/**
 * Returns what the document keeps of a chosen item, without the avatar
 */
export const mentionValueOf = ({ id, username, name, kind }: MentionItem): MentionValue =>
    kind === undefined || kind === 'user' ? { id, username, name } : { id, username, name, kind };

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
 * Returns the app's `href` for a mention, or `undefined` when the URL is unsafe, such as `javascript:`
 */
const safeMentionHref = (href: MentionContentOptions['href'], mention: MentionValue): string | undefined => {
    const target = href?.(mention);
    if (target !== undefined && isSafeHref(target)) {
        return target;
    }
    return undefined;
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
                    const target = safeMentionHref(href, mention);
                    return {
                        tag: target === undefined ? 'span' : 'a',
                        attrs: {
                            href: target,
                            title: mention.name,
                            'data-mention-id': mention.id,
                            'data-mention-username': mention.username,
                            'data-mention-kind': mention.kind,
                            class: styles.mention ?? '',
                        },
                        children: `${trigger}${mention.username}`,
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
                            const kind = KINDS.find((known) => known === element.dataset.mentionKind);
                            return id === '' || username === ''
                                ? null
                                : mentionValueOf({ id, username, name: element.title, kind });
                        },
                    },
                ],

                render: {
                    component: ({ value }) => (
                        <MentionLink value={value} href={safeMentionHref(href, value)} trigger={trigger} />
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
