/* (c) Copyright Frontify Ltd., all rights reserved. */

import { writeFile } from 'node:fs/promises';

import fastGlob from 'fast-glob';

const ICON_ENUM_OUTPUT_PATH = './src/foundation/Icon/IconEnum.ts';

(async () => {
    const iconFilePath = await fastGlob('./src/foundation/Icon/Generated/*.tsx', { objectMode: true });
    const iconNames = iconFilePath.map((path) => path.name.replaceAll(/(^Icon)|(\.tsx$)/g, ''));

    const iconsEnumString = `
        /**
         * @deprecated Use icons from \`@frontify/fondue/icons\` instead.
         */
        export enum IconEnum {
            ${iconNames.map((name) => `${name} = "${name}"`).join(',\n')}
        };
    `;

    writeFile(ICON_ENUM_OUTPUT_PATH, iconsEnumString);
})();
