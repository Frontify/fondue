/* (c) Copyright Frontify Ltd., all rights reserved. */

import StyleDictionary, { type Token, type TransformedToken } from 'style-dictionary';

import { type BoxShadowValue, type Config } from '../types';

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
        return `${properties['position-x']}px, ${properties['position-y']}px, ${properties.blur}px, ${properties.spread}px${properties.color ? `, var(--${`${properties.color}`.replace('ref_', '').replaceAll('/', '-')})` : ''}`;
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
        const remTokens = ['border-width'];
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
        return `var(--${value.replace('ref_', '').replaceAll('/', '-')})`;
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
        token.attributes?.type === 'primitive' &&
        typeof token.value === 'string',
    transform: (token) => {
        const tokenValue =
            typeof token.value === 'string' && token.value.toLocaleLowerCase().includes('abc diatype variable')
                ? 'Diatype'
                : (token.value as string);

        if (token.name.includes('monospace')) {
            return `${tokenValue}, Courier, monospace`;
        }
        return `${tokenValue},Space Grotesk Frontify,Arial,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol`;
    },
});

StyleDictionary.registerFormat(tailwindFormat);

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
                options: {
                    showFileHeader: false,
                },
                files: [
                    {
                        filter: (token) => {
                            return (
                                token.attributes?.type === 'primitive' ||
                                token.attributes?.theme === config.defaultTheme
                            );
                        },
                        destination: 'css/base.css',
                        format: 'css/variables',
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
                options: {
                    showFileHeader: false,
                },
                files: [
                    {
                        filter: (token) => {
                            return token.attributes?.type === 'primitive';
                        },
                        destination: 'primitives.css',
                        options: {
                            selector: '.primitives',
                        },
                        format: 'css/variables',
                    },
                    ...config.themes.map((theme) => ({
                        filter: (token: Token) => {
                            if (token.attributes?.type === 'theme') {
                                return token.attributes.theme === theme;
                            }
                            return token.attributes?.type !== 'primitive' && token.type !== 'color';
                        },
                        destination: `${theme}.css`,
                        options: {
                            selector: `.${theme}`,
                        },
                        format: 'css/variables',
                    })),
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
                    },
                ],
            },
        },
    }).buildAllPlatforms();
};
