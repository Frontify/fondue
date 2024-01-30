/* (c) Copyright Frontify Ltd., all rights reserved. */

import { generateRandomId } from '@utilities/generateRandomId';
import { useMemo } from 'react';

// Used to make sure that ids persist during rerenders
// framer motion needs persistent ids in order to properly animate elements
export const useMemoizedId = (id?: string): string => useMemo(() => id || generateRandomId(), [id]);
