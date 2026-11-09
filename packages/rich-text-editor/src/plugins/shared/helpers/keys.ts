/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent } from 'react';

/**
 * True while an input-method composition is in progress, keyCode 229 on some browsers.
 */
export const isCompositionKey = (event: KeyboardEvent): boolean =>
    event.nativeEvent.isComposing || event.keyCode === 229;
