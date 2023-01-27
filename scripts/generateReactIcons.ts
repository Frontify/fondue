/* (c) Copyright Frontify Ltd., all rights reserved. */

import fastGlob from 'fast-glob';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { camelCase, toUpper } from 'lodash';
import { transform } from '@svgr/core';
import { Entry } from 'fast-glob/out/types';
import { IconTemplate } from '@foundation/Icon/IconTemplate';

const ICON_SOURCE_DIRECTORY = 'node_modules/@frontify/fondue-icons/icons/';
const GENERATED_ICONS_DIRECTORY = 'src/foundation/Icon/Generated/';
const ICON_BUILD_DIRECTORY = join(__dirname, '..', 'src', 'foundation', 'Icon', 'Generated');
const ICON_COMPONENT_PREFIX = 'Icon';

export const GENERATED_ICONS_INDEX_PATH = `${GENERATED_ICONS_DIRECTORY}index.ts`;

/**
 * Gets an array of all svg file paths from the source directory
 */
const getSvgFilePaths = () => {
    return fastGlob(`${ICON_SOURCE_DIRECTORY}**/*.svg`, { objectMode: true });
};

/**
 * Given an svg file path, uses the file's content to generate a corresponding React
 * component in the build directory.
 */
const generateSvgComponent = async (svgPath: Entry) => {
    const svgFileContent = await readFile(svgPath.path, { encoding: 'utf-8' });
    const svgFileName = camelCase(svgPath.name.replace('.svg', '')).replace(/^(.)/, toUpper);

    const tsxCode = await transform(
        svgFileContent,
        {
            plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
            memo: true,
            template: IconTemplate,
            dimensions: true,
            typescript: true,
            svgProps: {
                className: '{customClassName}',
                name: `${ICON_COMPONENT_PREFIX}${svgFileName}`,
            },
        },
        { componentName: `${ICON_COMPONENT_PREFIX}${svgFileName}` },
    );

    const generatedTsxFilePath = join(ICON_BUILD_DIRECTORY, `${ICON_COMPONENT_PREFIX}${svgFileName}.tsx`);
    await writeFile(generatedTsxFilePath, tsxCode);
};

/**
 * Generates the index file in build directory
 */
const generateIndex = async () => {
    const iconComponentsFilePath = await fastGlob([`${GENERATED_ICONS_DIRECTORY}**/*.tsx`], { objectMode: true });
    const iconComponents = iconComponentsFilePath
        .map((filePath) => {
            const filename = filePath.name;
            return {
                name: filename.replace('.tsx', ''),
                path: filePath.path.replace('.tsx', ''),
            };
        })
        .filter((filePath) => !filePath.name.includes('.'))
        .filter((component) => component.name !== 'Icon');
    const iconComponentNameToExport = (name: string) => `export { default as ${name} } from "./${name}";`;
    const fileContent = `${iconComponents.map((c) => iconComponentNameToExport(c.name)).join('\n')}\n`;

    await writeFile(join(__dirname, '..', GENERATED_ICONS_INDEX_PATH), fileContent, { encoding: 'utf8' });
};

/**
 * Script
 */
(async () => {
    const iconSvgPaths = await getSvgFilePaths();

    for (const svgPath of iconSvgPaths) {
        await generateSvgComponent(svgPath);
    }

    await generateIndex();
})();
