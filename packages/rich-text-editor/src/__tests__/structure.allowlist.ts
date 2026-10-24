/* (c) Copyright Frontify Ltd., all rights reserved. */

// Ratchet tables for structure.spec.ts. Entries record today's value and only shrink.

export const FILES_OVER_600_LINES: Record<string, number> = {
    'src/codecs/to-markdown.ts': 702,
    'src/model/checks.ts': 679,
    'src/model/compile.ts': 659,
    'src/react/rich-text-editor.tsx': 1492,
    'src/runtime/runtime.ts': 2247,
    'src/runtime/suggestions/plugin.ts': 616,
    'src/runtime/uploads.ts': 777,
};

// Data tables exempt from the 600 line limit (T-01); each must still exist.
export const DATA_TABLES: Record<string, string> = {
    'src/features/blocks-code/languages.ts': 'Flat list of code language ids and labels, no logic.',
};

export const FILES_OVER_400_LINES: Record<string, number> = {
    'src/clipboard/import/html.ts': 434,
    'src/clipboard/plugin.ts': 491,
    'src/codecs/from-markdown.ts': 523,
    'src/codecs/to-html.ts': 438,
    'src/codecs/to-markdown.ts': 702,
    'src/definition/index.ts': 560,
    'src/features/conformance/contract.ts': 408,
    'src/features/links/link-popover.tsx': 590,
    'src/features/media-image/view.tsx': 517,
    'src/model/checks.ts': 679,
    'src/model/compile.ts': 659,
    'src/model/content.ts': 539,
    'src/model/declarations.ts': 483,
    'src/model/output.ts': 548,
    'src/model/read.ts': 422,
    'src/model/styles.ts': 421,
    'src/react/compile-editor.ts': 427,
    'src/react/rich-text-editor.tsx': 1492,
    'src/runtime/input-rules.ts': 515,
    'src/runtime/runtime.ts': 2247,
    'src/runtime/suggestions/plugin.ts': 616,
    'src/runtime/uploads.ts': 777,
};

export const FUNCTIONS_OVER_150_LINES: Record<string, number> = {
    'src/bridge/node-views.ts#build': 174,
    'src/bridge/node-views.ts#createNodeViews': 227,
    'src/codecs/from-markdown.ts#readMarkdown': 161,
    'src/definition/index.ts#compileDefinition': 253,
    'src/features/conformance/contract.ts#runFeatureContract': 214,
    'src/features/emoji/emoji-picker.tsx#Picker': 155,
    'src/features/links/link-bubble.tsx#LinkBubble': 183,
    'src/features/links/link-popover.tsx#LinkPopover': 402,
    'src/features/marks-language/language-dialog.tsx#LanguageDialog': 199,
    'src/features/media-image/alt-text-dialog.tsx#AltTextDialog': 166,
    'src/features/media-image/view.tsx#ImageChrome': 276,
    'src/features/mentions/mention-dialog.tsx#SearchDialog': 284,
    'src/model/compile.ts#compileContentModel': 210,
    'src/react/rich-text-editor.tsx#anonymous#11': 184,
    'src/react/rich-text-editor.tsx#SessionComponent': 669,
    'src/runtime/async.ts#createAsyncCoordinator': 217,
    'src/runtime/runtime.ts#createEditorRuntime': 1797,
    'src/runtime/uploads.ts#createUploads': 565,
    'src/testing/uploads.ts#runUploadConformance': 158,
};

export const FUNCTIONS_OVER_6_LETS: Record<string, number> = {
    'src/bridge/chrome-view.ts#createChromeView': 8,
    'src/bridge/node-views.ts#build': 8,
    'src/features/links/link-popover.tsx#LinkPopover': 7,
    'src/features/marks-language/language-dialog.tsx#LanguageDialog': 8,
    'src/runtime/runtime.ts#createEditorRuntime': 31,
};

export const SPECS_OVER_1000_LINES: Record<string, number> = {
    'src/clipboard/__tests__/clipboard.spec.tsx': 1918,
    'src/codecs/__tests__/codecs.spec.ts': 1150,
    'src/features/__tests__/editor-api.spec.tsx': 1755,
    'src/features/media-upload/__tests__/uploads.spec.tsx': 1251,
    'src/model/__tests__/compile.spec.ts': 1017,
    'src/persistence/__tests__/persistence.spec.tsx': 3277,
    'src/react/__tests__/overlays.ct.tsx': 1644,
    'src/react/__tests__/rich-text-editor.spec.tsx': 1051,
    'src/react/__tests__/toolbar.ct.tsx': 1507,
    'src/runtime/__tests__/runtime.spec.ts': 4501,
};

export const KNOWN_CYCLES: string[] = ['(root) | features | react | reader', 'clipboard | runtime'];

export const PROSEMIRROR_NODES: string[] = [
    'bridge',
    'clipboard',
    'clipboard/import',
    'definition',
    'features/conformance',
    'html',
    'runtime',
];

export const SPEC_REFERENCES: Record<string, number> = {
    'CONTRIBUTING.md': 6,
    'oxlint.config.ts': 2,
    'src/clipboard/paste.ts': 1,
    'src/features/stages.ts': 1,
    'src/react/profiles/comment.ts': 2,
    'src/react/profiles/document.ts': 1,
    'src/react/profiles/inline.ts': 2,
    'src/reader/render.tsx': 1,
    'src/runtime/keys.ts': 4,
    'src/ui/context-menu/context-menu.tsx': 1,
    'src/ui/toolbar/item.tsx': 2,
};

export const AS_UNKNOWN_AS_MAX = 29;

export const FEATURE_FOLDERS: string[] = [
    'a11y-content-checks',
    'blocks-align',
    'blocks-code',
    'blocks-heading',
    'blocks-quote',
    'blocks-rule',
    'core',
    'emoji',
    'format-clear',
    'input-rules',
    'layout-columns',
    'links',
    'lists-bullet',
    'lists-item',
    'lists-ordered',
    'lists-task',
    'marks-bold',
    'marks-code',
    'marks-font-color',
    'marks-italic',
    'marks-language',
    'marks-strike',
    'marks-subscript',
    'marks-superscript',
    'marks-underline',
    'media-image',
    'media-upload',
    'mentions',
    'nav-outline',
    'styles-brand',
];
