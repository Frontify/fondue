/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

import { resolveFromRoot } from './utils';

export type MetadataResult = {
    description: string;
    instructions: string;
};

export function readMetadata(dirPath: string, componentName: string): MetadataResult | null {
    const metaFilePath = resolveFromRoot(dirPath, `${componentName}.metadata.md`);

    if (!existsSync(metaFilePath)) {
        return null;
    }

    const raw = readFileSync(metaFilePath, 'utf-8');
    const { data, content } = matter(raw);

    return {
        description: (data.description as string | undefined) ?? '',
        instructions: content.trim(),
    };
}
