/* (c) Copyright Frontify Ltd., all rights reserved. */

import { join } from 'node:path';

import StyleDictionary from 'style-dictionary';

import { figmaFormatter } from './formatters/figma';
import { tailwindFormatter } from './formatters/tailwind';
import { createCssModule } from './utils/createCssModule';
import { mergeFigmaFiles } from './utils/mergeFigmaFiles';
import { transformColor } from './utils/transformColor';
import { trimHyphens } from './utils/trimHyphens';

const debug = process.argv[2] === '--debug';

const INPUT_DIRECTORY = join(import.meta.dirname, './tokens');
const TEMPORARY_DIRECTORY = join(import.meta.dirname, '../tmp');
const OUTPUT_DIRECTORY = join(import.meta.dirname, '../dist');
const COLOR_THEMES = ['dark'];

const MAIN_TOKENS_GLOB = [
    `${INPUT_DIRECTORY}/brand.!(*.${COLOR_THEMES.join('|*.')}).ts`,
    `${INPUT_DIRECTORY}/alias.!(*.${COLOR_THEMES.join('|*.')}).ts`,
    `${INPUT_DIRECTORY}/component.!(*.${COLOR_THEMES.join('|*.')}).ts`,
];

StyleDictionary.registerTransform({
    name: 'color/apply-modify',
    type: 'value',
    transitive: true,
    matcher: (token) => token.attributes?.category === 'color' && 'modify' in token,
    transformer: (token) => transformColor(token),
});

StyleDictionary.registerTransform(
    Object.assign({}, StyleDictionary.transform['color/css'], {
        name: 'color/css',
        transitive: true,
    }),
);

StyleDictionary.registerTransform({
    name: 'attribute/tailwind',
    type: 'attribute',
    // transitive: true,
    // matched: (token) => token.attributes?.category === 'color',
    transformer: (token) => ({
        'tailwind-name': trimHyphens(token.name.replace('color', '')).replace('--', '-'),
    }),
});

StyleDictionary.registerTransformGroup({
    name: 'tailwind',
    transforms: ['attribute/cti', 'name/cti/kebab', 'size/rem', 'color/apply-modify', 'color/css'],
});

StyleDictionary.registerTransformGroup({
    name: 'js',
    transforms: [
        'size/rem',
        'name/cti/kebab',
        'attribute/cti',
        'attribute/tailwind',
        'color/apply-modify',
        'color/css',
    ],
});

StyleDictionary.registerTransformGroup({
    name: 'figma',
    transforms: ['attribute/cti', 'name/cti/kebab', 'size/remToPx', 'color/apply-modify', 'color/css'],
});

StyleDictionary.registerTransformGroup({
    name: 'css',
    transforms: ['size/rem', 'name/cti/kebab', 'attribute/cti', 'color/apply-modify', 'color/css'],
});

/**
 * FORMATS
 */

StyleDictionary.registerFormat({
    name: 'css/module/theme',
    formatter({ dictionary, options = {} }) {
        const { selector, theme } = options;
        const allTokens = [...dictionary.allProperties];

        const selectorString = selector ? `${selector}` : `.${theme}`;
        return `${selectorString} {
    ${allTokens.map((prop) => `--${prop.name}: ${prop.value};`).join('\n    ')}
}`;
    },
});

StyleDictionary.registerFormat({
    name: 'tailwind',
    formatter: (options) => tailwindFormatter({ ...options, debug }),
});

StyleDictionary.registerFormat({
    name: 'tailwind/types',
    formatter: ({ file }) => {
        const { fileHeader } = StyleDictionary.formatHelpers;
        return `${fileHeader({ file })}declare module '*';
export default {};`;
    },
});

StyleDictionary.registerFormat({
    name: 'figma',
    formatter: figmaFormatter,
});

StyleDictionary.registerFilter({
    name: 'isBrand',
    matcher: (token) => token.filePath.includes('brand.'),
});

StyleDictionary.registerFilter({
    name: 'isColor',
    matcher: (token) => token.attributes?.category === 'color',
});

StyleDictionary.registerFilter({
    name: 'isAlias',
    matcher: (token) => token.filePath.includes('alias.'),
});

StyleDictionary.registerFilter({
    name: 'isAliasNonColor',
    matcher: (token) => token.filePath.indexOf('alias.') > 1 && token.attributes?.category !== 'color',
});

StyleDictionary.registerFilter({
    name: 'isComponent',
    matcher: (token) => token.filePath.includes('component.'),
});

/**
 * MAIN RUN
 * - Style dictionary does a deep merge of everything in input (except for theme files).
 * - This ensures that there are no naming collisions, and that references are respected.
 * -
 * - Each file applies a 'filter' to select which of those tokens it wants to include.
 * - This ensures that each file only contains the final, consumable tokens.
 */
StyleDictionary.extend({
    source: MAIN_TOKENS_GLOB,
    platforms: {
        colors: {
            transformGroup: 'js',
            buildPath: `${OUTPUT_DIRECTORY}/js/`,
            files: [
                {
                    destination: 'colors.json',
                    format: 'json',
                    filter: 'isColor',
                },
            ],
        },
        tokens: {
            transformGroup: 'js',
            buildPath: `${OUTPUT_DIRECTORY}/js/`,
            files: [
                {
                    destination: 'tokens.json',
                    format: 'json',
                    filter: 'isAliasNonColor',
                },
            ],
        },
        figma: {
            transformGroup: 'figma',
            buildPath: `${TEMPORARY_DIRECTORY}/figma/`,
            files: [
                {
                    destination: 'brand.json',
                    format: 'figma',
                    filter: 'isBrand',
                },
                {
                    destination: 'aliases.json',
                    format: 'figma',
                    filter: 'isAlias',
                },
                {
                    destination: 'components.json',
                    format: 'figma',
                    filter: 'isComponent',
                },
            ],
        },
        tailwind: {
            transformGroup: 'tailwind',
            buildPath: `${OUTPUT_DIRECTORY}/tailwind/`,
            files: [
                {
                    destination: 'tailwind.config.js',
                    format: 'tailwind',
                },
                {
                    destination: 'tailwind.config.d.ts',
                    format: 'tailwind/types',
                },
            ],
        },
        css: {
            transformGroup: 'css',
            buildPath: `${OUTPUT_DIRECTORY}/css/`,
            files: [
                {
                    destination: 'all.css',
                    format: 'css/variables',
                    filter: (token) => {
                        if (!token.filePath.includes('brand')) {
                            return token.attributes?.target !== 'figma';
                        }

                        return false;
                    },
                },
            ],
        },
        light_theme: {
            transformGroup: 'css',
            buildPath: `${TEMPORARY_DIRECTORY}/themeProvider/themes/`,
            files: [
                {
                    destination: 'light.module.css',
                    format: 'css/module/theme',
                    options: { theme: 'light' },
                    filter: (token) => !token.filePath.includes('brand') && token.attributes?.target !== 'figma',
                },
            ],
        },
    },
}).buildAllPlatforms();

/**
 * COLOR THEMES
 * - style-dictionary will run once for each of the color themes, rather than all at once.
 * - This allows the same token names to be used in each of the output files, which suits the intended
 * - method of use (theme files used as overrides).
 * -
 * - The use of 'include' allows for all the references to be maintained, but a very selective 'source'
 * - and 'filter' on the output files ensures that only the theme tokens are output.
 */
for (const theme of COLOR_THEMES) {
    StyleDictionary.extend({
        include: MAIN_TOKENS_GLOB,
        // Only output from the appropriate color theme file
        source: [`${INPUT_DIRECTORY}/*.${theme}.ts`],
        platforms: {
            figma: {
                transformGroup: 'figma',
                buildPath: `${TEMPORARY_DIRECTORY}/figma/`,
                files: [
                    {
                        destination: `aliases.${theme}.json`,
                        format: 'figma',
                        options: { theme },
                        filter: (token) => {
                            return token.filePath.includes(theme) && token.filePath.includes('alias.');
                        },
                    },
                    {
                        destination: `components.${theme}.json`,
                        format: 'figma',
                        options: { theme },
                        filter: (token) => {
                            return token.filePath.includes(theme) && token.filePath.includes('component.');
                        },
                    },
                ],
            },
            css: {
                transformGroup: 'css',
                buildPath: `${OUTPUT_DIRECTORY}/css/`,
                files: [
                    {
                        destination: `theme.${theme}.css`,
                        format: 'css/variables',
                        options: { theme, selector: `.tw-${theme}` },
                        filter: (token) => {
                            return token.filePath.includes(theme) && token.attributes?.category === 'color';
                        },
                    },
                ],
            },
            [theme]: {
                transformGroup: 'css',
                buildPath: `${TEMPORARY_DIRECTORY}/themeProvider/themes/`,
                files: [
                    {
                        destination: `${theme}.module.css`,
                        format: 'css/module/theme',
                        options: { theme },
                        filter: (token) => !token.filePath.includes('brand'),
                    },
                ],
            },
        },
    }).buildAllPlatforms();
}

mergeFigmaFiles();
createCssModule();
