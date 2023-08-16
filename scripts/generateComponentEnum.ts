/* (c) Copyright Frontify Ltd., all rights reserved. */

import fastGlob from 'fast-glob';
import { writeFile } from 'fs/promises';

const COMPONENT_ENUM_OUTPUT_PATH = './src/components/ComponentEnum.ts';

(async () => {
    const componentFilePath = await fastGlob('./src/components/*/*.tsx', { objectMode: true });
    const componentNames: any = componentFilePath
        .filter((path) => !path.name.includes('.cy') && !path.name.includes('.stories') && !path.name.includes('-'))
        .map((path) => path.name.replaceAll(/(\.tsx$)/g, ''));

    const componentListWithoutDuplicates = componentNames.filter(
        (item: string, index: number) => componentNames.indexOf(item) === index,
    );

    const componentsEnumString = `
        export enum ComponentEnum {
            ${componentListWithoutDuplicates.map((name: string) => `"Fondue - ${name}" = "${name}"`).join(',\n')}
        };
    `;

    writeFile(COMPONENT_ENUM_OUTPUT_PATH, componentsEnumString);
})();
