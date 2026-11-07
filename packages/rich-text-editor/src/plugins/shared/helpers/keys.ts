/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent } from 'react';

/** The key that confirms an input-method composition is not a command; browsers report keyCode 229 for it. */
export const isCompositionKey = (event: KeyboardEvent): boolean =>
    event.nativeEvent.isComposing || event.keyCode === 229;
