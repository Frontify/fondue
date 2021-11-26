/* (c) Copyright Frontify Ltd., all rights reserved. */

export const doesContainSubstring = (source: string, target: string): boolean =>
    source.toLowerCase().includes(target.toLowerCase());
