/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { convertCamelCaseToKebabCase } from './convertCamelCaseToKebabCase';

export const reactCssPropsToCss = (props?: CSSProperties): string => {
    if (!props) {
        return '';
    }

    return Object.keys(props).reduce<string>((acc, key) => {
        const value = props[key as keyof CSSProperties];
        return value ? `${acc}${convertCamelCaseToKebabCase(key)}: ${value}; ` : acc;
    }, '');
};
