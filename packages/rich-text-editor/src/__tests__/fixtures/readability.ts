/* (c) Copyright Frontify Ltd., all rights reserved. */

import { join } from 'node:path';

import typescript from 'typescript';

import { allFiles, packageRoot, parse, toKey } from './sourceFiles';

const siteAt = (path: string, file: typescript.SourceFile, node: typescript.Node) =>
    `${toKey(path)}:${file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1}`;

// Every `.ts` and `.tsx` file under `src`, the set `allFiles` already walks, tests included.
const collectSites = (hit: (node: typescript.Node) => typescript.Node | undefined) => {
    const found: string[] = [];
    for (const path of allFiles) {
        const file = parse(path);
        const visit = (node: typescript.Node) => {
            const reported = hit(node);
            if (reported !== undefined) {
                found.push(siteAt(path, file, reported));
            }

            typescript.forEachChild(node, visit);
        };

        visit(file);
    }

    return found.sort();
};

const bare = (expression: typescript.Expression) => {
    let current = expression;
    while (typescript.isParenthesizedExpression(current)) {
        current = current.expression;
    }

    return current;
};

const propertyText = (name: typescript.PropertyName) => {
    if (typescript.isIdentifier(name) || typescript.isStringLiteral(name)) {
        return name.text;
    }

    return undefined;
};

const objectProperty = (object: typescript.ObjectLiteralExpression, name: string) => {
    for (const property of object.properties) {
        if (!typescript.isPropertyAssignment(property) || propertyText(property.name) !== name) {
            continue;
        }

        return property.initializer;
    }

    return undefined;
};

const identifierLengthRule = () => {
    const file = parse(join(packageRoot, 'oxlint.config.ts'));
    let minimum: number | undefined;
    let exceptions: Set<string> | undefined;
    const visit = (node: typescript.Node) => {
        if (
            typescript.isPropertyAssignment(node) &&
            typescript.isStringLiteral(node.name) &&
            node.name.text === 'eslint/id-length' &&
            typescript.isArrayLiteralExpression(node.initializer)
        ) {
            const options = node.initializer.elements[1];
            if (options !== undefined && typescript.isObjectLiteralExpression(options)) {
                const minNode = objectProperty(options, 'min');
                const listNode = objectProperty(options, 'exceptions');
                if (minNode !== undefined && typescript.isNumericLiteral(minNode)) {
                    minimum = Number(minNode.text);
                }

                if (listNode !== undefined && typescript.isArrayLiteralExpression(listNode)) {
                    const names: string[] = [];
                    for (const element of listNode.elements) {
                        if (!typescript.isStringLiteral(element)) {
                            throw new Error('oxlint id-length exceptions must be string literals');
                        }

                        names.push(element.text);
                    }

                    exceptions = new Set(names);
                }
            }
        }

        typescript.forEachChild(node, visit);
    };

    visit(file);
    if (minimum === undefined || exceptions === undefined) {
        throw new Error('oxlint.config.ts does not declare eslint/id-length min and exceptions');
    }

    return { minimum, exceptions };
};

export const shortDestructuredBindings = () => {
    const { minimum, exceptions } = identifierLengthRule();

    return collectSites((node) => {
        if (!typescript.isBindingElement(node) || !typescript.isIdentifier(node.name)) {
            return undefined;
        }

        if (node.name.text.length < minimum && !exceptions.has(node.name.text)) {
            return node.name;
        }

        return undefined;
    });
};

const ARRAY_ITERATORS = new Set([
    'map',
    'filter',
    'flatMap',
    'reduce',
    'reduceRight',
    'sort',
    'toSorted',
    'flat',
    'forEach',
    'some',
    'every',
    'find',
    'findLast',
    'findIndex',
    'findLastIndex',
    'join',
    'slice',
    'concat',
    'reverse',
    'toReversed',
    'includes',
    'indexOf',
]);

const iteratorReceiver = (call: typescript.CallExpression) => {
    const expression = bare(call.expression);
    if (!typescript.isPropertyAccessExpression(expression) || !ARRAY_ITERATORS.has(expression.name.text)) {
        return undefined;
    }

    return bare(expression.expression);
};

const iteratorChainLength = (call: typescript.CallExpression) => {
    let length = 0;
    let current: typescript.Node = call;
    while (typescript.isCallExpression(current)) {
        const receiver = iteratorReceiver(current);
        if (receiver === undefined) {
            break;
        }

        length += 1;
        current = receiver;
    }

    return length;
};

const continuesIteratorChain = (call: typescript.CallExpression) => {
    let parent: typescript.Node | undefined = call.parent;
    while (parent !== undefined && typescript.isParenthesizedExpression(parent)) {
        parent = parent.parent;
    }

    if (
        parent === undefined ||
        !typescript.isPropertyAccessExpression(parent) ||
        !ARRAY_ITERATORS.has(parent.name.text)
    ) {
        return false;
    }

    return typescript.isCallExpression(parent.parent) && parent.parent.expression === parent;
};

export const longIteratorChains = () =>
    collectSites((node) => {
        if (!typescript.isCallExpression(node) || continuesIteratorChain(node)) {
            return undefined;
        }

        if (iteratorChainLength(node) >= 3) {
            return node;
        }

        return undefined;
    });

const isSpread = (
    node: typescript.Node,
): node is typescript.SpreadElement | typescript.SpreadAssignment | typescript.JsxSpreadAttribute =>
    typescript.isSpreadElement(node) || typescript.isSpreadAssignment(node) || typescript.isJsxSpreadAttribute(node);

export const conditionalSpreads = () =>
    collectSites((node) => {
        if (!isSpread(node)) {
            return undefined;
        }

        if (typescript.isConditionalExpression(bare(node.expression))) {
            return node;
        }

        return undefined;
    });
