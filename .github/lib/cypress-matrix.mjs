/* (c) Copyright Frontify Ltd., all rights reserved. */

import { once } from 'node:events';
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { join } from 'node:path';
import { globSync } from 'glob';

/**
 * Build Matrix that contains cypress spec files for GitHub action
 *
 * Usage:       cypress-matrix.js 2 1
 * Input args:  {amount of parallel Runners} {Index of Current Runner}
 * Output:      'path/to/*.spec.tsx,path/to/*.spec.tsx'
 *
 *
 * First read in the Cypress config
 * We parse out the Component Config for the specPattern
 * Then we pass it to glob to search for all the spec files
 * Slice the resulting array into n (totalRunners) arrays
 * Returns (logs) the array with the currentIndex (currentRunner)
 */

const FONDUE_PACKAGE_DIR_PATH = './packages/fondue';
const CYPRESS_CONFIG_FILE_PATH = join(FONDUE_PACKAGE_DIR_PATH, 'cypress.config.ts');
const SECTION = 'component';
const SPEC_PATTERN = 'specPattern';

const [totalRunners, currentRunner] = process.argv.splice(2);
const parseSpecPattern = (line) =>
    line
        .trimEnd()
        .trimStart()
        .replace(/(^,)|(,$)/g, '')
        .replaceAll("'", '"')
        .split(':')
        .reduce((acc, cur, index) => (index !== 0 ? `${acc}${cur}` : `"${cur}":`), '');

/**
 * Parses line by line through config file to read out
 * SPEC_PATTERN and directly exits after
 *
 * @returns {Promise<string>}
 */
const getSectionSpecPattern = async () =>
    new Promise(async (resolve) => {
        try {
            const rl = createInterface({
                input: createReadStream(CYPRESS_CONFIG_FILE_PATH),
                crlfDelay: Infinity,
            });

            let insideSectionConfig = false;
            rl.on('line', (line) => {
                if (line.includes(SECTION) || insideSectionConfig) {
                    insideSectionConfig = true;
                    if (line.includes(SPEC_PATTERN)) {
                        const specPattern = JSON.parse(`{${parseSpecPattern(line)}}`)[SPEC_PATTERN];
                        if (Array.isArray(specPattern)) {
                            resolve(...specPattern);
                        } else {
                            resolve(specPattern);
                        }
                        rl.close();
                    }
                }
            });

            await once(rl, 'close');
        } catch (err) {
            console.error('Error while cypress-matrix.js:getSectionSpecPattern');
            console.error(err);
        }
    });

/**
 * Input: slices = 2, inputArray = [path/to/*.spec.tsx, path/to/*.spec.tsx, path/to/*.spec.tsx, path/to/*.spec.tsx]
 * Output: [[path/to/*.spec.tsx, path/to/*.spec.tsx],[path/to/*.spec.tsx, path/to/*.spec.tsx]]
 *
 * @param slices
 * @param inputArray
 * @returns {inputArray[][] * slices}
 */
const splitIntoChunkedSlices = (slices, inputArray) => {
    const chunks = [];
    for (let i = slices; i > 0; i--) {
        chunks.push(inputArray.splice(0, Math.ceil(inputArray.length / i)));
    }

    if (chunks.length !== slices) {
        throw new Error('Too much/less containers for the number of chunks');
    }

    return chunks;
};

getSectionSpecPattern().then((pattern) => {
    const files = globSync(pattern, { cwd: FONDUE_PACKAGE_DIR_PATH });
    const output = splitIntoChunkedSlices(Number(totalRunners), files);

    // console.log to print to github action Console
    console.log(`'${output[currentRunner]}'`);
});
