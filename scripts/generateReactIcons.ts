/* (c) Copyright Frontify Ltd., all rights reserved. */

import fastGlob from 'fast-glob';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { camelCase, toUpper } from 'lodash-es';
import { transform } from '@svgr/core';
import { Entry } from 'fast-glob/out/types';
import { IconTemplate } from '@foundation/Icon/IconTemplate';
import { IconComponent, IconTemplateDynamic } from '@foundation/Icon/IconTemplateDynamic';

const ICON_SOURCE_DIRECTORY = 'node_modules/@frontify/fondue-icons/icons/';
const GENERATED_ICONS_DIRECTORY = 'src/foundation/Icon/Generated/';
const ICON_BUILD_DIRECTORY = join(__dirname, '..', 'src', 'foundation', 'Icon', 'Generated');
const ICON_COMPONENT_PREFIX = 'Icon';
const ICON_SIZES = ['12', '16', '20', '24', '32'];

export const GENERATED_ICONS_INDEX_PATH = `${GENERATED_ICONS_DIRECTORY}index.ts`;

/**
 * Gets an array of all svg file paths from the source directory
 */
const getSvgFilePaths = () => {
    return fastGlob(`${ICON_SOURCE_DIRECTORY}**/*.svg`, { objectMode: true });
};

/**
 * Gets an array of all the directories containing icon variants (i.e. the parents of the svgs)
 */
const getShapeFolderPaths = () => {
    return fastGlob(`${ICON_SOURCE_DIRECTORY}**`, {
        onlyDirectories: true,
        objectMode: true,
    });
};

const getSize = (name: string): string | null => {
    let size = null;
    for (const element of ICON_SIZES) {
        if (name.includes(element)) {
            size = element;
        }
    }
    return size;
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
 * Given the path of a directory containing icon svgs, writes a React component to the build
 * directory that accepts props for size and filled. i.e. all icon variants for a particular shape
 * in one component.
 */
const generateDynamicIcon = async (shapeFolderPath: Entry) => {
    const svgPaths = await fastGlob(`${shapeFolderPath.path}/**/*.svg`, { objectMode: true });
    const shapeName = camelCase(`${shapeFolderPath.name}`).replace(/^(.)/, toUpper);
    const components: IconComponent[] = svgPaths.map((icon) => {
        const iconName = camelCase(icon.name.replace('.svg', '')).replace(/^(.)/, toUpper);
        const size = getSize(iconName);
        const filled = iconName.toUpperCase().includes('filled'.toUpperCase());

        return {
            size,
            filled,
            name: ICON_COMPONENT_PREFIX + iconName,
        };
    });

    const filePath = join(ICON_BUILD_DIRECTORY, `${ICON_COMPONENT_PREFIX}${shapeName}.tsx`);
    const tpl = IconTemplateDynamic({ components, name: `${ICON_COMPONENT_PREFIX}${shapeName}` });

    await writeFile(filePath, tpl);
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
    const iconShapeFolderPaths = await getShapeFolderPaths();

    for (const svgPath of iconSvgPaths) {
        await generateSvgComponent(svgPath);
    }

    for (const directory of iconShapeFolderPaths) {
        await generateDynamicIcon(directory);
    }

    await generateIndex();
})();
