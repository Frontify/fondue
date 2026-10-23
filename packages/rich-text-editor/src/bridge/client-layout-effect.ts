/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useLayoutEffect } from 'react';

/**
 * `useLayoutEffect` in the browser and `useEffect` on the server. Public so a plugin overlay can keep its newest props
 * in a ref before any effect reads them, as the editor's own overlays do, without React's server rendering warning.
 */
let useClientLayoutEffect = useEffect;
if (typeof document !== 'undefined') {
    useClientLayoutEffect = useLayoutEffect;
}

export { useClientLayoutEffect };
