/* (c) Copyright Frontify Ltd., all rights reserved. */

/** keyCode an IME reports on the keydowns just before and after a composition. isComposing is false on the confirming Enter. */
const IME_KEY_CODE = 229;

export const isImeKey = (event: { nativeEvent: { isComposing: boolean }; keyCode: number }): boolean => {
    if (event.nativeEvent.isComposing) {
        return true;
    }
    return event.keyCode === IME_KEY_CODE;
};