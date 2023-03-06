/* (c) Copyright Frontify Ltd., all rights reserved. */

export const isDescendant = (child: HTMLElement, parent: HTMLElement): boolean => {
    let node = child.parentNode;
    while (node !== null) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};
