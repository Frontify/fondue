/* (c) Copyright Frontify Ltd., all rights reserved. */

/* eslint-disable no-console */
import { useState } from 'react';

// SPEC-rich-text/AC-061: stories may call hooks in a render function and leave a disable comment open; both rules are `off` for `*.stories.tsx`.
export const Conditional = (props: { open: boolean }) => {
    if (props.open) {
        const [count] = useState(0);
        return count;
    }
    return null;
};
