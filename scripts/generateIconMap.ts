/* (c) Copyright Frontify Ltd., all rights reserved. */

import fastGlob from 'fast-glob';
import { writeFile } from 'fs/promises';

const GENERATED_ICON_FOLDER = '@foundation/Icon/Generated/';
const ICON_ENUM_OUTPUT_PATH = './src/foundation/Icon/IconEnum.ts';
const ICON_MAP_OUTPUT_PATH = './src/foundation/Icon/IconsMap.tsx';
const REACT_IMPORT = 'import React, { ReactElement } from "react";';
const ICON_ENUM_IMPORT = 'import { IconEnum } from "./IconEnum";';

(async () => {
    const iconFilePath = await fastGlob('./src/foundation/Icon/Generated/*.tsx', { objectMode: true });
    const iconNames = iconFilePath.map((path) => path.name.replace('Icon', '').replace('.tsx', ''));

    const iconsEnumString = `
        export enum IconEnum {
            ${iconNames.map((name) => `${name} = "${name}"`).join(',\n')}
        };
    `;

    const iconsImport = iconNames
        .map((name) => `import Icon${name} from "${GENERATED_ICON_FOLDER}Icon${name}";`)
        .join('\n');

    const iconsMapString = `
        export const iconsMap: Record<IconEnum, ReactElement> = {
            ${iconNames.map((name) => `[IconEnum.${name}]: <Icon${name} />`).join(',\n')}
        };
    `;

    writeFile(ICON_ENUM_OUTPUT_PATH, iconsEnumString);
    writeFile(ICON_MAP_OUTPUT_PATH, [REACT_IMPORT, ICON_ENUM_IMPORT, iconsImport, iconsMapString].join('\n'));
})();
