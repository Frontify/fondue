/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { join } from 'node:path';

import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import { packageRoot, srcRoot } from './fixtures/sourceFiles';

const ENTRIES = [
    'src/index.ts',
    'src/model/index.ts',
    'src/plugins/index.ts',
    'src/entries/reader.ts',
    'src/entries/authoring.ts',
    'src/codecs/index.ts',
    'src/runtime/import/fromHtml.ts',
    'src/testing/index.ts',
];
const MEMBER_DOCUMENTED_NAME = /(Props|Options|Service|Services)$/;

const buildProgram = () => {
    const configPath = join(packageRoot, 'tsconfig.json');
    const config = ts.readConfigFile(configPath, ts.sys.readFile);
    const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, packageRoot);

    return ts.createProgram({
        rootNames: ENTRIES.map((entry) => join(packageRoot, entry)),
        options: parsed.options,
    });
};

const hasJsDoc = (declaration: ts.Node) => {
    let node = declaration;
    if (ts.isVariableDeclaration(declaration) && ts.isVariableDeclarationList(declaration.parent)) {
        node = declaration.parent.parent;
    }

    return ts.getJSDocCommentsAndTags(node).some((entry) => ts.isJSDoc(entry));
};

const isInSrc = (declaration: ts.Node) => {
    const file = declaration.getSourceFile();

    return file.fileName.startsWith(srcRoot) && !file.fileName.includes('/node_modules/');
};

const flatten = (type: ts.Type): ts.Type[] => (type.isIntersection() ? type.types.flatMap(flatten) : [type]);

const needsMemberDocs = (name: string, declaration: ts.Declaration) =>
    (ts.isTypeAliasDeclaration(declaration) || ts.isInterfaceDeclaration(declaration)) &&
    (MEMBER_DOCUMENTED_NAME.test(name) || name === 'EditorHandle');

const findGaps = () => {
    const program = buildProgram();
    const checker = program.getTypeChecker();
    const gaps: string[] = [];

    for (const entry of ENTRIES) {
        const file = program.getSourceFile(join(packageRoot, entry));
        const moduleSymbol = file && checker.getSymbolAtLocation(file);
        if (moduleSymbol === undefined) {
            gaps.push(`${entry}: (module not found)`);
            continue;
        }

        for (const exported of checker.getExportsOfModule(moduleSymbol)) {
            let symbol = exported;
            if (symbol.flags & ts.SymbolFlags.Alias) {
                symbol = checker.getAliasedSymbol(symbol);
            }

            const name = exported.getName();
            for (const declaration of symbol.declarations ?? []) {
                // `X.displayName = ...` adds an expando declaration (an identifier) to the component's symbol, which is no declaration of its own.
                if (!isInSrc(declaration) || ts.isSourceFile(declaration) || ts.isIdentifier(declaration)) {
                    continue;
                }

                if (!hasJsDoc(declaration)) {
                    gaps.push(`${entry}: ${name}`);
                }

                if (!needsMemberDocs(name, declaration)) {
                    continue;
                }

                const members = flatten(checker.getDeclaredTypeOfSymbol(symbol)).flatMap((type) =>
                    type.getProperties(),
                );
                for (const member of members) {
                    for (const memberDeclaration of member.declarations ?? []) {
                        const documentable =
                            ts.isPropertySignature(memberDeclaration) || ts.isMethodSignature(memberDeclaration);
                        if (documentable && isInSrc(memberDeclaration) && !hasJsDoc(memberDeclaration)) {
                            gaps.push(`${entry}: ${name}.${member.getName()}`);
                        }
                    }
                }
            }
        }
    }

    return [...new Set(gaps)];
};

describe('public documentation', () => {
    it('documents every export of a package entry and every member of its props, options and service types', () => {
        expect(findGaps()).toEqual([]);
    }, 120_000);
});
