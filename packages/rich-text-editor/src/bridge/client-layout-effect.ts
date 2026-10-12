/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useLayoutEffect } from 'react';

// React warns when useLayoutEffect runs during server rendering, so the server gets useEffect, which never runs there.
let useClientLayoutEffect = useEffect;
if (typeof document !== 'undefined') {
    useClientLayoutEffect = useLayoutEffect;
}

export { useClientLayoutEffect };
