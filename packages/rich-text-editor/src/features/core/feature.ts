/* (c) Copyright Frontify Ltd., all rights reserved. */

import { block, defineFeature, history, insertNode, insertText, setBlock } from '#/model';

const lang = { type: 'language', nullable: true, default: null } as const;

/** The document, paragraphs, text, hard breaks, undo history and block moves that every model installs. */
export const core = defineFeature({
    id: 'core',
    version: 1,
    nodes: {
        doc: {
            content: 'section+',
            attrs: { lang, dir: { type: 'enum', values: ['ltr', 'rtl', 'auto'], default: 'auto' } },
            html: ['div', { lang: { attr: 'lang' }, dir: { attr: 'dir' } }, 0],
            parse: [],
        },
        paragraph: {
            group: 'block',
            content: 'inline*',
            attrs: { lang },
            html: ['p', { lang: { attr: 'lang' } }, 0],
            parse: [{ tag: 'p', attrs: { lang: { from: 'lang' } } }],
        },
        text: { group: 'inline', attrs: {}, html: ['span', 0], parse: [] },
        hard_break: { group: 'inline', attrs: {}, html: ['br'], parse: [{ tag: 'br' }] },
    },
    formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
    commands: {
        'paragraph.set': setBlock('paragraph'),
        'text.insert': insertText(),
        'hard-break.insert': insertNode('hard_break', { newlineInCode: true }),
        'history.undo': history('undo'),
        'history.redo': history('redo'),
        'block.move.up': block('move-up'),
        'block.move.down': block('move-down'),
    },
    keys: {
        'mac:Mod-Alt-0': 'paragraph.set',
        'other:Ctrl-Shift-0': 'paragraph.set',
        'Mod-z': 'history.undo',
        'Mod-Shift-z': 'history.redo',
        'other:Ctrl-y': 'history.redo',
        'Shift-Enter': 'hard-break.insert',
        // Not Mod-Shift-ArrowUp, which extends the selection natively on macOS (SPEC-rich-text-editing, Shortcuts).
        'Mod-Alt-ArrowUp': { command: 'block.move.up', labelKey: 'RichTextEditor_moveUp' },
        'Mod-Alt-ArrowDown': { command: 'block.move.down', labelKey: 'RichTextEditor_moveDown' },
    },
    toolbar: [
        { kind: 'toggle', command: 'paragraph.set', labelKey: 'RichTextEditor_normalText', icon: 'IconTextBoxStack' },
        {
            kind: 'button',
            command: 'history.undo',
            labelKey: 'RichTextEditor_undo',
            icon: 'IconArrowRoundAntiClockwise',
        },
        { kind: 'button', command: 'history.redo', labelKey: 'RichTextEditor_redo', icon: 'IconArrowRoundClockwise' },
    ],
});
