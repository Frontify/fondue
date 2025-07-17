/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadFigmaVariables } from './loadFigmaVariables';
import { buildStyleDictionary } from './styleDictionary/buildStyleDictionary';
import { type Config } from './types';

type ThemeObject = {
    [key: string]: ThemeObject;
};

const buildTokens = async () => {
    const CWD = path.dirname(fileURLToPath(import.meta.url));
    const config = JSON.parse(await readFile('config.json', 'utf-8')) as Config;

    await rm(path.resolve(CWD, '../dist'), { recursive: true, force: true });
    await loadFigmaVariables(config);
    await buildStyleDictionary(config);

    const themeStyles = await Promise.all([
        readFile(path.resolve(CWD, '../.tmp/themes/base.css'), 'utf-8').then((content) => {
            return content;
        }),
        ...config.themes.map(async (theme) => {
            return readFile(path.resolve(CWD, `../.tmp/themes/${theme}.css`), 'utf-8').then((content) => {
                return content;
            });
        }),
    ]).then((results) => {
        return results.join('\n');
    });

    const colors: ThemeObject = await config.themes.reduce(async (accPromise, themeName) => {
        const acc = await accPromise;
        const theme = await readFile(path.resolve(CWD, `../.tmp/objects/${themeName}.json`), 'utf-8')
            .then((content): Record<string, ThemeObject> => {
                const sharedObject = JSON.parse(content) as Record<string, ThemeObject>;
                return sharedObject[themeName]?.color || {};
            })
            .then((theme) => theme);

        if (!theme) {
            return acc;
        }

        return mergeObjects(acc, theme, themeName);
    }, Promise.resolve({}));

    const semantic: ThemeObject = await readFile(path.resolve(CWD, '../.tmp/objects/semantic.json'), 'utf-8')
        .then((content) => JSON.parse(content) as Record<string, ThemeObject>)
        .then((sharedObject: Record<string, ThemeObject>) => sharedObject.default || {});

    const utilities: ThemeObject = await readFile(path.resolve(CWD, '../.tmp/objects/utilities.json'), 'utf-8')
        .then((content) => JSON.parse(content) as Record<string, ThemeObject>)
        .then((utilitiesObject: Record<string, ThemeObject>) => utilitiesObject.default || {});

    const availableTokens: ThemeObject = {
        colors,
        semantic,
        utilities,
    };

    await mkdir(path.resolve(CWD, '../dist/json'), { recursive: true });
    await writeFile(path.resolve(CWD, '../dist/json/all-tokens.json'), JSON.stringify(availableTokens, null, 2));
    await writeFile(path.resolve(CWD, '../dist/json/colors.json'), JSON.stringify(colors, null, 2));
    await writeFile(path.resolve(CWD, '../dist/json/semantic.json'), JSON.stringify(semantic, null, 2));
    await writeFile(path.resolve(CWD, '../dist/json/utilities.json'), JSON.stringify(utilities, null, 2));

    await mkdir(path.resolve(CWD, '../dist/themes'), { recursive: true });
    await writeFile(path.resolve(CWD, '../dist/themes/themes.module.css'), themeStyles);
    await rm(path.resolve(CWD, '../.tmp'), { recursive: true, force: true });

    const moduleTypesTemplate = `declare const styles: {base: string;${config.themes
        .map((theme) => `${theme}: string;`)
        .join(' ')}};
export default styles;`;

    await writeFile(path.resolve(CWD, '../dist/themes/themes.module.css.d.ts'), moduleTypesTemplate);

    const tailwindTypesTemplate = `declare module '*';
export default {};`;

    await writeFile(path.resolve(CWD, '../dist/tailwind/tailwind.config.d.ts'), tailwindTypesTemplate);
    await mkdir(path.resolve(CWD, '../dist/legacy'), { recursive: true });
    await writeFile(path.resolve(CWD, '../dist/legacy/deprecatedTailwindConfig.d.ts'), tailwindTypesTemplate);
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
