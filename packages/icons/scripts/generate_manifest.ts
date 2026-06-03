/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, writeFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';

import { camelCase, upperFirst } from 'lodash-es';

import { getCurrentDirPath, getFileInDirectoryByExtension } from './utilities/file';

const currentDir = getCurrentDirPath(import.meta.url);

const ICONS_DIR = resolve(currentDir, '../icons');
const OUTPUT_PATH = resolve(currentDir, '../dist/manifest.json');
const PACKAGE_NAME = '@frontify/fondue/icons';

const AVAILABLE_SIZES = [12, 16, 20, 24, 32] as const;

type IconSize = (typeof AVAILABLE_SIZES)[number];

type IconExample = {
    name: string;
    description: string;
    code: string;
    isCanonical: boolean;
};

type IconEntry = {
    name: string;
    description: string;
    componentName: string;
    importStatement: string;
    filled: boolean;
    availableSizes: IconSize[];
    defaultSize: number;
    tags: string[];
    examples: IconExample[];
};

type IconManifest = {
    packageName: string;
    sizes: readonly number[];
    icons: IconEntry[];
};

const getAvailableSizes = (iconDir: string, iconBaseName: string, filled: boolean): IconSize[] => {
    const files = readdirSync(resolve(ICONS_DIR, iconDir));
    const suffix = filled ? '-filled.svg' : '.svg';

    return AVAILABLE_SIZES.filter((size) => files.includes(`${iconBaseName}-${size}${suffix}`));
};

const deriveTags = (name: string): string[] => {
    return name.split('-').filter((part) => part.length > 0);
};

const buildExamples = (componentName: string, defaultSize: number): IconExample[] => {
    return [
        {
            name: 'Default',
            description: `Default usage of ${componentName} at size ${defaultSize}.`,
            code: `import { ${componentName} } from '${PACKAGE_NAME}';\n\n<${componentName} size={${defaultSize}} />`,
            isCanonical: true,
        },
    ];
};

(() => {
    const svgFilePaths = (getFileInDirectoryByExtension(ICONS_DIR, '.svg') as string[]).filter(
        (file) => file.endsWith('-24.svg') || file.endsWith('-24-filled.svg'),
    );

    const icons: IconEntry[] = svgFilePaths.map((svgFilePath) => {
        const pathWithoutSize: string = svgFilePath.replaceAll(/-24(-filled)?\.svg/g, '$1');
        const iconName = basename(pathWithoutSize, '.svg');
        const filled = svgFilePath.endsWith('-24-filled.svg');
        const baseIconName = filled ? iconName.replace(/-filled$/, '') : iconName;
        const componentName = `Icon${upperFirst(camelCase(iconName))}`;
        const iconDir = svgFilePath.split('/')[0];

        const availableSizes = getAvailableSizes(iconDir, baseIconName, filled);
        const defaultSize = 24;

        return {
            name: iconName,
            description: '',
            componentName,
            importStatement: `import { ${componentName} } from '${PACKAGE_NAME}';`,
            filled,
            availableSizes,
            defaultSize,
            tags: deriveTags(iconName),
            examples: buildExamples(componentName, defaultSize),
        };
    });

    icons.sort((a, b) => a.name.localeCompare(b.name));

    const manifest: IconManifest = {
        packageName: PACKAGE_NAME,
        sizes: AVAILABLE_SIZES,
        icons,
    };

    writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2), 'utf-8');

    console.log(`Manifest generated successfully: ${icons.length} icons written to manifest.json`);
})();
