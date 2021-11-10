/* (c) Copyright Frontify Ltd., all rights reserved. */

import fastGlob from "fast-glob";
import { writeFile } from "fs/promises";

const TSX_EXTENSION = ".tsx";
const GENERATED_ICON_FOLDER = "@foundation/Icon/Generated/";
const ICON_MAP_OUTPUT_FOLDER = "./src/foundation/Icon/IconsMap.tsx";
const REACT_IMPORT = 'import React, { ReactElement } from "react";';

(async () => {
    const iconFilePath = await fastGlob(`./src/foundation/Icon/Generated/*${TSX_EXTENSION}`, { objectMode: true });
    const iconNames = iconFilePath.map((path) => path.name.replace("Icon", "").replace(TSX_EXTENSION, ""));

    const iconsEnumString = `
        export enum IconEnum {
            ${iconNames.map((name) => `${name} = "${name}"`).join(",\n")}
        };
    `;

    const iconsImport = iconNames
        .map((name) => `import Icon${name} from "${GENERATED_ICON_FOLDER}Icon${name}";`)
        .join("\n");

    const iconsMapString = `
        export const iconsMap: Record<IconEnum, ReactElement> = {
            ${iconNames.map((name) => `[IconEnum.${name}]: <Icon${name} />`).join(",\n")}
        };
    `;

    writeFile(ICON_MAP_OUTPUT_FOLDER, [REACT_IMPORT, iconsEnumString, iconsImport, iconsMapString].join("\n"));
})();
