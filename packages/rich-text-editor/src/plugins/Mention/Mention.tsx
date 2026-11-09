/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineInline, definePlugin, type EditProps, type RtePlugin } from '#/core';

import { MentionDraft } from './components/MentionDraft';
import { MentionLink } from './components/MentionLink';
import { mentionDisplay, storedKind, storedString } from './helpers/display';
import styles from './mention.module.scss';
import { MENTION_KINDS, type MentionItem, type MentionItems, type MentionResolution, type MentionValue } from './types';

export type MentionContentOptions = {
    /**
     * Returns where a mention links to, such as the profile of a person or group.
     * Without it, or where it returns `undefined`, the mention is plain text.
     */
    href?: (mention: MentionValue) => string | undefined;
    /**
     * What the app knows now about a stored mention: a renamed person shows
     * their current username and name, a deleted or forbidden one shows the
     * stored username marked unavailable, with no link. Without it, or for
     * `unknown`, the stored value shows. The document is never changed.
     */
    resolve?: (mention: MentionValue) => MentionResolution;
    /**
     * The single character that starts a mention
     * @default '@'
     */
    trigger?: string;
};

/**
 * Returns what the document keeps of a chosen item: no avatar, and no `kind` for a person, as before kinds existed
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
 * A mention, shown as the username linked to the person or group, with the full name on hover
 */
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
    const { href, resolve, trigger = '@' } = options;
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
