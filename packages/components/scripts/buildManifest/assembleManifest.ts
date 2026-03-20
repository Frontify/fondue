/* (c) Copyright Frontify Ltd., all rights reserved. */

import { writeFileSync } from 'node:fs';

import type {
    ComponentManifest,
    ComponentRef,
    DiscoveredComponent,
    Example,
    GlobalManifest,
    PropInfo,
    SubComponent,
} from './types';
import { resolveFromRoot } from './utils';

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

export function assembleComponentManifest(input: AssembleInput): ComponentManifest {
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
}

export function writeComponentManifest(manifest: ComponentManifest, dirPath: string): void {
    const outputPath = resolveFromRoot(dirPath, `${manifest.name}.manifest.json`);
    writeFileSync(outputPath, JSON.stringify(manifest), 'utf-8');
}

export function writeGlobalManifest(
    components: ComponentManifest[],
    packageName: string,
): void {
    const refs: Record<string, ComponentRef> = {};
    for (const c of components) {
        refs[c.name] = {
            name: c.name,
            description: c.description,
            status: c.status,
            category: c.category,
            tags: c.tags,
            subComponentNames: c.subComponents.map((s) => s.name),
            manifestPath: `${c.filePath.replace(/\/[^/]+\.tsx?$/, '')}/${c.name}.manifest.json`,
        };
    }

    const global: GlobalManifest = {
        schemaVersion: '1.0.0',
        packageName,
        generatedAt: new Date().toISOString(),
        components: refs,
    };

    const outputPath = resolveFromRoot('manifest.json');
    writeFileSync(outputPath, JSON.stringify(global), 'utf-8');
}
