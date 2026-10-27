/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineInline, type RtePlugin } from '#/core';

import { isSafeHref } from '../shared/helpers/href';

import { MentionDraft } from './components/MentionDraft';
import { MentionLink } from './components/MentionLink';
import styles from './mention.module.scss';
import { type MentionItem, type MentionItems, type MentionKind, type MentionValue } from './types';

export type MentionPluginOptions = {
    /**
     * Who can be mentioned. A list is searched by username and name, ignoring
     * case. A function is handed what has been typed after the trigger and
     * returns the matches — or a promise of them, to search on a server; an
     * answer that arrives after the query moved on is dropped.
     */
    items: readonly MentionItem[] | MentionItems;
    /**
     * Where a mention links to — the person's or group's profile. Without it,
     * or where it returns `undefined` (`@all` has no profile), the mention is
     * text, not a link.
     */
    href?: (mention: MentionValue) => string | undefined;
    /** The one character that starts a mention. `@` unless the app needs something else. */
    trigger?: string;
};

const KINDS: readonly MentionKind[] = ['user', 'group', 'all'];

/** What the document keeps of a chosen item: no avatar, and no `kind` for a person, as before kinds existed. */
export const mentionValueOf = ({ id, username, name, kind }: MentionItem): MentionValue =>
    kind === undefined || kind === 'user' ? { id, username, name } : { id, username, name, kind };

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
 * through an ordinary hotkey, and `render.edit` draws the query, list and choice.
 */
export const mentionPlugin = (options: MentionPluginOptions): RtePlugin => {
    const { href, trigger = '@' } = options;
    // The hotkey fires on a single typed character, so a longer trigger could never start a mention.
    if ([...trigger].length !== 1) {
        throw new Error(`mentionPlugin: \`trigger\` must be exactly one character, got "${trigger}".`);
    }
    const items = typeof options.items === 'function' ? options.items : searchIn(options.items);
    // The app's `href` is held to what a link is: a `javascript:` profile URL is left off.
    const safeHref = (mention: MentionValue): string | undefined => {
        const target = href?.(mention);
        return target !== undefined && isSafeHref(target) ? target : undefined;
    };
    return {
        id: 'mention',
        inlines: {
            mention: defineInline<MentionValue>({
                // Portable markup for the clipboard: a plain link (or text, with
                // nowhere to link to), no tooltip.
                toHtml: (mention) => {
                    const target = safeHref(mention);
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
                    component: ({ value }) => <MentionLink value={value} href={safeHref(value)} trigger={trigger} />,

                    // `value` is null until someone is chosen.
                    edit: ({ value, setValue, isFocused, remove, api }) =>
                        value === null ? (
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
                        ) : (
                            <MentionLink value={value} href={safeHref(value)} trigger={trigger} />
                        ),
                },
            }),
        },
        hotkeys: {
            // Inserts an empty mention that `render.edit` takes over.
            [trigger]: (api) => api.insert('mention'),
        },
    };
};
