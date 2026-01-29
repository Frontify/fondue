/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import jscodeshift from 'jscodeshift';

const EXCLUDED_DIRECTORIES = ['/src/components/RichTextEditor/'];

// Configure parser for JSX/TSX support
const j = jscodeshift.withParser('tsx');

const buildPublicExportMap = (indexPath: string): Set<string> => {
    const publicExports: Set<string> = new Set();

    // Helper function to resolve relative imports to absolute paths
    const resolveImportPath = (currentFile: string, importPath: string): string => {
        if (importPath.startsWith('.')) {
            const currentDir = path.dirname(currentFile);
            const resolved = path.resolve(currentDir, importPath);

            // Try common extensions in order
            const extensions = ['.ts', '.tsx', '.js', '.jsx'];
            const indexFiles = ['/index.ts', '/index.tsx', '/index.js', '/index.jsx'];

            // First try direct file with extensions
            for (const ext of extensions) {
                const fullPath = resolved + ext;
                if (existsSync(fullPath)) {
                    return fullPath;
                }
            }

            // Then try index files
            for (const indexFile of indexFiles) {
                const fullPath = resolved + indexFile;
                if (existsSync(fullPath)) {
                    return fullPath;
                }
            }

            // Fallback - assume .ts
            return `${resolved}.ts`;
        }

        // External module - return as-is
        return importPath;
    };

    // Helper to extract name from declaration nodes
    const getDeclarationName = (declaration: any): string | undefined => {
        // Handle function, class, type alias, interface declarations
        if (
            j.FunctionDeclaration.check(declaration) ||
            j.ClassDeclaration.check(declaration) ||
            j.TSTypeAliasDeclaration.check(declaration) ||
            j.TSInterfaceDeclaration.check(declaration) ||
            j.TSEnumDeclaration.check(declaration)
        ) {
            return declaration.id && j.Identifier.check(declaration.id) ? declaration.id.name : undefined;
        }

        // Handle variable declarations (const, let, var)
        if (j.VariableDeclaration.check(declaration)) {
            for (const declarator of declaration.declarations) {
                if (j.VariableDeclarator.check(declarator) && j.Identifier.check(declarator.id)) {
                    return declarator.id.name;
                }
            }
        }

        return undefined;
    };

    // Helper to add export to map
    const addExportToMap = (exportName: string) => {
        if (!publicExports.has(exportName)) {
            publicExports.add(exportName);
        }
    };

    // Main recursive function to process exports
    const processReExports = (currentPath: string, visited = new Set<string>()): void => {
        if (EXCLUDED_DIRECTORIES.some((excluded) => currentPath.includes(excluded))) {
            return;
        }

        if (!currentPath.startsWith('/') && !currentPath.startsWith('.')) {
            return;
        }

        // Prevent infinite recursion (circular dependencies)
        if (visited.has(currentPath)) {
            console.warn(`Circular dependency detected: ${currentPath}`);
            return;
        }

        // Check if file exists
        if (!existsSync(currentPath)) {
            console.warn(`File not found: ${currentPath}`);
            return;
        }

        visited.add(currentPath);

        try {
            // Read and parse the file
            const source = readFileSync(currentPath, 'utf8');
            const root = j(source);

            // Process named export declarations
            for (const exportPath of root.find(j.ExportNamedDeclaration).paths()) {
                const node = exportPath.node;

                // Case 1: export { name1, name2 } from './module'
                if (node.source && node.specifiers) {
                    for (const specifier of node.specifiers) {
                        if (j.ExportSpecifier.check(specifier) && j.Identifier.check(specifier.exported)) {
                            const exportedName = specifier.exported.name;

                            // Add to map - this export comes from the source file
                            addExportToMap(exportedName);
                        }
                    }
                }

                // Case 2: export { name1, name2 } (local exports)
                else if (node.specifiers && node.specifiers.length > 0 && !node.source) {
                    for (const specifier of node.specifiers) {
                        if (j.ExportSpecifier.check(specifier) && j.Identifier.check(specifier.exported)) {
                            const exportedName = specifier.exported.name;

                            // This export comes from the current file
                            addExportToMap(exportedName);
                        }
                    }
                }

                // Case 3: export const/function/class/type/interface
                else if (node.declaration) {
                    const exportedName = getDeclarationName(node.declaration);
                    if (exportedName) {
                        addExportToMap(exportedName);
                    }
                }
            }

            // Process export all declarations: export * from './module'
            for (const exportPath of root.find(j.ExportAllDeclaration).paths()) {
                const node = exportPath.node;

                if (node.source) {
                    const sourcePath = resolveImportPath(currentPath, node.source.value as string);

                    // For wildcard exports, we need to process the source file
                    // and add all its exports to our map
                    processReExports(sourcePath, new Set(visited));
                }
            }
        } catch (error) {
            console.error(`Error processing file ${currentPath}:`, error);
        }
    };

    processReExports(indexPath);

    return publicExports;
};

export { buildPublicExportMap };
