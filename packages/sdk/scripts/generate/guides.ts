/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Loads the markdown guides bundled with the SDK from packages/sdk/guides,
 * including nested directories. The id is the path relative to the guides dir
 * without the `.md` extension, e.g. guides/getting-started/installation.md →
 * id "getting-started/installation". The title is extracted from the first
 * `# Title` line of the markdown, falling back to the id.
 */

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { duplicateErrors } from './utils';

export interface SdkGuide {
    id: string;
    title: string;
    content: string;
}

const guidesDir = join(dirname(fileURLToPath(import.meta.url)), '../../guides');

const titleFromMarkdown = (md: string, fallback: string): string => {
    const match = /^#\s+(.+)$/m.exec(md);
    return match ? match[1].trim() : fallback;
};

export interface GeneratedGuides {
    guides: SdkGuide[];
    errors: string[];
}

export const generateGuides = (): GeneratedGuides => {
    const guides = readdirSync(guidesDir, { recursive: true, encoding: 'utf8' })
        .filter((file) => file.endsWith('.md'))
        .sort()
        .map((file): SdkGuide => {
            const slug = file.split(sep).join('/').replace(/\.md$/, '');
            const content = readFileSync(join(guidesDir, file), 'utf8');
            return { id: slug, title: titleFromMarkdown(content, slug), content };
        });

    return {
        guides,
        errors: duplicateErrors(
            'guide id',
            guides.map((guide) => guide.id),
        ),
    };
};
