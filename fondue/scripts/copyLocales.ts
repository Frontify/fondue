/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

const copyLocales = (entryPoint: string, outFolder: string): void => {
    const sourceDir = dirname(fileURLToPath(import.meta.resolve(entryPoint)));
    const outDir = resolve(here, '../dist/packages', outFolder);

    rmSync(outDir, { recursive: true, force: true });
    mkdirSync(outDir, { recursive: true });
    cpSync(sourceDir, outDir, { recursive: true });
};

copyLocales('@frontify/fondue-components/locales', 'locales');
// The components' strings and the editor's in one object per language, for `ThemeProvider`'s `locale`.
// Run after the editor's build, which empties `rich-text-editor/`.
copyLocales('@frontify/fondue-rich-text-editor/locales', 'rich-text-editor/locales');
