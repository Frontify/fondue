/* (c) Copyright Frontify Ltd., all rights reserved. */

import { writeFileSync } from 'node:fs';
import path from 'node:path';

import {
    type ComponentManifest,
    type ComponentRef,
    type DiscoveredComponent,
    type Example,
    type GlobalManifest,
    type PropInfo,
    type SubComponent,
} from './types';

export type AssembleInput = {
    component: DiscoveredComponent;
    mainProps: PropInfo[];
    subComponents: SubComponent[];
    examples: Example[];
    description: string;
    status: string;
    category: string;
    tags: string[];
    relatedComponents: string[];
    instructions: string;
    packageName: string;
    typeDefinitions: Record<string, string>;
};

export const assembleComponentManifest = (input: AssembleInput): ComponentManifest => {
    return {
        name: input.component.name,
        description: input.description,
        status: input.status,
        category: input.category,
        tags: input.tags,
        relatedComponents: input.relatedComponents,
        importStatement: `import { ${input.component.name} } from '${input.packageName}';`,
        filePath: input.component.filePath,
        props: input.mainProps,
        subComponents: input.subComponents,
        examples: input.examples,
        instructions: input.instructions,
        typeDefinitions: input.typeDefinitions,
    };
};

export const writeComponentManifest = (manifest: ComponentManifest, dirPath: string): void => {
    const outputPath = path.join(dirPath, `${manifest.name}.manifest.json`);
    writeFileSync(outputPath, JSON.stringify(manifest, null, 2), 'utf-8');
};

export const writeGlobalManifest = (components: ComponentManifest[], packageName: string, dirPath: string): void => {
    const refs: Record<string, ComponentRef> = {};
    for (const component of components) {
        refs[component.name] = {
            name: component.name,
            description: component.description,
            status: component.status,
            category: component.category,
            tags: component.tags,
            subComponentNames: component.subComponents.map((subComponent) => subComponent.name),
            manifestPath: `${component.name}.manifest.json`,
        };
    }

    const global: GlobalManifest = {
        schemaVersion: '1.0.0',
        packageName,
        generatedAt: new Date().toISOString(),
        components: refs,
    };

    const outputPath = path.join(dirPath, 'manifest.json');
    writeFileSync(outputPath, JSON.stringify(global, null, 2), 'utf-8');
};
