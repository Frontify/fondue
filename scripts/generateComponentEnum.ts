/* (c) Copyright Frontify Ltd., all rights reserved. */

import fastGlob from 'fast-glob';
import { writeFile } from 'fs/promises';

const COMPONENT_ENUM_OUTPUT_PATH = './src/components/ComponentEnum.ts';

(async () => {
    const componentFilePath = await fastGlob('./src/components/*/*.tsx', { objectMode: true });
    const componentNames = componentFilePath
        .filter((path) => !path.name.includes('.cy') && !path.name.includes('.stories') && !path.name.includes('-'))
        .map((path) => path.name.replaceAll(/(\.tsx$)/g, ''));

    const componentsEnumString = `
        export enum ComponentEnum {
            ${componentNames.map((name) => `"Fondue - ${name}" = "${name}"`).join(',\n')}
        };
    `;

    writeFile(COMPONENT_ENUM_OUTPUT_PATH, componentsEnumString);
})();
