/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isSafeHref, schemeOf } from '../../shared/helpers/href';

/**
 * What an `<img>` may load: a web or relative URL; `data:`, `javascript:` and other schemes are refused
 */
export const isSafeImageSrc = (src: unknown): src is string => {
    if (typeof src !== 'string') {
        return false;
    }
    if (!isSafeHref(src)) {
        return false;
    }
    const scheme = schemeOf(src);
    return scheme === null || scheme === 'http:' || scheme === 'https:';
};
