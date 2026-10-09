/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cpSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, describe, expect, it } from 'vitest';

import {
    checkDist,
    checkManifest,
    checkProseMirrorRanges,
    consumerDependencies,
    type PackageJson,
} from './check-exports';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const fixture = (name: string) => fileURLToPath(new URL(`../fixtures/exports/${name}`, import.meta.url));
const packageJson = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8')) as PackageJson;

const valid: PackageJson = {
    name: '@frontify/fondue-rich-text-editor',
    version: '0.0.0',
    type: 'module',
    publishConfig: { access: 'public' },
    exports: {
        './model': { types: './dist/model/index.d.ts', import: './dist/model/index.js' },
        './styles': './dist/style.css',
    },
    peerDependencies: {
        '@frontify/fondue-components': 'workspace:^',
        '@frontify/fondue-icons': 'workspace:^',
        '@frontify/fondue-tokens': 'workspace:^',
        react: '^18.2.0',
        'react-dom': '^18.2.0',
    },
    devDependencies: {
        '@frontify/fondue-components': 'workspace:^',
        '@frontify/fondue-icons': 'workspace:^',
        '@frontify/fondue-tokens': 'workspace:^',
    },
};

const scratch: string[] = [];
afterAll(() => {
    for (const directory of scratch) {
        rmSync(directory, { recursive: true, force: true });
    }
});

describe('check-exports manifest', () => {
    it('SPEC-rich-text/AC-001 passes on the package and on a valid manifest', () => {
        expect(checkManifest(packageJson)).toEqual([]);
        expect(checkManifest(valid)).toEqual([]);
    });

    it('SPEC-rich-text/AC-001 fails on an entry outside the Package layout table and on wrong conditions', () => {
        const exports = {
            ...valid.exports,
            './extra': { types: './dist/extra.d.ts', import: './dist/extra.js' },
            './reader': { import: './dist/reader/index.js' },
            './styles': { import: './dist/style.css' },
        };

        expect(checkManifest({ ...valid, exports }).sort()).toEqual([
            'exports ./extra is not in the Package layout table',
            'exports ./reader does not have exactly the types and import conditions',
            'exports ./styles does not map straight to ./dist/style.css',
        ]);
    });

    it('SPEC-rich-text/AC-001 fails on a missing entry from 1.0.0 only', () => {
        expect(checkManifest({ ...valid, version: '0.9.0' })).toEqual([]);
        expect(checkManifest({ ...valid, version: '1.0.0' })).toEqual(
            ['.', './features', './reader', './codecs', './html', './testing', './locales/*'].map(
                (entry) => `version 1.0.0 lacks the Package layout entry ${entry}`,
            ),
        );
    });

    it('SPEC-rich-text/AC-001 fails on the wrong name, module type and access', () => {
        expect(
            checkManifest({ ...valid, name: 'rte', type: 'commonjs', publishConfig: { access: 'restricted' } }),
        ).toEqual([
            'name is rte, not @frontify/fondue-rich-text-editor',
            'type is not "module"',
            'publishConfig.access is not "public"',
        ]);
    });

    it('SPEC-rich-text/AC-004 fails on React peers outside ^18.2.0 and on a prosemirror peer', () => {
        const peerDependencies = {
            ...valid.peerDependencies,
            react: '^19.0.0',
            'react-dom': '^18',
            'prosemirror-model': '^1.25.12',
        };

        expect(checkManifest({ ...valid, peerDependencies })).toEqual([
            'peerDependencies.react is ^19.0.0, not ^18.2.0',
            'peerDependencies.react-dom is ^18, not ^18.2.0',
            'prosemirror-model is a peer dependency',
        ]);
    });

    it('SPEC-rich-text/AC-058 fails when a Fondue package is not a workspace:^ peer and dev dependency', () => {
        const devDependencies = { ...valid.devDependencies, '@frontify/fondue-icons': '^1.0.0' };
        const peerDependencies = { ...valid.peerDependencies, '@frontify/fondue-components': '^33.0.0' };

        expect(checkManifest({ ...valid, devDependencies, peerDependencies })).toEqual([
            '@frontify/fondue-components is not a workspace:^ peer and dev dependency',
            '@frontify/fondue-icons is not a workspace:^ peer and dev dependency',
        ]);
    });
});

describe('check-exports consumer', () => {
    it('SPEC-rich-text/AC-001 installs every peer other than the Fondue workspace ones, and the React types, into the scratch consumer', () => {
        expect(consumerDependencies({ ...valid, devDependencies: { '@types/react': '^18.3.31' } })).toEqual([
            'react@^18.2.0',
            'react-dom@^18.2.0',
            '@types/react@^18.3.31',
        ]);
    });

    it('SPEC-rich-text/AC-001 installs the peers of the package as declared, so an entry that imports React loads', () => {
        const names = consumerDependencies(packageJson).map((dependency) => dependency.replace(/(?<=.)@.*$/, ''));

        expect(names).toEqual(expect.arrayContaining(['react', 'react-dom', '@types/react']));
    });
});

describe('check-exports prosemirror ranges', () => {
    const lockfile = (version: string) =>
        [
            'importers:',
            '',
            '  packages/rich-text-editor:',
            '    dependencies:',
            '      prosemirror-model:',
            '        specifier: ^1.25.12',
            `        version: ${version}`,
            '',
            'packages:',
        ].join('\n');

    it('SPEC-rich-text/AC-005 passes the package as declared against the repository lockfile', () => {
        const repositoryLockfile = readFileSync(join(packageRoot, '../../pnpm-lock.yaml'), 'utf8');

        expect(
            Object.keys(packageJson.dependencies ?? {}).filter((name) => name.startsWith('prosemirror-')),
        ).not.toEqual([]);
        expect(checkProseMirrorRanges(packageJson, repositoryLockfile)).toEqual([]);
    });

    it('SPEC-rich-text/AC-005 fails on a range below its floor, a range that is not a caret and a lockfile version outside the range', () => {
        const ranges = (range: string, version = '1.25.12') =>
            checkProseMirrorRanges({ ...valid, dependencies: { 'prosemirror-model': range } }, lockfile(version));

        expect(ranges('^1.25.12')).toEqual([]);
        expect(ranges('^1.20.0')).toEqual(['prosemirror-model ^1.20.0 starts below its floor 1.25.12']);
        expect(ranges('1.25.12')).toEqual([
            'prosemirror-model 1.25.12 is not a caret range of a package with a floor in the conventions',
        ]);
        expect(ranges('^1.25.12', '2.0.0')).toEqual([
            'prosemirror-model ^1.25.12 does not hold the lockfile version 2.0.0',
        ]);
        expect(
            checkProseMirrorRanges({ ...valid, dependencies: { 'prosemirror-unknown': '^1.0.0' } }, lockfile('1.0.0')),
        ).toEqual(['prosemirror-unknown ^1.0.0 is not a caret range of a package with a floor in the conventions']);
    });
});

describe('check-exports dist', () => {
    it('SPEC-rich-text/AC-001 passes on built entries that export, and on the existing stylesheet', async () => {
        expect(await checkDist(fixture('valid'), valid)).toEqual([]);
    });

    it('SPEC-rich-text/AC-001 and SPEC-rich-text/AC-002 fail on an entry with no export, a missing file and non-ES or bundled output', async () => {
        const root = realpathSync(mkdtempSync(join(tmpdir(), 'rte-exports-')));
        scratch.push(root);
        cpSync(fixture('broken'), root, { recursive: true });
        mkdirSync(join(root, 'dist/node_modules/left-pad'), { recursive: true });
        writeFileSync(join(root, 'dist/node_modules/left-pad/index.js'), 'export const leftPad = (value) => value;\n');
        const exports = {
            ...valid.exports,
            './testing': { types: './dist/testing/index.d.ts', import: './dist/testing/index.js' },
        };

        const violations = await checkDist(root, { ...valid, exports });

        expect(violations.sort()).toEqual(
            [
                'exports ./model has no export',
                'exports ./testing points at missing ./dist/testing/index.d.ts, ./dist/testing/index.js',
                'exports ./styles points at missing ./dist/style.css',
                'dist/model/legacy.cjs is not an ES module',
                'dist/model/umd.js holds CommonJS or UMD code',
                'dist/node_modules is a bundled dependency',
                'dist/node_modules/left-pad is a bundled dependency',
                'dist/node_modules/left-pad/index.js is a bundled dependency',
                'dist/testing/index.js.map maps a bundled dependency: ../../node_modules/left-pad/index.js',
            ].sort(),
        );
    });

    it('SPEC-rich-text/AC-001 expands a wildcard entry and checks every match', async () => {
        const exports = {
            ...valid.exports,
            './locales/*': { types: './dist/locales/*.d.ts', import: './dist/locales/*.js' },
        };

        expect(
            await checkDist(fixture('wildcard'), { ...valid, exports: { './locales/*': exports['./locales/*'] } }),
        ).toEqual([]);
        expect(
            await checkDist(fixture('wildcard-broken'), {
                ...valid,
                exports: { './locales/*': exports['./locales/*'] },
            }),
        ).toEqual([
            'exports ./locales/empty has no export',
            'exports ./locales/fr points at missing ./dist/locales/fr.d.ts',
        ]);
    });

    it('SPEC-rich-text/AC-001 fails on a wildcard entry that matches no built file', async () => {
        const exports = { './locales/*': { types: './dist/locales/*.d.ts', import: './dist/locales/*.js' } };

        expect(await checkDist(fixture('valid'), { ...valid, exports })).toEqual([
            'exports ./locales/* matches no built file',
        ]);
    });
});
