/* (c) Copyright Frontify Ltd., all rights reserved. */

export type Config = {
    defaultTheme: string;
    themes: string[];
    figmaFileKey: string;
    excludeTokens: string[];
    tokenTypes: {
        theme: { collection: string; path?: string[] }[];
        primitive: { collection: string; path?: string[] }[];
        semantic: { collection: string; path?: string[] }[];
    };
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
    attributes: {
        collection: string;
        type: string;
        theme: string;
    };
};

export type BoxShadowValue = {
    [key: string]: string | number;
};
