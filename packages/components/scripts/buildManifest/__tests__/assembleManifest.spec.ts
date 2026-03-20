// @vitest-environment node
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('node:fs');
vi.mock('../utils', () => ({
    resolveFromRoot: (...segments: string[]) => ['<root>', ...segments].join('/'),
}));

import { writeFileSync } from 'node:fs';

import {
    assembleComponentManifest,
    writeComponentManifest,
    writeGlobalManifest,
    type AssembleInput,
} from '../assembleManifest';
import { type ComponentManifest } from '../types';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const baseComponent = {
    name: 'Button',
    filePath: 'src/components/Button/Button.tsx',
    dirPath: 'src/components/Button',
    storyFilePaths: [],
};

const baseInput: AssembleInput = {
    component: baseComponent,
    mainProps: [],
    subComponents: [],
    examples: [],
    description: 'A button component',
    status: 'released',
    category: 'Components',
    tags: ['interactive'],
    relatedComponents: ['Link'],
    instructions: 'Use onPress, not onClick.',
    packageName: '@frontify/fondue-components',
    typeDefinitions: {},
};

// ---------------------------------------------------------------------------
// assembleComponentManifest
// ---------------------------------------------------------------------------

describe('assembleComponentManifest', () => {
    it('sets name from the component', () => {
        const manifest = assembleComponentManifest(baseInput);
        expect(manifest.name).toBe('Button');
    });

    it('builds importStatement from packageName and component name', () => {
        const manifest = assembleComponentManifest(baseInput);
        expect(manifest.importStatement).toBe("import { Button } from '@frontify/fondue-components';");
    });

    it('passes through all metadata fields', () => {
        const manifest = assembleComponentManifest(baseInput);
        expect(manifest.description).toBe('A button component');
        expect(manifest.status).toBe('released');
        expect(manifest.category).toBe('Components');
        expect(manifest.tags).toEqual(['interactive']);
        expect(manifest.relatedComponents).toEqual(['Link']);
        expect(manifest.instructions).toBe('Use onPress, not onClick.');
        expect(manifest.filePath).toBe('src/components/Button/Button.tsx');
        expect(manifest.typeDefinitions).toEqual({});
    });

    it('includes props passed in', () => {
        const input: AssembleInput = {
            ...baseInput,
            mainProps: [
                {
                    name: 'onClick',
                    type: '() => void',
                    required: false,
                    defaultValue: null,
                    description: 'Click handler',
                    deprecated: false,
                    deprecationMessage: '',
                },
            ],
        };
        const manifest = assembleComponentManifest(input);
        expect(manifest.props).toHaveLength(1);
        expect(manifest.props[0].name).toBe('onClick');
    });

    it('includes subComponents passed in', () => {
        const input: AssembleInput = {
            ...baseInput,
            subComponents: [{ name: 'Button.Icon', props: [] }],
        };
        const manifest = assembleComponentManifest(input);
        expect(manifest.subComponents).toHaveLength(1);
        expect(manifest.subComponents[0].name).toBe('Button.Icon');
    });

    it('includes examples passed in', () => {
        const input: AssembleInput = {
            ...baseInput,
            examples: [
                { name: 'Default', storyName: 'Default', description: '', code: '<Button />', isCanonical: true },
            ],
        };
        const manifest = assembleComponentManifest(input);
        expect(manifest.examples).toHaveLength(1);
        expect(manifest.examples[0].isCanonical).toBe(true);
    });

    it('includes typeDefinitions passed in', () => {
        const input: AssembleInput = {
            ...baseInput,
            typeDefinitions: { ButtonVariant: '"primary" | "secondary"' },
        };
        const manifest = assembleComponentManifest(input);
        expect(manifest.typeDefinitions).toEqual({ ButtonVariant: '"primary" | "secondary"' });
    });
});

// ---------------------------------------------------------------------------
// writeComponentManifest
// ---------------------------------------------------------------------------

describe('writeComponentManifest', () => {
    beforeEach(() => vi.clearAllMocks());

    it('calls writeFileSync with a path ending in <Name>.manifest.json', () => {
        vi.mocked(writeFileSync).mockImplementation(() => {});

        const manifest = assembleComponentManifest(baseInput);
        writeComponentManifest(manifest, 'src/components/Button');

        expect(writeFileSync).toHaveBeenCalledOnce();
        const [path] = vi.mocked(writeFileSync).mock.calls[0];
        expect(String(path)).toContain('Button.manifest.json');
    });

    it('serializes the manifest as JSON', () => {
        vi.mocked(writeFileSync).mockImplementation(() => {});

        const manifest = assembleComponentManifest(baseInput);
        writeComponentManifest(manifest, 'src/components/Button');

        const [, content] = vi.mocked(writeFileSync).mock.calls[0];
        const parsed = JSON.parse(String(content)) as ComponentManifest;
        expect(parsed.name).toBe('Button');
        expect(parsed.importStatement).toBe("import { Button } from '@frontify/fondue-components';");
    });
});

// ---------------------------------------------------------------------------
// writeGlobalManifest
// ---------------------------------------------------------------------------

// Helper: find the global manifest write call (exact filename "manifest.json", not "X.manifest.json")
function findGlobalManifestCall() {
    return vi.mocked(writeFileSync).mock.calls.find(([p]) => /[/\\]manifest\.json$/.test(String(p)));
}

describe('writeGlobalManifest', () => {
    beforeEach(() => vi.clearAllMocks());

    it('writes a manifest.json file', () => {
        vi.mocked(writeFileSync).mockImplementation(() => {});

        const manifest = assembleComponentManifest(baseInput);
        writeGlobalManifest([manifest], '@frontify/fondue-components');

        expect(findGlobalManifestCall()).toBeDefined();
    });

    it('includes all component names as keys', () => {
        vi.mocked(writeFileSync).mockImplementation(() => {});

        const manifest1 = assembleComponentManifest(baseInput);
        const manifest2 = assembleComponentManifest({
            ...baseInput,
            component: { ...baseComponent, name: 'Badge', filePath: 'src/components/Badge/Badge.tsx' },
            description: 'A badge',
        });
        writeGlobalManifest([manifest1, manifest2], '@frontify/fondue-components');

        const parsed = JSON.parse(String(findGlobalManifestCall()[1]));
        expect(parsed.components).toHaveProperty('Button');
        expect(parsed.components).toHaveProperty('Badge');
    });

    it('each component ref has the expected shape', () => {
        vi.mocked(writeFileSync).mockImplementation(() => {});

        const manifest = assembleComponentManifest({
            ...baseInput,
            subComponents: [{ name: 'Button.Icon', props: [] }],
        });
        writeGlobalManifest([manifest], '@frontify/fondue-components');

        const parsed = JSON.parse(String(findGlobalManifestCall()[1]));
        const ref = parsed.components.Button;

        expect(ref.name).toBe('Button');
        expect(ref.status).toBe('released');
        expect(ref.category).toBe('Components');
        expect(ref.tags).toEqual(['interactive']);
        expect(ref.subComponentNames).toEqual(['Button.Icon']);
        expect(ref.manifestPath).toContain('Button.manifest.json');
    });

    it('includes schemaVersion and packageName in the global manifest', () => {
        vi.mocked(writeFileSync).mockImplementation(() => {});

        const manifest = assembleComponentManifest(baseInput);
        writeGlobalManifest([manifest], '@frontify/fondue-components');

        const parsed = JSON.parse(String(findGlobalManifestCall()[1]));
        expect(parsed.schemaVersion).toBeDefined();
        expect(parsed.packageName).toBe('@frontify/fondue-components');
    });
});
