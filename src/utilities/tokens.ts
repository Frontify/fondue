/* (c) Copyright Frontify Ltd., all rights reserved. */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tokens from '@frontify/fondue-tokens';

export type PalleteName = 'base' | 'box' | 'focus' | 'line' | 'overlay' | 'shadow' | 'button';
export type TokenPallete = {
    name: PalleteName;
    attributes: {
        'tailwind-name': string;
    };
};

export type TokenPalletes = Record<PalleteName | string, TokenPallete[]>;

export const TOKEN_STATES = ['hover', 'pressed', 'inverse', 'inverse-hover', 'inverse-pressed'];
export const TOKEN_STATES_REGEX = new RegExp(`(${TOKEN_STATES.join('|')})$`, 'i');
export const ALIAS_TOKENS_CATEGORIES_NAMES = (Object.keys(tokens) as PalleteName[]).filter(
    (category: PalleteName | 'color') => category !== 'color',
);
export const ALIAS_TOKENS_CATEGORIES = ALIAS_TOKENS_CATEGORIES_NAMES.reduce(
    (categories: TokenPalletes, category: PalleteName | string): TokenPalletes => {
        const newPallete = (
            !!tokens[category].value ? [tokens[category]] : [...Object.values(tokens[category])]
        ) as TokenPallete[];

        return {
            ...categories,
            [category]: categories[category] ? [...categories[category], ...newPallete] : newPallete,
        };
    },
    {},
);

export const getAliasTokensByCategory = (category: PalleteName): TokenPallete[] =>
    ALIAS_TOKENS_CATEGORIES[category] || [];

export const getAliasTokensTailwindNamesByCategory = (category: PalleteName, ignoreState = false) => {
    const palletes = getAliasTokensByCategory(category);

    if (!ignoreState) {
        return palletes.map((pallete) => `tw-${pallete.attributes['tailwind-name']}`);
    }

    return palletes
        .filter((pallete) => !TOKEN_STATES_REGEX.test(pallete.attributes['tailwind-name']))
        .map((pallete) => `${pallete.attributes['tailwind-name']}`);
};

export const BOX_ALIAS_TOKENS_PREFIX = getAliasTokensTailwindNamesByCategory('box', true);
