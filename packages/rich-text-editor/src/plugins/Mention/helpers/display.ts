/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isSafeHref } from '../../shared/helpers/href';
import { withoutControlCharacters } from '../../shared/helpers/text';
import { type MentionResolution, type MentionValue } from '../types';

/** What a mention shows. Every view draws this and nothing else, so they cannot disagree. */
export type MentionDisplay = {
    /** The trigger, the username, and a note when the person is unavailable. */
    label: string;
    /** Shown on hover. */
    title: string;
    /** Where it links to; absent when unavailable, without a target, or not a safe link. */
    href: string | undefined;
    unavailable: boolean;
};

type MentionDisplayOptions = {
    resolve?: ((mention: MentionValue) => MentionResolution) | undefined;
    href?: ((mention: MentionValue) => string | undefined) | undefined;
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
    let username = withoutControlCharacters(mention.username);
    let name = withoutControlCharacters(mention.name);
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
        return { label: `${trigger}${username} (unavailable)`, title: name, href: undefined, unavailable: true };
    }
    const target = href?.(mention);
    return {
        label: `${trigger}${username}`,
        title: name,
        href: target !== undefined && isSafeHref(target) ? target : undefined,
        unavailable: false,
    };
};
