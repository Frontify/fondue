/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MENTION_KINDS, type MentionHref, type MentionKind, type MentionValue } from '../types';

import { safeMentionHref } from './mention';
import { MENTION_STRINGS } from './strings';
import { withoutControlCharacters } from './text';

/**
 * What a mention shows. Every view draws this and nothing else, so they cannot
 * disagree. `label` is the trigger and the username, or a name for the kind when
 * there is no username; `title` is shown on hover. A mention links only when the
 * app gives a safe target.
 */
export type MentionDisplay =
    | { status: 'linked'; label: string; title: string; href: string }
    | { status: 'text'; label: string; title: string };

type MentionDisplayOptions = {
    href?: MentionHref;
    trigger: string;
};

/**
 * Stored documents are not validated: a field that is not a string reads as empty.
 */
const storedString = (field: unknown): string => {
    if (typeof field !== 'string') {
        return '';
    }
    return field;
};

/** An unknown kind or a non-string reads as none. */
export const storedKind = (value: unknown): MentionKind | undefined => MENTION_KINDS.find((known) => known === value);

/** The `data-mention-*` attributes that name the mentioned person in exported markup. */
export const mentionAttributes = (mention: MentionValue) => ({
    'data-mention-id': storedString(mention.id),
    'data-mention-username': storedString(mention.username),
    'data-mention-kind': storedKind(mention.kind),
});

const storedText = (field: unknown): string => withoutControlCharacters(storedString(field));

/** Shown in place of a stored username that is empty or not text. */
const unknownLabel = (kind: MentionKind | undefined): string => {
    switch (kind) {
        case undefined:
        case 'user':
            return MENTION_STRINGS.unknownPerson;
        case 'group':
            return MENTION_STRINGS.unknownGroup;
        case 'all':
            return MENTION_STRINGS.unknownMention;
        default:
            // Adding a kind fails to compile here until it is handled.
            throw new Error(`Unhandled mention kind: ${JSON.stringify(kind satisfies never)}`);
    }
};

const labelOf = (username: string, trigger: string, kind: MentionKind | undefined): string => {
    if (username === '') {
        return unknownLabel(kind);
    }
    return `${trigger}${username}`;
};

/** What a mention shows from its stored value. A throw from `href` is not caught. */
export const mentionDisplay = (mention: MentionValue, { href, trigger }: MentionDisplayOptions): MentionDisplay => {
    const kind = storedKind(mention.kind);
    const label = labelOf(storedText(mention.username), trigger, kind);
    const title = storedText(mention.name);
    const target = safeMentionHref(href, mention);
    if (target === undefined) {
        return { status: 'text', label, title };
    }
    return { status: 'linked', label, title, href: target };
};

export const linkTarget = (display: MentionDisplay): string | undefined => {
    switch (display.status) {
        case 'linked':
            return display.href;
        case 'text':
            return undefined;
        default:
            // Adding a display status fails to compile here until it is handled.
            throw new Error(`Unhandled mention display: ${JSON.stringify(display satisfies never)}`);
    }
};
