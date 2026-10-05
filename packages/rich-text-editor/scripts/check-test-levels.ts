/* (c) Copyright Frontify Ltd., all rights reserved. */

import { globSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';

// SPEC-rich-text-quality/AC-035: component tests change content and selection through the `./testing` helpers.
const INPUT_CALLS = new Map([
    ['userEvent', new Set(['type', 'keyboard'])],
    ['fireEvent', new Set(['input', 'paste'])],
]);
const USER_EVENT_MODULE = '@testing-library/user-event';
const QUERY = /^(get|query|find)(All)?ByRole$/;

const isStringLiteral = (node: ts.Node | undefined, test: (text: string) => boolean) =>
    node !== undefined && ts.isStringLiteralLike(node) && test(node.text);

/** True when `node` finds an element by the `textbox` role or `[contenteditable]`. */
const findsSurface = (node: ts.Node): boolean => {
    if (ts.isCallExpression(node)) {
        const callee = ts.isPropertyAccessExpression(node.expression)
            ? node.expression.name.text
            : node.expression.getText();
        const [first] = node.arguments;
        if (QUERY.test(callee) && isStringLiteral(first, (text) => text === 'textbox')) {
            return true;
        }
        if (
            /^(querySelector|querySelectorAll|closest|locator)$/.test(callee) &&
            isStringLiteral(first, (text) => text.includes('contenteditable'))
        ) {
            return true;
        }
    }
    return ts.forEachChild(node, findsSurface) ?? false;
};

const inputCall = (node: ts.CallExpression, userEventNames: ReadonlySet<string>) => {
    if (!ts.isPropertyAccessExpression(node.expression) || !ts.isIdentifier(node.expression.expression)) {
        return undefined;
    }
    const object = node.expression.expression.text;
    const method = node.expression.name.text;
    const kind = userEventNames.has(object) ? 'userEvent' : object;
    return INPUT_CALLS.get(kind)?.has(method) ? `${object}.${method}` : undefined;
};

/** Reports each input event call in `source` that targets the editing surface. */
export const checkTestLevelsSource = (fileName: string, source: string): string[] => {
    const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const surfaces = new Set<string>();
    const userEventNames = new Set(['userEvent']);
    const violations: string[] = [];

    // The default import under any name and `userEvent` under any alias.
    for (const statement of file.statements) {
        if (
            !ts.isImportDeclaration(statement) ||
            !isStringLiteral(statement.moduleSpecifier, (text) => text === USER_EVENT_MODULE)
        ) {
            continue;
        }
        const bindings = statement.importClause;
        if (bindings === undefined) {
            continue;
        }
        if (bindings.name !== undefined) {
            userEventNames.add(bindings.name.text);
        }
        if (bindings.namedBindings !== undefined && ts.isNamedImports(bindings.namedBindings)) {
            for (const element of bindings.namedBindings.elements) {
                if ((element.propertyName ?? element.name).text === 'userEvent') {
                    userEventNames.add(element.name.text);
                }
            }
        }
    }

    const createsInstance = (node: ts.Expression) =>
        [...userEventNames].some((name) => node.getText().includes(`${name}.setup(`));

    const collect = (node: ts.Node): void => {
        if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) {
            if (findsSurface(node.initializer)) {
                surfaces.add(node.name.text);
            }
            if (createsInstance(node.initializer)) {
                userEventNames.add(node.name.text);
            }
        }
        // `user = userEvent.setup()` inside `beforeEach`.
        if (
            ts.isBinaryExpression(node) &&
            node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
            ts.isIdentifier(node.left) &&
            createsInstance(node.right)
        ) {
            userEventNames.add(node.left.text);
        }
        ts.forEachChild(node, collect);
    };

    const targetsSurface = (argument: ts.Expression | undefined) =>
        argument !== undefined &&
        ((ts.isIdentifier(argument) && surfaces.has(argument.text)) || findsSurface(argument));

    const visit = (node: ts.Node): void => {
        if (ts.isCallExpression(node)) {
            const call = inputCall(node, userEventNames);
            // `keyboard` types into the focused element, so any surface the file finds is its target.
            const hits = call?.endsWith('.keyboard') ? surfaces.size > 0 : targetsSurface(node.arguments[0]);
            if (call !== undefined && hits) {
                const { line } = file.getLineAndCharacterOfPosition(node.getStart());
                violations.push(
                    `${fileName}:${line + 1} calls ${call} on the editing surface; use execute, enqueue or the ./testing helpers`,
                );
            }
        }
        ts.forEachChild(node, visit);
    };

    collect(file);
    visit(file);
    return violations;
};

/** Checks every component test (`*.test.tsx`) under `directory`. */
export const checkTestLevels = async (root: string, directory: string): Promise<string[]> => {
    const files = globSync(`${directory}/**/*.test.tsx`, {
        cwd: root,
        exclude: (path) => path.includes('__lint-fixtures__'),
    });
    const results = await Promise.all(
        files
            .sort()
            .map(async (file) =>
                checkTestLevelsSource(relative(root, join(root, file)), await readFile(join(root, file), 'utf8')),
            ),
    );
    return results.flat();
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const root = fileURLToPath(new URL('..', import.meta.url));
    const violations = await checkTestLevels(root, process.argv[2] ?? 'src');
    if (violations.length > 0) {
        console.error(violations.join('\n'));
        process.exit(1);
    }
    console.log('check-test-levels: no component test dispatches input events at the editing surface.');
}
