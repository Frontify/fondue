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
