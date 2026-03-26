/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TokenLeaf } from './types';

export const isTokenLeaf = (value: unknown): value is TokenLeaf =>
    typeof value === 'object' && value !== null && 'name' in value && 'type' in value && 'value' in value;

export const isCompositeToken = (value: unknown): boolean => {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    const entries = Object.values(value);
    return entries.length > 0 && entries.every((v) => isTokenLeaf(v));
};
