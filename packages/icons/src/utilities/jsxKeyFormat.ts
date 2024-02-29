/* (c) Copyright Frontify Ltd., all rights reserved. */

import { kebabCaseToCamelCase } from './stringCasing';

type Attributes = {
    [key: string]: string;
};
export const htmlKeysToJsxKeys = (obj: Record<string, string>) =>
    Object.keys(obj).reduce((accumulator, k) => {
        const castedKey: string = kebabCaseToCamelCase(k);
        accumulator[castedKey] = obj[k] as string;
        return accumulator;
    }, {} as Attributes);
