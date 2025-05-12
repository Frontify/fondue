/* (c) Copyright Frontify Ltd., all rights reserved. */

import StyleDictionary, { type Token } from 'style-dictionary';

import { type Config } from '../types';

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
        return `rgba(${Math.round(value.r * 255)}, ${Math.round(value.g * 255)}, ${Math.round(value.b * 255)}, ${value.a})`;
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
        return `var(--${token.name.replaceAll('/', '-')})`;
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
                transforms: ['figma/colorToScaledRgbaString', 'name/kebabWithoutThemeName', 'value/refToCSSVariable'],
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
                transforms: ['figma/colorToScaledRgbaString', 'name/kebabWithoutThemeName', 'value/refToCSSVariable'],
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
                transforms: ['figma/colorToScaledRgbaString', 'tailwind/nameToCSSVariable', 'value/refToCSSVariable'],
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
