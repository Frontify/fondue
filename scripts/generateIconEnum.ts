/* (c) Copyright Frontify Ltd., all rights reserved. */

import fastGlob from 'fast-glob';
import { writeFile } from 'fs/promises';

const ICON_ENUM_OUTPUT_PATH = './src/foundation/Icon/IconEnum.ts';

(async () => {
    const iconFilePath = await fastGlob('./src/foundation/Icon/Generated/*.tsx', { objectMode: true });
    const iconNames = iconFilePath.map((path) => path.name.replace('Icon', '').replace('.tsx', ''));

    const iconsEnumString = `
        export enum IconEnum {
            ${iconNames.map((name) => `${name} = "${name}"`).join(',\n')}
        };
    `;

    writeFile(ICON_ENUM_OUTPUT_PATH, iconsEnumString);
})();
