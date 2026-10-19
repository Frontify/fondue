/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AriaAttributes, type AriaRole } from 'react';

/**
 * The small, curated subset of ARIA attributes (plus `role`) that we expose on most
 * Fondue components. Each attribute reuses React's canonical type from `AriaAttributes`
 * so the shape stays in lockstep with what consumers spread from `HTMLAttributes` —
 * no hand-typed `boolean`-vs-`Booleanish` drift.
 *
 * Keep this set intentionally small. If a component needs an ARIA attribute outside
 * this list, declare it explicitly on that component's props rather than expanding
 * the common surface.
 */
export type CommonAriaProps = Pick<
    AriaAttributes,
    | 'aria-label'
    | 'aria-labelledby'
    | 'aria-describedby'
    | 'aria-hidden'
    | 'aria-expanded'
    | 'aria-haspopup'
    | 'aria-keyshortcuts'
> & {
    role?: AriaRole;
};

/**
 * Merges ID-list ARIA attributes (`aria-describedby`, `aria-labelledby`, ...) so a
 * component's own internal ID can coexist with one provided by the caller. Falsy and
 * duplicate entries are dropped; returns `undefined` when nothing is left, so the
 * attribute is omitted rather than rendered empty.
 */
export const mergeAriaIds = (...ids: (string | undefined | false)[]): string | undefined => {
    const merged = [...new Set(ids.filter((id): id is string => typeof id === 'string' && id.trim() !== ''))];

    return merged.length > 0 ? merged.join(' ') : undefined;
};

/**
 * Global HTML attributes with accessibility semantics that are not part of ARIA.
 *
 * `lang` is exposed so consumers can satisfy WCAG 3.1.2 (Language of Parts) when a
 * component renders content in a different language than the surrounding document.
 */
export type CommonGlobalProps = {
    /**
     * language tag describing the language of the element's content, for example `fr-CH`.
     */
    lang?: string;
};
