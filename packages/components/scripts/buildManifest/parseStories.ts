/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync } from 'node:fs';

import {
    createSourceFile,
    isAsExpression,
    isExportAssignment,
    isIdentifier,
    isObjectLiteralExpression,
    isPropertyAssignment,
    isSatisfiesExpression,
    isVariableStatement,
    ScriptKind,
    ScriptTarget,
    SyntaxKind,
    type Expression,
} from 'typescript';

import { type Example } from './types';
import { cleanCode, extractJsxFromRender, resolveArgsSpread, synthesizeJsx } from './utils/jsxHelpers';
import {
    extractArgsFromObject,
    extractDescription,
    extractIsCanonical,
    extractMetaArgsOnly,
    extractMetaStatus,
    getStringValue,
} from './utils/valueExtractors';

export type StoriesResult = {
    examples: Example[];
    status: string;
};

/** Strip `satisfies Meta<…>` / `as Meta<…>` wrappers so the object literal underneath is visible. */
const unwrapExpression = (expression: Expression): Expression => {
    let current = expression;
    while (isSatisfiesExpression(current) || isAsExpression(current)) {
        current = current.expression;
    }
    return current;
};

export const parseStories = (storyFilePaths: string[]): StoriesResult => {
    const examples: Example[] = [];
    let status = '';

    for (const filePath of storyFilePaths) {
        if (!existsSync(filePath)) {
            continue;
        }

        const sourceText = readFileSync(filePath, 'utf-8');
        const sourceFile = createSourceFile(filePath, sourceText, ScriptTarget.Latest, true, ScriptKind.TSX);

        let metaComponentName = '';
        let metaArgs: Record<string, string> = {};

        // First pass: find meta (const meta = { ... }; export default meta;)
        for (const statement of sourceFile.statements) {
            // Handle: const meta: Meta<...> = { ... } (also `= { ... } satisfies Meta<...>`)
            if (isVariableStatement(statement)) {
                for (const declaration of statement.declarationList.declarations) {
                    const initializer = declaration.initializer && unwrapExpression(declaration.initializer);
                    if (
                        isIdentifier(declaration.name) &&
                        declaration.name.text === 'meta' &&
                        initializer &&
                        isObjectLiteralExpression(initializer)
                    ) {
                        metaArgs = extractMetaArgsOnly(initializer, sourceText);
                        for (const property of initializer.properties) {
                            if (!isPropertyAssignment(property) || !isIdentifier(property.name)) {
                                continue;
                            }
                            if (property.name.text === 'component' && isIdentifier(property.initializer)) {
                                metaComponentName = property.initializer.text;
                            }
                            if (property.name.text === 'parameters' && !status) {
                                status = extractMetaStatus(property.initializer);
                            }
                        }
                    }
                }
            }

            // Handle: export default { ... } (also `export default { ... } satisfies Meta<...>`)
            const defaultExport = isExportAssignment(statement) ? unwrapExpression(statement.expression) : undefined;
            if (
                isExportAssignment(statement) &&
                !statement.isExportEquals &&
                defaultExport &&
                isObjectLiteralExpression(defaultExport)
            ) {
                metaArgs = extractMetaArgsOnly(defaultExport, sourceText);
                for (const property of defaultExport.properties) {
                    if (!isPropertyAssignment(property) || !isIdentifier(property.name)) {
                        continue;
                    }
                    if (property.name.text === 'component' && isIdentifier(property.initializer)) {
                        metaComponentName = property.initializer.text;
                    }
                    if (property.name.text === 'parameters' && !status) {
                        status = extractMetaStatus(property.initializer);
                    }
                }
            }
        }

        // Second pass: find named story exports
        for (const statement of sourceFile.statements) {
            if (!isVariableStatement(statement)) {
                continue;
            }
            const hasExport = statement.modifiers?.some((modifier) => modifier.kind === SyntaxKind.ExportKeyword);
            if (!hasExport) {
                continue;
            }

            for (const declaration of statement.declarationList.declarations) {
                if (!isIdentifier(declaration.name) || !declaration.initializer) {
                    continue;
                }
                // Skip re-exported meta
                if (declaration.name.text === 'meta') {
                    continue;
                }
                // Must be an object literal (story object) – skip simple type aliases
                const storyInitializer = unwrapExpression(declaration.initializer);
                if (!isObjectLiteralExpression(storyInitializer)) {
                    continue;
                }

                let exportName = declaration.name.text;
                const storyObj = storyInitializer;

                let description = '';
                let isCanonical = false;
                let renderCode: string | null = null;
                const storyArgs: Record<string, string> = {};

                for (const property of storyObj.properties) {
                    if (!isPropertyAssignment(property) || !isIdentifier(property.name)) {
                        continue;
                    }

                    switch (property.name.text) {
                        case 'name': {
                            const nameValue = getStringValue(property.initializer);
                            if (nameValue) {
                                exportName = nameValue;
                            }
                            break;
                        }
                        case 'render': {
                            renderCode = extractJsxFromRender(property.initializer, sourceText);
                            break;
                        }
                        case 'args': {
                            if (isObjectLiteralExpression(property.initializer)) {
                                Object.assign(storyArgs, extractArgsFromObject(property.initializer, sourceText));
                            }
                            break;
                        }
                        case 'parameters': {
                            description = extractDescription(property.initializer);
                            isCanonical = extractIsCanonical(property.initializer);
                            break;
                        }
                    }
                }

                const mergedArgs = { ...metaArgs, ...storyArgs };

                let code: string;
                if (renderCode) {
                    code = resolveArgsSpread(cleanCode(renderCode), mergedArgs);
                } else if (metaComponentName) {
                    code = synthesizeJsx(metaComponentName, mergedArgs);
                } else {
                    continue; // no code to emit
                }

                examples.push({
                    name: exportName,
                    description,
                    isCanonical,
                    code,
                });
            }
        }
    }

    return { examples, status };
};
