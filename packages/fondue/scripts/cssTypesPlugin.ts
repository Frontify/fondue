/* (c) Copyright Frontify Ltd., all rights reserved. */

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import fg from 'fast-glob';
import type { Plugin } from 'vite';

export function cssTypesPlugin(): Plugin {
    let outDir = '';
    return {
        name: 'fondue-css-types',
        apply: 'build',
        configResolved(config) {
            outDir = resolve(config.root, config.build.outDir);
        },
        closeBundle() {
            const cssFiles = fg.sync('**/*.css', { cwd: outDir, absolute: true });
            for (const file of cssFiles) {
                writeFileSync(`${file}.d.ts`, 'export {};\n');
            }
        },
    };
}
