/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import {
    AS_UNKNOWN_AS_MAX,
    DATA_TABLES,
    FEATURE_FOLDERS,
    FILES_OVER_400_LINES,
    FILES_OVER_600_LINES,
    FUNCTIONS_OVER_150_LINES,
    FUNCTIONS_OVER_6_LETS,
    KNOWN_CYCLES,
    PROSEMIRROR_NODES,
    SPECS_OVER_1000_LINES,
    SPEC_REFERENCES,
} from './structure.allowlist';

const packageRoot = fileURLToPath(new URL('../..', import.meta.url)).replace(/\/$/, '');
const srcRoot = join(packageRoot, 'src');

const ROOT_NODE = '(root)';
const CODE_FILE = /\.tsx?$/;
const SPEC_REFERENCE_PATTERNS = [
    /\b(DR|AC|SPEC)-[0-9a-z]/g,
    /row [0-9]+|key precedence|release stages|default toolbars|decode order|plugin contract|package layout|working rules/gi,
];

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

const lineCount = (path: string) => {
    const source = sourceOf(path);
    const newlines = source.match(/\n/g)?.length ?? 0;
    if (source.length > 0 && !source.endsWith('\n')) {
        return newlines + 1;
    }
    return newlines;
};

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
            const start = file.getLineAndCharacterOfPosition(node.getStart(file)).line;
            const end = file.getLineAndCharacterOfPosition(node.getEnd()).line;
            let key = `${base}#${name}`;
            if (occurrence > 1) {
                key = `${key}#${occurrence}`;
            }
            measures.push({ key, lines: end - start + 1, lets: letDeclarators(node) });
        }
        ts.forEachChild(node, visit);
    };
    visit(file);
    return measures;
};

const allFunctionMeasures = () => productFiles.flatMap((path) => functionMeasures(path));

const folderExists = (path: string) => existsSync(path) && statSync(path).isDirectory();

// Maps a path under src (as segments) to its graph node; `split` gives `clipboard/import` and each feature their own node.
const nodeOf = (segments: string[], split: boolean) => {
    const [first, second] = segments;
    if (first === undefined || !folderExists(join(srcRoot, first))) {
        return ROOT_NODE;
    }
    if (split && second !== undefined && first === 'clipboard' && second === 'import') {
        return 'clipboard/import';
    }
    if (split && second !== undefined && first === 'features' && folderExists(join(srcRoot, first, second))) {
        return `features/${second}`;
    }
    return first;
};

const nodeOfFile = (path: string, split: boolean) =>
    nodeOf(relative(srcRoot, path).split('\\').join('/').split('/'), split);

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
        const from = nodeOfFile(path, false);
        if (!graph.has(from)) {
            graph.set(from, new Set());
        }
        for (const specifier of moduleSpecifiers(path)) {
            const segments = resolveInternal(path, specifier);
            if (!segments) {
                continue;
            }
            const to = nodeOf(segments, false);
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

const prosemirrorNodes = () => {
    const nodes = new Set<string>();
    for (const path of productFiles) {
        if (moduleSpecifiers(path).some((specifier) => specifier.startsWith('prosemirror-'))) {
            nodes.add(nodeOfFile(path, true));
        }
    }
    return [...nodes].sort();
};

const specReferenceFiles = () => [
    ...productFiles,
    join(packageRoot, 'oxlint.config.ts'),
    join(packageRoot, 'CONTRIBUTING.md'),
];

const specReferenceCounts = () => {
    const counts = new Map<string, number>();
    for (const path of specReferenceFiles()) {
        const source = readFileSync(path, 'utf8');
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
    readdirSync(join(srcRoot, 'features'), { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && existsSync(join(srcRoot, 'features', entry.name, 'feature.ts')))
        .map((entry) => entry.name)
        .sort();

describe('package structure ratchet', () => {
    it('T-01: product files over 600 lines only shrink, data tables excepted', () => {
        const exempt = Object.keys(DATA_TABLES);
        const missing = exempt.filter((key) => !existsSync(join(packageRoot, key)));
        expect(missing, 'data table entries must exist').toEqual([]);
        const files = productFiles.filter((path) => !exempt.includes(toKey(path)));
        expect(ratchet(filesOver(files, 600), FILES_OVER_600_LINES)).toEqual([]);
    });

    it('T-02: product files over 400 lines only shrink', () => {
        expect(ratchet(filesOver(productFiles, 400), FILES_OVER_400_LINES)).toEqual([]);
    });

    it('T-03: function bodies over 150 lines only shrink', () => {
        const measured = new Map<string, number>();
        for (const { key, lines } of allFunctionMeasures()) {
            if (lines > 150) {
                measured.set(key, lines);
            }
        }
        expect(ratchet(measured, FUNCTIONS_OVER_150_LINES)).toEqual([]);
    });

    it('T-04: function bodies with more than 6 let declarators only shrink', () => {
        const measured = new Map<string, number>();
        for (const { key, lets } of allFunctionMeasures()) {
            if (lets > 6) {
                measured.set(key, lets);
            }
        }
        expect(ratchet(measured, FUNCTIONS_OVER_6_LETS)).toEqual([]);
    });

    it('T-18: spec files over 1000 lines only shrink', () => {
        expect(ratchet(filesOver(specFiles, 1000), SPECS_OVER_1000_LINES)).toEqual([]);
    });

    it('T-05: folder import cycles are exactly the known ones', () => {
        expect(cycles(folderGraph())).toEqual([...KNOWN_CYCLES].sort());
    });

    it('T-06: only the allowlisted nodes import prosemirror packages', () => {
        expect(prosemirrorNodes()).toEqual([...PROSEMIRROR_NODES].sort());
    });

    it('T-10: spec references in product files and docs only shrink', () => {
        expect(ratchet(specReferenceCounts(), SPEC_REFERENCES)).toEqual([]);
    });

    it('T-11: as unknown as casts in product files do not grow', () => {
        let count = 0;
        for (const path of productFiles) {
            count += sourceOf(path).match(/as unknown as/g)?.length ?? 0;
        }
        expect(count).toBeLessThanOrEqual(AS_UNKNOWN_AS_MAX);
    });

    it('lists the feature folders', () => {
        expect(featureFolders()).toEqual([...FEATURE_FOLDERS].sort());
    });
});
