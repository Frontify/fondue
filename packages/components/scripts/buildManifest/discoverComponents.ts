/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import path from 'node:path';

import { globSync } from 'glob';

import { type DiscoveredComponent } from './types';
import { resolveFromRoot } from './utils';

type MetadataJson = {
    name?: string;
    filePath?: string;
    dirPath?: string;
    storyFilePaths?: string[];
};

export const discoverComponents = (): DiscoveredComponent[] => {
    const metadataFiles = globSync(resolveFromRoot('src/components/**/*.metadata.json'));
    const components: DiscoveredComponent[] = [];

    for (const metadataFilePath of metadataFiles) {
        let data: MetadataJson;
        try {
            data = JSON.parse(readFileSync(metadataFilePath, 'utf-8')) as MetadataJson;
        } catch (error) {
            console.warn(`Failed to parse ${metadataFilePath}: ${(error as Error).message}`);
            continue;
        }

        if (!data.filePath) {
            continue;
        }

        const name = data.name || path.basename(data.filePath, path.extname(data.filePath));
        const dirPath = path.dirname(data.filePath);
        const storyFilePaths = (data.storyFilePaths ?? []).map((p) => resolveFromRoot(p));

        components.push({ name, filePath: data.filePath, dirPath, storyFilePaths });
    }

    return components.sort((a, b) => a.name.localeCompare(b.name));
};
