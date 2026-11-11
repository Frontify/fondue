/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent } from 'react';

/**
 * The keyCode some browsers report for every key pressed during an input-method composition.
 */
const IME_KEY_CODE = 229;

/**
 * True while an input-method composition is in progress, keyCode 229 on some browsers.
 */
export const isCompositionKey = (event: KeyboardEvent): boolean =>
    event.nativeEvent.isComposing || event.keyCode === IME_KEY_CODE;
