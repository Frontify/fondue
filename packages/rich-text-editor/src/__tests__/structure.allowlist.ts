/* (c) Copyright Frontify Ltd., all rights reserved. */

// Ratchet tables for structure.spec.ts. Entries record today's value and only shrink.

export const FILES_OVER_600_LINES: Record<string, number> = {
    'src/react/rich-text-editor.tsx': 1492,
    'src/runtime/runtime.ts': 908,
};

// Data tables exempt from the 600 line limit (T-01); each must still exist.
export const DATA_TABLES: Record<string, string> = {
    'src/features/blocks-code/languages.ts': 'Flat list of code language ids and labels, no logic.',
};

export const FILES_OVER_400_LINES: Record<string, number> = {
    'src/react/rich-text-editor.tsx': 1492,
    'src/runtime/runtime.ts': 908,
};

export const FUNCTIONS_OVER_150_LINES: Record<string, number> = {
    'src/react/rich-text-editor.tsx#anonymous#11': 184,
    'src/react/rich-text-editor.tsx#SessionComponent': 669,
    'src/runtime/runtime.ts#createEditorRuntime': 411,
};

export const FUNCTIONS_OVER_6_LETS: Record<string, number> = {};

export const SPECS_OVER_1000_LINES: Record<string, number> = {
    'src/clipboard/__tests__/clipboard.spec.tsx': 1918,
    'src/codecs/__tests__/codecs.spec.ts': 1150,
    'src/features/__tests__/editor-api.spec.tsx': 1756,
    'src/features/media-upload/__tests__/uploads.spec.tsx': 1251,
    'src/model/__tests__/compile.spec.ts': 1017,
    'src/persistence/__tests__/persistence.spec.tsx': 3277,
    'src/react/__tests__/overlays.ct.tsx': 1644,
    'src/react/__tests__/rich-text-editor.spec.tsx': 1051,
    'src/react/__tests__/toolbar.ct.tsx': 1507,
    'src/runtime/__tests__/runtime.spec.ts': 4501,
};

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
