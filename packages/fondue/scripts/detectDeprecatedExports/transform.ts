/* (c) Copyright Frontify Ltd., all rights reserved. */

import { appendFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { type API, type ASTPath, type FileInfo, type Node } from 'jscodeshift';

type Export = {
    name: string;
    path: string;
};

const appendToFile = (filePath: string, content: Set<Export>) => {
    if (!existsSync(filePath)) {
        mkdirSync(filePath.split('/').slice(0, -1).join('/'), { recursive: true });
        writeFileSync(filePath, '');
    }
    for (const entry of content) {
        appendFileSync(filePath, `${JSON.stringify(entry)}\n`);
    }
};

let publicExports: null | Set<string> = null;

export default function transformer(file: FileInfo, api: API, options: { basePath: string; publicExports: string }) {
    if (!publicExports) {
        publicExports = new Set(options.publicExports.split(','));
    }
    const j = api.jscodeshift;
    const root = j(file.source);

    const deprecatedExports = new Set<Export>();
    const activeExports = new Set<Export>();

    /**
     * Checks if a given AST node has a JSDoc comment containing "@deprecated".
     */
    const isDeprecated = (node: ASTPath<Node>) => {
        // The comment is often attached to the parent declaration
        const parentNode = (node.parentPath as ASTPath<Node> | undefined)?.node;
        const nodesToCheck = [node.node, parentNode];

        for (const n of nodesToCheck) {
            if (n?.comments) {
                for (const comment of n.comments) {
                    if (comment.value.includes('@deprecated')) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    /**
     * Finds the declaration for a given export name and checks its status.
     * This is for exports like `export { Button, type ButtonProps }`.
     */
    const checkDeclaration = (name: string) => {
        const processPath = (path: ASTPath<Node>) => {
            if (isDeprecated(path)) {
                deprecatedExports.add({ name, path: file.path });
            } else {
                activeExports.add({ name, path: file.path });
            }
        };

        // Find declarations by name - try each type until we find one
        const searchFunctions = [
            () => root.find(j.VariableDeclarator, { id: { name } }).at(0).paths(),
            () => root.find(j.FunctionDeclaration, { id: { name } }).at(0).paths(),
            () => root.find(j.ClassDeclaration, { id: { name } }).at(0).paths(),
            () => root.find(j.TSTypeAliasDeclaration, { id: { name } }).at(0).paths(),
            () => root.find(j.TSInterfaceDeclaration, { id: { name } }).at(0).paths(),
        ];

        if (!publicExports?.has(name)) {
            return;
        }

        for (const searchFn of searchFunctions) {
            const paths = searchFn();
            if (paths.length > 0) {
                for (const path of paths) {
                    processPath(path);
                }
                return;
            }
        }
    };

    // Find all named exports: `export { Button }` or `export const Button = ...`
    for (const path of root.find(j.ExportNamedDeclaration).paths()) {
        // Case 1: `export const/function/class/type/interface ...`
        if (path.node.declaration) {
            const decl = path.node.declaration;
            // Handle `export function`, `class`, `type`, `interface`
            if (
                j.FunctionDeclaration.check(decl) ||
                j.ClassDeclaration.check(decl) ||
                j.TSTypeAliasDeclaration.check(decl) ||
                j.TSInterfaceDeclaration.check(decl) ||
                j.TSEnumDeclaration.check(decl)
            ) {
                const name = decl.id && j.Identifier.check(decl.id) ? decl.id.name : undefined;

                if (name && publicExports?.has(name)) {
                    if (isDeprecated(path)) {
                        deprecatedExports.add({ name, path: file.path });
                    } else {
                        activeExports.add({ name, path: file.path });
                    }
                }
            }
            // Handle `export const Button = ...`
            else if (j.VariableDeclaration.check(decl)) {
                for (const declarator of decl.declarations) {
                    if (j.VariableDeclarator.check(declarator)) {
                        const name = j.Identifier.check(declarator.id) ? declarator.id.name : undefined;
                        if (name && publicExports?.has(name)) {
                            if (isDeprecated(path)) {
                                deprecatedExports.add({ name, path: file.path });
                            } else {
                                activeExports.add({ name, path: file.path });
                            }
                        }
                    }
                }
            }
        }

        // Case 2: `export { Button, Input, type ButtonProps }`
        if (path.node.specifiers && path.node.specifiers.length > 0 && !path.node.source) {
            for (const specifier of path.node.specifiers) {
                const exportedName = specifier.exported.name;
                if (typeof exportedName === 'string') {
                    checkDeclaration(exportedName);
                }
            }
        }

        // Case 3: `default re-exports with deprecation comment`
        if (path.node.specifiers && path.node.specifiers.length > 0 && path.node.source) {
            for (const specifier of path.node.specifiers) {
                if (specifier.local?.name === 'default') {
                    const exportedName = specifier.exported.name;
                    if (
                        typeof exportedName === 'string' &&
                        !['IconSize', 'IconSizeMap', 'IconEnum'].includes(exportedName) &&
                        !exportedName.includes('Icon')
                    ) {
                        if (isDeprecated(path)) {
                            deprecatedExports.add({ name: exportedName, path: file.path });
                        } else {
                            activeExports.add({ name: exportedName, path: file.path });
                        }
                    }
                }
            }
        }
    }

    // --- REPORT GENERATION ---

    appendToFile(path.join(options.basePath, 'temp/deprecated-exports.txt'), deprecatedExports);
    appendToFile(path.join(options.basePath, 'temp/active-exports.txt'), activeExports);

    return file.source;
}
