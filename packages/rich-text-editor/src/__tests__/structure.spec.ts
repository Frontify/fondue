/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import {
    allFiles,
    folderExists,
    nonBlankLines,
    packageRoot,
    parse,
    productFiles,
    resolveInternal,
    sourceOf,
    specFiles,
    srcRoot,
    toKey,
} from './fixtures/sourceFiles';
import {
    AS_UNKNOWN_AS_MAX,
    DATA_TABLES,
    DUPLICATE_BINDINGS,
    FILES_OVER_400_LINES,
    FILES_OVER_600_LINES,
    FUNCTIONS_OVER_6_LETS,
    KNOWN_CYCLES,
    LONG_FUNCTIONS,
    READONLY_MEMBERS,
    SPECS_OVER_1000_LINES,
    SPEC_REFERENCES,
} from './structure.allowlist';

const ROOT_NODE = '(root)';
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

// Every line from the node's start line through its end line, blank lines included.
const rawLines = (node: ts.Node, file: ts.SourceFile) => {
    const start = file.getLineAndCharacterOfPosition(node.getStart(file)).line;
    const end = file.getLineAndCharacterOfPosition(node.end).line;

    return end - start + 1;
};

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

            measures.push({ key, lines: rawLines(node, file), lets: letDeclarators(node) });
        }

        ts.forEachChild(node, visit);
    };

    visit(file);

    return measures;
};

const allFunctionMeasures = () => productFiles.flatMap((path) => functionMeasures(path));

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

const FREEZE_HELPERS = new Set(['snapshot', 'freezeModel']);

const isFreezeCall = (node: ts.Node): boolean => {
    if (!ts.isCallExpression(node)) {
        return false;
    }

    const { expression } = node;
    if (ts.isPropertyAccessExpression(expression) && expression.name.text === 'freeze') {
        return ts.isIdentifier(expression.expression) && expression.expression.text === 'Object';
    }

    return ts.isIdentifier(expression) && FREEZE_HELPERS.has(expression.text);
};

const bodyFreezes = (body: ts.Node | undefined): boolean => {
    if (body === undefined) {
        return false;
    }

    let found = false;
    const visit = (node: ts.Node) => {
        if (isFreezeCall(node)) {
            found = true;

            return;
        }

        ts.forEachChild(node, visit);
    };

    visit(body);

    return found;
};

const freezeInitializer = (node: ts.VariableDeclaration): boolean =>
    node.initializer !== undefined && bodyFreezes(node.initializer);

const symbolBody = (file: ts.SourceFile, symbol: string): ts.Node | undefined => {
    let found: ts.Node | undefined;
    const visit = (node: ts.Node) => {
        if (found !== undefined) {
            return;
        }

        if (ts.isFunctionDeclaration(node) && node.name?.text === symbol) {
            found = node;

            return;
        }

        if (ts.isVariableStatement(node)) {
            for (const declaration of node.declarationList.declarations) {
                if (ts.isIdentifier(declaration.name) && declaration.name.text === symbol) {
                    found = declaration;

                    return;
                }
            }
        }

        if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && node.name.text === symbol) {
            found = node.initializer;

            return;
        }

        ts.forEachChild(node, visit);
    };

    visit(file);

    return found;
};

const freezeSiteProblems = () => {
    const problems: string[] = [];
    for (const { site } of READONLY_MEMBERS) {
        const split = site.indexOf('#');
        if (split === -1) {
            problems.push(`invalid site: ${site}`);

            continue;
        }

        const path = site.slice(0, split);
        const symbol = site.slice(split + 1);
        const declaration = symbolBody(parse(path), symbol);
        if (declaration === undefined) {
            problems.push(`missing symbol: ${site}`);

            continue;
        }

        const freezes =
            (isFunctionLike(declaration) && bodyFreezes(declaration.body)) ||
            (ts.isVariableDeclaration(declaration) && freezeInitializer(declaration)) ||
            bodyFreezes(declaration);
        if (!freezes) {
            problems.push(`does not freeze: ${site}`);
        }
    }

    return problems;
};

const readonlyMembers = () => {
    const found = new Map<string, string[]>();
    for (const path of productFiles) {
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

// Reads every `.ts` and `.tsx` file under `src`, including locales. Tests, fixtures and stories restate product names, so they are out.
const productModule = (key: string) => {
    const segments = key.split('/');

    return !segments.includes('__tests__') && !segments.includes('fixtures') && !key.endsWith('.stories.tsx');
};

const bindingNames = (name: ts.BindingName, names: string[]) => {
    if (ts.isIdentifier(name)) {
        names.push(name.text);

        return;
    }

    for (const element of name.elements) {
        if (ts.isBindingElement(element)) {
            bindingNames(element.name, names);
        }
    }
};

const exportedModifier = (node: ts.Node) =>
    ts.canHaveModifiers(node) &&
    ts.getModifiers(node)?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) === true;

const declarationName = (statement: ts.Statement) => {
    if (
        (ts.isFunctionDeclaration(statement) ||
            ts.isClassDeclaration(statement) ||
            ts.isInterfaceDeclaration(statement) ||
            ts.isTypeAliasDeclaration(statement) ||
            ts.isEnumDeclaration(statement) ||
            ts.isModuleDeclaration(statement)) &&
        statement.name !== undefined &&
        ts.isIdentifier(statement.name)
    ) {
        return statement.name.text;
    }

    return undefined;
};

const exportedBindingsOf = (path: string) => {
    const declared = new Set<string>();
    const exported = new Set<string>();
    const clause: { local: string; exported: string }[] = [];
    for (const statement of parse(path).statements) {
        if (ts.isVariableStatement(statement)) {
            const isExport = exportedModifier(statement);
            for (const declaration of statement.declarationList.declarations) {
                const names: string[] = [];
                bindingNames(declaration.name, names);
                for (const name of names) {
                    declared.add(name);
                    if (isExport) {
                        exported.add(name);
                    }
                }
            }

            continue;
        }

        const name = declarationName(statement);
        if (name !== undefined) {
            declared.add(name);
            if (exportedModifier(statement)) {
                exported.add(name);
            }

            continue;
        }

        if (
            ts.isExportDeclaration(statement) &&
            statement.moduleSpecifier === undefined &&
            statement.exportClause !== undefined &&
            ts.isNamedExports(statement.exportClause)
        ) {
            for (const element of statement.exportClause.elements) {
                clause.push({
                    local: (element.propertyName ?? element.name).text,
                    exported: element.name.text,
                });
            }
        }
    }

    for (const entry of clause) {
        if (declared.has(entry.local)) {
            exported.add(entry.exported);
        }
    }

    return exported;
};

const duplicateBindings = () => {
    const byName = new Map<string, string[]>();
    for (const path of allFiles) {
        const key = toKey(path);
        if (!productModule(key)) {
            continue;
        }

        for (const name of exportedBindingsOf(path)) {
            const files = byName.get(name) ?? [];
            files.push(key);
            byName.set(name, files);
        }
    }

    const found = new Map<string, string[]>();
    for (const [name, files] of byName) {
        if (files.length > 1) {
            found.set(name, [...files].sort());
        }
    }

    return found;
};

const isPascalCase = (name: string | undefined): name is string => name !== undefined && /^[A-Z]/.test(name);

const hocName = (call: ts.CallExpression) => {
    const expression = call.expression;
    if (ts.isIdentifier(expression)) {
        return expression.text;
    }

    if (ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.name)) {
        return expression.name.text;
    }

    return undefined;
};

const isPropsHoc = (name: string | undefined) => name === 'memo' || name === 'forwardRef';

const isNestedFunction = (node: ts.Node) =>
    ts.isFunctionDeclaration(node) ||
    ts.isFunctionExpression(node) ||
    ts.isArrowFunction(node) ||
    ts.isMethodDeclaration(node) ||
    ts.isConstructorDeclaration(node) ||
    ts.isGetAccessorDeclaration(node) ||
    ts.isSetAccessorDeclaration(node) ||
    ts.isClassDeclaration(node) ||
    ts.isClassExpression(node);

const isJsx = (node: ts.Node) => ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node);

const isNullOutput = (node: ts.Expression): boolean => {
    let current = node;
    while (ts.isParenthesizedExpression(current)) {
        current = current.expression;
    }

    if (current.kind === ts.SyntaxKind.NullKeyword) {
        return true;
    }

    if (ts.isConditionalExpression(current)) {
        return isNullOutput(current.whenTrue) && isNullOutput(current.whenFalse);
    }

    return false;
};

const expressionHasJsx = (expression: ts.Expression): boolean => {
    let found = false;
    const visit = (node: ts.Node) => {
        if (found) {
            return;
        }

        if (isJsx(node)) {
            found = true;

            return;
        }

        if (isNestedFunction(node)) {
            if (
                node !== expression &&
                (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node)) &&
                returnsJsx(node)
            ) {
                found = true;
            }

            return;
        }

        ts.forEachChild(node, visit);
    };

    visit(expression);

    return found;
};

const returnsJsx = (fn: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction): boolean => {
    const { body } = fn;
    if (body === undefined) {
        return false;
    }

    if (!ts.isBlock(body)) {
        return expressionHasJsx(body);
    }

    let found = false;
    const visit = (node: ts.Node) => {
        if (found) {
            return;
        }

        if (node !== fn && isNestedFunction(node)) {
            return;
        }

        if (ts.isReturnStatement(node) && node.expression !== undefined && expressionHasJsx(node.expression)) {
            found = true;

            return;
        }

        ts.forEachChild(node, visit);
    };

    visit(body);

    return found;
};

// A component may render nothing, so `return null` still names its props.
const returnsOnlyNull = (fn: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction) => {
    const { body } = fn;
    if (body === undefined) {
        return false;
    }

    if (!ts.isBlock(body)) {
        return isNullOutput(body);
    }

    let sawNull = false;
    let other = false;
    const visit = (node: ts.Node) => {
        if (other) {
            return;
        }

        if (node !== fn && isNestedFunction(node)) {
            return;
        }

        if (ts.isReturnStatement(node)) {
            if (node.expression !== undefined && isNullOutput(node.expression)) {
                sawNull = true;
            } else {
                other = true;
            }

            return;
        }

        ts.forEachChild(node, visit);
    };

    visit(body);

    return sawNull && !other;
};

const locateComponent = (fn: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction) => {
    if (ts.isFunctionDeclaration(fn)) {
        return { name: fn.name !== undefined && ts.isIdentifier(fn.name) ? fn.name.text : undefined };
    }

    let node: ts.Node = fn;
    let parent = fn.parent;
    while (parent !== undefined) {
        if (
            ts.isParenthesizedExpression(parent) ||
            ts.isAsExpression(parent) ||
            ts.isSatisfiesExpression(parent) ||
            ts.isNonNullExpression(parent)
        ) {
            node = parent;
            parent = parent.parent;
            continue;
        }

        if (ts.isCallExpression(parent) && parent.arguments[0] === node && isPropsHoc(hocName(parent))) {
            node = parent;
            parent = parent.parent;
            continue;
        }

        break;
    }

    if (ts.isVariableDeclaration(parent) && parent.initializer === node && ts.isIdentifier(parent.name)) {
        return { name: parent.name.text };
    }

    return undefined;
};

const containsTypeLiteral = (node: ts.Node) => {
    let found = false;
    const visit = (current: ts.Node) => {
        if (found) {
            return;
        }

        if (ts.isTypeLiteralNode(current)) {
            found = true;

            return;
        }

        ts.forEachChild(current, visit);
    };

    visit(node);

    return found;
};

const isNamedPropType = (type: ts.TypeNode) => ts.isTypeReferenceNode(type) && !containsTypeLiteral(type);

// The props type argument of `forwardRef<Element, Props>` and `memo<Props>`, wherever the component comes from.
const hocPropType = (call: ts.CallExpression) => {
    const name = hocName(call);
    if (name === 'forwardRef') {
        return call.typeArguments?.[1];
    }

    if (name === 'memo') {
        return call.typeArguments?.[0];
    }

    return undefined;
};

const COMPONENT_CLASSES = new Set(['Component', 'PureComponent']);

// The props type argument of a class that extends `Component<Props>` or `PureComponent<Props>`.
const classPropType = (node: ts.ClassLikeDeclaration) => {
    for (const clause of node.heritageClauses ?? []) {
        for (const base of clause.types) {
            const { expression } = base;
            let name: string | undefined;
            if (ts.isIdentifier(expression)) {
                name = expression.text;
            } else if (ts.isPropertyAccessExpression(expression)) {
                name = expression.name.text;
            }

            if (name !== undefined && COMPONENT_CLASSES.has(name)) {
                return base.typeArguments?.[0];
            }
        }
    }

    return undefined;
};

const declaredName = (node: ts.Node): string => {
    let current: ts.Node | undefined = node.parent;
    while (current !== undefined && !ts.isVariableDeclaration(current) && !ts.isSourceFile(current)) {
        current = current.parent;
    }

    if (current !== undefined && ts.isVariableDeclaration(current) && ts.isIdentifier(current.name)) {
        return current.name.text;
    }

    return 'anonymous';
};

const componentsWithInlineProps = () => {
    const found: string[] = [];
    for (const path of allFiles) {
        if (!path.endsWith('.tsx')) {
            continue;
        }

        const file = parse(path);
        const report = (node: ts.Node, name: string) => {
            const line = file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
            found.push(`${toKey(path)}:${line} ${name}`);
        };

        const visit = (node: ts.Node) => {
            if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
                const located = locateComponent(node);
                const props = node.parameters[0]?.type;
                if (
                    located !== undefined &&
                    isPascalCase(located.name) &&
                    (returnsJsx(node) || returnsOnlyNull(node)) &&
                    props !== undefined &&
                    !isNamedPropType(props)
                ) {
                    report(node, located.name);
                }
            }

            if (ts.isCallExpression(node)) {
                const props = hocPropType(node);
                if (props !== undefined && !isNamedPropType(props)) {
                    report(node, declaredName(node));
                }
            }

            if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) {
                const props = classPropType(node);
                if (props !== undefined && !isNamedPropType(props)) {
                    report(node, node.name?.text ?? declaredName(node));
                }
            }

            ts.forEachChild(node, visit);
        };

        visit(file);
    }

    return found.sort();
};

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

    it('no function spans more than 100 raw lines', () => {
        const measured = new Map<string, number>();
        for (const { key, lines } of allFunctionMeasures()) {
            if (lines > 100) {
                measured.set(key, lines);
            }
        }

        const problems: string[] = [];
        for (const [key, lines] of [...measured].sort(([left], [right]) => left.localeCompare(right))) {
            if (LONG_FUNCTIONS[key] === undefined) {
                problems.push(`unlisted: ${key} = ${lines}`);
            }
        }

        for (const key of Object.keys(LONG_FUNCTIONS).sort()) {
            if (!measured.has(key)) {
                problems.push(`stale: ${key}`);
            }
        }

        expect(problems).toEqual([]);
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

    it('each allowlist freeze site declares a symbol that freezes at run time', () => {
        expect(freezeSiteProblems()).toEqual([]);
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

    it('no two product modules export a binding of the same name, except one shared on purpose', () => {
        const found = duplicateBindings();
        const listed = new Map<string, string[]>();
        const repeated: string[] = [];
        for (const entry of DUPLICATE_BINDINGS) {
            if (listed.has(entry.name)) {
                repeated.push(entry.name);
            }

            listed.set(entry.name, [...entry.files].sort());
        }

        const unlisted = [...found.keys()].filter((name) => !listed.has(name)).sort();
        const mismatches = [...listed].flatMap(([name, files]) => {
            const actual = found.get(name) ?? [];
            if (files.join('\0') === actual.join('\0')) {
                return [];
            }

            return [`${name}: found ${actual.join(', ') || '(none)'}; listed ${files.join(', ')}`];
        });
        expect(repeated, 'allowlist names listed twice').toEqual([]);
        expect(unlisted, 'duplicate bindings outside the allowlist').toEqual([]);
        expect(mismatches, 'allowlist entries whose modules differ').toEqual([]);
    });

    it('as unknown as casts in product files do not grow', () => {
        let count = 0;
        for (const path of productFiles) {
            count += sourceOf(path).match(/as unknown as/g)?.length ?? 0;
        }

        expect(count).toBeLessThanOrEqual(AS_UNKNOWN_AS_MAX);
    });

    it('no React component annotates its props with an inline object type', () => {
        expect(componentsWithInlineProps()).toEqual([]);
    });
});
