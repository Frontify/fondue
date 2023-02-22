/* (c) Copyright Frontify Ltd., all rights reserved. */

const { once } = require("node:events");
const { createReadStream } = require("node:fs");
const { createInterface } = require("node:readline");
const glob = require("glob");

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

const CYPRESS_CONFIG_FILE_NAME = "cypress.config.ts";
const SECTION = "component";
const SPEC_PATTERN = "specPattern";

const [totalRunners, currentRunner] = process.argv.splice(2);
const parseSpecPattern = (line) =>
    line
        .trimEnd()
        .trimStart()
        .replace(/(^,)|(,$)/g, "")
        .replaceAll("'", "\"")
        .split(":")
        .reduce((acc, cur, index) => (index !== 0 ? `${acc}${cur}` : `"${cur}":`), "");

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
                input: createReadStream(CYPRESS_CONFIG_FILE_NAME),
                crlfDelay: Infinity,
            });

            let insideSectionConfig = false;
            rl.on("line", (line) => {
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

            await once(rl, "close");
        } catch (err) {
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
    // Smooth edges cases by adding + 1
    const chunksize = inputArray.length / slices + 1;
    return inputArray.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunksize);

        if (!resultArray[chunkIndex]) {
            // start a new chunk
            resultArray[chunkIndex] = [];
        }
        resultArray[chunkIndex].push(item);

        return resultArray;
    }, []);
};

getSectionSpecPattern().then((pattern) => {
    glob(pattern, (er, files) => {
        const output = splitIntoChunkedSlices(totalRunners, files);

        // console.log to print to github action Console
        console.log(`'${output[currentRunner]}'`);
    });
});
