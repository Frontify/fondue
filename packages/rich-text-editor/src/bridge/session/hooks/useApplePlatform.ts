/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSyncExternalStore } from 'react';

import { isApplePlatform } from '../helpers/platform';

const noChanges = () => () => undefined;

/**
 * The platform after hydration; the server and the hydrating render take the other platforms, so the markup matches.
 * Public so plugin UI that names a modifier, such as a hint to Mod+click, shows the one that its keys run on.
 */
export const useApplePlatform = (): boolean => useSyncExternalStore(noChanges, isApplePlatform, () => false);
