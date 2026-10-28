/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import typescript from 'typescript';

export const packageRoot = fileURLToPath(new URL('../../..', import.meta.url)).replace(/\/$/, '');
export const srcRoot = join(packageRoot, 'src');

export const CODE_FILE = /\.tsx?$/;

export const walk = (directory: string): string[] => {
    const files: string[] = [];
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) {
            files.push(...walk(path));
        } else if (CODE_FILE.test(entry.name)) {
            files.push(path);
        }
    }

    return files.sort();
};

export const toKey = (path: string) => relative(packageRoot, path).split('\\').join('/');

export const isSpecPath = (key: string) => key.split('/').includes('__tests__');

export const isProductPath = (key: string) => {
    const segments = key.split('/');
    if (segments.includes('__tests__') || segments.includes('fixtures')) {
        return false;
    }

    if (key.endsWith('.stories.tsx') || key.startsWith('src/locales/')) {
        return false;
    }

    return true;
};

export const allFiles = walk(srcRoot);
export const productFiles = allFiles.filter((path) => isProductPath(toKey(path)));
export const specFiles = allFiles.filter((path) => isSpecPath(toKey(path)));

export const sources = new Map<string, string>();
export const sourceOf = (path: string) => {
    let source = sources.get(path);
    if (source === undefined) {
        source = readFileSync(path, 'utf8');
        sources.set(path, source);
    }

    return source;
};

export const parsed = new Map<string, typescript.SourceFile>();
export const parse = (path: string) => {
    let file = parsed.get(path);
    if (file === undefined) {
        const kind = path.endsWith('.tsx') ? typescript.ScriptKind.TSX : typescript.ScriptKind.TS;
        file = typescript.createSourceFile(path, sourceOf(path), typescript.ScriptTarget.Latest, true, kind);
        parsed.set(path, file);
    }

    return file;
};

// Blank lines separate a function's steps for the reader, so the size limits count only lines that hold code or comments.
export const nonBlankLines = (text: string) => text.split('\n').filter((line) => line.trim() !== '').length;

export const folderExists = (path: string) => existsSync(path) && statSync(path).isDirectory();

export const isExported = (statement: typescript.VariableStatement | typescript.FunctionDeclaration) =>
    statement.modifiers?.some((modifier) => modifier.kind === typescript.SyntaxKind.ExportKeyword) === true;

// Resolves '#/x' aliases (tsconfig paths) and relative paths; returns undefined for packages.
export const resolveInternal = (from: string, specifier: string) => {
    let target: string;
    if (specifier.startsWith('#/')) {
        target = join(srcRoot, specifier.slice(2));
    } else if (specifier.startsWith('.')) {
        target = resolve(dirname(from), specifier);
    } else {
        return undefined;
    }

    const inside = relative(srcRoot, target);
    if (inside.startsWith('..')) {
        return undefined;
    }

    const normalized = inside.split('\\').join('/');

    return normalized.split('/');
};
