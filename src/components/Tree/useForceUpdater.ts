/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useReducer } from 'react';

export const useForceUpdater = () => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    return forceUpdate as () => void;
};
