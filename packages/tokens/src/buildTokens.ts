/* (c) Copyright Frontify Ltd., all rights reserved. */

import { rm } from 'node:fs/promises';

import Bun from 'bun';

import { loadFigmaVariables } from './loadFigmaVariables';
import { buildStyleDictionary } from './styleDictionary/buildStyleDictionary';
import { type Config } from './types';

type ThemeObject = {
    [key: string]: ThemeObject;
};

const buildTokens = async () => {
    const config = (await Bun.file('config.json').json()) as Config;

    await rm(new URL('../dist', import.meta.url), { recursive: true, force: true });
    await loadFigmaVariables(config);
    await buildStyleDictionary(config);

    let themeStyles = '';
    await Promise.all([
        Bun.file(new URL('../.tmp/themes/base.css', import.meta.url))
            .text()
            .then((content) => {
                themeStyles += `${content}\n`;
            }),

        ...config.themes.map(async (theme) => {
            return Bun.file(new URL(`../.tmp/themes/${theme}.css`, import.meta.url))
                .text()
                .then((content) => {
                    themeStyles += `${content}\n`;
                });
        }),
    ]);

    const colors: ThemeObject = await config.themes.reduce(async (accPromise, themeName) => {
        const acc = await accPromise;
        const theme = (await Bun.file(new URL(`../.tmp/objects/${themeName}.json`, import.meta.url))
            .json()
            .then((sharedObject: Record<string, ThemeObject>) => {
                return sharedObject[themeName]?.color || {};
            })) as Record<string, ThemeObject>;

        if (!theme) {
            return acc;
        }

        return mergeObjects(acc, theme, themeName);
    }, Promise.resolve({}));

    const semantic: ThemeObject = await Bun.file(new URL('../.tmp/objects/semantic.json', import.meta.url))
        .json()
        .then((sharedObject: Record<string, ThemeObject>) => sharedObject.default || {});

    const utilities: ThemeObject = await Bun.file(new URL('../.tmp/objects/utilities.json', import.meta.url))
        .json()
        .then((utilitiesObject: Record<string, ThemeObject>) => utilitiesObject.default || {});

    const availableTokens: ThemeObject = {
        colors,
        semantic,
        utilities,
    };

    await Bun.write(new URL('../dist/json/tokens.json', import.meta.url), JSON.stringify(availableTokens, null, 2));
    await Bun.write(new URL('../dist/json/colors.json', import.meta.url), JSON.stringify(colors, null, 2));
    await Bun.write(new URL('../dist/json/semantic.json', import.meta.url), JSON.stringify(semantic, null, 2));
    await Bun.write(new URL('../dist/json/utilities.json', import.meta.url), JSON.stringify(utilities, null, 2));

    await Bun.write(new URL('../dist/themes/themes.module.css', import.meta.url), themeStyles);
    await rm(new URL('../.tmp', import.meta.url), { recursive: true, force: true });

    const moduleTypesTemplate = `declare const styles: {primitives: string;${config.themes.map((theme) => `${theme}: string;`).join(' ')}};
export default styles;`;

    await Bun.write(new URL('../dist/themes/themes.module.css.d.ts', import.meta.url), moduleTypesTemplate);
};

buildTokens().catch((error) => {
    console.error(error);
});

const mergeObjects = (acc: ThemeObject, theme: ThemeObject, themeName: string): ThemeObject => {
    for (const [key, value] of Object.entries(theme)) {
        if (typeof value === 'object' && key !== 'path') {
            if (acc[key] && typeof acc[key] === 'object') {
                acc[key] = mergeObjects(acc[key], value, themeName);
            } else {
                acc[key] = mergeObjects({}, value, themeName);
            }
        } else {
            if (acc[key]) {
                acc[key] = value;
            } else {
                acc[key] = value;
            }
        }
    }
    return acc;
};
