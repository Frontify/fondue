/* (c) Copyright Frontify Ltd., all rights reserved. */

import { globSync } from 'glob';

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
import { log, logError, logSuccess, resolveFromRoot } from './buildManifest/utils';

const PACKAGE_NAME = '@frontify/fondue-components';

function main(): void {
    log('Discovering components...');
    const components = discoverComponents();
    log(`Found ${components.length} components.`);

    const manifests: ComponentManifest[] = [];

    for (const component of components) {
        log(`Processing ${component.name}...`);

        // 1. Extract props + sub-components
        let mainProps: ComponentManifest['props'] = [];
        let subComponents: ComponentManifest['subComponents'] = [];
        try {
            const result = extractProps(component.name, component.filePath, component.dirPath);
            mainProps = result.mainProps;
            subComponents = result.subComponents;
        } catch (error) {
            logError(`Props extraction failed for ${component.name}: ${(error as Error).message}`);
        }

        // 2. Find story files
        const storiesGlob = resolveFromRoot(component.dirPath, '*.stories.tsx');
        const storyFiles = globSync(storiesGlob);

        // 3. Parse stories
        let examples: ComponentManifest['examples'] = [];
        try {
            examples = parseStories(storyFiles);
        } catch (error) {
            logError(`Story parsing failed for ${component.name}: ${(error as Error).message}`);
        }

        // 4. Read metadata
        const metadata = readMetadata(component.dirPath, component.name);

        // 5. Assemble manifest
        const manifest = assembleComponentManifest({
            component,
            mainProps,
            subComponents,
            examples,
            description: metadata?.description ?? '',
            instructions: metadata?.instructions ?? '',
            packageName: PACKAGE_NAME,
        });

        // 6. Write per-component manifest
        writeComponentManifest(manifest, component.dirPath);
        manifests.push(manifest);
    }

    // 7. Write global manifest
    writeGlobalManifest(manifests, PACKAGE_NAME);

    logSuccess(`Done! ${manifests.length} components written to manifest.json`);
}

try {
    main();
} catch (error) {
    logError(`Fatal error: ${(error as Error).message}`);
    process.exit(1);
}
