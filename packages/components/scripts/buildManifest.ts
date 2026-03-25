/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, mkdirSync, rmSync } from 'node:fs';

import {
    assembleComponentManifest,
    writeComponentManifest,
    writeGlobalManifest,
} from './buildManifest/assembleManifest';
import { discoverComponents } from './buildManifest/discoverComponents';
import { extractProps } from './buildManifest/extractProps';
import { parseStories } from './buildManifest/parseStories';
import { readMetadata } from './buildManifest/readMetadata';
import { type ComponentManifest } from './buildManifest/types';
import { resolveFromRoot } from './buildManifest/utils';

const PACKAGE_NAME = '@frontify/fondue/components';
const MANIFEST_DIR = resolveFromRoot('./manifests');

const main = (): void => {
    if (existsSync(MANIFEST_DIR)) {
        rmSync(MANIFEST_DIR, { recursive: true, force: true });
    }
    mkdirSync(MANIFEST_DIR, { recursive: true });

    console.log('Discovering components...');
    const components = discoverComponents();
    console.log(`Found ${components.length} components.`);

    const manifests: ComponentManifest[] = [];

    for (const component of components) {
        console.log(`Processing ${component.name}...`);

        // Extract props + sub-components
        let mainProps: ComponentManifest['props'] = [];
        let subComponents: ComponentManifest['subComponents'] = [];
        let typeDefinitions: ComponentManifest['typeDefinitions'] = {};
        try {
            const result = extractProps(component.name, component.dirPath);
            mainProps = result.mainProps;
            subComponents = result.subComponents;
            typeDefinitions = result.typeDefinitions;
        } catch (error) {
            console.error(`Props extraction failed for ${component.name}: ${(error as Error).message}`);
        }

        // Parse stories
        let examples: ComponentManifest['examples'] = [];
        let storiesStatus = '';
        try {
            const storiesResult = parseStories(component.storyFilePaths);
            examples = storiesResult.examples;
            storiesStatus = storiesResult.status;
        } catch (error) {
            console.error(`Story parsing failed for ${component.name}: ${(error as Error).message}`);
        }

        const metadata = readMetadata(component.dirPath, component.name);

        const manifest = assembleComponentManifest({
            component,
            mainProps,
            subComponents,
            examples,
            description: metadata?.description ?? '',
            status: storiesStatus,
            category: metadata?.category ?? '',
            tags: metadata?.tags ?? [],
            relatedComponents: metadata?.relatedComponents ?? [],
            instructions: metadata?.instructions ?? '',
            packageName: PACKAGE_NAME,
            typeDefinitions,
        });

        writeComponentManifest(manifest, MANIFEST_DIR);
        manifests.push(manifest);
    }

    writeGlobalManifest(manifests, PACKAGE_NAME, MANIFEST_DIR);

    console.log(`Done! ${manifests.length} components written to manifest.json`);
};

try {
    main();
} catch (error) {
    console.error(`Fatal error: ${(error as Error).message}`);
    process.exit(1);
}
