/* (c) Copyright Frontify Ltd., all rights reserved. */

import { globSync } from 'glob';
import {
    createPrinter,
    createProgram,
    EmitHint,
    forEachChild,
    isTypeAliasDeclaration,
    JsxEmit,
    NewLineKind,
    type Node,
    type Program,
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

export const collectTypeDefinitions = (allProps: PropInfo[]): Record<string, string> => {
    const typeNames = new Set(allProps.flatMap((prop) => extractTypeNamesFromString(prop.type)));
    if (typeNames.size === 0) {
        return {};
    }

    const program = getTypeProgram();
    const srcRoot = resolveFromRoot('src');
    const printer = createPrinter({ newLine: NewLineKind.LineFeed });
    const result: Record<string, string> = {};
    const secondPass = new Set<string>();

    const visitSourceFiles = (targets: Set<string>): void => {
        for (const sourceFile of program.getSourceFiles()) {
            // Only resolve types declared in our own src/ — skips builtins, React, node_modules
            if (!sourceFile.fileName.startsWith(srcRoot)) {
                continue;
            }
            const visit = (node: Node): void => {
                if (isTypeAliasDeclaration(node) && targets.has(node.name.text) && !result[node.name.text]) {
                    const text = printer.printNode(EmitHint.Unspecified, node.type, sourceFile);
                    result[node.name.text] = text;
                    // Queue any new type names referenced in this definition
                    for (const name of extractTypeNamesFromString(text)) {
                        if (!typeNames.has(name) && !result[name]) {
                            secondPass.add(name);
                        }
                    }
                }
                forEachChild(node, visit);
            };
            forEachChild(sourceFile, visit);
        }
    };

    visitSourceFiles(typeNames);
    if (secondPass.size > 0) {
        visitSourceFiles(secondPass);
    }

    return result;
};
