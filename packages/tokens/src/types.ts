/* (c) Copyright Frontify Ltd., all rights reserved. */

export type TokenSelector = {
    collection: string;
    path?: string[];
    /** 'variable' (default): abstracted behind a CSS custom property. 'value': inlined build-time constant (e.g. breakpoints, which are used in media queries where var() is invalid). */
    output?: 'value';
    /** Unit appended to numeric values; 'rem' also divides by 16. */
    unit?: 'px' | 'rem';
    /** Maps Figma path segments to canonical names (e.g. 'x-small' -> 'xs'). */
    rename?: Record<string, string>;
};

export type Config = {
    defaultTheme: string;
    themes: string[];
    figmaFileKey: string;
    excludeTokens: string[];
    tokenTypes: Record<string, TokenSelector[]>;
};

export type FigmaResponse = {
    meta: {
        variableCollections: FigmaVariableCollections;
        variables: FigmaVariables;
    };
};

export type FigmaVariableCollections = { [key: string]: FigmaVariableCollection };
export type FigmaVariables = { [key: string]: FigmaVariable };

type FigmaVariable = {
    id: string;
    name: string;
    remote: boolean;
    key: string;
    variableCollectionId: string;
    resolvedType: string;
    description: string;
    hiddenFromPublishing: boolean;
    valuesByMode: { [key: string]: FigmaVariableValue };
    deletedButReferenced?: boolean;
};

export type FigmaVariableAliasValue = {
    type: 'VARIABLE_ALIAS';
    id: string;
};
export type FigmaVariableColorValue = {
    r: number;
    g: number;
    b: number;
    a: number;
};
export type FigmaVariableStringValue = string;
export type FigmaVariableNumberValue = number;
export type FigmaVariableBooleanValue = boolean;
export type FigmaVariableValue =
    | FigmaVariableColorValue
    | FigmaVariableStringValue
    | FigmaVariableNumberValue
    | FigmaVariableBooleanValue
    | FigmaVariableAliasValue;

type FigmaVariableCollection = {
    defaultModeId: string;
    id: string;
    name: string;
    remote: boolean;
    modes: {
        modeId: string;
        name: string;
    }[];
    key: string;
    hiddenFromPublishing: boolean;
    variableIds: string[];
};

export type AssembledVariable = {
    name: string;
    type: string;
    value: FigmaVariableValue | BoxShadowValue | null;
    /** Kept top-level (not in attributes) so it survives into the published JSON objects and the manifest. */
    output?: 'value';
    attributes: {
        collection: string;
        type: string;
        theme: string;
        unit?: 'px' | 'rem';
    };
};

export type BoxShadowValue = {
    [key: string]: string | number;
};
