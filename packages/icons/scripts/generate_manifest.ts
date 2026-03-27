/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';

import { camelCase, upperFirst } from 'lodash-es';

import { getCurrentDirPath, getFileInDirectoryByExtension } from './utilities/file';

const currentDir = getCurrentDirPath(import.meta.url);
const packageJson = JSON.parse(readFileSync(resolve(currentDir, '../package.json'), 'utf-8'));

const ICONS_DIR = resolve(currentDir, '../icons');
const OUTPUT_PATH = resolve(currentDir, '../manifest.json');
const IMPORT_PATH = packageJson.name as string;

const AVAILABLE_SIZES = [12, 16, 20, 24, 32] as const;

type IconSize = (typeof AVAILABLE_SIZES)[number];

type IconManifest = {
    sizes: readonly number[];
    icons: IconEntry[];
};

type IconEntry = {
    name: string;
    componentName: string;
    exportName: string;
    importPath: string;
    filled: boolean;
    availableSizes: IconSize[];
    defaultSize: number;
    keywords: string[];
};

const getAvailableSizes = (iconDir: string, iconBaseName: string, filled: boolean): IconSize[] => {
    const files = readdirSync(resolve(ICONS_DIR, iconDir));
    const suffix = filled ? '-filled.svg' : '.svg';

    return AVAILABLE_SIZES.filter((size) => files.includes(`${iconBaseName}-${size}${suffix}`));
};

const deriveKeywords = (name: string): string[] => {
    return name.split('-').filter((part) => part.length > 0);
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
        const componentName = upperFirst(camelCase(iconName));
        const iconDir = svgFilePath.split('/')[0];

        const availableSizes = getAvailableSizes(iconDir, baseIconName, filled);

        return {
            name: iconName,
            componentName,
            exportName: `Icon${componentName}`,
            importPath: IMPORT_PATH,
            filled,
            availableSizes,
            defaultSize: 24,
            keywords: deriveKeywords(iconName),
        };
    });

    icons.sort((a, b) => a.name.localeCompare(b.name));

    const manifest: IconManifest = {
        sizes: AVAILABLE_SIZES,
        icons,
    };

    writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2), 'utf-8');

    console.log(`Manifest generated successfully: ${icons.length} icons written to manifest.json`);
})();
