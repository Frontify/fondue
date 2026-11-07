/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineInline, definePlugin, type EditProps, type RtePlugin } from '#/core';

import { MentionDraft } from './components/MentionDraft';
import { MentionLink } from './components/MentionLink';
import { mentionDisplay, storedKind, storedString } from './helpers/display';
import styles from './mention.module.scss';
import { MENTION_KINDS, type MentionItem, type MentionItems, type MentionResolution, type MentionValue } from './types';

/** What the content of a mention depends on: how it reads and where it links. */
export type MentionContentOptions = {
    /**
     * Where a mention links to: the person's or group's profile. Without it,
     * or where it returns `undefined` (`@all` has no profile), the mention is
     * text, not a link.
     */
    href?: (mention: MentionValue) => string | undefined;
    /**
     * What the app knows now about a stored mention: a renamed person shows
     * their current username and name, a deleted or forbidden one shows the
     * stored username marked unavailable, with no link. Without it, or for
     * `unknown`, the stored value shows. The document is never changed.
     */
    resolve?: (mention: MentionValue) => MentionResolution;
    /** The one character that starts a mention. `@` unless the app needs something else. */
    trigger?: string;
};

/** What the document keeps of a chosen item: no avatar, and no `kind` for a person, as before kinds existed. */
export const mentionValueOf = ({ id, username, name, kind }: MentionItem): MentionValue =>
    kind === undefined || kind === 'user' ? { id, username, name } : { id, username, name, kind };

/** The hotkey fires on a single typed character, so a longer trigger could never start a mention. */
export const assertMentionTrigger = (trigger: string, factory: string): void => {
    if ([...trigger].length !== 1) {
        throw new Error(`${factory}: \`trigger\` must be exactly one character, got "${trigger}".`);
    }
};

/** A mention: the username as a link to the person (or group), full name on hover. */
export const mentionContent = ({ href, resolve, trigger = '@' }: MentionContentOptions = {}) => {
    assertMentionTrigger(trigger, 'mentionContent');
    return defineContent({
        inlines: {
            mention: defineInline<MentionValue>({
                // Portable markup for the clipboard: a plain link (or text, with
                // nowhere to link to), no tooltip.
                toHtml: (mention) => {
                    const shown = mentionDisplay(mention, { resolve, href, trigger });
                    return {
                        tag: shown.href === undefined ? 'span' : 'a',
                        attrs: {
                            href: shown.href,
                            title: shown.title,
                            'data-mention-id': storedString(mention.id),
                            'data-mention-username': storedString(mention.username),
                            // The stored name, so the shown one never flows back into the document on paste.
                            'data-mention-name': storedString(mention.name),
                            'data-mention-kind': storedKind(mention.kind),
                            class: styles.mention ?? '',
                        },
                        // Isolated so a right-to-left name cannot reorder the text around it.
                        children: [{ tag: 'bdi', children: shown.label }],
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
                            // Copies from before `data-mention-name` carry the name in the title.
                            const name = element.dataset.mentionName ?? element.title;
                            const kind = MENTION_KINDS.find((known) => known === element.dataset.mentionKind);
                            return id === '' || username === '' ? null : mentionValueOf({ id, username, name, kind });
                        },
                    },
                ],

                render: {
                    component: ({ value }) => (
                        <MentionLink
                            value={value}
                            display={mentionDisplay(value, { resolve, href, trigger })}
                            focusableWhenUnlinked
                        />
                    ),
                },
            }),
        },
    });
};

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
    const { href, resolve, trigger = '@' } = options;
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
        return <MentionLink value={value} display={mentionDisplay(value, { resolve, href, trigger })} />;
    };

    return definePlugin({
        content: mentionContent({ href, resolve, trigger }),
        edit: { mention: MentionEditor },
        hotkeys: {
            // Inserts an empty mention that the `edit` view takes over.
            [trigger]: (api) => api.insert('mention'),
        },
    });
};
