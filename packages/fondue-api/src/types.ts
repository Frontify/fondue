/* (c) Copyright Frontify Ltd., all rights reserved. */

// Component types — two tiers: summary (from index) and detail (from per-component manifest)

export type ComponentSummary = {
    name: string;
    description: string;
    status: string;
    category: string;
    tags: string[];
    subComponentNames: string[];
};

export type ComponentDetail = ComponentSummary & {
    relatedComponents: string[];
    importStatement: string;
    props: PropInfo[];
    subComponents: SubComponentInfo[];
    examples: ComponentExample[];
    instructions: string;
    typeDefinitions: Record<string, string>;
};

export type PropInfo = {
    name: string;
    type: string;
    required: boolean;
    defaultValue: string | null;
    description: string;
    deprecated: boolean;
    deprecationMessage: string;
};

export type SubComponentInfo = {
    name: string;
    props: PropInfo[];
};

export type ComponentExample = {
    name: string;
    description: string;
    isCanonical: boolean;
    code: string;
};

// Token types

export type Token = {
    category: string;
    cssVariable: string;
    id: string;
    keyPath: string[];
    tailwindClass: string;
    themeable: boolean;
    type: string;
    value: string;
};

export type Utility = {
    id: string;
    keyPath: string[];
    properties: UtilityProperty[];
    tailwindClass: string;
    themeable: boolean;
};

export type UtilityProperty = {
    cssVariable: string;
    id: string;
    type: string;
    value: string;
};

// Icon types

export type Icon = {
    name: string;
    componentName: string;
    exportName: string;
    importPath: string;
    filled: boolean;
    availableSizes: number[];
    defaultSize: number;
    keywords: string[];
};

// Query option types

export type SearchOptions = {
    query: string;
    limit?: number;
};

export type CategoryFilter = {
    category: string;
    limit?: number;
};
