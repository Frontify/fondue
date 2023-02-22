/* (c) Copyright Frontify Ltd., all rights reserved. */

export const forceTabOutOfActiveElement = () => {
    (document.activeElement as HTMLElement)?.blur();
};
