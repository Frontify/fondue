/* (c) Copyright Frontify Ltd., all rights reserved. */

import { globSync } from 'glob';
import {
    createPrinter,
    createProgram,
    EmitHint,
    forEachChild,
    isInterfaceDeclaration,
    isMappedTypeNode,
    isTypeAliasDeclaration,
    isTypeQueryNode,
    type InterfaceDeclaration,
    JsxEmit,
    NewLineKind,
    type Node,
    type Program,
    type SourceFile,
    type TypeAliasDeclaration,
    TypeFormatFlags,
} from 'typescript';

import { type PropInfo } from '../types';
import { resolveFromRoot } from '../utils';

let _typeProgram: Program | null = null;

const getTypeProgram = (): Program => {
    if (!_typeProgram) {
        const srcFiles = globSync('src/**/*.{ts,tsx}', {
            cwd: resolveFromRoot(),
            absolute: true,
        }).filter(
            (fileName) =>
                !fileName.includes('.stories.') &&
                !fileName.includes('.spec.') &&
                !fileName.includes('.ct.') &&
                !fileName.includes('/__tests__/'),
        );
        _typeProgram = createProgram(srcFiles, {
            jsx: JsxEmit.ReactJSX,
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
};

const extractTypeNamesFromString = (typeStr: string): string[] => {
    // Match PascalCase identifiers — these are the candidates for custom type resolution
    const matches = typeStr.match(/\b[A-Z][a-zA-Z0-9]+\b/g) ?? [];
    return [...new Set(matches)];
};

// The printer emits a type node verbatim, so some constructs stay unresolved:
//   - `typeof`/`keyof typeof` value queries → e.g. `keyof typeof screens` instead of the keys
//   - mapped types → e.g. `[key in Breakpoint]?: TValue` instead of the expanded members
// Detect them so we can fall back to the type checker, which resolves them to concrete types.
const needsCheckerResolution = (node: Node): boolean => {
    if (isTypeQueryNode(node) || isMappedTypeNode(node)) {
        return true;
    }
    // forEachChild short-circuits on the first truthy callback result, so this stops descending as
    // soon as a match is found and returns `true`; otherwise it returns `undefined`.
    return forEachChild(node, needsCheckerResolution) ?? false;
};

export const collectTypeDefinitions = (allProps: PropInfo[]): Record<string, string> => {
    const typeNames = new Set(allProps.flatMap((prop) => extractTypeNamesFromString(prop.type)));
    if (typeNames.size === 0) {
        return {};
    }

    const program = getTypeProgram();
    const checker = program.getTypeChecker();
    const srcRoot = resolveFromRoot('src');
    const printer = createPrinter({ newLine: NewLineKind.LineFeed });
    const result: Record<string, string> = {};
    const resolved = new Set<string>();
    // Track which type names have been written, keyed by their bare name. `result` is keyed by the
    // display name (which includes generic parameters, e.g. `Responsive<TValue>`), so it can't
    // double as the "already handled" guard.
    const written = new Set<string>();
    let pending = new Set(typeNames);

    const visitSourceFiles = (targets: Set<string>): Set<string> => {
        const newlyFound = new Set<string>();

        // A generic type's body references its own type parameters (e.g. `TValue`). Those are
        // placeholders, not resolvable types, so register them as resolved and surface them in the
        // display name so the definition is self-documenting rather than referencing an unknown type.
        const registerDeclaration = (
            node: TypeAliasDeclaration | InterfaceDeclaration,
            sourceFile: SourceFile,
        ): string => {
            const params = node.typeParameters;
            if (!params || params.length === 0) {
                return node.name.text;
            }
            for (const param of params) {
                resolved.add(param.name.text);
            }
            const printed = params.map((param) => printer.printNode(EmitHint.Unspecified, param, sourceFile));
            return `${node.name.text}<${printed.join(', ')}>`;
        };

        const record = (node: TypeAliasDeclaration | InterfaceDeclaration, text: string, sourceFile: SourceFile): void => {
            const displayName = registerDeclaration(node, sourceFile);
            written.add(node.name.text);
            result[displayName] = text;
            for (const name of extractTypeNamesFromString(text)) {
                if (!resolved.has(name) && !written.has(name)) {
                    newlyFound.add(name);
                }
            }
        };

        for (const sourceFile of program.getSourceFiles()) {
            // Only resolve types declared in our own src/ — skips builtins, React, node_modules
            if (!sourceFile.fileName.startsWith(srcRoot)) {
                continue;
            }
            const visit = (node: Node): void => {
                if (isTypeAliasDeclaration(node) && targets.has(node.name.text) && !written.has(node.name.text)) {
                    const text = needsCheckerResolution(node.type)
                        ? checker.typeToString(
                              checker.getTypeFromTypeNode(node.type),
                              node,
                              TypeFormatFlags.NoTruncation | TypeFormatFlags.InTypeAlias,
                          )
                        : printer.printNode(EmitHint.Unspecified, node.type, sourceFile);
                    record(node, text, sourceFile);
                } else if (
                    isInterfaceDeclaration(node) &&
                    targets.has(node.name.text) &&
                    !written.has(node.name.text)
                ) {
                    record(node, printer.printNode(EmitHint.Unspecified, node, sourceFile), sourceFile);
                }
                forEachChild(node, visit);
            };
            forEachChild(sourceFile, visit);
        }
        return newlyFound;
    };

    const MAX_DEPTH = 10;
    for (let depth = 0; depth < MAX_DEPTH && pending.size > 0; depth++) {
        for (const name of pending) {
            resolved.add(name);
        }
        const newlyFound = visitSourceFiles(pending);
        pending = newlyFound;
    }

    return result;
};
