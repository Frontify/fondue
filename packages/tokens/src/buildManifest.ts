/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { generateManifest } from './generateManifest';
import { type TokenTree } from './manifest/types';

const CWD = path.dirname(fileURLToPath(import.meta.url));
const ALL_TOKENS_PATH = path.resolve(CWD, '../dist/json/all-tokens.json');
const MANIFEST_PATH = path.resolve(CWD, '../dist/manifest.json');

export const buildManifest = async () => {
    const availableTokens = JSON.parse(await readFile(ALL_TOKENS_PATH, 'utf-8')) as Record<string, TokenTree>;
    const manifest = generateManifest(availableTokens);
    await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
};

const isCliEntrypoint = process.argv[1] === fileURLToPath(import.meta.url);

if (isCliEntrypoint) {
    buildManifest().catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
