/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { run as jscodeshift } from 'jscodeshift/src/Runner';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const transformPath = path.resolve(__dirname, 'transform.ts');
const paths = ['src'];
const options = {
    dry: true,
    print: true,
    verbose: 1,
    parser: 'tsx',
    basePath: __dirname,
    extensions: 'ts,tsx,js,jsx',
};

const parseTempFile = (filePath: string) => {
    return readFileSync(filePath, 'utf8')
        .split('\n')
        .filter((line) => line.trim())
        .map<string>((line) => {
            const json = JSON.parse(line) as { name: string };
            return json.name;
        });
};

jscodeshift(transformPath, paths, options)
    .then((_res) => {
        const deprecatedExports = parseTempFile(path.join(__dirname, 'temp/deprecated-exports.txt'));
        const activeExports = parseTempFile(path.join(__dirname, 'temp/active-exports.txt'));

        const detectedExports = {
            deprecated: deprecatedExports,
            active: activeExports,
        };
        writeFileSync(path.join(__dirname, 'detected-exports.json'), JSON.stringify(detectedExports, null, 2));
        rmSync(path.join(__dirname, 'temp'), { recursive: true });
    })
    .catch((error) => {
        console.error('ERROR', error);
    });
