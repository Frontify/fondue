/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';

import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import {
    allFiles,
    CODE_FILE,
    folderExists,
    isExported,
    parse,
    productFiles,
    resolveInternal,
    srcRoot,
    toKey,
    walk,
} from './fixtures/sourceFiles';

const featureFolders = () =>
    readdirSync(join(srcRoot, 'plugins'), { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && existsSync(join(srcRoot, 'plugins', entry.name, 'feature.ts')))
        .map((entry) => entry.name)
        .sort();

// The functions a module exports as runtime values, as the registry counts them: types and other values do not count.
const exportedFunctions = (path: string) => {
    const names: string[] = [];
    for (const statement of parse(path).statements) {
        if (ts.isFunctionDeclaration(statement) && isExported(statement)) {
            names.push(statement.name?.text ?? 'default');
        } else if (ts.isVariableStatement(statement) && isExported(statement)) {
            for (const { name, initializer } of statement.declarationList.declarations) {
                // `defineFeature(...)` returns the feature factory.
                if (
                    initializer !== undefined &&
                    (ts.isArrowFunction(initializer) ||
                        ts.isFunctionExpression(initializer) ||
                        (ts.isCallExpression(initializer) &&
                            ts.isIdentifier(initializer.expression) &&
                            initializer.expression.text === 'defineFeature'))
                ) {
                    names.push(name.getText());
                }
            }
        } else if (ts.isExportDeclaration(statement) && !statement.isTypeOnly) {
            // A re-export cannot be classified here, so it counts against the one function.
            const { exportClause } = statement;
            if (exportClause !== undefined && ts.isNamedExports(exportClause)) {
                names.push(...exportClause.elements.filter((item) => !item.isTypeOnly).map((item) => item.name.text));
            } else {
                names.push('*');
            }
        }
    }

    return names;
};

// The names a feature's index.ts exports as `definePlugin(...)` plugins.
const pluginExports = (path: string) => {
    const names: string[] = [];
    for (const statement of parse(path).statements) {
        if (ts.isVariableStatement(statement) && isExported(statement)) {
            for (const { name, initializer } of statement.declarationList.declarations) {
                if (
                    initializer !== undefined &&
                    ts.isCallExpression(initializer) &&
                    ts.isIdentifier(initializer.expression) &&
                    initializer.expression.text === 'definePlugin'
                ) {
                    names.push(name.getText());
                }
            }
        }
    }

    return names;
};

const PASCAL_CASE = /^[A-Z][A-Za-z0-9]*$/;

// The folders of `src/plugins` that are no plugin.
const NOT_PLUGIN_FOLDERS = new Set(['__tests__', 'profiles']);

const pluginDirectory = (folder: string) => join(srcRoot, 'plugins', folder);

const pluginFolderNames = () =>
    readdirSync(join(srcRoot, 'plugins'), { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && !NOT_PLUGIN_FOLDERS.has(entry.name))
        .map((entry) => entry.name)
        .sort();

// The stories of a topic, which name no component.
const TOPIC_STORIES = new Set([
    'persistence.stories.tsx',
    'examples.stories.tsx',
    'profiles.stories.tsx',
    'authoring.stories.tsx',
]);

const PLUGIN_ROOT_FILES = [
    /^(index|feature|migration|reader)\.tsx?$/,
    /^editor\.tsx?$/,
    /^[A-Za-z0-9]+\.stories\.tsx$/,
];

const PLUGIN_ROOT_FOLDERS = new Set(['components', 'hooks', 'helpers', 'styles', 'fixtures', '__tests__', 'locales']);

// Each subfolder of a plugin holds files of one kind, by name; `components` files also export a component.
const SUBFOLDER_NAMES = {
    components: /^[A-Z][A-Za-z0-9]*\.tsx$/,
    hooks: /^use[A-Z][A-Za-z0-9]*\.tsx?$/,
    helpers: /^[A-Za-z0-9]+\.ts$/,
} as const;

type Subfolder = keyof typeof SUBFOLDER_NAMES;

const SUBFOLDERS = Object.keys(SUBFOLDER_NAMES) as Subfolder[];

// A view file declares its component and exports the view declaration that registers it, so the component may stay unexported.
const exportsComponent = (path: string) => {
    let declaresComponent = false;
    let exportsValue = false;
    for (const statement of parse(path).statements) {
        if (ts.isFunctionDeclaration(statement) && statement.name !== undefined) {
            declaresComponent ||= PASCAL_CASE.test(statement.name.text);
            exportsValue ||= isExported(statement);
        } else if (ts.isVariableStatement(statement)) {
            declaresComponent ||= statement.declarationList.declarations.some(
                ({ name }) => ts.isIdentifier(name) && PASCAL_CASE.test(name.text),
            );
            exportsValue ||= isExported(statement);
        }
    }

    return declaresComponent && exportsValue;
};

// Static imports only: a lazy `import()` of a component is a load boundary and may run against the direction.
const staticSpecifiers = (path: string) =>
    parse(path)
        .statements.filter(
            (statement): statement is ts.ImportDeclaration | ts.ExportDeclaration =>
                (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) &&
                statement.moduleSpecifier !== undefined &&
                ts.isStringLiteral(statement.moduleSpecifier),
        )
        .map((statement) => (statement.moduleSpecifier as ts.StringLiteral).text);

// Components import hooks, hooks import helpers, and none of the three imports a root file of its plugin.
const DIRECTION = { components: 0, hooks: 1, helpers: 2 } as const;

const PLUGIN_ROOT_IMPORTS = new Set(['', 'index', 'editor', 'reader', 'feature']);

const directionProblems = (folder: string) => {
    const problems: string[] = [];
    for (const kind of SUBFOLDERS) {
        const directory = join(pluginDirectory(folder), kind);
        if (!folderExists(directory)) {
            continue;
        }

        for (const path of walk(directory)) {
            for (const specifier of staticSpecifiers(path)) {
                const target = resolveInternal(path, specifier);
                if (target?.[0] !== 'plugins' || target[1] !== folder) {
                    continue;
                }

                const [first = '', ...rest] = target.slice(2);
                const name = first.replace(CODE_FILE, '');
                const targetKind = SUBFOLDERS.find((candidate) => candidate === first);
                if (targetKind === undefined && rest.length === 0 && PLUGIN_ROOT_IMPORTS.has(name)) {
                    problems.push(`${toKey(path)} imports the plugin root file '${specifier}'`);
                } else if (targetKind !== undefined && DIRECTION[targetKind] < DIRECTION[kind]) {
                    problems.push(`${toKey(path)} imports ${targetKind} '${specifier}' against the direction`);
                }
            }
        }
    }

    return problems;
};

const isComponentName = (name: string) => /^[A-Z]/.test(name) && /[a-z]/.test(name);

const COMPONENT_CALLS = new Set(['forwardRef', 'memo', 'lazy', 'lazyPart', 'Object.assign']);

const isComponentInitializer = (node: ts.Expression) => {
    let initializer = node;
    while (ts.isParenthesizedExpression(initializer) || ts.isAsExpression(initializer)) {
        initializer = initializer.expression;
    }

    if (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer)) {
        return true;
    }

    return ts.isCallExpression(initializer) && COMPONENT_CALLS.has(initializer.expression.getText());
};

const extendsReactComponent = (statement: ts.ClassDeclaration) =>
    statement.heritageClauses?.some(
        (clause) =>
            clause.token === ts.SyntaxKind.ExtendsKeyword &&
            clause.types.some((type) => /^(React\.)?(Pure)?Component$/.test(type.expression.getText())),
    ) === true;

type FileShape = {
    declaresComponent: boolean;
    exportedComponent: boolean;
    exportedComponentNames: string[];
    exportedOther: string[];
    hooks: string[];
};

// Runtime exports only: types, interfaces and `export ... from` re-exports do not count.
const fileShape = (path: string): FileShape => {
    const file = parse(path);
    const components = new Set<string>();
    const runtime = new Set<string>();
    const exported = new Set<string>();
    const declare = (name: string, isComponent: boolean, isExportedName: boolean) => {
        runtime.add(name);
        if (isComponent) {
            components.add(name);
        }

        if (isExportedName) {
            exported.add(name);
        }
    };

    for (const statement of file.statements) {
        const isExportedStatement =
            ts.canHaveModifiers(statement) &&
            ts.getModifiers(statement)?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) === true;
        if (ts.isFunctionDeclaration(statement) && statement.name !== undefined) {
            declare(statement.name.text, isComponentName(statement.name.text), isExportedStatement);
        } else if (ts.isFunctionDeclaration(statement) && isExportedStatement) {
            declare('default', false, true);
        } else if (ts.isVariableStatement(statement)) {
            for (const { name, initializer } of statement.declarationList.declarations) {
                if (ts.isIdentifier(name)) {
                    const isComponent =
                        isComponentName(name.text) && initializer !== undefined && isComponentInitializer(initializer);
                    declare(name.text, isComponent, isExportedStatement);
                }
            }
        } else if (ts.isClassDeclaration(statement) && statement.name !== undefined) {
            declare(
                statement.name.text,
                isComponentName(statement.name.text) && extendsReactComponent(statement),
                isExportedStatement,
            );
        } else if (ts.isEnumDeclaration(statement)) {
            declare(statement.name.text, false, isExportedStatement);
        } else if (ts.isExportAssignment(statement)) {
            exported.add('default');
            runtime.add('default');
        } else if (
            ts.isExportDeclaration(statement) &&
            !statement.isTypeOnly &&
            statement.moduleSpecifier === undefined &&
            statement.exportClause !== undefined &&
            ts.isNamedExports(statement.exportClause)
        ) {
            for (const element of statement.exportClause.elements) {
                const local = (element.propertyName ?? element.name).text;
                if (!element.isTypeOnly && runtime.has(local)) {
                    exported.add(element.name.text === local ? local : element.name.text);
                    if (components.has(local)) {
                        components.add(element.name.text);
                    }
                }
            }
        }
    }

    const names = [...exported];

    return {
        declaresComponent: components.size > 0,
        exportedComponent: names.some((name) => components.has(name)),
        exportedComponentNames: names.filter((name) => components.has(name)),
        exportedOther: names.filter((name) => !components.has(name) && !/^use[A-Z]/.test(name)),
        hooks: names.filter((name) => /^use[A-Z]/.test(name)),
    };
};

type FileKind = 'component' | 'hook' | 'module' | 'none';

const fileKind = (path: string): FileKind => {
    const shape = fileShape(path);
    if (shape.declaresComponent) {
        return 'component';
    }

    if (shape.hooks.length > 0 && shape.exportedOther.length === 0) {
        return 'hook';
    }

    if (shape.hooks.length > 0 || shape.exportedOther.length > 0) {
        return 'module';
    }

    return 'none';
};

// Plugins follow the plugin folder rules above, and the authoring examples show an outside author's one-file plugin.
const outsidePlugins = (path: string) =>
    !toKey(path).startsWith('src/plugins/') && !toKey(path).startsWith('src/docs/');

const filesByFolder = (files: string[]) => {
    const folders = new Map<string, string[]>();
    for (const path of files) {
        const folder = toKey(dirname(path));
        folders.set(folder, [...(folders.get(folder) ?? []), path]);
    }

    return folders;
};

const KIND_NEUTRAL_FILES = new Set(['index.ts', 'types.ts', 'constants.ts']);

// Each measure parses every product file, which outlasts the default timeout on a loaded machine.
describe('folder and file shape', { timeout: 60_000 }, () => {
    it('gives every feature folder an index.ts that exports exactly one definePlugin plugin', () => {
        const problems: string[] = [];
        for (const folder of featureFolders()) {
            const path = join(srcRoot, 'plugins', folder, 'index.ts');
            if (!existsSync(path)) {
                problems.push(`missing: plugins/${folder}/index.ts`);
            } else if (pluginExports(path).length !== 1) {
                problems.push(`not exactly one definePlugin plugin: plugins/${folder}/index.ts`);
            }
        }

        expect(problems).toEqual([]);
    });

    it('gives every feature folder a feature.ts that exports exactly one runtime function', () => {
        const problems: string[] = [];
        for (const folder of featureFolders()) {
            const names = exportedFunctions(join(srcRoot, 'plugins', folder, 'feature.ts'));
            if (names.length !== 1) {
                problems.push(`plugins/${folder}/feature.ts exports ${names.length} functions: ${names.join(', ')}`);
            }
        }

        expect(problems).toEqual([]);
    });

    it('names every plugin folder in PascalCase', () => {
        const problems = pluginFolderNames().filter((name) => !PASCAL_CASE.test(name));
        expect(problems).toEqual([]);
    });

    it('names each component story after its component and titles plugin stories by plugin', () => {
        const problems: string[] = [];
        for (const path of allFiles.filter((file) => file.endsWith('.stories.tsx'))) {
            const key = toKey(path);
            const file = basename(path);
            const plugin = /^src\/plugins\/([^/]+)\/[^/]+\.stories\.tsx$/.exec(key)?.[1];
            if (plugin === undefined) {
                const component = file.replace(/\.stories\.tsx$/, '.tsx');
                if (!TOPIC_STORIES.has(file) && !existsSync(join(dirname(path), component))) {
                    problems.push(`${key} is no topic story and names no component beside it`);
                }

                continue;
            }

            if (file !== `${plugin}.stories.tsx`) {
                problems.push(`${key} is not named ${plugin}.stories.tsx`);
            }

            const title = /title:\s*'([^']*)'/.exec(readFileSync(path, 'utf8'))?.[1];
            if (title !== `Rich Text Editor/Plugins/${plugin}`) {
                problems.push(`${key} has the title ${title}, not Rich Text Editor/Plugins/${plugin}`);
            }
        }

        expect(problems).toEqual([]);
    });

    it('holds only its allowed files and folders in each plugin root', () => {
        const problems: string[] = [];
        for (const folder of pluginFolderNames()) {
            for (const entry of readdirSync(pluginDirectory(folder), { withFileTypes: true })) {
                const allowed = entry.isDirectory()
                    ? PLUGIN_ROOT_FOLDERS.has(entry.name)
                    : PLUGIN_ROOT_FILES.some((pattern) => pattern.test(entry.name));
                if (!allowed) {
                    problems.push(`plugins/${folder}/${entry.name}`);
                }
            }
        }

        expect(problems).toEqual([]);
    });

    it('holds only its own kind of file in each components, hooks and helpers folder', () => {
        const problems: string[] = [];
        for (const folder of pluginFolderNames()) {
            for (const kind of SUBFOLDERS) {
                const directory = join(pluginDirectory(folder), kind);
                if (!folderExists(directory)) {
                    continue;
                }

                for (const entry of readdirSync(directory, { withFileTypes: true })) {
                    const where = `plugins/${folder}/${kind}/${entry.name}`;
                    if (!entry.isFile() || !SUBFOLDER_NAMES[kind].test(entry.name)) {
                        problems.push(where);
                    } else if (kind === 'components' && !exportsComponent(join(directory, entry.name))) {
                        problems.push(`${where} declares or exports no component`);
                    }
                }
            }
        }

        expect(problems).toEqual([]);
    });

    it('runs no static import inside a plugin from hooks to components, from helpers to hooks or components, or into a root file', () => {
        expect(pluginFolderNames().flatMap((folder) => directionProblems(folder))).toEqual([]);
    });

    it('no folder holds more than 15 direct product files', () => {
        const problems: string[] = [];
        for (const [folder, files] of filesByFolder(productFiles)) {
            if (files.length > 15) {
                problems.push(`${folder} holds ${files.length} product files`);
            }
        }

        expect(problems).toEqual([]);
    });

    it('gives each product file one kind', () => {
        const problems: string[] = [];
        for (const path of productFiles.filter(outsidePlugins)) {
            const shape = fileShape(path);
            if (shape.hooks.length > 0 && shape.declaresComponent) {
                problems.push(`${toKey(path)} exports a hook and declares a component`);
            } else if (shape.hooks.length > 0 && shape.exportedOther.length > 0) {
                problems.push(`${toKey(path)} exports hooks and ${shape.exportedOther.join(', ')}`);
            } else if (shape.declaresComponent && shape.exportedComponent && shape.exportedOther.length > 0) {
                problems.push(`${toKey(path)} exports a component and ${shape.exportedOther.join(', ')}`);
            }
        }

        expect(problems).toEqual([]);
    });

    it('names a file in PascalCase exactly when it declares a component', () => {
        const problems: string[] = [];
        for (const path of productFiles.filter(outsidePlugins)) {
            const kind = fileKind(path);
            // A role suffix such as `.allowlist` is not part of the name.
            const name = basename(path).split('.')[0] ?? '';
            if (kind === 'component' && !PASCAL_CASE.test(name)) {
                problems.push(`${toKey(path)} declares a component and is not PascalCase`);
            } else if (kind === 'hook' && !/^use[A-Z][A-Za-z0-9]*$/.test(name)) {
                problems.push(`${toKey(path)} is a hook file and is not named use*`);
            } else if (kind === 'module' && !/^[a-z][A-Za-z0-9]*$/.test(name)) {
                problems.push(`${toKey(path)} is a module file and is not camelCase`);
            }
        }

        expect(problems).toEqual([]);
    });

    it("mixes no kinds in a folder's direct files", () => {
        const problems: string[] = [];
        for (const [folder, files] of filesByFolder(productFiles.filter(outsidePlugins))) {
            const kinds = new Set<FileKind>();
            for (const path of files.filter((item) => !KIND_NEUTRAL_FILES.has(basename(item)))) {
                const kind = fileKind(path);
                if (kind !== 'none') {
                    kinds.add(kind);
                }
            }

            if (kinds.size > 1) {
                problems.push(`${folder} mixes ${[...kinds].sort().join(', ')}`);
            }
        }

        expect(problems).toEqual([]);
    });

    it('holds only its own kind of file in each components, hooks and helpers folder outside plugins', () => {
        const problems: string[] = [];
        for (const [folder, files] of filesByFolder(productFiles.filter(outsidePlugins))) {
            const kind = basename(folder);
            if (!SUBFOLDERS.includes(kind as Subfolder)) {
                continue;
            }

            for (const path of files) {
                const name = basename(path);
                const fileKindOf = fileKind(path);
                let nameMatches = SUBFOLDER_NAMES[kind as Subfolder].test(name);
                if (kind === 'helpers' && /^[A-Za-z0-9]+\.tsx$/.test(name) && !fileShape(path).declaresComponent) {
                    nameMatches = true;
                }

                if (!nameMatches) {
                    problems.push(`${toKey(path)} name does not fit ${kind}`);
                } else if (kind === 'components' && fileKindOf !== 'component') {
                    problems.push(`${toKey(path)} is kind ${fileKindOf} in components`);
                } else if (kind === 'hooks' && fileKindOf !== 'hook') {
                    problems.push(`${toKey(path)} is kind ${fileKindOf} in hooks`);
                } else if (kind === 'helpers' && fileKindOf !== 'module' && fileKindOf !== 'none') {
                    problems.push(`${toKey(path)} is kind ${fileKindOf} in helpers`);
                }
            }
        }

        expect(problems).toEqual([]);
    });

    it('sets displayName on every exported component to its exported name', () => {
        // The root attaches parts named after their key, and `Object.assign(Editor, ...)` shares `Editor`'s name.
        const expectedNames = new Map<string, string>();
        const targets = new Map<string, string>();
        const visit = (node: ts.Node) => {
            if (ts.isCallExpression(node) && node.expression.getText() === 'Object.assign') {
                const [target, parts] = node.arguments;
                let owner = node.parent;
                while (!ts.isVariableDeclaration(owner) && !ts.isSourceFile(owner)) {
                    owner = owner.parent;
                }

                if (
                    target !== undefined &&
                    parts !== undefined &&
                    ts.isIdentifier(target) &&
                    ts.isObjectLiteralExpression(parts) &&
                    ts.isVariableDeclaration(owner)
                ) {
                    targets.set(owner.name.getText(), target.text);
                    for (const part of parts.properties) {
                        const key = part.name?.getText() ?? '';
                        const local = ts.isPropertyAssignment(part) ? part.initializer.getText() : key;
                        expectedNames.set(local, `RichTextEditor.${key}`);
                    }
                }
            }

            ts.forEachChild(node, visit);
        };

        visit(parse(join(srcRoot, 'react/RichTextEditor/RichTextEditor.tsx')));

        const problems: string[] = [];
        for (const path of productFiles.filter((file) => !toKey(file).startsWith('src/docs/'))) {
            const assigned = new Map<string, string>();
            for (const statement of parse(path).statements) {
                const assignment = ts.isExpressionStatement(statement) ? statement.expression : undefined;
                if (
                    assignment !== undefined &&
                    ts.isBinaryExpression(assignment) &&
                    assignment.left.getText().endsWith('.displayName') &&
                    ts.isStringLiteralLike(assignment.right)
                ) {
                    assigned.set(assignment.left.getText().replace('.displayName', ''), assignment.right.text);
                }

                // A class cannot take a `displayName` statement in types, so it sets a static member.
                if (ts.isClassDeclaration(statement)) {
                    for (const member of statement.members) {
                        if (ts.isPropertyDeclaration(member) && member.name.getText() === 'displayName') {
                            assigned.set(statement.name?.text ?? '', (member.initializer as ts.StringLiteral).text);
                        }
                    }
                }
            }

            for (const name of fileShape(path).exportedComponentNames) {
                const expected = expectedNames.get(name) ?? name;
                const actual = assigned.get(name) ?? assigned.get(targets.get(name) ?? '');
                if (actual !== expected) {
                    problems.push(`${toKey(path)}: ${name} expected '${expected}'`);
                }
            }
        }

        expect(problems).toEqual([]);
    });
});
