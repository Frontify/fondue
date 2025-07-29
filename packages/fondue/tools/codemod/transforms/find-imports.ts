/* (c) Copyright Frontify Ltd., all rights reserved. */

import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { type API, type FileInfo } from 'jscodeshift';

export default function transformer(file: FileInfo, api: API) {
    if (!process.env.fondueExportsConstantsPath) {
        throw new Error('fondueExportsConstantsPath is not set');
    }
    if (!process.env.tempDir) {
        throw new Error('tempDir is not set');
    }

    const fondueExports = JSON.parse(readFileSync(process.env.fondueExportsConstantsPath, 'utf8')) as {
        active: string[];
        deprecated: string[];
    };

    const selectedImports = new Set([...fondueExports.active, ...fondueExports.deprecated]);
    const j = api.jscodeshift;
    const root = j(file.source);
    const outputPath = join(process.env.tempDir, 'detected-imports.txt');
    const detectedImports = new Set<string>();

    for (const path of root.find(j.ImportDeclaration).paths()) {
        const isImportFromFondue = path.node.source.value === '@frontify/fondue';
        if (isImportFromFondue) {
            for (const specifier of path.node.specifiers || []) {
                if (j.ImportSpecifier.check(specifier)) {
                    const importedName = specifier.imported.name;
                    if (typeof importedName === 'string') {
                        if (selectedImports.has(importedName)) {
                            detectedImports.add(importedName);
                        }
                    }
                }
            }
        }
    }

    if (detectedImports.size > 0) {
        if (!existsSync(outputPath)) {
            mkdirSync(outputPath.split('/').slice(0, -1).join('/'), { recursive: true });
        }

        appendFileSync(
            outputPath,
            `${JSON.stringify({
                path: file.path,
                imports: Array.from(detectedImports),
            })}\n`,
        );
    }

    return file.source;
}
