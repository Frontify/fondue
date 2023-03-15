/* (c) Copyright Frontify Ltd., all rights reserved. */

const createListElement = <T>(type: string, children: Array<T>) => {
    return {
        type,
        children,
    };
};

export const createOl = <T>(children: Array<T>) => createListElement('ol', children);
export const createUl = <T>(children: Array<T>) => createListElement('ul', children);

export const createLi = <T>(children: Array<T>) => createListElement('li', children);

export const createLic = (text: string) => createListElement('lic', [{ text }]);
