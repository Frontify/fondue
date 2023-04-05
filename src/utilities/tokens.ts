/* (c) Copyright Frontify Ltd., all rights reserved. */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tokens from '@frontify/fondue-tokens';

export type PaletteName = 'base' | 'box' | 'focus' | 'line' | 'overlay' | 'shadow' | 'button';
export type TokenPalette = {
    name: PaletteName;
    attributes: {
        'tailwind-name': string;
    };
};

export type TokenPalettes = Record<PaletteName | string, TokenPalette[]>;

export const TOKEN_STATES = ['hover', 'pressed', 'inverse', 'inverse-hover', 'inverse-pressed'];
export const TOKEN_STATES_REGEX = new RegExp(`(${TOKEN_STATES.join('|')})$`, 'i');
export const ALIAS_TOKENS_CATEGORIES_NAMES = (Object.keys(tokens) as PaletteName[]).filter(
    (category: PaletteName | 'color') => category !== 'color',
);
export const ALIAS_TOKENS_CATEGORIES = ALIAS_TOKENS_CATEGORIES_NAMES.reduce(
    (categories: TokenPalettes, category: PaletteName | string): TokenPalettes => {
        const newPalette = (
            !!tokens[category].value ? [tokens[category]] : [...Object.values(tokens[category])]
        ) as TokenPalette[];

        return {
            ...categories,
            [category]: categories[category] ? [...categories[category], ...newPalette] : newPalette,
        };
    },
    {},
);

export const getAliasTokensByCategory = (category: PaletteName): TokenPalette[] =>
    ALIAS_TOKENS_CATEGORIES[category] || [];

export const getAliasTokensTailwindNamesByCategory = (category: PaletteName, ignoreState = false) => {
    const palettes = getAliasTokensByCategory(category);

    if (!ignoreState) {
        return palettes.map((palette) => `tw-${palette.attributes['tailwind-name']}`);
    }

    return palettes
        .filter((palette) => !TOKEN_STATES_REGEX.test(palette.attributes['tailwind-name']))
        .map((palette) => `${palette.attributes['tailwind-name']}`);
};

export const BOX_ALIAS_TOKENS_PREFIX = getAliasTokensTailwindNamesByCategory('box', true);
export const BOX_BG_ALIAS_TOKENS = BOX_ALIAS_TOKENS_PREFIX.map((name) => `tw-bg-${name}`);
export const BOX_TEXT_ALIAS_TOKENS = BOX_ALIAS_TOKENS_PREFIX.map((name) => `tw-text-${name}-inverse`);
