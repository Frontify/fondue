/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    isArrowFunction,
    isBlock,
    isFunctionExpression,
    isJsxElement,
    isJsxFragment,
    isJsxSelfClosingElement,
    isParenthesizedExpression,
    isReturnStatement,
    type Expression,
    type Node,
} from 'typescript';

export const isJsxLike = (node: Node): boolean => {
    return isJsxElement(node) || isJsxSelfClosingElement(node) || isJsxFragment(node);
};

/** Pull JSX out of an arrow / function expression body */
export const extractJsxFromRender = (renderFn: Expression, sourceText: string): string | null => {
    if (!isArrowFunction(renderFn) && !isFunctionExpression(renderFn)) {
        return null;
    }

    const body = renderFn.body;

    // Expression body: (args) => (<JSX>) or (args) => <JSX>
    if (!isBlock(body)) {
        let expression: Expression = body;
        if (isParenthesizedExpression(expression)) {
            expression = expression.expression;
        }
        if (isJsxLike(expression)) {
            return sourceText.slice(expression.pos, expression.end).trim();
        }
        return null;
    }

    // Block body: find return statement
    for (const statement of body.statements) {
        if (!isReturnStatement(statement) || !statement.expression) {
            continue;
        }
        let expression: Expression = statement.expression;
        if (isParenthesizedExpression(expression)) {
            expression = expression.expression;
        }
        return sourceText.slice(expression.pos, expression.end).trim();
    }

    return null;
};

/** Serialise a merged args map to a JSX props string (excluding children/functions) */
export const serializeArgsAsProps = (args: Record<string, string>): string => {
    const props: string[] = [];
    for (const [key, value] of Object.entries(args)) {
        if (key === 'children') {
            continue;
        }
        if (value.startsWith('action(') || value.startsWith('() =>')) {
            continue;
        }
        if (value === 'true') {
            props.push(key);
        } else if (value === 'false' || value === 'null' || value === 'undefined') {
            // omit
        } else if (value.startsWith('"') || value.startsWith("'")) {
            props.push(`${key}=${value}`);
        } else {
            props.push(`${key}={${value}}`);
        }
    }
    return props.join(' ');
};

/** Replace `{...args}` spreads in JSX with inlined props from the merged args map */
export const resolveArgsSpread = (code: string, mergedArgs: Record<string, string>): string => {
    if (!code.includes('{...args}')) {
        return code;
    }
    const inlined = serializeArgsAsProps(mergedArgs);
    return code
        .replaceAll(/\{\.\.\.\s*args\s*\}/g, inlined)
        .replaceAll(/  +/g, ' ')
        .trim();
};

/** Clean up extracted code – replace action() stubs, normalise indent */
export const cleanCode = (code: string): string => {
    return code.replaceAll(/action\(['"][^'"]*['"]\)/g, '() => {}').trim();
};

/** Synthesise minimal JSX from merged args (for render-less stories) */
export const synthesizeJsx = (componentName: string, args: Record<string, string>): string => {
    const propsStr = serializeArgsAsProps(args);
    const formattedProps = propsStr.length > 0 ? ` ${propsStr}` : '';
    const children = args.children;

    if (children) {
        const cleanChildren = children.replaceAll(/^['"]|['"]$/g, '');
        return `<${componentName}${formattedProps}>\n  ${cleanChildren}\n</${componentName}>`;
    }
    return `<${componentName}${formattedProps} />`;
};
