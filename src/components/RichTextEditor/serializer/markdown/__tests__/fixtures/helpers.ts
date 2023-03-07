/* (c) Copyright Frontify Ltd., all rights reserved. */

const createListElement = <T>(type: string, children: Array<T>) => {
    return {
        type,
        children,
    };
};

export const createOL = <T>(children: Array<T>) => createListElement('ol', children);
export const createUL = <T>(children: Array<T>) => createListElement('ul', children);

export const createLI = <T>(children: Array<T>) => createListElement('li', children);

export const createLIC = (text: string) => createListElement('lic', [{ text }]);

export const createP = (text: string) => createListElement('p', [{ text }]);
