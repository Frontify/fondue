/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Loads the markdown guides bundled with the SDK from packages/sdk/guides,
 * including nested directories. The id is the path relative to the guides dir
 * without the `.md` extension; the title is the same slug with dashes replaced
 * by spaces and the first letter uppercased, e.g. guides/getting-started/installation.md →
 * id "getting-started/installation", title "Getting started/installation".
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
            const title = slug.replaceAll('-', ' ').replace(/^./, (char) => char.toUpperCase());
            const content = readFileSync(join(guidesDir, file), 'utf8');
            return { id: slug, title, content };
        });

    return {
        guides,
        errors: duplicateErrors(
            'guide id',
            guides.map((guide) => guide.id),
        ),
    };
};
