/* (c) Copyright Frontify Ltd., all rights reserved. */

import { appendFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

import { type API, type FileInfo } from 'jscodeshift';

export default function transformer(
    file: FileInfo,
    api: API,
    options: { basePath: string; selectedImports: string[] },
) {
    const j = api.jscodeshift;
    const root = j(file.source);
    const outputPath = path.join(options.basePath, '/temp/detected-imports.txt');
    const selectedImports = new Set(options.selectedImports);
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
