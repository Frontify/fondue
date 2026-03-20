/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync } from 'node:fs';

import { resolveFromRoot } from './utils';

export type MetadataResult = {
    description: string;
    category: string;
    tags: string[];
    relatedComponents: string[];
    instructions: string;
};

type MetadataJson = {
    description?: string;
    category?: string;
    tags?: string[];
    relatedComponents?: string[];
    instructions?: string;
};

export const readMetadata = (dirPath: string, componentName: string): MetadataResult | null => {
    const metaFilePath = resolveFromRoot(dirPath, `${componentName}.metadata.json`);

    if (!existsSync(metaFilePath)) {
        return null;
    }

    let data: MetadataJson;
    try {
        const raw = readFileSync(metaFilePath, 'utf-8');
        data = JSON.parse(raw) as MetadataJson;
    } catch (error) {
        console.warn(`Failed to parse ${metaFilePath}: ${(error as Error).message}`);
        return null;
    }

    return {
        description: data.description ?? '',
        category: data.category ?? '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        relatedComponents: Array.isArray(data.relatedComponents) ? data.relatedComponents : [],
        instructions: data.instructions ?? '',
    };
};
