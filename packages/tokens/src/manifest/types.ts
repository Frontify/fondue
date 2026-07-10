/* (c) Copyright Frontify Ltd., all rights reserved. */

export type TokenLeaf = {
    name: string;
    type: string;
    value: string;
    path?: string[];
    /** 'value' means the token is inlined as a raw value and has no CSS variable (e.g. breakpoints). */
    output?: string;
};

export type TokenTree = {
    [key: string]: TokenTree | TokenLeaf;
};

export type ManifestToken = {
    category: string;
    /** null for value-output tokens; use `value` directly instead. */
    cssVariable: string | null;
    id: string;
    keyPath: string[];
    /** 'variable': consume via `cssVariable`. 'value': there is no CSS variable, `value` holds the literal to use (e.g. '768px'). */
    output: 'variable' | 'value';
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
    packageName: string;
    tokens: ManifestToken[];
    utilities: ManifestUtility[];
};
