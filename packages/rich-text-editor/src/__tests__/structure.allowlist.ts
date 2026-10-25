/* (c) Copyright Frontify Ltd., all rights reserved. */

// Ratchet tables for structure.spec.ts. Entries record today's value and only shrink.

export const FILES_OVER_600_LINES: Record<string, number> = {
    'src/runtime/runtime.ts': 908,
};

// Data tables exempt from the 600 line limit (T-01); each must still exist.
export const DATA_TABLES: Record<string, string> = {
    'src/features/blocks-code/languages.ts': 'Flat list of code language ids and labels, no logic.',
};

export const FILES_OVER_400_LINES: Record<string, number> = {
    'src/runtime/runtime.ts': 908,
};

export const FUNCTIONS_OVER_150_LINES: Record<string, number> = {
    'src/runtime/runtime.ts#createEditorRuntime': 411,
};

export const FUNCTIONS_OVER_6_LETS: Record<string, number> = {};

export const SPECS_OVER_1000_LINES: Record<string, number> = {};

export const KNOWN_CYCLES: string[] = ['(root) | react'];

export const PROSEMIRROR_NODES: string[] = ['clipboard/import', 'definition', 'testing', 'html', 'runtime'];

export const SPEC_REFERENCES: Record<string, number> = {
    'CONTRIBUTING.md': 6,
    'oxlint.config.ts': 2,
    'src/runtime/clipboard/paste.ts': 1,
    'src/features/stages.ts': 1,
    'src/react/profiles/document.ts': 1,
    'src/reader/render.tsx': 1,
    'src/runtime/keys.ts': 4,
    'src/ui/context-menu/context-menu.tsx': 1,
    'src/ui/toolbar/item.tsx': 2,
};

export const AS_UNKNOWN_AS_MAX = 29;
