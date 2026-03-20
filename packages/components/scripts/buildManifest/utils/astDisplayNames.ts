/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';

import {
    createSourceFile,
    isBinaryExpression,
    isCallExpression,
    isExpressionStatement,
    isIdentifier,
    isPropertyAccessExpression,
    isStringLiteral,
    isVariableStatement,
    ScriptKind,
    ScriptTarget,
    SyntaxKind,
} from 'typescript';

/**
 * Scan a file for `X.displayName = 'Y'` assignments and return a variable→displayName map.
 * This handles forwardRef wrappers whose inner component has a dotted displayName set.
 */
export const scanDisplayNames = (filePath: string): Map<string, string> => {
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

    return map;
};

/**
 * For a forwardRef call like `forwardRef(InnerComponent)`, return the variable name
 * of the inner component so we can look up its displayName.
 */
export const getForwardRefInnerName = (filePath: string, forwardRefVarName: string): string | null => {
    const sourceText = readFileSync(filePath, 'utf-8');
    const sourceFile = createSourceFile(filePath, sourceText, ScriptTarget.Latest, true, ScriptKind.TSX);

    for (const statement of sourceFile.statements) {
        if (!isVariableStatement(statement)) {
            continue;
        }
        for (const declaration of statement.declarationList.declarations) {
            if (!isIdentifier(declaration.name) || declaration.name.text !== forwardRefVarName) {
                continue;
            }
            if (!declaration.initializer) {
                continue;
            }
            // Handle: forwardRef<T, P>(InnerComp)
            const init = declaration.initializer;
            if (!isCallExpression(init)) {
                continue;
            }
            const fnName = isIdentifier(init.expression)
                ? init.expression.text
                : isPropertyAccessExpression(init.expression) && isIdentifier(init.expression.name)
                  ? init.expression.name.text
                  : null;
            if (fnName !== 'forwardRef') {
                continue;
            }
            const arg = init.arguments[0];
            if (arg && isIdentifier(arg)) {
                return arg.text;
            }
        }
    }
    return null;
};
