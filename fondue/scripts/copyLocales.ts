/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

const componentsLocalesDir = dirname(fileURLToPath(import.meta.resolve('@frontify/fondue-components/locales')));
const outDir = resolve(here, '../dist/packages/locales');

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
cpSync(componentsLocalesDir, outDir, { recursive: true });
