/* (c) Copyright Frontify Ltd., all rights reserved. */

export type TokenLeaf = {
    name: string;
    type: string;
    value: string;
    path?: string[];
};

export type TokenTree = {
    [key: string]: TokenTree | TokenLeaf;
};

export type ManifestToken = {
    category: string;
    cssVariable: string;
    id: string;
    keyPath: string[];
    tailwindClass: string;
    themeable: boolean;
    type: string;
    value: string;
};

export type UtilityProperty = {
    cssVariable: string;
    id: string;
    type: string;
    value: string;
};

export type ManifestUtility = {
    id: string;
    keyPath: string[];
    properties: UtilityProperty[];
    tailwindClass: string;
    themeable: boolean;
};

export type Manifest = {
    tokens: ManifestToken[];
    utilities: ManifestUtility[];
};
