/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

// Each of the editor's locales is the components' locale for its language plus the editor's strings,
// so one import per language serves all of Fondue through `ThemeProvider`'s `locale`.
const fondueLocalesDir = dirname(fileURLToPath(import.meta.resolve('@frontify/fondue-rich-text-editor/locales')));
const outDir = resolve(here, '../dist/packages/locales');

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
cpSync(fondueLocalesDir, outDir, { recursive: true });
