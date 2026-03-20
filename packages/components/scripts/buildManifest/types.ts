/* (c) Copyright Frontify Ltd., all rights reserved. */

export type PropInfo = {
    name: string;
    type: string;
    required: boolean;
    defaultValue: string | null;
    description: string;
};

export type SubComponent = {
    name: string;
    props: PropInfo[];
};

export type Example = {
    name: string;
    storyName: string;
    description: string;
    code: string;
    sourceFile: string;
    isCanonical: boolean;
};

export type ComponentManifest = {
    name: string;
    description: string;
    status: string;
    category: string;
    tags: string[];
    relatedComponents: string[];
    importStatement: string;
    filePath: string;
    props: PropInfo[];
    subComponents: SubComponent[];
    examples: Example[];
    instructions: string;
};

export type ComponentRef = {
    name: string;
    description: string;
    status: string;
    category: string;
    tags: string[];
    subComponentNames: string[];
    manifestPath: string;
};

export type GlobalManifest = {
    schemaVersion: string;
    packageName: string;
    generatedAt: string;
    components: Record<string, ComponentRef>;
};

export type DiscoveredComponent = {
    name: string;
    filePath: string;
    dirPath: string;
    storyFilePaths: string[];
};
