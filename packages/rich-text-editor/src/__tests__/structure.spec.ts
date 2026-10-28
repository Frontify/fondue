/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

import typescript from 'typescript';
import { describe, expect, it } from 'vitest';

import { conditionalSpreads, longIteratorChains, shortDestructuredBindings } from './fixtures/readability';
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
    for (const [key, value] of [...measured].sort(([left], [right]) => left.localeCompare(right))) {
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
    | typescript.FunctionDeclaration
    | typescript.FunctionExpression
    | typescript.ArrowFunction
    | typescript.MethodDeclaration
    | typescript.ConstructorDeclaration
    | typescript.AccessorDeclaration;

const isFunctionLike = (node: typescript.Node): node is FunctionLike =>
    typescript.isFunctionDeclaration(node) ||
    typescript.isFunctionExpression(node) ||
    typescript.isArrowFunction(node) ||
    typescript.isMethodDeclaration(node) ||
    typescript.isConstructorDeclaration(node) ||
    typescript.isGetAccessorDeclaration(node) ||
    typescript.isSetAccessorDeclaration(node);

const nameText = (name: typescript.Node, file: typescript.SourceFile) => {
    if (
        typescript.isIdentifier(name) ||
        typescript.isPrivateIdentifier(name) ||
        typescript.isStringLiteral(name) ||
        typescript.isNumericLiteral(name) ||
        typescript.isNoSubstitutionTemplateLiteral(name)
    ) {
        return name.text;
    }

    return name.getText(file);
};

const functionName = (node: FunctionLike, file: typescript.SourceFile) => {
    if (typescript.isConstructorDeclaration(node)) {
        return 'constructor';
    }

    if (node.name) {
        return nameText(node.name, file);
    }

    let child: typescript.Node = node;
    let parent = node.parent;
    while (
        typescript.isParenthesizedExpression(parent) ||
        typescript.isAsExpression(parent) ||
        typescript.isSatisfiesExpression(parent) ||
        typescript.isNonNullExpression(parent)
    ) {
        child = parent;
        parent = parent.parent;
    }

    if (typescript.isVariableDeclaration(parent) && parent.initializer === child) {
        return nameText(parent.name, file);
    }

    if (
        (typescript.isPropertyAssignment(parent) || typescript.isPropertyDeclaration(parent)) &&
        parent.initializer === child
    ) {
        return nameText(parent.name, file);
    }

    if (
        typescript.isBinaryExpression(parent) &&
        parent.operatorToken.kind === typescript.SyntaxKind.EqualsToken &&
        parent.right === child
    ) {
        return parent.left.getText(file);
    }

    return 'anonymous';
};

const letDeclarators = (node: FunctionLike) => {
    if (!node.body || !typescript.isBlock(node.body)) {
        return 0;
    }

    let count = 0;
    for (const statement of node.body.statements) {
        if (
            typescript.isVariableStatement(statement) &&
            (statement.declarationList.flags & typescript.NodeFlags.Let) !== 0
        ) {
            count += statement.declarationList.declarations.length;
        }
    }

    return count;
};

type FunctionMeasure = { key: string; lines: number; lets: number };

// Every line from the node's start line through its end line, blank lines included.
const rawLines = (node: typescript.Node, file: typescript.SourceFile) => {
    const start = file.getLineAndCharacterOfPosition(node.getStart(file)).line;
    const end = file.getLineAndCharacterOfPosition(node.end).line;

    return end - start + 1;
};

const functionMeasures = (path: string) => {
    const file = parse(path);
    const base = toKey(path);
    const seen = new Map<string, number>();
    const measures: FunctionMeasure[] = [];
    const visit = (node: typescript.Node) => {
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

        typescript.forEachChild(node, visit);
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

const nodeOfFile = (path: string) => {
    const normalized = relative(srcRoot, path).split('\\').join('/');

    return nodeOf(normalized.split('/'));
};

const moduleSpecifiers = (path: string) => {
    const specifiers: string[] = [];
    const visit = (node: typescript.Node) => {
        if (
            (typescript.isImportDeclaration(node) || typescript.isExportDeclaration(node)) &&
            node.moduleSpecifier &&
            typescript.isStringLiteral(node.moduleSpecifier)
        ) {
            specifiers.push(node.moduleSpecifier.text);
        }

        if (
            typescript.isCallExpression(node) &&
            node.expression.kind === typescript.SyntaxKind.ImportKeyword &&
            node.arguments[0] !== undefined &&
            typescript.isStringLiteral(node.arguments[0])
        ) {
            specifiers.push(node.arguments[0].text);
        }

        typescript.forEachChild(node, visit);
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

const prosemirrorImportersOutsideRuntime = () => {
    const outsideRuntime = productFiles.filter((path) => !toKey(path).startsWith('src/runtime/'));

    return outsideRuntime
        .filter((path) => moduleSpecifiers(path).some((specifier) => specifier.startsWith('prosemirror-')))
        .map((path) => toKey(path));
};

const isSignature = (node: typescript.Node) =>
    typescript.isFunctionTypeNode(node) ||
    typescript.isConstructorTypeNode(node) ||
    typescript.isMethodSignature(node) ||
    typescript.isCallSignatureDeclaration(node) ||
    typescript.isConstructSignatureDeclaration(node);

// The type that holds a member, with `>` after it when a member's type nests the literal. A literal outside any type
// declaration is named by its members, and one inside a function type is never an allowed owner.
const memberOwner = (member: typescript.TypeElement, file: typescript.SourceFile) => {
    const literal = member.parent as typescript.TypeLiteralNode | typescript.InterfaceDeclaration;
    let declaration: typescript.TypeAliasDeclaration | typescript.InterfaceDeclaration | undefined;
    if (typescript.isInterfaceDeclaration(literal)) {
        declaration = literal;
    }

    let nested = false;
    let inSignature = false;
    let node: typescript.Node = literal;
    while (declaration === undefined && node.parent !== undefined) {
        const parent: typescript.Node = node.parent;
        if (typescript.isTypeAliasDeclaration(parent)) {
            declaration = parent;
        } else if (
            typescript.isSourceFile(parent) ||
            typescript.isExpression(parent) ||
            typescript.isStatement(parent) ||
            typescript.isParameter(parent)
        ) {
            break;
        } else if (isSignature(parent)) {
            inSignature = true;
        } else if (
            typescript.isPropertySignature(parent) ||
            typescript.isIndexSignatureDeclaration(parent) ||
            typescript.isMappedTypeNode(parent)
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

const isFreezeCall = (node: typescript.Node): boolean => {
    if (!typescript.isCallExpression(node)) {
        return false;
    }

    const { expression } = node;
    if (typescript.isPropertyAccessExpression(expression) && expression.name.text === 'freeze') {
        return typescript.isIdentifier(expression.expression) && expression.expression.text === 'Object';
    }

    return typescript.isIdentifier(expression) && FREEZE_HELPERS.has(expression.text);
};

const bodyFreezes = (body: typescript.Node | undefined): boolean => {
    if (body === undefined) {
        return false;
    }

    let found = false;
    const visit = (node: typescript.Node) => {
        if (isFreezeCall(node)) {
            found = true;

            return;
        }

        typescript.forEachChild(node, visit);
    };

    visit(body);

    return found;
};

const freezeInitializer = (node: typescript.VariableDeclaration): boolean =>
    node.initializer !== undefined && bodyFreezes(node.initializer);

const symbolBody = (file: typescript.SourceFile, symbol: string): typescript.Node | undefined => {
    let found: typescript.Node | undefined;
    const visit = (node: typescript.Node) => {
        if (found !== undefined) {
            return;
        }

        if (typescript.isFunctionDeclaration(node) && node.name?.text === symbol) {
            found = node;

            return;
        }

        if (typescript.isVariableStatement(node)) {
            for (const declaration of node.declarationList.declarations) {
                if (typescript.isIdentifier(declaration.name) && declaration.name.text === symbol) {
                    found = declaration;

                    return;
                }
            }
        }

        if (typescript.isPropertyAssignment(node) && typescript.isIdentifier(node.name) && node.name.text === symbol) {
            found = node.initializer;

            return;
        }

        typescript.forEachChild(node, visit);
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
            (typescript.isVariableDeclaration(declaration) && freezeInitializer(declaration)) ||
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
        const visit = (node: typescript.Node) => {
            if (
                (typescript.isPropertySignature(node) || typescript.isIndexSignatureDeclaration(node)) &&
                node.modifiers?.some((modifier) => modifier.kind === typescript.SyntaxKind.ReadonlyKeyword)
            ) {
                const key = `${toKey(path)}#${memberOwner(node, file)}`;
                const line = file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
                found.set(key, [...(found.get(key) ?? []), `${toKey(path)}:${line}`]);
            }

            typescript.forEachChild(node, visit);
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

    const lines = source.split('\n').filter((line) => !/(?:^\s*"decision":|\bdecision: 'DR-\d{3}')/.test(line));

    return lines.join('\n');
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

const bindingNames = (name: typescript.BindingName, names: string[]) => {
    if (typescript.isIdentifier(name)) {
        names.push(name.text);

        return;
    }

    for (const element of name.elements) {
        if (typescript.isBindingElement(element)) {
            bindingNames(element.name, names);
        }
    }
};

const exportedModifier = (node: typescript.Node) =>
    typescript.canHaveModifiers(node) &&
    typescript.getModifiers(node)?.some((modifier) => modifier.kind === typescript.SyntaxKind.ExportKeyword) === true;

const declarationName = (statement: typescript.Statement) => {
    if (
        (typescript.isFunctionDeclaration(statement) ||
            typescript.isClassDeclaration(statement) ||
            typescript.isInterfaceDeclaration(statement) ||
            typescript.isTypeAliasDeclaration(statement) ||
            typescript.isEnumDeclaration(statement) ||
            typescript.isModuleDeclaration(statement)) &&
        statement.name !== undefined &&
        typescript.isIdentifier(statement.name)
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
        if (typescript.isVariableStatement(statement)) {
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
            typescript.isExportDeclaration(statement) &&
            statement.moduleSpecifier === undefined &&
            statement.exportClause !== undefined &&
            typescript.isNamedExports(statement.exportClause)
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

const hocName = (call: typescript.CallExpression) => {
    const expression = call.expression;
    if (typescript.isIdentifier(expression)) {
        return expression.text;
    }

    if (typescript.isPropertyAccessExpression(expression) && typescript.isIdentifier(expression.name)) {
        return expression.name.text;
    }

    return undefined;
};

const isPropsHoc = (name: string | undefined) => name === 'memo' || name === 'forwardRef';

const isNestedFunction = (node: typescript.Node) =>
    typescript.isFunctionDeclaration(node) ||
    typescript.isFunctionExpression(node) ||
    typescript.isArrowFunction(node) ||
    typescript.isMethodDeclaration(node) ||
    typescript.isConstructorDeclaration(node) ||
    typescript.isGetAccessorDeclaration(node) ||
    typescript.isSetAccessorDeclaration(node) ||
    typescript.isClassDeclaration(node) ||
    typescript.isClassExpression(node);

const isJsx = (node: typescript.Node) =>
    typescript.isJsxElement(node) || typescript.isJsxSelfClosingElement(node) || typescript.isJsxFragment(node);

const isNullOutput = (node: typescript.Expression): boolean => {
    let current = node;
    while (typescript.isParenthesizedExpression(current)) {
        current = current.expression;
    }

    if (current.kind === typescript.SyntaxKind.NullKeyword) {
        return true;
    }

    if (typescript.isConditionalExpression(current)) {
        return isNullOutput(current.whenTrue) && isNullOutput(current.whenFalse);
    }

    return false;
};

const expressionHasJsx = (expression: typescript.Expression): boolean => {
    let found = false;
    const visit = (node: typescript.Node) => {
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
                (typescript.isFunctionDeclaration(node) ||
                    typescript.isFunctionExpression(node) ||
                    typescript.isArrowFunction(node)) &&
                returnsJsx(node)
            ) {
                found = true;
            }

            return;
        }

        typescript.forEachChild(node, visit);
    };

    visit(expression);

    return found;
};

const returnsJsx = (
    functionNode: typescript.FunctionDeclaration | typescript.FunctionExpression | typescript.ArrowFunction,
): boolean => {
    const { body } = functionNode;
    if (body === undefined) {
        return false;
    }

    if (!typescript.isBlock(body)) {
        return expressionHasJsx(body);
    }

    let found = false;
    const visit = (node: typescript.Node) => {
        if (found) {
            return;
        }

        if (node !== functionNode && isNestedFunction(node)) {
            return;
        }

        if (typescript.isReturnStatement(node) && node.expression !== undefined && expressionHasJsx(node.expression)) {
            found = true;

            return;
        }

        typescript.forEachChild(node, visit);
    };

    visit(body);

    return found;
};

// A component may render nothing, so `return null` still names its props.
const returnsOnlyNull = (
    functionNode: typescript.FunctionDeclaration | typescript.FunctionExpression | typescript.ArrowFunction,
) => {
    const { body } = functionNode;
    if (body === undefined) {
        return false;
    }

    if (!typescript.isBlock(body)) {
        return isNullOutput(body);
    }

    let sawNull = false;
    let other = false;
    const visit = (node: typescript.Node) => {
        if (other) {
            return;
        }

        if (node !== functionNode && isNestedFunction(node)) {
            return;
        }

        if (typescript.isReturnStatement(node)) {
            if (node.expression !== undefined && isNullOutput(node.expression)) {
                sawNull = true;
            } else {
                other = true;
            }

            return;
        }

        typescript.forEachChild(node, visit);
    };

    visit(body);

    return sawNull && !other;
};

const locateComponent = (
    functionNode: typescript.FunctionDeclaration | typescript.FunctionExpression | typescript.ArrowFunction,
) => {
    if (typescript.isFunctionDeclaration(functionNode)) {
        return {
            name:
                functionNode.name !== undefined && typescript.isIdentifier(functionNode.name)
                    ? functionNode.name.text
                    : undefined,
        };
    }

    let node: typescript.Node = functionNode;
    let parent = functionNode.parent;
    while (parent !== undefined) {
        if (
            typescript.isParenthesizedExpression(parent) ||
            typescript.isAsExpression(parent) ||
            typescript.isSatisfiesExpression(parent) ||
            typescript.isNonNullExpression(parent)
        ) {
            node = parent;
            parent = parent.parent;
            continue;
        }

        if (typescript.isCallExpression(parent) && parent.arguments[0] === node && isPropsHoc(hocName(parent))) {
            node = parent;
            parent = parent.parent;
            continue;
        }

        break;
    }

    if (
        typescript.isVariableDeclaration(parent) &&
        parent.initializer === node &&
        typescript.isIdentifier(parent.name)
    ) {
        return { name: parent.name.text };
    }

    return undefined;
};

const containsTypeLiteral = (node: typescript.Node) => {
    let found = false;
    const visit = (current: typescript.Node) => {
        if (found) {
            return;
        }

        if (typescript.isTypeLiteralNode(current)) {
            found = true;

            return;
        }

        typescript.forEachChild(current, visit);
    };

    visit(node);

    return found;
};

const isNamedPropType = (type: typescript.TypeNode) =>
    typescript.isTypeReferenceNode(type) && !containsTypeLiteral(type);

// The props type argument of `forwardRef<Element, Props>` and `memo<Props>`, wherever the component comes from.
const hocPropType = (call: typescript.CallExpression) => {
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
const classPropType = (node: typescript.ClassLikeDeclaration) => {
    for (const clause of node.heritageClauses ?? []) {
        for (const base of clause.types) {
            const { expression } = base;
            let name: string | undefined;
            if (typescript.isIdentifier(expression)) {
                name = expression.text;
            } else if (typescript.isPropertyAccessExpression(expression)) {
                name = expression.name.text;
            }

            if (name !== undefined && COMPONENT_CLASSES.has(name)) {
                return base.typeArguments?.[0];
            }
        }
    }

    return undefined;
};

const declaredName = (node: typescript.Node): string => {
    let current: typescript.Node | undefined = node.parent;
    while (current !== undefined && !typescript.isVariableDeclaration(current) && !typescript.isSourceFile(current)) {
        current = current.parent;
    }

    if (current !== undefined && typescript.isVariableDeclaration(current) && typescript.isIdentifier(current.name)) {
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
        const report = (node: typescript.Node, name: string) => {
            const line = file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
            found.push(`${toKey(path)}:${line} ${name}`);
        };

        const visit = (node: typescript.Node) => {
            if (
                typescript.isFunctionDeclaration(node) ||
                typescript.isFunctionExpression(node) ||
                typescript.isArrowFunction(node)
            ) {
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

            if (typescript.isCallExpression(node)) {
                const props = hocPropType(node);
                if (props !== undefined && !isNamedPropType(props)) {
                    report(node, declaredName(node));
                }
            }

            if (typescript.isClassDeclaration(node) || typescript.isClassExpression(node)) {
                const props = classPropType(node);
                if (props !== undefined && !isNamedPropType(props)) {
                    report(node, node.name?.text ?? declaredName(node));
                }
            }

            typescript.forEachChild(node, visit);
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

    it('no destructured binding is shorter than three characters', () => {
        expect(shortDestructuredBindings()).toEqual([]);
    });

    it('no spread takes a conditional', () => {
        expect(conditionalSpreads()).toEqual([]);
    });

    it('no chain calls three or more array iterators', () => {
        expect(longIteratorChains()).toEqual([]);
    });
});
