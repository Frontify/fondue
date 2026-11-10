/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isSafeHref } from '../../shared/helpers/href';
import { type MentionContentOptions } from '../Mention';
import { type MentionItem, type MentionValue } from '../types';

/**
 * Returns what the document keeps of a chosen item, without the avatar
 */
export const mentionValueOf = ({ id, username, name, kind }: MentionItem): MentionValue => {
    if (kind === undefined || kind === 'user') {
        return { id, username, name };
    }
    return { id, username, name, kind };
};

/**
 * Returns the app's `href` for a mention, or `undefined` when the URL is unsafe, such as `javascript:`
 */
export const safeMentionHref = (href: MentionContentOptions['href'], mention: MentionValue): string | undefined => {
    const target = href?.(mention);
    if (target !== undefined && isSafeHref(target)) {
        return target;
    }
    return undefined;
};
