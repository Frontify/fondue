/* (c) Copyright Frontify Ltd., all rights reserved. */

import { join } from 'node:path';

import { execa } from 'execa';

const transformsDirectory = join(new URL('.', import.meta.url).pathname, 'transforms');
const jscodeshiftExecutable = join(new URL('.', import.meta.url).pathname, '../../', 'node_modules/.bin/jscodeshift');

export const runCodeshift = async (
    pathToAnalyze: string,
    transformName: string,
    options: { [key: string]: string },
): Promise<void> => {
    const transformPath = join(transformsDirectory, `${transformName}.ts`);
    await execa(
        jscodeshiftExecutable,
        ['--parser', 'tsx', '--extensions', 'ts,tsx,js,jsx', '--transform', transformPath, pathToAnalyze],
        {
            env: {
                ...options,
            },
        },
    );
    return;
};
