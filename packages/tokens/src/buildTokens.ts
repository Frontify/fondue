/* (c) Copyright Frontify Ltd., all rights reserved. */

import { rm } from 'node:fs/promises';

import Bun from 'bun';

import { loadFigmaVariables } from './loadFigmaVariables';
import { buildStyleDictionary } from './styleDictionary/buildStyleDictionary';
import { type Config } from './types';

const buildTokens = async () => {
    const config = (await Bun.file('config.json').json()) as Config;

    await rm(new URL('../dist', import.meta.url), { recursive: true, force: true });
    await loadFigmaVariables(config);
    await buildStyleDictionary(config);

    let themeStyles = '';
    await Promise.all([
        Bun.file(new URL('../.tmp/themes/primitives.css', import.meta.url))
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

    await Bun.write(new URL('../dist/themes/themes.module.css', import.meta.url), themeStyles);
    await rm(new URL('../.tmp', import.meta.url), { recursive: true, force: true });

    const moduleTypesTemplate = `declare const styles: {primitives: string;${config.themes.map((theme) => `${theme}: string;`).join(' ')}};
export default styles;`;

    await Bun.write(new URL('../dist/themes/themes.module.css.d.ts', import.meta.url), moduleTypesTemplate);
};

buildTokens().catch((error) => {
    console.error(error);
});
