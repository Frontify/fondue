/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

import type { Example } from './types';
import { logWarn } from './utils';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getStringValue(node: ts.Expression): string | null {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    return null;
}

/** Extract all key/value pairs from an object literal as raw source text */
function extractArgsFromObject(
    obj: ts.ObjectLiteralExpression,
    sourceText: string,
): Record<string, string> {
    const args: Record<string, string> = {};
    for (const prop of obj.properties) {
        if (!ts.isPropertyAssignment(prop)) continue;
        const key = ts.isIdentifier(prop.name)
            ? prop.name.text
            : ts.isStringLiteral(prop.name)
              ? prop.name.text
              : null;
        if (!key) continue;
        args[key] = sourceText.slice(prop.initializer.pos, prop.initializer.end).trim();
    }
    return args;
}

/** Extract only the `args: { ... }` sub-object from a meta/story object literal */
function extractMetaArgsOnly(
    obj: ts.ObjectLiteralExpression,
    sourceText: string,
): Record<string, string> {
    for (const prop of obj.properties) {
        if (
            ts.isPropertyAssignment(prop) &&
            ts.isIdentifier(prop.name) &&
            prop.name.text === 'args' &&
            ts.isObjectLiteralExpression(prop.initializer)
        ) {
            return extractArgsFromObject(prop.initializer, sourceText);
        }
    }
    return {};
}

/** Walk `parameters.docs.description.story` to extract a string */
function extractDescription(parametersNode: ts.Expression, sourceText: string): string {
    if (!ts.isObjectLiteralExpression(parametersNode)) return '';

    function findProp(obj: ts.ObjectLiteralExpression, name: string): ts.Expression | null {
        for (const prop of obj.properties) {
            if (
                ts.isPropertyAssignment(prop) &&
                ts.isIdentifier(prop.name) &&
                prop.name.text === name
            ) {
                return prop.initializer;
            }
        }
        return null;
    }

    const docs = findProp(parametersNode, 'docs');
    if (!docs || !ts.isObjectLiteralExpression(docs)) return '';
    const desc = findProp(docs, 'description');
    if (!desc || !ts.isObjectLiteralExpression(desc)) return '';
    const story = findProp(desc, 'story');
    if (!story) return '';
    return getStringValue(story) ?? '';
}

/** Pull JSX out of an arrow / function expression body */
function extractJsxFromRender(renderFn: ts.Expression, sourceText: string): string | null {
    if (!ts.isArrowFunction(renderFn) && !ts.isFunctionExpression(renderFn)) return null;

    const body = renderFn.body;

    // Expression body: (args) => (<JSX>) or (args) => <JSX>
    if (!ts.isBlock(body)) {
        let expr: ts.Expression = body;
        if (ts.isParenthesizedExpression(expr)) expr = expr.expression;
        if (isJsxLike(expr)) {
            return sourceText.slice(expr.pos, expr.end).trim();
        }
        return null;
    }

    // Block body: find return statement
    for (const stmt of body.statements) {
        if (!ts.isReturnStatement(stmt) || !stmt.expression) continue;
        let expr: ts.Expression = stmt.expression;
        if (ts.isParenthesizedExpression(expr)) expr = expr.expression;
        return sourceText.slice(expr.pos, expr.end).trim();
    }

    return null;
}

function isJsxLike(node: ts.Node): boolean {
    return (
        ts.isJsxElement(node) ||
        ts.isJsxSelfClosingElement(node) ||
        ts.isJsxFragment(node)
    );
}

/** Clean up extracted code – replace action() stubs, normalise indent */
function cleanCode(code: string): string {
    return code
        .replace(/action\(['"][^'"]*['"]\)/g, '() => {}')
        .trim();
}

/** Synthesise minimal JSX from merged args (for render-less stories) */
function synthesizeJsx(componentName: string, args: Record<string, string>): string {
    const props: string[] = [];

    for (const [key, val] of Object.entries(args)) {
        if (key === 'children') continue;
        // Skip action() and function values
        if (val.startsWith('action(') || val.startsWith('() =>')) continue;
        if (val === 'true') {
            props.push(key);
        } else if (val === 'false' || val === 'null' || val === 'undefined') {
            // omit
        } else if (val.startsWith('"') || val.startsWith("'")) {
            props.push(`${key}=${val}`);
        } else {
            props.push(`${key}={${val}}`);
        }
    }

    const propsStr = props.length > 0 ? ' ' + props.join(' ') : '';
    const children = args['children'];

    if (children) {
        const cleanChildren = children.replace(/^['"]|['"]$/g, '');
        return `<${componentName}${propsStr}>\n  ${cleanChildren}\n</${componentName}>`;
    }
    return `<${componentName}${propsStr} />`;
}

// ---------------------------------------------------------------------------
// Main parser
// ---------------------------------------------------------------------------

export function parseStories(storyFilePaths: string[]): Example[] {
    const examples: Example[] = [];

    for (const filePath of storyFilePaths) {
        if (!existsSync(filePath)) continue;

        const sourceText = readFileSync(filePath, 'utf-8');
        const sourceFile = ts.createSourceFile(
            filePath,
            sourceText,
            ts.ScriptTarget.Latest,
            /* setParentNodes */ true,
            ts.ScriptKind.TSX,
        );

        const fileName = path.basename(filePath);
        let metaComponentName = '';
        let metaArgs: Record<string, string> = {};

        // ----------------------------------------------------------------
        // First pass: find meta (const meta = { ... }; export default meta;)
        // ----------------------------------------------------------------
        for (const stmt of sourceFile.statements) {
            // Handle: const meta: Meta<...> = { ... }
            if (ts.isVariableStatement(stmt)) {
                for (const decl of stmt.declarationList.declarations) {
                    if (
                        ts.isIdentifier(decl.name) &&
                        decl.name.text === 'meta' &&
                        decl.initializer &&
                        ts.isObjectLiteralExpression(decl.initializer)
                    ) {
                        metaArgs = extractMetaArgsOnly(decl.initializer, sourceText);
                        for (const prop of decl.initializer.properties) {
                            if (
                                ts.isPropertyAssignment(prop) &&
                                ts.isIdentifier(prop.name) &&
                                prop.name.text === 'component' &&
                                ts.isIdentifier(prop.initializer)
                            ) {
                                metaComponentName = prop.initializer.text;
                            }
                        }
                    }
                }
            }

            // Handle: export default { ... }
            if (ts.isExportAssignment(stmt) && !stmt.isExportEquals && ts.isObjectLiteralExpression(stmt.expression)) {
                metaArgs = extractMetaArgsOnly(stmt.expression, sourceText);
                for (const prop of stmt.expression.properties) {
                    if (
                        ts.isPropertyAssignment(prop) &&
                        ts.isIdentifier(prop.name) &&
                        prop.name.text === 'component' &&
                        ts.isIdentifier(prop.initializer)
                    ) {
                        metaComponentName = prop.initializer.text;
                    }
                }
            }
        }

        // ----------------------------------------------------------------
        // Second pass: find named story exports
        // ----------------------------------------------------------------
        for (const stmt of sourceFile.statements) {
            if (!ts.isVariableStatement(stmt)) continue;
            const hasExport = stmt.modifiers?.some(
                (m) => m.kind === ts.SyntaxKind.ExportKeyword,
            );
            if (!hasExport) continue;

            for (const decl of stmt.declarationList.declarations) {
                if (!ts.isIdentifier(decl.name) || !decl.initializer) continue;
                // Skip re-exported meta
                if (decl.name.text === 'meta') continue;
                // Must be an object literal (story object) – skip simple type aliases
                if (!ts.isObjectLiteralExpression(decl.initializer)) continue;

                const exportName = decl.name.text;
                const storyObj = decl.initializer;

                let storyName = exportName;
                let description = '';
                let renderCode: string | null = null;
                const storyArgs: Record<string, string> = {};

                for (const prop of storyObj.properties) {
                    if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue;

                    switch (prop.name.text) {
                        case 'name': {
                            const val = getStringValue(prop.initializer);
                            if (val) storyName = val;
                            break;
                        }
                        case 'render': {
                            renderCode = extractJsxFromRender(prop.initializer, sourceText);
                            break;
                        }
                        case 'args': {
                            if (ts.isObjectLiteralExpression(prop.initializer)) {
                                Object.assign(storyArgs, extractArgsFromObject(prop.initializer, sourceText));
                            }
                            break;
                        }
                        case 'parameters': {
                            description = extractDescription(prop.initializer, sourceText);
                            break;
                        }
                    }
                }

                let code: string;
                if (renderCode) {
                    code = cleanCode(renderCode);
                } else if (metaComponentName) {
                    const mergedArgs = { ...metaArgs, ...storyArgs };
                    code = synthesizeJsx(metaComponentName, mergedArgs);
                } else {
                    continue; // no code to emit
                }

                examples.push({
                    name: exportName,
                    storyName,
                    description,
                    code,
                    sourceFile: fileName,
                });
            }
        }
    }

    return examples;
}
