/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LeafType } from '../../types';

const createElement = <T>(type: string, children: Array<T>) => {
    return {
        type,
        children,
    };
};

const createLeafElement = (children: LeafType): LeafType => {
    return children;
};

export const createText = (text: string) => createLeafElement({ text });
export const createBoldText = (text: string) => createLeafElement({ bold: true, text });
export const createItalicText = (text: string) => createLeafElement({ italic: true, text });
export const createStrikethroughText = (text: string) => createLeafElement({ strikethrough: true, text });
export const createCodeText = (text: string) => createLeafElement({ code: true, text });
export const createP = <T>(children: Array<T>) => createElement('p', children);
export const createOl = <T>(children: Array<T>) => createElement('ol', children);
export const createUl = <T>(children: Array<T>) => createElement('ul', children);
export const createLi = <T>(children: Array<T>) => createElement('li', children);
export const createLic = (text: string) => createElement('lic', [{ text }]);
