/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';

import { generateRandomId } from '@utilities/generateRandomId';

// Used to make sure that ids persist during rerenders
// framer motion needs persistent ids in order to properly animate elements
export const useMemoizedId = (id?: string): string => useMemo(() => id || generateRandomId(), [id]);
