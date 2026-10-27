/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type JsonValue, type KeyBinding } from '#/model';
import { type RichTextProfile } from '#/react/types';

/** The areas the keyboard reference groups its shortcuts by, in the order it shows them. */
export const AREAS = ['History', 'Text formatting', 'Links', 'Blocks', 'Alignment', 'Lists', 'Code blocks'] as const;
/** One of the keyboard reference's areas. */
export type Area = (typeof AREAS)[number];

/**
 * A binding of a profile's compiled keymap, in keymap order, with its area, its action label and its text on Apple
 * platforms and on the others; empty where it does not apply.
 */
export type ShortcutRow = {
    area: Area;
    action: string;
    command: string;
    payload: JsonValue | null;
    key: KeyBinding;
    apple: string;
    other: string;
    profiles: readonly RichTextProfile[];
};

/** A key the surface handles itself, outside the compiled keymap, with its text on Apple platforms and on the others. */
export type SurfaceKeyRow = {
    action: string;
    key: KeyBinding;
    apple: string;
    other: string;
    profiles: readonly RichTextProfile[];
};

/** One input rule a profile installs: what the author types and what it turns into. */
export type InputRuleRow = {
    id: string;
    trigger: string;
    result: string;
    profiles: readonly RichTextProfile[];
};

const ALL: readonly RichTextProfile[] = ['inline', 'comment', 'document', 'brand-document'];
const MULTILINE: readonly RichTextProfile[] = ['comment', 'document', 'brand-document'];
const DOCUMENTS: readonly RichTextProfile[] = ['document', 'brand-document'];
const BRAND: readonly RichTextProfile[] = ['brand-document'];

/** One row of the keyboard reference; `apple` and `other` are the key's text, empty on the platform where it does not apply. */
const shortcut = (
    area: Area,
    action: string,
    command: string,
    key: KeyBinding,
    apple: string,
    other: string,
    profiles: readonly RichTextProfile[],
    payload: JsonValue | null = null,
): ShortcutRow => ({ area, action, command, payload, key, apple, other, profiles });

/** Every binding of the shipped profiles' compiled keymaps, which a test holds equal to the keymaps. */
export const SHORTCUT_ROWS: readonly ShortcutRow[] = [
    shortcut('Blocks', 'Normal text', 'paragraph.set', 'mac:Mod-Alt-0', '⌥⌘0', '', ALL),
    shortcut('Blocks', 'Normal text', 'paragraph.set', 'other:Ctrl-Shift-0', '', 'Ctrl+Shift+0', ALL),
    shortcut('History', 'Undo', 'history.undo', 'Mod-z', '⌘Z', 'Ctrl+Z', ALL),
    shortcut('History', 'Redo', 'history.redo', 'Mod-Shift-z', '⇧⌘Z', 'Ctrl+Shift+Z', ALL),
    shortcut('History', 'Redo', 'history.redo', 'other:Ctrl-y', '', 'Ctrl+Y', ALL),
    shortcut('Blocks', 'Line break', 'hard-break.insert', 'Shift-Enter', '⇧Enter', 'Shift+Enter', MULTILINE),
    shortcut('Blocks', 'Move the block up', 'block.move.up', 'Mod-Alt-ArrowUp', '⌥⌘↑', 'Ctrl+Alt+Up', MULTILINE),
    shortcut(
        'Blocks',
        'Move the block down',
        'block.move.down',
        'Mod-Alt-ArrowDown',
        '⌥⌘↓',
        'Ctrl+Alt+Down',
        MULTILINE,
    ),
    shortcut('Text formatting', 'Bold', 'mark.bold.toggle', 'Mod-b', '⌘B', 'Ctrl+B', ALL),
    shortcut('Text formatting', 'Italic', 'mark.italic.toggle', 'Mod-i', '⌘I', 'Ctrl+I', ALL),
    shortcut('Text formatting', 'Underline', 'mark.underline.toggle', 'Mod-u', '⌘U', 'Ctrl+U', ALL),
    shortcut('Links', 'Edit link', 'link.edit', 'Mod-k', '⌘K', 'Ctrl+K', ALL),
    shortcut(
        'Text formatting',
        'Set the last text colour again',
        'mark.color.reapply',
        'Mod-Shift-h',
        '⇧⌘H',
        'Ctrl+Shift+H',
        ALL,
    ),
    shortcut('Alignment', 'Align left', 'block.align.set', 'Mod-Shift-l', '⇧⌘L', 'Ctrl+Shift+L', ALL, {
        align: 'left',
    }),
    shortcut('Alignment', 'Align center', 'block.align.set', 'Mod-Shift-e', '⇧⌘E', 'Ctrl+Shift+E', ALL, {
        align: 'center',
    }),
    shortcut('Alignment', 'Align right', 'block.align.set', 'Mod-Shift-r', '⇧⌘R', 'Ctrl+Shift+R', ALL, {
        align: 'right',
    }),
    shortcut('Alignment', 'Justify', 'block.align.set', 'Mod-Shift-j', '⇧⌘J', 'Ctrl+Shift+J', ALL, {
        align: 'justify',
    }),
    shortcut('Text formatting', 'Strikethrough', 'mark.strike.toggle', 'Mod-Shift-x', '⇧⌘X', 'Ctrl+Shift+X', MULTILINE),
    shortcut('Text formatting', 'Code', 'mark.code.toggle', 'Mod-e', '⌘E', 'Ctrl+E', MULTILINE),
    shortcut(
        'Code blocks',
        'Indent the lines the selection touches',
        'code-block.indent',
        'Mod-]',
        '⌘]',
        'Ctrl+]',
        MULTILINE,
    ),
    shortcut(
        'Code blocks',
        'Outdent the lines the selection touches',
        'code-block.outdent',
        'Mod-[',
        '⌘[',
        'Ctrl+[',
        MULTILINE,
    ),
    shortcut('Lists', 'Indent a list item', 'list.indent', 'Mod-]', '⌘]', 'Ctrl+]', MULTILINE),
    shortcut('Lists', 'Indent a list item', 'list.indent', 'Tab', 'Tab', 'Tab', MULTILINE),
    shortcut('Lists', 'Outdent a list item', 'list.outdent', 'Mod-[', '⌘[', 'Ctrl+[', MULTILINE),
    shortcut('Lists', 'Outdent a list item', 'list.outdent', 'Shift-Tab', '⇧Tab', 'Shift+Tab', MULTILINE),
    shortcut('Lists', 'Bulleted list', 'list.bullet.toggle', 'Mod-Shift-8', '⇧⌘8', 'Ctrl+Shift+8', MULTILINE),
    shortcut('Lists', 'Numbered list', 'list.ordered.toggle', 'Mod-Shift-7', '⇧⌘7', 'Ctrl+Shift+7', MULTILINE, {
        start: 1,
    }),
    shortcut('Lists', 'Task list', 'list.task.toggle', 'Mod-Shift-9', '⇧⌘9', 'Ctrl+Shift+9', MULTILINE),
    shortcut('Lists', 'Check or uncheck a task', 'task.toggle', 'Mod-Enter', '⌘Enter', 'Ctrl+Enter', DOCUMENTS),
    shortcut('Lists', 'Indent a task', 'task.indent', 'Mod-]', '⌘]', 'Ctrl+]', MULTILINE),
    shortcut('Lists', 'Indent a task', 'task.indent', 'Tab', 'Tab', 'Tab', MULTILINE),
    shortcut('Lists', 'Outdent a task', 'task.outdent', 'Mod-[', '⌘[', 'Ctrl+[', MULTILINE),
    shortcut('Lists', 'Outdent a task', 'task.outdent', 'Shift-Tab', '⇧Tab', 'Shift+Tab', MULTILINE),
    shortcut('Text formatting', 'Subscript', 'mark.subscript.toggle', 'Mod-,', '⌘,', 'Ctrl+,', DOCUMENTS),
    shortcut('Text formatting', 'Superscript', 'mark.superscript.toggle', 'Mod-.', '⌘.', 'Ctrl+.', DOCUMENTS),
    shortcut('Blocks', 'Heading 1', 'heading.set', 'mac:Mod-Alt-1', '⌥⌘1', '', DOCUMENTS, { level: 1 }),
    shortcut('Blocks', 'Heading 1', 'heading.set', 'other:Ctrl-Shift-1', '', 'Ctrl+Shift+1', DOCUMENTS, { level: 1 }),
    shortcut('Blocks', 'Heading 2', 'heading.set', 'mac:Mod-Alt-2', '⌥⌘2', '', DOCUMENTS, { level: 2 }),
    shortcut('Blocks', 'Heading 2', 'heading.set', 'other:Ctrl-Shift-2', '', 'Ctrl+Shift+2', DOCUMENTS, { level: 2 }),
    shortcut('Blocks', 'Heading 3', 'heading.set', 'mac:Mod-Alt-3', '⌥⌘3', '', DOCUMENTS, { level: 3 }),
    shortcut('Blocks', 'Heading 3', 'heading.set', 'other:Ctrl-Shift-3', '', 'Ctrl+Shift+3', DOCUMENTS, { level: 3 }),
    shortcut('Blocks', 'Heading 4', 'heading.set', 'mac:Mod-Alt-4', '⌥⌘4', '', DOCUMENTS, { level: 4 }),
    shortcut('Blocks', 'Heading 4', 'heading.set', 'other:Ctrl-Shift-4', '', 'Ctrl+Shift+4', DOCUMENTS, { level: 4 }),
    shortcut('Blocks', 'Heading 5', 'heading.set', 'mac:Mod-Alt-5', '⌥⌘5', '', DOCUMENTS, { level: 5 }),
    shortcut('Blocks', 'Heading 5', 'heading.set', 'other:Ctrl-Shift-5', '', 'Ctrl+Shift+5', DOCUMENTS, { level: 5 }),
    shortcut('Blocks', 'Heading 6', 'heading.set', 'mac:Mod-Alt-6', '⌥⌘6', '', DOCUMENTS, { level: 6 }),
    shortcut('Blocks', 'Heading 6', 'heading.set', 'other:Ctrl-Shift-6', '', 'Ctrl+Shift+6', DOCUMENTS, { level: 6 }),
    shortcut(
        'Text formatting',
        'Clear inline formatting',
        'format.inline.clear',
        'Mod-\\',
        '⌘\\',
        'Ctrl+\\',
        DOCUMENTS,
    ),
    shortcut(
        'Blocks',
        'Column break, while the presentation has columns',
        'column.break.insert',
        'Mod-Shift-Enter',
        '⇧⌘Enter',
        'Ctrl+Shift+Enter',
        BRAND,
    ),
];

/** The keys the surface handles before or beside the compiled keymap. */
export const SURFACE_KEY_ROWS: readonly SurfaceKeyRow[] = [
    {
        action: "Move focus to the toolbar, the presentation's toolbarShortcut; Escape returns to the surface",
        key: 'Alt-F10',
        apple: '⌥F10',
        other: 'Alt+F10',
        profiles: ALL,
    },
    {
        action: 'Open the context menu at the selected image',
        key: 'Shift-F10',
        apple: '⇧F10',
        other: 'Shift+F10',
        profiles: DOCUMENTS,
    },
    {
        action: 'Open the context menu at the selected image',
        key: 'ContextMenu',
        apple: 'ContextMenu',
        other: 'ContextMenu',
        profiles: DOCUMENTS,
    },
    {
        action: 'Move focus out of the editor, outside a list or task item that can move',
        key: 'Tab',
        apple: 'Tab',
        other: 'Tab',
        profiles: ALL,
    },
    {
        action: 'Move focus before the editor, outside a list or task item',
        key: 'Shift-Tab',
        apple: '⇧Tab',
        other: 'Shift+Tab',
        profiles: ALL,
    },
    {
        action: 'Close the bubble toolbar or the link bubble',
        key: 'Escape',
        apple: 'Escape',
        other: 'Escape',
        profiles: ALL,
    },
    {
        action: 'Submit, when the host sets onSubmit',
        key: 'Enter',
        apple: 'Enter',
        other: 'Enter',
        profiles: ['inline'],
    },
    {
        action: 'Submit, as Enter does',
        key: 'Shift-Enter',
        apple: '⇧Enter',
        other: 'Shift+Enter',
        profiles: ['inline'],
    },
    { action: 'Submit, as Enter does', key: 'Mod-Enter', apple: '⌘Enter', other: 'Ctrl+Enter', profiles: ['inline'] },
    {
        action: 'Submit, when the host sets onSubmit',
        key: 'Mod-Enter',
        apple: '⌘Enter',
        other: 'Ctrl+Enter',
        profiles: ['comment'],
    },
    {
        action: 'Leave a code block for a new paragraph after it',
        key: 'Mod-Enter',
        apple: '⌘Enter',
        other: 'Ctrl+Enter',
        profiles: DOCUMENTS,
    },
    {
        action: 'New paragraph after a code block, at its end when nothing follows it',
        key: 'ArrowDown',
        apple: '↓',
        other: 'Down',
        profiles: MULTILINE,
    },
];

/** The input rules the shipped profiles install; the typography rules stay off in every profile. */
export const INPUT_RULE_ROWS: readonly InputRuleRow[] = [
    { id: 'bold.stars', trigger: '**text**', result: 'Bold', profiles: ALL },
    { id: 'bold.underscores', trigger: '__text__', result: 'Bold', profiles: ALL },
    { id: 'italic.star', trigger: '*text*', result: 'Italic', profiles: ALL },
    { id: 'italic.underscore', trigger: '_text_', result: 'Italic', profiles: ALL },
    { id: 'link.autolink', trigger: 'A URL, then a space or Enter', result: 'A link to the URL', profiles: ALL },
    { id: 'strike.tildes', trigger: '~~text~~', result: 'Strikethrough', profiles: MULTILINE },
    { id: 'code.backtick', trigger: '`text`', result: 'Inline code', profiles: MULTILINE },
    { id: 'quote.angle', trigger: '> then a space', result: 'Quote', profiles: MULTILINE },
    {
        id: 'code.fence',
        trigger: 'Three backticks, an optional language ID, then a space',
        result: 'Code block in that language',
        profiles: MULTILINE,
    },
    { id: 'list.bullet.marker', trigger: '-, * or +, then a space', result: 'Bulleted list', profiles: MULTILINE },
    {
        id: 'list.ordered.number',
        trigger: 'A number, then . or ), then a space',
        result: 'Numbered list starting at the number',
        profiles: MULTILINE,
    },
    {
        id: 'list.task.brackets',
        trigger: '[], [ ] or [x], then a space',
        result: 'Task, checked for [x]',
        profiles: MULTILINE,
    },
    {
        id: 'heading.hashes',
        trigger: '# to ######, then a space',
        result: 'Heading of that level',
        profiles: DOCUMENTS,
    },
    {
        id: 'rule.dashes',
        trigger: '---, *** or ___, then a space',
        result: 'Divider',
        profiles: DOCUMENTS,
    },
];
