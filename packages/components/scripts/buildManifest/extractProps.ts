/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as docgen from 'react-docgen-typescript';
import { globSync } from 'glob';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

import type { PropInfo, SubComponent } from './types';
import { resolveFromRoot, logWarn } from './utils';

let _parser: docgen.FileParser | null = null;
let _typeProgram: ts.Program | null = null;

function getParser(): docgen.FileParser {
    if (!_parser) {
        _parser = docgen.withCompilerOptions(
            {
                jsx: 4, // JsxEmit.ReactJSX
                skipLibCheck: true,
                noEmit: true,
                resolveJsonModule: true,
                strict: false,
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
                // Provide path aliases so #/* imports resolve correctly
                baseUrl: resolveFromRoot(),
                paths: {
                    '#/*': ['./src/*'],
                },
            },
            {
                savePropValueAsString: true,
                shouldExtractLiteralValuesFromEnum: true,
                shouldIncludePropTagMap: true,
                propFilter: (prop) => {
                    if (prop.name === 'className') return false;
                    if (prop.declarations && prop.declarations.length > 0) {
                        return prop.declarations.some((d) => !d.fileName.includes('node_modules'));
                    }
                    return true;
                },
            },
        );
    }
    return _parser;
}

/**
 * Scan a file for `X.displayName = 'Y'` assignments and return a variable→displayName map.
 * This handles forwardRef wrappers whose inner component has a dotted displayName set.
 */
function scanDisplayNames(filePath: string): Map<string, string> {
    const sourceText = readFileSync(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const map = new Map<string, string>();

    for (const stmt of sourceFile.statements) {
        if (!ts.isExpressionStatement(stmt)) continue;
        if (!ts.isBinaryExpression(stmt.expression)) continue;
        const expr = stmt.expression;
        if (expr.operatorToken.kind !== ts.SyntaxKind.EqualsToken) continue;
        if (!ts.isPropertyAccessExpression(expr.left)) continue;
        if (!ts.isIdentifier(expr.left.name) || expr.left.name.text !== 'displayName') continue;
        // Only simple: X.displayName = '...' (not X.Y.displayName)
        if (!ts.isIdentifier(expr.left.expression)) continue;
        if (!ts.isStringLiteral(expr.right)) continue;
        map.set(expr.left.expression.text, expr.right.text);
    }

    return map;
}

/**
 * For a forwardRef call like `forwardRef(InnerComponent)`, return the variable name
 * of the inner component so we can look up its displayName.
 */
function getForwardRefInnerName(filePath: string, forwardRefVarName: string): string | null {
    const sourceText = readFileSync(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

    for (const stmt of sourceFile.statements) {
        if (!ts.isVariableStatement(stmt)) continue;
        for (const decl of stmt.declarationList.declarations) {
            if (!ts.isIdentifier(decl.name) || decl.name.text !== forwardRefVarName) continue;
            if (!decl.initializer) continue;
            // Handle: forwardRef<T, P>(InnerComp)
            const init = decl.initializer;
            if (!ts.isCallExpression(init)) continue;
            const fnName = ts.isIdentifier(init.expression)
                ? init.expression.text
                : ts.isPropertyAccessExpression(init.expression) && ts.isIdentifier(init.expression.name)
                  ? init.expression.name.text
                  : null;
            if (fnName !== 'forwardRef') continue;
            // The argument to forwardRef is the inner component
            const arg = init.arguments[0];
            if (arg && ts.isIdentifier(arg)) return arg.text;
        }
    }
    return null;
}

function getTypeProgram(): ts.Program {
    if (!_typeProgram) {
        const srcFiles = globSync('src/**/*.{ts,tsx}', {
            cwd: resolveFromRoot(),
            absolute: true,
        }).filter(
            (f) =>
                !f.includes('.stories.') &&
                !f.includes('.spec.') &&
                !f.includes('.ct.') &&
                !f.includes('/__tests__/'),
        );
        _typeProgram = ts.createProgram(srcFiles, {
            jsx: ts.JsxEmit.ReactJSX,
            skipLibCheck: true,
            noEmit: true,
            strict: false,
            allowSyntheticDefaultImports: true,
            esModuleInterop: true,
            baseUrl: resolveFromRoot(),
            paths: { '#/*': ['./src/*'] },
        });
    }
    return _typeProgram;
}

function extractTypeNamesFromString(typeStr: string): string[] {
    // Match PascalCase identifiers — these are the candidates for custom type resolution
    const matches = typeStr.match(/\b[A-Z][a-zA-Z0-9]+\b/g) ?? [];
    return [...new Set(matches)];
}

function collectTypeDefinitions(allProps: PropInfo[]): Record<string, string> {
    const typeNames = new Set(allProps.flatMap((p) => extractTypeNamesFromString(p.type)));
    if (typeNames.size === 0) return {};

    const program = getTypeProgram();
    const srcRoot = resolveFromRoot('src');
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    const result: Record<string, string> = {};
    const secondPass = new Set<string>();

    function visitSourceFiles(targets: Set<string>): void {
        for (const sourceFile of program.getSourceFiles()) {
            // Only resolve types declared in our own src/ — skips builtins, React, node_modules
            if (!sourceFile.fileName.startsWith(srcRoot)) continue;
            ts.forEachChild(sourceFile, function visit(node: ts.Node) {
                if (
                    ts.isTypeAliasDeclaration(node) &&
                    targets.has(node.name.text) &&
                    !result[node.name.text]
                ) {
                    const text = printer.printNode(ts.EmitHint.Unspecified, node.type, sourceFile);
                    result[node.name.text] = text;
                    // Queue any new type names referenced in this definition
                    for (const name of extractTypeNamesFromString(text)) {
                        if (!typeNames.has(name) && !result[name]) {
                            secondPass.add(name);
                        }
                    }
                }
                ts.forEachChild(node, visit);
            });
        }
    }

    visitSourceFiles(typeNames);
    if (secondPass.size > 0) visitSourceFiles(secondPass);

    return result;
}

function getTypeString(type: docgen.PropItemType): string {
    if (type.name === 'enum' && Array.isArray(type.value)) {
        return (type.value as Array<{ value: string }>).map((v) => v.value).join(' | ');
    }
    return type.name;
}

function convertProps(propsRecord: docgen.Props): PropInfo[] {
    return Object.values(propsRecord).map((prop) => {
        const deprecatedTag = (prop.tags as Record<string, string> | undefined)?.deprecated;
        return {
            name: prop.name,
            type: getTypeString(prop.type),
            required: prop.required,
            defaultValue: prop.defaultValue?.value ?? null,
            description: prop.description,
            deprecated: deprecatedTag !== undefined,
            deprecationMessage: deprecatedTag ?? '',
        };
    });
}

export function extractProps(
    componentName: string,
    filePath: string,
    dirPath: string,
): { mainProps: PropInfo[]; subComponents: SubComponent[]; typeDefinitions: Record<string, string> } {
    const parser = getParser();
    const absoluteDir = resolveFromRoot(dirPath);

    // Collect all .tsx files in the component directory tree (not tests/stories)
    const tsxFiles = globSync('**/*.tsx', { cwd: absoluteDir, absolute: true }).filter(
        (f) =>
            !f.includes('.stories.') &&
            !f.includes('.ct.') &&
            !f.includes('.spec.') &&
            !f.includes('/__tests__/'),
    );

    if (tsxFiles.length === 0) {
        logWarn(`No .tsx files found in ${dirPath}`);
        return { mainProps: [], subComponents: [] };
    }

    // Build displayName maps for all tsx files (for forwardRef wrapper resolution)
    const fileDisplayNameMaps = new Map<string, Map<string, string>>();
    for (const file of tsxFiles) {
        fileDisplayNameMaps.set(file, scanDisplayNames(file));
    }

    const allDocs: docgen.ComponentDoc[] = [];
    for (const file of tsxFiles) {
        try {
            const docs = parser.parse(file);
            const displayNameMap = fileDisplayNameMaps.get(file)!;

            // Resolve actual displayNames for each doc
            for (const doc of docs) {
                let resolvedName = displayNameMap.get(doc.displayName);
                if (!resolvedName) {
                    // Try looking through the forwardRef inner component
                    const innerName = getForwardRefInnerName(file, doc.displayName);
                    if (innerName) resolvedName = displayNameMap.get(innerName);
                }
                if (resolvedName) doc.displayName = resolvedName;
            }

            allDocs.push(...docs);
        } catch (e) {
            logWarn(`Failed to parse ${path.relative(resolveFromRoot(), file)}: ${(e as Error).message}`);
        }
    }

    const mainProps: PropInfo[] = [];
    const subComponentMap = new Map<string, PropInfo[]>();

    for (const doc of allDocs) {
        const props = convertProps(doc.props);
        if (doc.displayName.includes('.')) {
            // Sub-component (e.g. 'Select.Item', 'Accordion.Root')
            subComponentMap.set(doc.displayName, props);
        } else if (doc.displayName === componentName) {
            mainProps.push(...props);
        }
    }

    // Fallback: if no exact match for main component, use the first non-sub-component
    if (mainProps.length === 0) {
        const firstMain = allDocs.find((d) => !d.displayName.includes('.'));
        if (firstMain) {
            mainProps.push(...convertProps(firstMain.props));
        }
    }

    const subComponents: SubComponent[] = Array.from(subComponentMap.entries()).map(([name, props]) => ({
        name,
        props,
    }));

    const allProps = [...mainProps, ...subComponents.flatMap((s) => s.props)];
    const typeDefinitions = collectTypeDefinitions(allProps);

    return { mainProps, subComponents, typeDefinitions };
}
