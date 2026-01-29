/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { execa } from 'execa';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const transformsDirectory = join(__dirname, 'transforms');
const jscodeshiftExecutable = require.resolve('.bin/jscodeshift');

export const runCodeshift = async (
    pathToAnalyze: string,
    transformName: string,
    options: { [key: string]: string },
): Promise<void> => {
    const transformPath = join(transformsDirectory, `${transformName}.ts`);
    await execa(
        jscodeshiftExecutable,
        [
            '--parser',
            'tsx',
            '--extensions',
            'ts,tsx,js,jsx',
            '--ignore-pattern',
            '**/node_modules/**',
            '--ignore-pattern',
            '**/dist/**',
            '--ignore-pattern',
            '**/build/**',
            '--ignore-pattern',
            '**/.git/**',
            '--ignore-pattern',
            '**/public/**',
            '--transform',
            transformPath,
            pathToAnalyze,
        ],
        {
            env: {
                ...options,
            },
        },
    );
    return;
};
