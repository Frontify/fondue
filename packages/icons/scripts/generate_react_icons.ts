/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';

import camelCase from 'lodash/fp/camelCase';
import upperFirst from 'lodash/fp/upperFirst';
import { type INode, parseSync } from 'svgson';

import { template as reactComponentTemplate } from './templates/exportReactTemplate';
import { getCurrentDirPath, getFileInDirectoryByExtension } from './utilities/file';

const currentDir = getCurrentDirPath(import.meta.url);

const ICONS_DIR = resolve(currentDir, '../icons');
const OUTPUT_DIR = resolve(currentDir, '../src/icons');

const generateJsonPath = (children: INode) => {
    return (
        // @ts-expect-error - children is iterable
        children?.map(({ name, attributes, children }) => {
            const childrenJsonPath = generateJsonPath(children);
            return [
                name,
                attributes,
                ...(Array.isArray(childrenJsonPath) && childrenJsonPath.length === 0 ? [] : [childrenJsonPath]),
            ];
        })
    );
};

(() => {
    const svgFilePaths = getFileInDirectoryByExtension(ICONS_DIR, '.svg').filter(
        (file: string) => file.endsWith('-24.svg') || file.endsWith('-24-filled.svg'),
    );

    const iconsObject: Record<string, { filePath: string; children: ReturnType<typeof parseSync> }> = svgFilePaths
        .map((svgFilePath: string) => {
            const svg = readFileSync(resolve(ICONS_DIR, svgFilePath), 'utf-8');
            const contents = parseSync(svg);

            if (!(contents.children && contents.children.length > 0)) {
                throw new Error(`${svgFilePath}.svg has no children!`);
            }

            return { filePath: svgFilePath, contents };
        })
        .reduce((icons, icon) => {
            icons[icon.filePath] = icon.contents;
            return icons;
        }, {});

    // Generate the React components
    for (const iconPath of Object.keys(iconsObject)) {
        const pathWithoutSize: string = iconPath.replaceAll(/-24(-filled)?\.svg/g, '$1');
        const iconName = basename(pathWithoutSize, '.svg');
        const componentName = upperFirst(camelCase(iconName));

        let { children } = iconsObject[iconPath];
        children = generateJsonPath(children);

        const getSvg = () => readFileSync(resolve(ICONS_DIR, iconPath), 'utf-8');
        const reactElementTemplate = reactComponentTemplate({ componentName, iconName, children, getSvg });
        writeFileSync(resolve(OUTPUT_DIR, `${iconName}.ts`), reactElementTemplate, 'utf-8');
    }

    // Generate the barrel file
    const barrelFile = Object.keys(iconsObject)
        .map((iconPath: string) => {
            const pathWithoutSize: string = iconPath.replaceAll(/-24(-filled)?\.svg/g, '$1');
            const iconName = basename(pathWithoutSize, '.svg');
            const componentName = upperFirst(camelCase(iconName));

            return `export { Icon${componentName} } from './${iconName}';`;
        })
        .join('\n');

    writeFileSync(resolve(OUTPUT_DIR, 'index.ts'), barrelFile, 'utf-8');

    console.log('Fondue React icons generated successfully');
})();
