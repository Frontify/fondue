/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';

import {
    createSourceFile,
    isBinaryExpression,
    isCallExpression,
    isExpressionStatement,
    isIdentifier,
    isObjectLiteralExpression,
    isPropertyAccessExpression,
    isPropertyAssignment,
    isStringLiteral,
    isVariableStatement,
    ScriptKind,
    ScriptTarget,
    type SourceFile,
    type Expression,
    SyntaxKind,
} from 'typescript';

export type ScanResult = {
    displayNameMap: Map<string, string>;
    sourceFile: SourceFile;
};

/**
 * Scan a file for `X.displayName = 'Y'` assignments and return a variable→displayName map
 * along with the parsed SourceFile for reuse by getForwardRefInnerName.
 */
export const scanDisplayNames = (filePath: string): ScanResult => {
    const sourceText = readFileSync(filePath, 'utf-8');
    const sourceFile = createSourceFile(filePath, sourceText, ScriptTarget.Latest, true, ScriptKind.TSX);
    const map = new Map<string, string>();

    for (const stmt of sourceFile.statements) {
        if (!isExpressionStatement(stmt)) {
            continue;
        }
        if (!isBinaryExpression(stmt.expression)) {
            continue;
        }
        const expr = stmt.expression;
        if (expr.operatorToken.kind !== SyntaxKind.EqualsToken) {
            continue;
        }
        if (!isPropertyAccessExpression(expr.left)) {
            continue;
        }
        if (!isIdentifier(expr.left.name) || expr.left.name.text !== 'displayName') {
            continue;
        }
        // Only simple: X.displayName = '...' (not X.Y.displayName)
        if (!isIdentifier(expr.left.expression)) {
            continue;
        }
        if (!isStringLiteral(expr.right)) {
            continue;
        }
        map.set(expr.left.expression.text, expr.right.text);
    }

    return { displayNameMap: map, sourceFile };
};

/**
 * If the expression is a `forwardRef(X)` or `React.forwardRef(X)` call where X is an identifier,
 * return X's name. Otherwise return null.
 */
const getForwardRefArgName = (expr: Expression): string | null => {
    if (!isCallExpression(expr)) {
        return null;
    }
    const fnName = isIdentifier(expr.expression)
        ? expr.expression.text
        : isPropertyAccessExpression(expr.expression) && isIdentifier(expr.expression.name)
          ? expr.expression.name.text
          : null;
    if (fnName !== 'forwardRef') {
        return null;
    }
    const arg = expr.arguments[0];
    return arg && isIdentifier(arg) ? arg.text : null;
};

/**
 * For a forwardRef call like `forwardRef(InnerComponent)`, return the variable name
 * of the inner component so we can look up its displayName.
 *
 * Handles two patterns:
 * 1. `const X = forwardRef(Inner)` — variable declaration
 * 2. `export const Comp = { PropName: forwardRef(Inner) }` — object literal property
 *    where react-docgen-typescript reports just "PropName" as the displayName
 */
export const getForwardRefInnerName = (sourceFile: SourceFile, forwardRefVarName: string): string | null => {
    for (const statement of sourceFile.statements) {
        if (!isVariableStatement(statement)) {
            continue;
        }
        for (const declaration of statement.declarationList.declarations) {
            if (!declaration.initializer) {
                continue;
            }

            // Pattern 1: const X = forwardRef(Inner)
            if (isIdentifier(declaration.name) && declaration.name.text === forwardRefVarName) {
                const innerName = getForwardRefArgName(declaration.initializer);
                if (innerName) {
                    return innerName;
                }
            }

            // Pattern 2: const Comp = { PropName: forwardRef(Inner) }
            if (isObjectLiteralExpression(declaration.initializer)) {
                for (const prop of declaration.initializer.properties) {
                    if (!isPropertyAssignment(prop)) {
                        continue;
                    }
                    const propName = isIdentifier(prop.name) ? prop.name.text : null;
                    if (propName !== forwardRefVarName) {
                        continue;
                    }
                    const innerName = getForwardRefArgName(prop.initializer);
                    if (innerName) {
                        return innerName;
                    }
                }
            }
        }
    }
    return null;
};
