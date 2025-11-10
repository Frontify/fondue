/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const TEMPORARY_DIRECTORY = join(import.meta.dirname, '../../tmp/themeProvider/themes');
const OUTPUT_DIRECTORY = join(import.meta.dirname, '../../dist/theme');
const availableThemes: string[] = [];

export const createCssModule = () => {
    const fileList = readdirSync(TEMPORARY_DIRECTORY, 'utf8');
    const modules = fileList
        .map((file) => {
            const themeName = file.split('.')[0];
            if (themeName) {
                availableThemes.push(themeName);
            }
            return readFileSync(join(TEMPORARY_DIRECTORY, file), 'utf8');
        })
        .join('\n');

    mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
    writeFileSync(join(OUTPUT_DIRECTORY, 'themes.module.css'), modules, {
        encoding: 'utf8',
    });

    createTypes();
};

const createTypes = () => {
    const themeClassDefinitions = availableThemes
        .map(
            (themeName) =>
                `        /**\n         * ${themeName} theme class\n         */\n        ${themeName}: string;`,
        )
        .join('\n\n');

    const dtsContent = `declare const styles: {
${themeClassDefinitions}
};

export default styles;`;

    writeFileSync(join(OUTPUT_DIRECTORY, 'themes.module.css.d.ts'), dtsContent, {
        encoding: 'utf8',
    });
};
