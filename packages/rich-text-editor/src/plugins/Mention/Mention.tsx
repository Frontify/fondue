/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineInline, definePlugin, type RtePlugin } from '#/core';

import { MentionEditor } from './components/MentionEditor';
import { MentionLink } from './components/MentionLink';
import { mentionAttributes, mentionDisplay, resolvedUnknownLabels } from './helpers/display';
import styles from './mention.module.scss';
import {
    type MentionHref,
    type MentionItem,
    type MentionItems,
    type MentionUnknownLabels,
    type MentionValue,
    MENTION_KINDS,
} from './types';

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
    /**
     * What a stored mention with no username shows, for each kind. The label is content, so the
     * editor's locale does not apply: pass text in the document's language. A kind left out keeps
     * its English label. A blank label throws.
     * @default { user: 'Unknown person', group: 'Unknown group', all: 'Unknown mention' }
     */
    unknownLabels?: MentionUnknownLabels;
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
 * Only whitespace, control and format characters (such as a zero-width space or a direction mark): nothing a
 * reader sees.
 */
const INVISIBLE_ONLY = /^[\s\p{Cc}\p{Cf}]*$/u;

/**
 * Throws when a label the host gave is blank
 */
const assertUnknownLabels = (unknownLabels: MentionUnknownLabels | undefined, factory: string): void => {
    for (const kind of MENTION_KINDS) {
        const label = unknownLabels?.[kind];

        // A blank label draws a mention with no text and no accessible name.
        if (label !== undefined && INVISIBLE_ONLY.test(label)) {
            throw new Error(`${factory}: \`unknownLabels.${kind}\` must not be blank.`);
        }
    }
};

/**
 * A mention, shown as the username linked to the person or group, with the full name on hover
 */
export const mentionContent = ({ href, trigger = '@', unknownLabels }: MentionContentOptions = {}) => {
    assertMentionTrigger(trigger, 'mentionContent');
    assertUnknownLabels(unknownLabels, 'mentionContent');
    const labels = resolvedUnknownLabels(unknownLabels);

    return defineContent({
        inlines: {
            mention: defineInline<MentionValue>({
                // Portable markup for the clipboard: a plain link (or text, with
                // nowhere to link to), no tooltip.
                toHtml: (mention) => {
                    const shown = mentionDisplay(mention, { href, trigger, unknownLabels: labels });
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
                            display={mentionDisplay(value, { href, trigger, unknownLabels: labels })}
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
    const { href, trigger = '@', unknownLabels } = options;
    assertMentionTrigger(trigger, 'mentionPlugin');
    assertUnknownLabels(unknownLabels, 'mentionPlugin');
    let items: MentionItems;
    if (typeof options.items === 'function') {
        items = options.items;
    } else {
        items = searchIn(options.items);
    }
    const labels = resolvedUnknownLabels(unknownLabels);

    return definePlugin({
        content: mentionContent({ href, trigger, unknownLabels }),
        edit: {
            mention: (props) => (
                <MentionEditor {...props} items={items} trigger={trigger} href={href} unknownLabels={labels} />
            ),
        },
        hotkeys: {
            // Inserts an empty mention that the `edit` view takes over.
            [trigger]: { label: 'Mention someone', run: (api) => api.insert('mention') },
        },
    });
};
