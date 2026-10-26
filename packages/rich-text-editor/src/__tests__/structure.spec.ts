/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import {
    AS_UNKNOWN_AS_MAX,
    DATA_TABLES,
    FILES_OVER_400_LINES,
    FILES_OVER_600_LINES,
    FUNCTIONS_OVER_150_LINES,
    FUNCTIONS_OVER_6_LETS,
    KNOWN_CYCLES,
    READONLY_MEMBERS,
    SPECS_OVER_1000_LINES,
    SPEC_REFERENCES,
} from './structure.allowlist';

const packageRoot = fileURLToPath(new URL('../..', import.meta.url)).replace(/\/$/, '');
const srcRoot = join(packageRoot, 'src');

const ROOT_NODE = '(root)';
const CODE_FILE = /\.tsx?$/;
// The spaces sit in classes so that this list does not match itself.
const SPEC_REFERENCE_PATTERNS = [
    /\b(DR|AC|SPEC|OD|BC|PG)-[0-9a-z]/g,
    /\bT-[0-9]{2}\b/g,
    /\bW[0-9]{1,2}[a-z]?\b/g,
    /row[ ][0-9]+|key[ ]precedence|release[ ]stages|default[ ]toolbars|decode[ ]order|plugin[ ]contract|package[ ]layout|working[ ]rules/gi,
];
const SPEC_REFERENCE_SKIPPED_DIRECTORIES = new Set([
    'node_modules',
    'dist',
    'storybook-static',
    'coverage',
    'playwright-report',
    'test-results',
    '.cache',
]);
// The changelog quotes past release notes word for word.
const SPEC_REFERENCE_SKIPPED_FILES = new Set(['CHANGELOG.md']);

const walk = (directory: string): string[] => {
    const files: string[] = [];
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) {
            files.push(...walk(path));
        } else if (CODE_FILE.test(entry.name)) {
            files.push(path);
        }
    }

    return files.sort();
};

const toKey = (path: string) => relative(packageRoot, path).split('\\').join('/');

const isSpecPath = (key: string) => key.split('/').includes('__tests__');

const isProductPath = (key: string) => {
    const segments = key.split('/');
    if (segments.includes('__tests__') || segments.includes('fixtures')) {
        return false;
    }

    if (key.endsWith('.stories.tsx') || key.startsWith('src/locales/')) {
        return false;
    }

    return true;
};

const allFiles = walk(srcRoot);
const productFiles = allFiles.filter((path) => isProductPath(toKey(path)));
const specFiles = allFiles.filter((path) => isSpecPath(toKey(path)));

const sources = new Map<string, string>();
const sourceOf = (path: string) => {
    let source = sources.get(path);
    if (source === undefined) {
        source = readFileSync(path, 'utf8');
        sources.set(path, source);
    }

    return source;
};

const parsed = new Map<string, ts.SourceFile>();
const parse = (path: string) => {
    let file = parsed.get(path);
    if (file === undefined) {
        const kind = path.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
        file = ts.createSourceFile(path, sourceOf(path), ts.ScriptTarget.Latest, true, kind);
        parsed.set(path, file);
    }

    return file;
};

// Blank lines separate a function's steps for the reader, so the size limits count only lines that hold code or comments.
const nonBlankLines = (text: string) => text.split('\n').filter((line) => line.trim() !== '').length;

const lineCount = (path: string) => nonBlankLines(sourceOf(path));

// A listed item may stay or shrink; an unlisted item over the limit, a listed item no longer over it, or growth fails.
const ratchet = (measured: Map<string, number>, allowed: Record<string, number>) => {
    const problems: string[] = [];
    for (const [key, value] of [...measured].sort(([a], [b]) => a.localeCompare(b))) {
        const entry = allowed[key];
        if (entry === undefined) {
            problems.push(`unlisted: ${key} = ${value}`);
        } else if (value > entry) {
            problems.push(`grew: ${key} = ${value}, allowed ${entry}`);
        }
    }

    for (const key of Object.keys(allowed).sort()) {
        if (!measured.has(key)) {
            problems.push(`stale: ${key}`);
        }
    }

    return problems;
};

const filesOver = (files: string[], limit: number) => {
    const measured = new Map<string, number>();
    for (const path of files) {
        const lines = lineCount(path);
        if (lines > limit) {
            measured.set(toKey(path), lines);
        }
    }

    return measured;
};

type FunctionLike =
    | ts.FunctionDeclaration
    | ts.FunctionExpression
    | ts.ArrowFunction
    | ts.MethodDeclaration
    | ts.ConstructorDeclaration
    | ts.AccessorDeclaration;

const isFunctionLike = (node: ts.Node): node is FunctionLike =>
    ts.isFunctionDeclaration(node) ||
    ts.isFunctionExpression(node) ||
    ts.isArrowFunction(node) ||
    ts.isMethodDeclaration(node) ||
    ts.isConstructorDeclaration(node) ||
    ts.isGetAccessorDeclaration(node) ||
    ts.isSetAccessorDeclaration(node);

const nameText = (name: ts.Node, file: ts.SourceFile) => {
    if (
        ts.isIdentifier(name) ||
        ts.isPrivateIdentifier(name) ||
        ts.isStringLiteral(name) ||
        ts.isNumericLiteral(name) ||
        ts.isNoSubstitutionTemplateLiteral(name)
    ) {
        return name.text;
    }

    return name.getText(file);
};

const functionName = (node: FunctionLike, file: ts.SourceFile) => {
    if (ts.isConstructorDeclaration(node)) {
        return 'constructor';
    }

    if (node.name) {
        return nameText(node.name, file);
    }

    let child: ts.Node = node;
    let parent = node.parent;
    while (
        ts.isParenthesizedExpression(parent) ||
        ts.isAsExpression(parent) ||
        ts.isSatisfiesExpression(parent) ||
        ts.isNonNullExpression(parent)
    ) {
        child = parent;
        parent = parent.parent;
    }

    if (ts.isVariableDeclaration(parent) && parent.initializer === child) {
        return nameText(parent.name, file);
    }

    if ((ts.isPropertyAssignment(parent) || ts.isPropertyDeclaration(parent)) && parent.initializer === child) {
        return nameText(parent.name, file);
    }

    if (
        ts.isBinaryExpression(parent) &&
        parent.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
        parent.right === child
    ) {
        return parent.left.getText(file);
    }

    return 'anonymous';
};

const letDeclarators = (node: FunctionLike) => {
    if (!node.body || !ts.isBlock(node.body)) {
        return 0;
    }

    let count = 0;
    for (const statement of node.body.statements) {
        if (ts.isVariableStatement(statement) && (statement.declarationList.flags & ts.NodeFlags.Let) !== 0) {
            count += statement.declarationList.declarations.length;
        }
    }

    return count;
};

type FunctionMeasure = { key: string; lines: number; lets: number };

const functionMeasures = (path: string) => {
    const file = parse(path);
    const base = toKey(path);
    const seen = new Map<string, number>();
    const measures: FunctionMeasure[] = [];
    const visit = (node: ts.Node) => {
        if (isFunctionLike(node) && node.body) {
            const name = functionName(node, file);
            const occurrence = (seen.get(name) ?? 0) + 1;
            seen.set(name, occurrence);
            let key = `${base}#${name}`;
            if (occurrence > 1) {
                key = `${key}#${occurrence}`;
            }

            measures.push({ key, lines: nonBlankLines(node.getText(file)), lets: letDeclarators(node) });
        }

        ts.forEachChild(node, visit);
    };

    visit(file);

    return measures;
};

const allFunctionMeasures = () => productFiles.flatMap((path) => functionMeasures(path));

const folderExists = (path: string) => existsSync(path) && statSync(path).isDirectory();

// Maps a path under src (as segments) to its graph node, the top-level folder.
const nodeOf = (segments: string[]) => {
    const [first] = segments;
    if (first === undefined || !folderExists(join(srcRoot, first))) {
        return ROOT_NODE;
    }

    return first;
};

const nodeOfFile = (path: string) => nodeOf(relative(srcRoot, path).split('\\').join('/').split('/'));

const moduleSpecifiers = (path: string) => {
    const specifiers: string[] = [];
    const visit = (node: ts.Node) => {
        if (
            (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
            node.moduleSpecifier &&
            ts.isStringLiteral(node.moduleSpecifier)
        ) {
            specifiers.push(node.moduleSpecifier.text);
        }

        if (
            ts.isCallExpression(node) &&
            node.expression.kind === ts.SyntaxKind.ImportKeyword &&
            node.arguments[0] !== undefined &&
            ts.isStringLiteral(node.arguments[0])
        ) {
            specifiers.push(node.arguments[0].text);
        }

        ts.forEachChild(node, visit);
    };

    visit(parse(path));

    return specifiers;
};

// Resolves '#/x' aliases (tsconfig paths) and relative paths; returns undefined for packages.
const resolveInternal = (from: string, specifier: string) => {
    let target: string;
    if (specifier.startsWith('#/')) {
        target = join(srcRoot, specifier.slice(2));
    } else if (specifier.startsWith('.')) {
        target = resolve(dirname(from), specifier);
    } else {
        return undefined;
    }

    const inside = relative(srcRoot, target);
    if (inside.startsWith('..')) {
        return undefined;
    }

    return inside.split('\\').join('/').split('/');
};

const folderGraph = () => {
    const graph = new Map<string, Set<string>>();
    for (const path of productFiles) {
        const from = nodeOfFile(path);
        if (!graph.has(from)) {
            graph.set(from, new Set());
        }

        for (const specifier of moduleSpecifiers(path)) {
            const segments = resolveInternal(path, specifier);
            if (!segments) {
                continue;
            }

            const to = nodeOf(segments);
            if (to !== from) {
                graph.get(from)?.add(to);
            }
        }
    }

    return graph;
};

// Tarjan's algorithm; returns the components with more than one node.
const cycles = (graph: Map<string, Set<string>>) => {
    const index = new Map<string, number>();
    const low = new Map<string, number>();
    const onStack = new Set<string>();
    const stack: string[] = [];
    const found: string[][] = [];
    let counter = 0;
    const connect = (node: string) => {
        index.set(node, counter);
        low.set(node, counter);
        counter += 1;
        stack.push(node);
        onStack.add(node);
        for (const next of graph.get(node) ?? []) {
            if (!index.has(next)) {
                connect(next);
                low.set(node, Math.min(low.get(node) ?? 0, low.get(next) ?? 0));
            } else if (onStack.has(next)) {
                low.set(node, Math.min(low.get(node) ?? 0, index.get(next) ?? 0));
            }
        }

        if (low.get(node) === index.get(node)) {
            const component: string[] = [];
            let member: string | undefined;
            do {
                member = stack.pop();
                if (member === undefined) {
                    break;
                }

                onStack.delete(member);
                component.push(member);
            } while (member !== node);

            if (component.length > 1) {
                found.push(component.sort());
            }
        }
    };

    for (const node of [...graph.keys()].sort()) {
        if (!index.has(node)) {
            connect(node);
        }
    }

    return found.map((component) => component.join(' | ')).sort();
};

const prosemirrorImportersOutsideRuntime = () =>
    productFiles
        .filter((path) => !toKey(path).startsWith('src/runtime/'))
        .filter((path) => moduleSpecifiers(path).some((specifier) => specifier.startsWith('prosemirror-')))
        .map((path) => toKey(path));

const isSignature = (node: ts.Node) =>
    ts.isFunctionTypeNode(node) ||
    ts.isConstructorTypeNode(node) ||
    ts.isMethodSignature(node) ||
    ts.isCallSignatureDeclaration(node) ||
    ts.isConstructSignatureDeclaration(node);

// The type that holds a member, with `>` after it when a member's type nests the literal. A literal outside any type
// declaration is named by its members, and one inside a function type is never an allowed owner.
const memberOwner = (member: ts.TypeElement, file: ts.SourceFile) => {
    const literal = member.parent as ts.TypeLiteralNode | ts.InterfaceDeclaration;
    let declaration: ts.TypeAliasDeclaration | ts.InterfaceDeclaration | undefined;
    if (ts.isInterfaceDeclaration(literal)) {
        declaration = literal;
    }

    let nested = false;
    let inSignature = false;
    let node: ts.Node = literal;
    while (declaration === undefined && node.parent !== undefined) {
        const parent: ts.Node = node.parent;
        if (ts.isTypeAliasDeclaration(parent)) {
            declaration = parent;
        } else if (
            ts.isSourceFile(parent) ||
            ts.isExpression(parent) ||
            ts.isStatement(parent) ||
            ts.isParameter(parent)
        ) {
            break;
        } else if (isSignature(parent)) {
            inSignature = true;
        } else if (
            ts.isPropertySignature(parent) ||
            ts.isIndexSignatureDeclaration(parent) ||
            ts.isMappedTypeNode(parent)
        ) {
            nested = true;
        }

        node = parent;
    }

    if (declaration === undefined) {
        return `{ ${literal.members.map((element) => (element.name ? element.name.getText(file) : '[index]')).join(', ')} }`;
    }

    if (inSignature) {
        return '(signature)';
    }

    return `${declaration.name.text}${nested ? '>' : ''}`;
};

const readonlyMembers = () => {
    const found = new Map<string, string[]>();
    for (const path of allFiles) {
        const file = parse(path);
        const visit = (node: ts.Node) => {
            if (
                (ts.isPropertySignature(node) || ts.isIndexSignatureDeclaration(node)) &&
                node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ReadonlyKeyword)
            ) {
                const key = `${toKey(path)}#${memberOwner(node, file)}`;
                const line = file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
                found.set(key, [...(found.get(key) ?? []), `${toKey(path)}:${line}`]);
            }

            ts.forEachChild(node, visit);
        };

        visit(file);
    }

    return found;
};

const walkAll = (directory: string): string[] => {
    const files: string[] = [];
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) {
            if (!SPEC_REFERENCE_SKIPPED_DIRECTORIES.has(entry.name)) {
                files.push(...walkAll(path));
            }
        } else {
            files.push(path);
        }
    }

    return files.sort();
};

const specReferenceFiles = () => [
    ...walkAll(packageRoot).filter((path) => !SPEC_REFERENCE_SKIPPED_FILES.has(toKey(path))),
    join(packageRoot, '../../.github/workflows/rich-text-editor-pull-requests.yaml'),
];

// The `decision` field of a qualification record names its decision record by design, and so does the record's spec.
const specReferenceSource = (path: string) => {
    const buffer = readFileSync(path);
    if (buffer.includes(0)) {
        return '';
    }

    const source = buffer.toString('utf8');
    const key = toKey(path);
    if (!key.startsWith('qualification/') && key !== 'src/__tests__/qualification.spec.ts') {
        return source;
    }

    return source
        .split('\n')
        .filter((line) => !/(?:^\s*"decision":|\bdecision: 'DR-\d{3}')/.test(line))
        .join('\n');
};

const specReferenceCounts = () => {
    const counts = new Map<string, number>();
    for (const path of specReferenceFiles()) {
        const source = specReferenceSource(path);
        let count = 0;
        for (const pattern of SPEC_REFERENCE_PATTERNS) {
            count += source.match(pattern)?.length ?? 0;
        }

        if (count > 0) {
            counts.set(toKey(path), count);
        }
    }

    return counts;
};

const featureFolders = () =>
    readdirSync(join(srcRoot, 'plugins'), { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && existsSync(join(srcRoot, 'plugins', entry.name, 'feature.ts')))
        .map((entry) => entry.name)
        .sort();

const isExported = (statement: ts.VariableStatement | ts.FunctionDeclaration) =>
    statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) === true;

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

// The names a feature's index.ts exports as `definePlugin(...)` units.
const unitExports = (path: string) => {
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

const PLUGIN_ROOT_FILES = [
    /^(index|feature|migration|reader)\.tsx?$/,
    /^editor\.tsx?$/,
    /^[A-Za-z0-9]+\.stories\.tsx$/,
];

const PLUGIN_ROOT_FOLDERS = new Set(['components', 'hooks', 'helpers', 'styles', 'fixtures', '__tests__']);

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

type FileShape = { declaresComponent: boolean; exportedComponent: boolean; exportedOther: string[]; hooks: string[] };

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
describe('package structure ratchet', { timeout: 60_000 }, () => {
    it('no product file over 600 lines grows, data tables excepted', () => {
        const exempt = Object.keys(DATA_TABLES);
        const missing = exempt.filter((key) => !existsSync(join(packageRoot, key)));
        expect(missing, 'data table entries must exist').toEqual([]);
        const files = productFiles.filter((path) => !exempt.includes(toKey(path)));
        expect(ratchet(filesOver(files, 600), FILES_OVER_600_LINES)).toEqual([]);
    });

    it('no product file over 400 lines grows', () => {
        expect(ratchet(filesOver(productFiles, 400), FILES_OVER_400_LINES)).toEqual([]);
    });

    it('no function body over 150 lines grows', () => {
        const measured = new Map<string, number>();
        for (const { key, lines } of allFunctionMeasures()) {
            if (lines > 150) {
                measured.set(key, lines);
            }
        }

        expect(ratchet(measured, FUNCTIONS_OVER_150_LINES)).toEqual([]);
    });

    it('no function body with more than 6 let declarators grows', () => {
        const measured = new Map<string, number>();
        for (const { key, lets } of allFunctionMeasures()) {
            if (lets > 6) {
                measured.set(key, lets);
            }
        }

        expect(ratchet(measured, FUNCTIONS_OVER_6_LETS)).toEqual([]);
    });

    it('no spec file over 1000 lines grows', () => {
        expect(ratchet(filesOver(specFiles, 1000), SPECS_OVER_1000_LINES)).toEqual([]);
    });

    it('folder import cycles are exactly the known ones', () => {
        expect(cycles(folderGraph())).toEqual([...KNOWN_CYCLES].sort());
    });

    it('every product file that imports prosemirror packages sits under src/runtime/', () => {
        expect(prosemirrorImportersOutsideRuntime()).toEqual([]);
    });

    it('the top-level folders under src number at most 15', () => {
        const folders = readdirSync(srcRoot, { withFileTypes: true })
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name);
        expect(folders.length, folders.join(', ')).toBeLessThanOrEqual(15);
    });

    it('no file of the package or its workflow names a spec, decision or plan ID, or a spec section', () => {
        expect(ratchet(specReferenceCounts(), SPEC_REFERENCES)).toEqual([]);
    });

    it('no property or index signature is readonly, except the members of types frozen at run time', () => {
        const found = readonlyMembers();
        const allowed = new Set<string>();
        const stale: string[] = [];
        for (const { types = [], deep = [] } of READONLY_MEMBERS) {
            for (const type of types) {
                allowed.add(type);
                if (!found.has(type)) {
                    stale.push(type);
                }
            }

            for (const type of deep) {
                allowed.add(type);
                allowed.add(`${type}>`);
                if (!found.has(type) && !found.has(`${type}>`)) {
                    stale.push(type);
                }
            }
        }

        const unlisted = [...found].filter(([key]) => !allowed.has(key)).flatMap(([, places]) => places);
        expect(unlisted, 'readonly members outside the allowlist').toEqual([]);
        expect(stale, 'allowlist entries that no longer match').toEqual([]);
    });

    it('as unknown as casts in product files do not grow', () => {
        let count = 0;
        for (const path of productFiles) {
            count += sourceOf(path).match(/as unknown as/g)?.length ?? 0;
        }

        expect(count).toBeLessThanOrEqual(AS_UNKNOWN_AS_MAX);
    });

    it('gives every feature folder an index.ts that exports exactly one definePlugin unit', () => {
        const problems: string[] = [];
        for (const folder of featureFolders()) {
            const path = join(srcRoot, 'plugins', folder, 'index.ts');
            if (!existsSync(path)) {
                problems.push(`missing: plugins/${folder}/index.ts`);
            } else if (unitExports(path).length !== 1) {
                problems.push(`not exactly one definePlugin unit: plugins/${folder}/index.ts`);
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
});
