/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIRECTORY = join(import.meta.dirname, '../../dist');
const TEMPORARY_DIRECTORY = join(import.meta.dirname, '../../tmp');
const FIGMA_OUTPUT_DIRECTORY = join(OUTPUT_DIRECTORY, './figma');
const FIGMA_TEMPORARY_DIRECTORY = join(TEMPORARY_DIRECTORY, './figma');

const ENFORCE_ALIAS_ORDER = {
    // Mostly colors
    Base: null,
    Text: null,
    Line: null,
    'Box Neutral': null,
    'Box Selected': null,
    'Box Disabled': null,
    'Box Positive': null,
    'Box Negative': null,
    'Box Warning': null,
    // Fonts styles
    Body: null,
    Heading: null,
    Code: null,
};

export const mergeFigmaFiles = () => {
    const files = readdirSync(FIGMA_TEMPORARY_DIRECTORY, 'utf8');

    let brand: Record<string, unknown> = {};
    let aliases: Record<string, unknown> = {};
    let components: Record<string, unknown> = {};

    for (const file of files.reverse()) {
        const content = readFileSync(join(FIGMA_TEMPORARY_DIRECTORY, file), 'utf8');
        if (file.includes('brand')) {
            brand = { ...brand, ...(JSON.parse(content) as Record<string, unknown>) };
        } else if (file.includes('aliases')) {
            aliases = { ...aliases, ...(JSON.parse(content) as Record<string, unknown>) };
        } else {
            components = { ...components, ...(JSON.parse(content) as Record<string, unknown>) };
        }
    }

    aliases = Object.assign(ENFORCE_ALIAS_ORDER, aliases);

    if (!existsSync(FIGMA_OUTPUT_DIRECTORY)) {
        mkdirSync(FIGMA_OUTPUT_DIRECTORY);
    }

    writeFileSync(join(FIGMA_OUTPUT_DIRECTORY, 'brand.json'), JSON.stringify(brand));
    writeFileSync(join(FIGMA_OUTPUT_DIRECTORY, 'aliases.json'), JSON.stringify(aliases));
    writeFileSync(join(FIGMA_OUTPUT_DIRECTORY, 'components.json'), JSON.stringify(components));
};
