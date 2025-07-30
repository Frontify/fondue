/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path, { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import detectedExports from '../constants/fondueExports.json' with { type: 'json' };

import { runCodeshift } from './runCodeshift';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tempDir = path.resolve(__dirname, './temp');

const getImports = (pathToAnalyze: string, selectedImports: string[] = []) => {
    if (existsSync(tempDir)) {
        rmSync(tempDir, { recursive: true });
    }
    return runCodeshift(pathToAnalyze, 'find-imports', {
        selectedImports: selectedImports.join(','),
        tempDir,
    }).then(() => {
        if (existsSync(join(tempDir, 'detected-imports.txt'))) {
            const detectedImports = readFileSync(join(tempDir, 'detected-imports.txt'), 'utf8')
                .split('\n')
                .filter((line) => line.trim() !== '')
                .map((line) => JSON.parse(line) as { path: string; imports: string[] });
            rmSync(join(tempDir), { recursive: true });
            return detectedImports;
        } else {
            return [];
        }
    });
};

export const findDeprecatedImports = (pathToAnalyze: string, outputPath?: string) => {
    getImports(pathToAnalyze, detectedExports.deprecated)
        .then((detectedImports) => {
            if (outputPath) {
                writeFileSync(outputPath, JSON.stringify(detectedImports, null, 4), 'utf8');
            } else {
                console.log(detectedImports);
            }
            if (detectedImports.length === 0) {
                console.log('No deprecated imports found');
            }
        })
        .catch((error) => {
            console.error('ERROR', error);
        });
};

export const findUnusedExports = (pathToAnalyze: string, outputPath?: string, onlyDeprecated?: boolean) => {
    const fondueExports = [...detectedExports.deprecated, ...(onlyDeprecated ? [] : detectedExports.active)];
    getImports(pathToAnalyze, fondueExports)
        .then((detectedImports) => {
            const unusedExports = fondueExports.filter(
                (selectedExport) =>
                    !detectedImports.some((detectedImport) => detectedImport.imports.includes(selectedExport)),
            );
            if (outputPath) {
                writeFileSync(outputPath, JSON.stringify(unusedExports, null, 4), 'utf8');
            } else {
                console.log(unusedExports);
            }
        })
        .catch((error) => {
            console.error('ERROR', error);
        });
};
