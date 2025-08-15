/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Formatter, type TransformedToken } from 'style-dictionary';

import { mergeDeep } from './mergeDeep';
import { toTitleCase } from './toTitleCase';

type TokenValue = string & {
    x: string;
    y: string;
    blur: string;
    spread: string;
    color: string;
};

const formatThemeName = (value: string) => {
    return toTitleCase(value.toLowerCase().replace('.', ' '));
};

const styles = (tokens: TransformedToken[]) => {
    let returnObject = {};

    for (const token of tokens) {
        if (!token.path || !token.path[0]) {
            continue;
        }
        let category = toTitleCase(token.path[0]);
        let name = toTitleCase(token.path.slice(1).join(' ').replaceAll('-', ' ').replaceAll('_', ''));
        const value = token.value as TokenValue;
        let type;

        // Typography
        if (token.attributes?.category === 'font' && token.attributes?.type === 'style') {
            name ||= 'DEFAULT STYLE';
            type = 'typography';
        }

        // Shadow
        if (token.attributes?.category === 'shadow' && token.attributes?.type === 'style') {
            for (const key of Object.keys(value)) {
                // @ts-expect-error - We know that the value is a string
                value[key] = value[key]?.replace('px', '');
            }
            name ||= 'DEFAULT SHADOW';
            type = 'boxShadow';
        }

        // Colors
        if (token.attributes?.category === 'color') {
            // Format the Box tokens a bit nicer.
            if (token.path[0] === 'box') {
                category += ` ${name.split(' ')[0]}`;
                name = name.split(' ').slice(1).join(' ');
            }
            name = name.replace('Color', '').trim().replaceAll(/\s+/g, ' ');
            name ||= 'DEFAULT COLOR';
            type = 'color';
        }

        if (type) {
            returnObject = mergeDeep(returnObject, {
                [category]: { [name]: { value, type } },
            });
        }
    }

    return returnObject;
};

export const figmaFormatter: Formatter = ({ dictionary, options }) => {
    const tokens = dictionary.allTokens;

    if (options?.theme) {
        return JSON.stringify({
            [formatThemeName(options.theme as string)]: styles(tokens),
        });
    }

    return JSON.stringify(styles(tokens));
};
