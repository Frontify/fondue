/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolve } from 'node:path';

import ts from 'typescript';
import { describe, expect, it } from 'vitest';

const PACKAGE_ROOT = resolve(__dirname, '../..');
const ROOT_ENTRY = resolve(PACKAGE_ROOT, 'src/index.ts');
const PLUGINS_ENTRY = resolve(PACKAGE_ROOT, 'src/plugins/index.ts');
const MARKDOWN_ENTRY = resolve(PACKAGE_ROOT, 'src/markdown/index.ts');

const readCompilerOptions = (): ts.CompilerOptions => {
    const parsed = ts.getParsedCommandLineOfConfigFile(
        resolve(PACKAGE_ROOT, 'tsconfig.json'),
        {},
        {
            ...ts.sys,
            onUnRecoverableConfigFileDiagnostic: (diagnostic) => {
                throw new Error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
            },
        },
    );
    if (parsed === undefined) {
        throw new Error('tsconfig.json could not be read.');
    }
    return parsed.options;
};

// Types count too, so the names come from the type checker rather than the runtime module.
const exportNames = (program: ts.Program, entry: string): string[] => {
    const checker = program.getTypeChecker();
    const sourceFile = program.getSourceFile(entry);
    if (sourceFile === undefined) {
        throw new Error(`${entry} is not in the program.`);
    }
    const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
    if (moduleSymbol === undefined) {
        throw new Error(`${entry} is not a module.`);
    }
    return checker.getExportsOfModule(moduleSymbol).map((symbol) => symbol.getName());
};

describe('package entries', () => {
    it('export each name from exactly one entry', () => {
        const program = ts.createProgram([ROOT_ENTRY, PLUGINS_ENTRY, MARKDOWN_ENTRY], readCompilerOptions());
        const rootNames = exportNames(program, ROOT_ENTRY);
        const pluginNames = exportNames(program, PLUGINS_ENTRY);
        const markdownNames = exportNames(program, MARKDOWN_ENTRY);

        expect(rootNames).not.toHaveLength(0);
        expect(pluginNames).not.toHaveLength(0);
        expect(markdownNames).not.toHaveLength(0);

        const exportCounts = new Map<string, number>();
        for (const name of [...rootNames, ...pluginNames, ...markdownNames]) {
            exportCounts.set(name, (exportCounts.get(name) ?? 0) + 1);
        }
        const sharedNames = [...exportCounts].filter(([, count]) => count > 1).map(([name]) => name);

        expect(sharedNames).toEqual([]);
    });
});
