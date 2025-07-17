/* (c) Copyright Frontify Ltd., all rights reserved. */

import StyleDictionary, { type Token, type TransformedToken } from 'style-dictionary';

import { type BoxShadowValue, type Config } from '../types';

import { orderedVariables } from './cssFormat';
import { tailwindFormat } from './tailwind/tailwindFormat';

StyleDictionary.registerTransform({
    type: 'value',
    transitive: true,
    name: 'figma/colorToScaledRgbaString',
    filter: (token: Token) => {
        return (
            token.type === 'color' &&
            typeof token.value === 'object' &&
            'r' in token.value &&
            'g' in token.value &&
            'b' in token.value &&
            'a' in token.value
        );
    },
    transform: (token: Token) => {
        const value = token.value as { r: number; g: number; b: number; a: number };
        return `rgba(${Math.round(value.r * 255)}, ${Math.round(value.g * 255)}, ${Math.round(value.b * 255)}, ${Math.round(value.a * 100) / 100})`;
    },
});

StyleDictionary.registerTransform({
    type: 'value',
    transitive: true,
    name: 'figma/shadowToMatrix',
    filter: (token: Token) => token.type === 'shadow',
    transform: (token: Token) => {
        const properties = token.value as BoxShadowValue;
        return `${properties['position-x']}px ${properties['position-y']}px ${properties.blur}px ${properties.spread}px${properties.color ? ` var(--${`${properties.color}`.replace('ref_', '').replaceAll('/', '-')})` : ''}`;
    },
});

StyleDictionary.registerTransform({
    type: 'value',
    transitive: true,
    name: 'number/roundToTwoDecimals',
    filter: (token: Token) => {
        return typeof token.value === 'number';
    },
    transform: (token: Token) => {
        return Math.round(token.value * 100) / 100;
    },
});

StyleDictionary.registerTransform({
    type: 'value',
    transitive: true,
    name: 'value/convertPxToRem',
    filter: (token: TransformedToken) => {
        const remTokens = ['font-size', 'line-height', 'border-radius', 'spacing'];
        return typeof token.value === 'number' && remTokens.some((remToken) => token.path.includes(remToken));
    },
    transform: (token: Token) => {
        return `${token.value / 16}rem`;
    },
});

StyleDictionary.registerTransform({
    type: 'value',
    transitive: true,
    name: 'value/convertValueToPx',
    filter: (token: TransformedToken) => {
        const remTokens = ['border-width', 'letter-spacing'];
        return typeof token.value === 'number' && remTokens.some((remToken) => token.path.includes(remToken));
    },
    transform: (token: Token) => {
        return `${token.value}px`;
    },
});

StyleDictionary.registerTransform({
    type: 'value',
    transitive: true,
    name: 'value/refToCSSVariable',
    filter: (token: Token) => {
        return typeof token.value === 'string' && token.value.startsWith('ref_');
    },
    transform: (token: Token) => {
        const value = token.value as string;
        return `var(--${value.replace('ref_', '').replaceAll('/', '-').replaceAll(' ', '-')})`;
    },
});

StyleDictionary.registerTransform({
    type: 'name',
    transitive: true,
    name: 'name/kebabWithoutThemeName',
    transform: (token) => {
        return token.path.slice(1).join('-');
    },
});

StyleDictionary.registerTransform({
    type: 'value',
    transitive: true,
    name: 'tailwind/nameToCSSVariable',
    filter: (token) => {
        return token.attributes?.type !== 'utility';
    },
    transform: (token) => {
        return `var(--${token.name.replaceAll('/', '-').replaceAll(' ', '-')})`;
    },
});

StyleDictionary.registerTransform({
    type: 'value',
    transitive: true,
    name: 'fondue/transformFontFamily',
    filter: (token) =>
        token.name.toLocaleLowerCase().includes('font-family') &&
        token.attributes?.type === 'base' &&
        typeof token.value === 'string',
    transform: (token) => {
        const tokenValue =
            typeof token.value === 'string' && token.value.toLocaleLowerCase().includes('abc diatype variable')
                ? 'Diatype'
                : (token.value as string);

        if (token.name.includes('monospace')) {
            return `${tokenValue}, Courier, monospace`;
        }
        return `${tokenValue},Geist,Arial,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol`;
    },
});

const frontifyFileHeader = {
    name: 'frontify-file-header',
    // async is optional
    fileHeader: () => {
        return [
            '(c) Copyright Frontify Ltd., all rights reserved.',
            'Do not edit please',
            'This file is auto-generated',
        ];
    },
};
StyleDictionary.registerFileHeader(frontifyFileHeader);
StyleDictionary.registerFormat(tailwindFormat);
StyleDictionary.registerFormat(orderedVariables);

export const buildStyleDictionary = (config: Config) => {
    const allTokensPath = new URL('../../.tmp/tokens/all-tokens.json', import.meta.url).pathname;
    return new StyleDictionary({
        source: [allTokensPath],
        platforms: {
            cssBase: {
                buildPath: 'dist/',
                transforms: [
                    'number/roundToTwoDecimals',
                    'fondue/transformFontFamily',
                    'figma/colorToScaledRgbaString',
                    'figma/shadowToMatrix',
                    'name/kebabWithoutThemeName',
                    'value/refToCSSVariable',
                    'value/convertPxToRem',
                    'value/convertValueToPx',
                ],
                files: [
                    {
                        filter: (token) => {
                            return (
                                token.attributes?.type !== 'theme' ||
                                (token.attributes?.type === 'theme' && token.attributes?.theme === config.defaultTheme)
                            );
                        },
                        destination: 'css/base.css',
                        format: 'css/orderedVariables',
                        options: {
                            fileHeader: 'frontify-file-header',
                        },
                    },
                ],
            },
            cssThemes: {
                buildPath: '.tmp/themes/',
                transforms: [
                    'number/roundToTwoDecimals',
                    'fondue/transformFontFamily',
                    'figma/colorToScaledRgbaString',
                    'figma/shadowToMatrix',
                    'name/kebabWithoutThemeName',
                    'value/refToCSSVariable',
                    'value/convertPxToRem',
                    'value/convertValueToPx',
                ],
                files: [
                    {
                        filter: (token) => {
                            return token.attributes?.type === 'base' || token.attributes?.type === 'utility';
                        },
                        destination: 'base.css',
                        options: {
                            fileHeader: 'frontify-file-header',
                            selector: '.base',
                        },
                        format: 'css/orderedVariables',
                    },
                    ...config.themes.map((theme) => ({
                        filter: (token: Token) => {
                            return (
                                (token.attributes?.theme === theme && token.attributes?.type === 'theme') ||
                                token.attributes?.type === 'semantic'
                            );
                        },
                        destination: `${theme}.css`,
                        options: {
                            showFileHeader: false,
                            selector: `.${theme}`,
                        },
                        format: 'css/orderedVariables',
                    })),
                ],
            },
            objects: {
                buildPath: '.tmp/objects/',
                transforms: [
                    'number/roundToTwoDecimals',
                    'fondue/transformFontFamily',
                    'figma/colorToScaledRgbaString',
                    'figma/shadowToMatrix',
                    'name/kebabWithoutThemeName',
                    'tailwind/nameToCSSVariable',
                    'value/convertPxToRem',
                    'value/convertValueToPx',
                ],
                files: [
                    ...config.themes.map((theme) => ({
                        filter: (token: Token) => {
                            return token.attributes?.type === 'theme' && token.attributes.theme === theme;
                        },
                        destination: `${theme}.json`,
                        options: {
                            showFileHeader: false,
                            stripMeta: {
                                strip: ['attributes', 'filePath', 'isSource', 'original'],
                            },
                        },
                        format: 'json',
                    })),
                    {
                        filter: (token: Token) => {
                            return (
                                (token.attributes?.type === 'base' && token.type !== 'color') ||
                                token.attributes?.type === 'semantic'
                            );
                        },
                        destination: 'semantic.json',
                        options: {
                            showFileHeader: false,
                            stripMeta: {
                                strip: ['attributes', 'filePath', 'isSource', 'original'],
                            },
                        },
                        format: 'json',
                    },
                    {
                        filter: (token: Token) => {
                            return token.attributes?.type === 'utility';
                        },
                        destination: 'utilities.json',
                        options: {
                            showFileHeader: false,
                            stripMeta: {
                                strip: ['attributes', 'filePath', 'isSource', 'original', 'path'],
                            },
                        },
                        format: 'json',
                    },
                ],
            },

            tailwind: {
                buildPath: 'dist/tailwind/',
                transforms: [
                    'number/roundToTwoDecimals',
                    'figma/colorToScaledRgbaString',
                    'figma/shadowToMatrix',
                    'tailwind/nameToCSSVariable',
                    'value/refToCSSVariable',
                    'value/convertPxToRem',
                    'value/convertValueToPx',
                ],
                files: [
                    {
                        destination: 'tailwind.config.js',
                        format: 'tailwind',
                        options: {
                            showFileHeader: true,
                            fileHeader: 'frontify-file-header',
                        },
                    },
                ],
            },
        },
    }).buildAllPlatforms();
};
