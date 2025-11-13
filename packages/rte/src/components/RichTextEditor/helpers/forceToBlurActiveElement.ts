/* (c) Copyright Frontify Ltd., all rights reserved. */

export const forceToBlurActiveElement = () => {
    (document.activeElement as HTMLElement)?.blur();
};
