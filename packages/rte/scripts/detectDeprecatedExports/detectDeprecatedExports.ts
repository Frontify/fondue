/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { run as jscodeshift } from 'jscodeshift/src/Runner';

import { buildPublicExportMap } from './parsePublicExports';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const transformPath = path.resolve(__dirname, 'transform.ts');
const outputPath = process.argv[2];
const paths = ['src'];
const options = {
    dry: true,
    parser: 'tsx',
    basePath: __dirname,
    extensions: 'ts,tsx,js,jsx',
};

if (!outputPath) {
    throw new Error('Output path is required');
}

const parseTempFile = (filePath: string) => {
    return readFileSync(filePath, 'utf8')
        .split('\n')
        .filter((line) => line.trim())
        .map<string>((line) => {
            const json = JSON.parse(line) as { name: string };
            return json.name;
        });
};

if (existsSync(path.join(__dirname, 'temp'))) {
    rmSync(path.join(__dirname, 'temp'), { recursive: true });
}

const publicExports = buildPublicExportMap('./src/index.ts');

jscodeshift(transformPath, paths, {
    ...options,
    publicExports: Array.from(publicExports).join(','),
})
    .then((_res) => {
        const deprecatedExports = parseTempFile(path.join(__dirname, 'temp/deprecated-exports.txt'));
        const activeExports = parseTempFile(path.join(__dirname, 'temp/active-exports.txt'));

        const detectedExports = {
            deprecated: deprecatedExports.sort(),
            active: activeExports.sort(),
        };

        writeFileSync(outputPath, `${JSON.stringify(detectedExports, null, 4)}\n`);
        rmSync(path.join(__dirname, 'temp'), { recursive: true });
    })
    .catch((error) => {
        console.error('ERROR', error);
    });
