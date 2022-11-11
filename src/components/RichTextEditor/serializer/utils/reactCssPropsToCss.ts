/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AnyObject } from '@udecode/plate';
import { convertCamelCaseToKebabCase } from './convertCamelCaseToKebabCase';

export const reactCssPropsToCss = (props?: AnyObject): string => {
    if (!props) {
        return '';
    }
    return Object.keys(props)
        .map((key) => `${convertCamelCaseToKebabCase(key)}: ${props[key]};`)
        .join(' ');
};
