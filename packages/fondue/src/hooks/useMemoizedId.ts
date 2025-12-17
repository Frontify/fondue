/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';

import { generateRandomId } from '@utilities/generateRandomId';

// Used to make sure that ids persist during rerenders
// framer motion needs persistent ids in order to properly animate elements

/**
 * @deprecated This hook is deprecated and will be removed in the next major version. Please use [useId() from react](https://react.dev/reference/react/useId) instead.
 */
export const useMemoizedId = (id?: string): string => useMemo(() => id || generateRandomId(), [id]);
