/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isSafeHref } from '../../shared/helpers/href';
import { withoutControlCharacters } from '../../shared/helpers/text';
import { MENTION_KINDS, type MentionKind, type MentionResolution, type MentionValue } from '../types';

/** What a mention shows. Every view draws this and nothing else, so they cannot disagree. */
export type MentionDisplay = {
    /** The trigger, the username, and a note when the person is unavailable. */
    label: string;
    /** Shown on hover. */
    title: string;
    /** Where it links to; absent when unavailable, without a target, or not a safe link. */
    href: string | undefined;
};

type MentionDisplayOptions = {
    resolve?: (mention: MentionValue) => MentionResolution;
    href?: (mention: MentionValue) => string | undefined;
    trigger: string;
};

/** A lookup that throws or answers with something else is no answer: the stored value shows. */
const resolutionOf = (
    mention: MentionValue,
    resolve: MentionDisplayOptions['resolve'],
): MentionResolution | undefined => {
    try {
        return resolve?.(mention);
    } catch {
        return undefined;
    }
};

/** Stored documents are not validated: a field that is not a string reads as empty. */
export const storedString = (field: unknown): string => {
    if (typeof field !== 'string') {
        return '';
    }
    return field;
};

/** A stored kind this version does not know, or a non-string, writes no attribute. */
export const storedKind = (value: unknown): MentionKind | undefined => MENTION_KINDS.find((known) => known === value);

/** A stored field as shown: control and bidirectional characters removed. */
const storedText = (field: unknown): string => withoutControlCharacters(storedString(field));

/**
 * What a mention shows, from the stored value and what the app knows now: the
 * current username and name, or the stored ones with a note when the person is
 * unavailable. The stored value is never changed.
 */
export const mentionDisplay = (
    mention: MentionValue,
    { resolve, href, trigger }: MentionDisplayOptions,
): MentionDisplay => {
    const resolution = resolutionOf(mention, resolve);
    let username = storedText(mention.username);
    let name = storedText(mention.name);
    if (resolution?.status === 'current' && typeof resolution.username === 'string') {
        const currentUsername = withoutControlCharacters(resolution.username);
        if (currentUsername !== '') {
            username = currentUsername;
            if (typeof resolution.name === 'string') {
                name = withoutControlCharacters(resolution.name);
            }
        }
    }
    if (resolution?.status === 'unavailable') {
        return { label: `${trigger}${username} (unavailable)`, title: name, href: undefined };
    }
    const target = href?.(mention);
    return {
        label: `${trigger}${username}`,
        title: name,
        href: target !== undefined && isSafeHref(target) ? target : undefined,
    };
};
