/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withoutControlCharacters } from '../../shared/helpers/text';
import { MENTION_KINDS, type MentionHref, type MentionKind, type MentionResolve, type MentionValue } from '../types';

import { safeMentionHref } from './mention';

/**
 * What a mention shows. Every view draws this and nothing else, so they cannot disagree.
 */
export type MentionDisplay = {
    /**
     * The trigger, the username, and a note when the person is unavailable.
     */
    label: string;
    /**
     * Shown on hover.
     */
    title: string;
    /**
     * Where it links to; absent when unavailable, without a target, or not a safe link.
     */
    href: string | undefined;
};

type MentionDisplayOptions = {
    resolve?: MentionResolve;
    href?: MentionHref;
    trigger: string;
};

/** Said after the username of someone the app no longer knows. */
const UNAVAILABLE_NOTE = '(unavailable)';

type MentionNames = { username: string; name: string };

/**
 * Stored documents are not validated: a field that is not a string reads as empty.
 */
export const storedString = (field: unknown): string => {
    if (typeof field !== 'string') {
        return '';
    }
    return field;
};

/**
 * A stored kind this version does not know, or a non-string, writes no attribute.
 */
export const storedKind = (value: unknown): MentionKind | undefined => MENTION_KINDS.find((known) => known === value);

/**
 * The `data-mention-*` attributes that let copied markup paste back as a mention.
 * They carry the stored value, so the shown name never flows back into the document on paste.
 */
export const mentionAttributes = (mention: MentionValue) => ({
    'data-mention-id': storedString(mention.id),
    'data-mention-username': storedString(mention.username),
    'data-mention-name': storedString(mention.name),
    'data-mention-kind': storedKind(mention.kind),
});

/**
 * A stored field as shown: control and bidirectional characters removed.
 */
const storedText = (field: unknown): string => withoutControlCharacters(storedString(field));

/**
 * The names to show for a person the app still knows: the current ones, unless
 * the username is not text or is empty once cleaned, which keeps the stored ones.
 */
const currentNames = (stored: MentionNames, current: MentionNames): MentionNames => {
    if (typeof current.username !== 'string') {
        return stored;
    }
    const username = withoutControlCharacters(current.username);
    if (username === '') {
        return stored;
    }
    if (typeof current.name !== 'string') {
        return { username, name: stored.name };
    }
    return { username, name: withoutControlCharacters(current.name) };
};

/**
 * What a mention shows, from the stored value and what the app knows now: the
 * current username and name, or the stored ones with a note when the person is
 * unavailable. The stored value is never changed. A throw from `resolve` or
 * `href` is not caught.
 */
export const mentionDisplay = (
    mention: MentionValue,
    { resolve, href, trigger }: MentionDisplayOptions,
): MentionDisplay => {
    const resolution = resolve?.(mention);
    const stored = { username: storedText(mention.username), name: storedText(mention.name) };
    let shown = stored;
    switch (resolution?.status) {
        case undefined:
        case 'unknown':
            break;
        case 'current':
            shown = currentNames(stored, resolution);
            break;
        case 'unavailable':
            return { label: `${trigger}${stored.username} ${UNAVAILABLE_NOTE}`, title: stored.name, href: undefined };
        default:
            // A resolver written in JS can return any status.
            throw new Error(`Unhandled mention resolution: ${JSON.stringify(resolution satisfies never)}`);
    }
    return { label: `${trigger}${shown.username}`, title: shown.name, href: safeMentionHref(href, mention) };
};
