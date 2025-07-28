/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { run as jscodeshift } from 'jscodeshift/src/Runner';

import detectedExports from '../../constants/exports.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const transformPath = path.resolve(__dirname, 'transform.ts');
const options = {
    dry: true,
    print: true,
    verbose: 1,
    parser: 'tsx',
    basePath: __dirname,
    extensions: 'ts,tsx,js,jsx',
};

const getImports = (pathToAnalyze: string, selectedImports: string[]) => {
    if (existsSync(path.resolve(__dirname, './temp'))) {
        rmSync(path.resolve(__dirname, './temp'), { recursive: true });
    }
    return jscodeshift(transformPath, [pathToAnalyze], {
        ...options,
        selectedImports,
    }).then((_res) => {
        if (existsSync(path.resolve(__dirname, './temp/detected-imports.txt'))) {
            const detectedImports = readFileSync(path.resolve(__dirname, './temp/detected-imports.txt'), 'utf8')
                .split('\n')
                .filter((line) => line.trim() !== '')
                .map((line) => JSON.parse(line) as { path: string; imports: string[] });
            rmSync(path.resolve(__dirname, './temp'), { recursive: true });
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
                writeFileSync(outputPath, JSON.stringify(detectedImports, null, 2), 'utf8');
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
    const selectedExports = [...detectedExports.deprecated, ...(onlyDeprecated ? [] : detectedExports.active)];
    getImports(pathToAnalyze, selectedExports)
        .then((detectedImports) => {
            const unusedExports = selectedExports.filter(
                (selectedExport) =>
                    !detectedImports.some((detectedImport) => detectedImport.imports.includes(selectedExport)),
            );

            if (outputPath) {
                writeFileSync(outputPath, JSON.stringify(unusedExports, null, 2), 'utf8');
            } else {
                console.log(unusedExports);
            }
        })
        .catch((error) => {
            console.error('ERROR', error);
        });
};
