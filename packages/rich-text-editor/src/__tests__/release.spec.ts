/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { execFileSync } from 'node:child_process';
import {
    copyFileSync,
    existsSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    readdirSync,
    rmSync,
    writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import Ajv2020 from 'ajv/dist/2020';
import typescript from 'typescript';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { installInto, PACKAGE_ROOT, packRelease } from './fixtures/apps/consumer';
import { pendingResults } from './fixtures/qualification';
import {
    bumped,
    BUMPS,
    mustHoldQualificationRecord,
    qualificationRecordVersion,
    readPreRelease,
} from './fixtures/releaseVersion';

const NAME = '@frontify/fondue-rich-text-editor';
const REPOSITORY = join(PACKAGE_ROOT, '..', '..');

type Exports = Readonly<Record<string, string | { types?: string; import?: string }>>;

const manifestOf = (root: string) =>
    JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
        version: string;
        exports?: Exports;
    };

// The dependencies whose resolved versions the release notes record.
const RECORDED = /^(?:prosemirror-[\w-]+|markdown-it|@radix-ui\/react-toolbar|lowlight|emojibase-data)$/;

/** Each recorded dependency of `resolved` whose `name@version` the release notes do not name. */
const unrecordedVersions = (notes: string, resolved: Readonly<Record<string, string>>): string[] => {
    const missing: string[] = [];
    for (const [name, version] of Object.entries(resolved)) {
        if (!RECORDED.test(name)) {
            continue;
        }

        const pin = `${name}@${version}`;
        const mentioned = new RegExp(`(?:^|[\\s\`(])${pin.replaceAll('.', '\\.')}(?![\\w.-])`, 'm').test(notes);
        if (!mentioned) {
            missing.push(pin);
        }
    }

    return missing;
};

/** The docs pages of `root` that a release of `version` with `notes` needs and lacks (accessibility, Report). */
const missingReleasePages = (root: string, version: string, notes: string): string[] => {
    const pages = ['src/docs/limitations.mdx'];
    const patch = Number(version.split('.')[2]);
    if (patch === 0 || /^[ \t]*#{1,6} Interaction\s*$/m.test(notes)) {
        pages.push(`src/docs/accessibility/${version}.mdx`);
    }

    return pages.filter((page) => !existsSync(join(root, page)));
};

/** The locales that `./locales/*` publishes, one source module each. */
const LOCALES = readdirSync(join(PACKAGE_ROOT, 'src', 'locales'))
    .filter((file) => /^[a-z]{2}-[A-Z]{2}\.ts$/.test(file))
    .map((file) => file.slice(0, -'.ts'.length));

/** Each file that an `exports` target of `root/package.json` names and `root` lacks, with `*` expanded to each of `names`. */
const missingTargets = (root: string, names: readonly string[]): string[] => {
    const missing: string[] = [];
    for (const target of Object.values(manifestOf(root).exports ?? {})) {
        const paths: string[] = [];
        if (typeof target === 'string') {
            paths.push(target);
        } else {
            if (target.types !== undefined) {
                paths.push(target.types);
            }

            if (target.import !== undefined) {
                paths.push(target.import);
            }
        }

        for (const path of paths) {
            const expanded: string[] = [];
            if (path.includes('*')) {
                for (const name of names) {
                    expanded.push(path.replace('*', name));
                }
            } else {
                expanded.push(path);
            }

            for (const candidate of expanded) {
                if (!existsSync(join(root, candidate))) {
                    missing.push(candidate);
                }
            }
        }
    }

    missing.sort();

    return missing;
};

const QUALIFICATION = join(PACKAGE_ROOT, 'qualification');

/** What keeps a qualification record from releasing: its schema errors, then each result still pending. */
const qualificationErrors = (record: unknown): string[] => {
    const validate = new Ajv2020({ strict: true, allowUnionTypes: true, allErrors: true }).compile(
        JSON.parse(readFileSync(join(QUALIFICATION, 'schema.json'), 'utf8')) as object,
    );
    validate(record);
    const errors = (validate.errors ?? []).map(({ instancePath, message }) => `${instancePath} ${String(message)}`);

    return [...errors, ...pendingResults(record).map((result) => `${result} is pending`)];
};

// The unions a minor release may grow, and the aliases they are made of.
const GROWABLE = [
    'DiagnosticCode',
    'ChangeOrigin',
    'ContentRuleId',
    'CommandResult',
    'CommitResult',
    'ReplaceResult',
    'UnresolvedAsset',
];

type PublicExport = {
    name: string;
    declarations: readonly typescript.Node[];
    deprecated: boolean;
};

/** The exports of each script entry that `root/package.json` publishes types for, by `<entry> <name>`. */
const publicTypes = (root: string): Map<string, PublicExport> => {
    const entries = Object.entries(manifestOf(root).exports ?? {}).flatMap(([entry, target]) => {
        if (typeof target !== 'object' || target.types === undefined) {
            return [];
        }

        const [prefix = '', suffix = ''] = target.types.split('*');
        if (!entry.includes('*')) {
            return [[entry, join(root, target.types)] as const];
        }

        return readdirSync(join(root, prefix))
            .filter((file) => file.endsWith(suffix))
            .map((file) => [entry.replace('*', file.slice(0, -suffix.length)), join(root, prefix, file)] as const);
    });
    const program = typescript.createProgram(
        entries.map(([, file]) => file),
        { noEmit: true, skipLibCheck: true, types: [], moduleResolution: typescript.ModuleResolutionKind.Bundler },
    );
    const checker = program.getTypeChecker();
    const report = new Map<string, PublicExport>();
    for (const [entry, file] of entries) {
        const source = program.getSourceFile(file);
        const module = source === undefined ? undefined : checker.getSymbolAtLocation(source);
        for (const symbol of module === undefined ? [] : checker.getExportsOfModule(module)) {
            let target = symbol;
            if ((symbol.flags & typescript.SymbolFlags.Alias) !== 0) {
                target = checker.getAliasedSymbol(symbol);
            }

            const declarations = target.declarations ?? [];
            report.set(`${entry} ${symbol.name}`, {
                name: symbol.name,
                declarations,
                deprecated: declarations.some((node) =>
                    typescript.getJSDocTags(node).some((tag) => tag.tagName.text === 'deprecated'),
                ),
            });
        }
    }

    return report;
};

const printer = typescript.createPrinter({ removeComments: true });

/** A node's text without comments or layout. */
const printed = (node: typescript.Node | undefined): string => {
    if (node === undefined) {
        return '';
    }

    return printer.printNode(typescript.EmitHint.Unspecified, node, node.getSourceFile()).replaceAll(/\s+/g, ' ');
};

const printedAll = (nodes: readonly typescript.Node[] | undefined) => (nodes ?? []).map(printed).join(', ');

const memberKey = (member: typescript.TypeElement) => {
    if (member.name === undefined) {
        return printed(member);
    }

    return member.name.getText();
};

const isReadonly = (member: typescript.TypeElement) =>
    typescript.canHaveModifiers(member) &&
    (typescript.getModifiers(member) ?? []).some(({ kind }) => kind === typescript.SyntaxKind.ReadonlyKeyword);

const unionMembers = (node: typescript.TypeNode): readonly typescript.TypeNode[] => {
    if (typescript.isUnionTypeNode(node)) {
        return node.types;
    }

    return [node];
};

/** Whether a host written against `previous` still compiles against `next`: in a growable union, members may be added. */
const compatibleType = (previous: typescript.TypeNode, next: typescript.TypeNode, growable: boolean): boolean => {
    if (typescript.isUnionTypeNode(previous) || typescript.isUnionTypeNode(next)) {
        const candidates = unionMembers(next);
        const matched = new Set<typescript.TypeNode>();
        const kept = unionMembers(previous).every((member) => {
            const other = candidates.find((candidate) => compatibleType(member, candidate, growable));
            if (other !== undefined) {
                matched.add(other);
            }

            return other !== undefined;
        });

        return kept && (growable || candidates.every((member) => matched.has(member)));
    }

    if (typescript.isTypeLiteralNode(previous) && typescript.isTypeLiteralNode(next)) {
        return keepsMembers(previous.members, next.members, growable);
    }

    return printed(previous) === printed(next);
};

const compatibleMember = (
    previous: typescript.TypeElement,
    next: typescript.TypeElement,
    growable: boolean,
): boolean => {
    if (
        typescript.isPropertySignature(previous) &&
        typescript.isPropertySignature(next) &&
        previous.type !== undefined &&
        next.type !== undefined
    ) {
        return (
            (previous.questionToken === undefined) === (next.questionToken === undefined) &&
            isReadonly(previous) === isReadonly(next) &&
            compatibleType(previous.type, next.type, growable)
        );
    }

    return printed(previous) === printed(next);
};

/** Whether `next` keeps every member of `previous` compatible and adds only optional properties. */
const keepsMembers = (
    previous: readonly typescript.TypeElement[],
    next: readonly typescript.TypeElement[],
    growable: boolean,
): boolean => {
    const byKey = new Map(next.map((member) => [memberKey(member), member]));
    const kept = previous.every((member) => {
        const other = byKey.get(memberKey(member));

        return other !== undefined && compatibleMember(member, other, growable);
    });
    const keys = new Set(previous.map(memberKey));
    const added = next.filter((member) => !keys.has(memberKey(member)));

    return (
        kept && added.every((member) => typescript.isPropertySignature(member) && member.questionToken !== undefined)
    );
};

const compatibleDeclaration = (previous: typescript.Node, next: typescript.Node, growable: boolean): boolean => {
    if (typescript.isTypeAliasDeclaration(previous) && typescript.isTypeAliasDeclaration(next)) {
        return (
            printedAll(previous.typeParameters) === printedAll(next.typeParameters) &&
            compatibleType(previous.type, next.type, growable)
        );
    }

    if (typescript.isInterfaceDeclaration(previous) && typescript.isInterfaceDeclaration(next)) {
        return (
            printedAll(previous.typeParameters) === printedAll(next.typeParameters) &&
            printedAll(previous.heritageClauses) === printedAll(next.heritageClauses) &&
            keepsMembers(previous.members, next.members, growable)
        );
    }

    return printed(previous) === printed(next);
};

/** The listed unions and every alias they reference, by name. */
const growableNames = (report: ReadonlyMap<string, PublicExport>): Set<string> => {
    const byName = new Map([...report.values()].map((entry) => [entry.name, entry]));
    const names = new Set<string>();
    const queue = [...GROWABLE];
    for (let name = queue.pop(); name !== undefined; name = queue.pop()) {
        if (names.has(name)) {
            continue;
        }

        names.add(name);
        const visit = (node: typescript.Node) => {
            if (typescript.isTypeReferenceNode(node) && byName.has(node.typeName.getText())) {
                queue.push(node.typeName.getText());
            }

            typescript.forEachChild(node, visit);
        };

        for (const declaration of byName.get(name)?.declarations ?? []) {
            visit(declaration);
        }
    }

    return names;
};

/** Each export of `previous` that `next` removes or changes incompatibly, where `previous` did not mark it `@deprecated`. */
const incompatibleChanges = (
    previous: ReadonlyMap<string, PublicExport>,
    next: ReadonlyMap<string, PublicExport>,
): string[] => {
    const growable = growableNames(previous);
    const changes: string[] = [];
    for (const [key, { name, declarations, deprecated }] of previous) {
        const other = next.get(key);
        if (deprecated) {
            continue;
        }

        if (other === undefined) {
            changes.push(`${key} removed`);
            continue;
        }

        const kept =
            declarations.length === other.declarations.length &&
            declarations.every((declaration, index) => {
                const counterpart = other.declarations[index];

                return counterpart !== undefined && compatibleDeclaration(declaration, counterpart, growable.has(name));
            });
        if (!kept) {
            changes.push(`${key} changed`);
        }
    }

    return changes;
};

/** The files under `directory` that end with `suffix`, outside test folders. */
const sourceFiles = (directory: string, suffix: string): string[] =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === '__tests__') {
                return [];
            }

            return sourceFiles(path, suffix);
        }

        if (entry.name.endsWith(suffix)) {
            return [path];
        }

        return [];
    });

const runNpm = (args: readonly string[]): string =>
    execFileSync('npm', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

/** The output of `npm`, or '' when the registry has no such package or version; any other failure throws. */
const npm = (args: readonly string[], run: (args: readonly string[]) => string = runNpm): string => {
    try {
        return run(args).trim();
    } catch (error) {
        const { stderr, stdout } = error as { stderr?: unknown; stdout?: unknown };
        if (/E404/.test(`${String(stderr)}\n${String(stdout)}`)) {
            return '';
        }

        throw error;
    }
};

/** The highest published release below `version`, the compatibility baseline; prereleases and `0.x` releases, which promise no compatibility, never count. */
const baselineVersion = (published: readonly string[], version: string): string | undefined => {
    const order = (left: string, right: string) => left.localeCompare(right, undefined, { numeric: true });

    return published
        .filter((other) => /^[1-9]\d*\.\d+\.\d+$/.test(other) && order(other, version) < 0)
        .sort(order)
        .at(-1);
};

type Release = {
    version: string;
    notes: string;
};

/** The editor release this run prepares: what the pending changesets naming it make, else the unpublished `package.json` version. */
const releaseUnderCheck = (): Release | undefined => {
    const folder = join(REPOSITORY, '.changeset');
    let bump = -1;
    const notes: string[] = [];
    for (const file of readdirSync(folder).filter((name) => name.endsWith('.md') && name !== 'README.md')) {
        const [, header = '', body = ''] =
            /^---\n([\s\S]*?)\n?---\n([\s\S]*)$/.exec(readFileSync(join(folder, file), 'utf8')) ?? [];
        const named = new RegExp(`^["']${NAME}["']:\\s*(patch|minor|major)\\s*$`, 'm').exec(header)?.[1];
        if (named !== undefined) {
            bump = Math.max(bump, BUMPS.indexOf(named as (typeof BUMPS)[number]));
            notes.push(body);
        }
    }

    const { version } = manifestOf(PACKAGE_ROOT);
    const kind = BUMPS[bump];
    if (kind !== undefined) {
        return { version: bumped(version, kind), notes: notes.join('\n') };
    }

    if (npm(['view', `${NAME}@${version}`, 'version']) !== '') {
        return undefined;
    }

    const changelog = join(PACKAGE_ROOT, 'CHANGELOG.md');
    let section = '';
    if (existsSync(changelog)) {
        section =
            readFileSync(changelog, 'utf8')
                .split(/^## /m)
                .find((part) => part.startsWith(`${version}\n`)) ?? '';
    }

    return { version, notes: section };
};

describe('the compatibility baseline', () => {
    it('is the highest published version below the release, a patch included', () => {
        expect(baselineVersion(['1.0.0'], '1.0.1')).toBe('1.0.0');
        expect(baselineVersion(['1.0.0', '1.1.0'], '1.1.1')).toBe('1.1.0');
        expect(baselineVersion(['1.0.0', '1.0.1', '1.1.0', '2.0.0'], '1.1.0')).toBe('1.0.1');
        expect(baselineVersion(['1.0.9', '1.0.10'], '1.1.0')).toBe('1.0.10');
    });

    it('is none when nothing lower is published, and skips prereleases and 0.x releases', () => {
        expect(baselineVersion([], '1.0.0')).toBeUndefined();
        expect(baselineVersion(['1.0.0'], '1.0.0')).toBeUndefined();
        expect(baselineVersion(['1.0.0-rc.1', '1.0.0'], '1.0.1')).toBe('1.0.0');
        expect(baselineVersion(['1.0.0-rc.1'], '1.0.0')).toBeUndefined();
        expect(baselineVersion(['0.0.0-stage', '0.0.0'], '1.0.0')).toBeUndefined();
        expect(baselineVersion(['0.0.0', '1.0.0'], '1.0.1')).toBe('1.0.0');
    });
});

describe('the registry reader', () => {
    const failing = (output: string) => () => {
        throw Object.assign(new Error('Command failed'), { stderr: output, stdout: '' });
    };

    it('reads a not-found error as nothing published', () => {
        expect(npm(['view', NAME, 'versions'], failing('npm error code E404\nnpm error 404 Not Found'))).toBe('');
    });

    it('rethrows a registry, network or auth failure', () => {
        expect(() => npm(['view', NAME, 'versions'], failing('npm error code ENOTFOUND'))).toThrow('Command failed');
        expect(() => npm(['view', NAME, 'versions'], failing('npm error code E401'))).toThrow('Command failed');
    });

    it('returns the trimmed output of a successful run', () => {
        expect(npm(['view', NAME, 'version'], () => '1.0.0\n')).toBe('1.0.0');
    });
});

describe('the release notes check', () => {
    const resolved = {
        'prosemirror-model': '1.25.4',
        'markdown-it': '15.0.2',
        lowlight: '3.3.0',
        csstype: '3.2.3',
    };

    it('names each recorded dependency whose resolved version the notes leave out or state otherwise', () => {
        const notes = '- `prosemirror-model@1.25.4`\n- `markdown-it@15.0.1`\n- `prosemirror-model@1.25.40`';

        expect(unrecordedVersions(notes, resolved)).toEqual(['markdown-it@15.0.2', 'lowlight@3.3.0']);
    });

    it('passes notes that name every recorded dependency at its resolved version', () => {
        const notes = '- `prosemirror-model@1.25.4`\n- `markdown-it@15.0.2`\n- `lowlight@3.3.0`';

        expect(unrecordedVersions(notes, resolved)).toEqual([]);
    });
});

describe('the release docs check', () => {
    let root = '';
    const LIMITATIONS = 'src/docs/limitations.mdx';

    beforeAll(() => {
        root = mkdtempSync(join(tmpdir(), 'fondue-rte-release-docs-'));
        mkdirSync(join(root, 'src/docs/accessibility'), { recursive: true });
        copyFileSync(join(PACKAGE_ROOT, LIMITATIONS), join(root, LIMITATIONS));
        for (const version of ['1.1.0', '1.0.2']) {
            copyFileSync(
                join(PACKAGE_ROOT, 'src/docs/accessibility/1.0.0.mdx'),
                join(root, `src/docs/accessibility/${version}.mdx`),
            );
        }
    });
    afterAll(() => rmSync(root, { recursive: true, force: true }));

    /** What the check finds for `version` with `page` removed, then again once it is restored. */
    const withoutPage = (page: string, version: string, notes: string) => {
        const saved = readFileSync(join(root, page));
        rmSync(join(root, page));
        const missing = missingReleasePages(root, version, notes);
        writeFileSync(join(root, page), saved);

        return [missing, missingReleasePages(root, version, notes)];
    };

    it('fails a minor release without its accessibility report or limitations.mdx, and passes it with both', () => {
        const notes = '### API\n\n- Adds `toPlainText` options.';
        const report = 'src/docs/accessibility/1.1.0.mdx';

        expect(withoutPage(report, '1.1.0', notes)).toEqual([[report], []]);
        expect(withoutPage(LIMITATIONS, '1.1.0', notes)).toEqual([[LIMITATIONS], []]);
    });

    it('passes a patch release with no Interaction section and no report, and fails it without limitations.mdx', () => {
        const notes = '### Output\n\n- Escapes a trailing backslash.';

        expect(missingReleasePages(root, '1.0.1', notes)).toEqual([]);
        expect(withoutPage(LIMITATIONS, '1.0.1', notes)).toEqual([[LIMITATIONS], []]);
    });

    it('fails a patch release whose notes have an Interaction section until its report exists', () => {
        const notes = '### Interaction\n\n- Tab leaves a code block.';
        const report = 'src/docs/accessibility/1.0.2.mdx';

        expect(withoutPage(report, '1.0.2', notes)).toEqual([[report], []]);
    });

    it('reads an Interaction heading that the changelog indents under its entry', () => {
        const notes = '- abc1234: Tab leaves a code block.\n\n  ### Interaction\n\n  - Tab leaves a code block.';
        const report = 'src/docs/accessibility/1.0.2.mdx';

        expect(withoutPage(report, '1.0.2', notes)).toEqual([[report], []]);
    });
});

describe('the qualification record check', () => {
    const record = () => JSON.parse(readFileSync(join(QUALIFICATION, '1.0.0.json'), 'utf8')) as Record<string, unknown>;
    const counts = { command: 'playwright test --project=firefox', passed: 1, failed: 0, flaky: 0, skipped: 0 };

    it('reports each result that still names its CI job in pendingIn', () => {
        const pending = record();
        Object.assign(pending, {
            performance: { pendingIn: 'Performance' },
            suites: {
                ...(pending.suites as object),
                firefox: { browserVersion: '150.0.2', playwright: '1.60.0', pendingIn: 'Firefox' },
            },
        });

        expect(qualificationErrors(pending)).toEqual([
            '/suites/firefox: Firefox is pending',
            '/performance: Performance is pending',
        ]);
    });

    it('passes a complete record', () => {
        const complete = record();
        Object.assign(complete, {
            performance: [],
            suites: {
                ...(complete.suites as object),
                firefox: { browserVersion: '150.0.2', playwright: '1.60.0', ...counts },
            },
        });

        expect(qualificationErrors(complete)).toEqual([]);
    });
});

describe('the packed tree check', () => {
    let root = '';

    /** A package root that exports a script entry, the stylesheet and the locales, holding `files`. */
    const packageWith = (files: readonly string[]) => {
        rmSync(root, { recursive: true, force: true });
        mkdirSync(join(root, 'dist', 'locales'), { recursive: true });
        writeFileSync(
            join(root, 'package.json'),
            JSON.stringify({
                exports: {
                    '.': { types: './dist/index.d.ts', import: './dist/index.js' },
                    './locales/*': { types: './dist/locales/*.d.ts', import: './dist/locales/*.js' },
                    './styles': './dist/style.css',
                },
            }),
        );
        for (const file of files) {
            writeFileSync(join(root, 'dist', file), '');
        }

        return root;
    };

    const COMPLETE = ['index.d.ts', 'index.js', 'style.css', 'locales/en-US.d.ts', 'locales/en-US.js'];

    beforeAll(() => {
        root = mkdtempSync(join(tmpdir(), 'fondue-rte-packed-'));
    });
    afterAll(() => rmSync(root, { recursive: true, force: true }));

    it('passes a tree that holds every exports target', () => {
        expect(missingTargets(packageWith(COMPLETE), ['en-US'])).toEqual([]);
    });

    it('names a missing stylesheet, declaration file and expanded locale target', () => {
        const files = COMPLETE.filter((file) => file !== 'style.css' && file !== 'index.d.ts');

        expect(missingTargets(packageWith(files), ['en-US', 'de-DE'])).toEqual([
            './dist/index.d.ts',
            './dist/locales/de-DE.d.ts',
            './dist/locales/de-DE.js',
            './dist/style.css',
        ]);
    });
});

describe('the public type check', () => {
    let scratch = '';

    /** A package root that publishes `files` under `dist`, with `index.d.ts` as its `.` entry. */
    const packageWith = (name: string, files: Readonly<Record<string, string>>) => {
        const root = join(scratch, name);
        mkdirSync(join(root, 'dist'), { recursive: true });
        writeFileSync(
            join(root, 'package.json'),
            JSON.stringify({ version: '1.0.0', exports: { '.': { types: './dist/index.d.ts' } } }),
        );
        for (const [file, source] of Object.entries(files)) {
            writeFileSync(join(root, 'dist', file), source);
        }

        return publicTypes(root);
    };

    const PREVIOUS = {
        'index.d.ts': "export { type ChangeOrigin, type CommandResult } from './types';\nexport * from './api';\n",
        'types.d.ts': `
export type ChangeOrigin = 'input' | 'paste';
export type CommandResult = { readonly status: 'applied' } | { readonly status: 'rejected'; readonly code: 'busy' | 'readonly' };
`,
        'api.d.ts': `
/** @deprecated Use \`toPlainText\`. */
export declare const toText: (value: string) => string;
export declare const toPlainText: (value: string) => string;
export type ToolbarMode = 'fixed' | 'bubble';
export interface EditorProps {
    readonly label: string;
}
`,
    };

    beforeAll(() => {
        scratch = mkdtempSync(join(tmpdir(), 'fondue-rte-types-'));
    });
    afterAll(() => rmSync(scratch, { recursive: true, force: true }));

    it('reports nothing for the same type surface', () => {
        expect(incompatibleChanges(packageWith('previous', PREVIOUS), packageWith('same', PREVIOUS))).toEqual([]);
    });

    it('allows removing a deprecated export, an added member of a listed union and an added optional property', () => {
        const next = packageWith('compatible', {
            ...PREVIOUS,
            'types.d.ts': `
export type ChangeOrigin = 'input' | 'paste' | 'drop';
export type CommandResult = { readonly status: 'applied' } | { readonly status: 'rejected'; readonly code: 'busy' | 'readonly' | 'not-ready' };
`,
            'api.d.ts': `
export declare const toPlainText: (value: string) => string;
export type ToolbarMode = 'fixed' | 'bubble';
export interface EditorProps {
    readonly label: string;
    readonly placeholder?: string;
}
`,
        });

        expect(incompatibleChanges(packageWith('previous', PREVIOUS), next)).toEqual([]);
    });

    it('fails on a removed export without @deprecated, a removed or renamed union member and a changed property', () => {
        const next = packageWith('incompatible', {
            ...PREVIOUS,
            'types.d.ts': `
export type ChangeOrigin = 'input' | 'pasted';
export type CommandResult = { readonly status: 'applied' } | { readonly status: 'rejected'; readonly code: 'busy' };
`,
            'api.d.ts': `
export type ToolbarMode = 'fixed' | 'bubble' | 'floating';
export interface EditorProps {
    readonly label: number;
}
`,
        });

        expect(incompatibleChanges(packageWith('previous', PREVIOUS), next).sort()).toEqual([
            '. ChangeOrigin changed',
            '. CommandResult changed',
            '. EditorProps changed',
            '. ToolbarMode changed',
            '. toPlainText removed',
        ]);
    });
});

describe('the docs comments of the unions a minor release may grow', () => {
    const declarations = sourceFiles(join(PACKAGE_ROOT, 'src'), '.ts').map((file) => readFileSync(file, 'utf8'));

    it('says on each listed type that a minor release may add members', () => {
        const undocumented = GROWABLE.filter((name) => {
            const pattern = new RegExp(
                `\\/\\*\\*((?:(?!\\*\\/)[\\s\\S])*)\\*\\/\\s*export (?:type|interface) ${name}\\b`,
            );
            const comment = declarations
                .map((source) => pattern.exec(source)?.[1])
                .find((found) => found !== undefined);

            return !/minor release may add/i.test(comment ?? '');
        });

        expect(undocumented).toEqual([]);
    });
});

// The release job sets RTE_RELEASE; the legs pack the package and read the registry.
describe.runIf(process.env.RTE_RELEASE === 'true')('the release this run prepares', () => {
    const release = releaseUnderCheck();
    let scratch = '';
    let packed = '';
    let consumer = '';

    beforeAll(() => {
        scratch = mkdtempSync(join(tmpdir(), 'fondue-rte-release-'));
        const tarballs = packRelease(join(scratch, 'packs'));
        const editor = tarballs.find((file) => file.includes('frontify-fondue-rich-text-editor-')) ?? '';
        mkdirSync(join(scratch, 'editor'));
        execFileSync('tar', ['xzf', editor, '-C', join(scratch, 'editor')]);
        packed = join(scratch, 'editor', 'package');
        consumer = join(scratch, 'consumer');
        mkdirSync(consumer);
        writeFileSync(join(consumer, 'package.json'), JSON.stringify({ private: true, type: 'module' }));
        installInto(consumer, tarballs, ['react@18', 'react-dom@18', 'axe-core']);
    }, 600_000);
    afterAll(() => rmSync(scratch, { recursive: true, force: true }));

    it('imports every script entry from the tarball installed in a scratch project', () => {
        const installed = join(consumer, 'node_modules', NAME);
        const specifiers = Object.entries(manifestOf(installed).exports ?? {}).flatMap(([entry, target]) => {
            if (typeof target !== 'object') {
                return [];
            }

            if (!entry.includes('*')) {
                return [`${NAME}${entry.slice(1)}`];
            }

            return LOCALES.map((locale) => `${NAME}${entry.slice(1).replace('*', locale)}`);
        });
        const failures = specifiers.flatMap((specifier) => {
            try {
                execFileSync('node', ['--input-type=module', '-e', `await import(${JSON.stringify(specifier)});`], {
                    cwd: consumer,
                    stdio: ['ignore', 'ignore', 'pipe'],
                });

                return [];
            } catch (error) {
                return [
                    `${specifier}: ${String((error as { stderr?: unknown }).stderr ?? error)
                        .split('\n')
                        .find((line) => /Error/.test(line))}`,
                ];
            }
        });

        expect(specifiers).toContain(NAME);
        expect(failures).toEqual([]);
    }, 120_000);

    it('holds every exports target in the packed tree', () => {
        expect(missingTargets(packed, LOCALES)).toEqual([]);
    });

    // 1.0 needs its record before it publishes, a later release only after it publishes.
    it.skipIf(release === undefined)(
        'holds a qualification record that passes its schema with no result pending',
        () => {
            const pre = readPreRelease(join(REPOSITORY, '.changeset'));
            const recordVersion = qualificationRecordVersion(release?.version ?? '', pre);
            const path = join(QUALIFICATION, `${recordVersion}.json`);
            if (!mustHoldQualificationRecord(release?.version ?? '') && !existsSync(path)) {
                return;
            }

            expect(existsSync(path), path).toBe(true);
            expect(qualificationErrors(JSON.parse(readFileSync(path, 'utf8')))).toEqual([]);
        },
    );

    it.skipIf(release === undefined)('records the resolved version of each recorded dependency in its notes', () => {
        const [listed] = JSON.parse(
            execFileSync('pnpm', ['--filter', NAME, 'list', '--prod', '--depth', '0', '--json'], {
                cwd: PACKAGE_ROOT,
                encoding: 'utf8',
            }),
        ) as readonly { dependencies?: Readonly<Record<string, { version: string }>> }[];
        const resolved = Object.fromEntries(
            Object.entries(listed?.dependencies ?? {}).map(([name, { version }]) => [name, version]),
        );

        expect(Object.keys(resolved)).toContain('prosemirror-model');
        expect(Object.values(resolved).filter((version) => !/^\d+\.\d+\.\d+$/.test(version))).toEqual([]);
        expect(unrecordedVersions(release?.notes ?? '', resolved)).toEqual([]);
    });

    it.skipIf(release === undefined)('holds the docs pages its version needs', () => {
        expect(missingReleasePages(PACKAGE_ROOT, release?.version ?? '', release?.notes ?? '')).toEqual([]);
    });

    it.skipIf(release === undefined)('keeps or deprecates every export of the previous minor release', (context) => {
        const versions = JSON.parse(npm(['view', NAME, 'versions', '--json']) || '[]') as string | string[];
        const earlier = baselineVersion([versions].flat(), release?.version ?? '');
        if (earlier === undefined) {
            context.skip('No earlier minor release is published.');

            return;
        }

        const folder = join(scratch, 'previous');
        mkdirSync(folder);
        npm(['pack', `${NAME}@${earlier}`, '--pack-destination', folder]);
        const tarball = readdirSync(folder).find((file) => file.endsWith('.tgz')) ?? '';
        execFileSync('tar', ['xzf', join(folder, tarball), '-C', folder]);

        expect(incompatibleChanges(publicTypes(join(folder, 'package')), publicTypes(packed))).toEqual([]);
    });
});
