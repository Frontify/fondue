/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineInline } from '#/core';

import { isSafeHref } from '../shared/helpers/href';

import { MentionLink } from './components/MentionLink';
import styles from './mention.module.scss';
import { type MentionItem, type MentionKind, type MentionValue } from './types';

/** What the content of a mention depends on: how it reads and where it links. */
export type MentionContentOptions = {
    /**
     * Where a mention links to: the person's or group's profile. Without it,
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

/** The hotkey fires on a single typed character, so a longer trigger could never start a mention. */
export const assertMentionTrigger = (trigger: string, factory: string): void => {
    if ([...trigger].length !== 1) {
        throw new Error(`${factory}: \`trigger\` must be exactly one character, got "${trigger}".`);
    }
};

/** The app's `href` is held to what a link is: a `javascript:` profile URL is left off. */
export const safeMentionHref = (href: MentionContentOptions['href'], mention: MentionValue): string | undefined => {
    const target = href?.(mention);
    return target !== undefined && isSafeHref(target) ? target : undefined;
};

/** A mention: the username as a link to the person (or group), full name on hover. */
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
