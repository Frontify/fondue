/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';
import { vi } from 'vitest';

import {
    buildPluginRegistry,
    defineContent,
    defineMark,
    definePlugin,
    type PasteHandler,
    type RteBlockNode,
    type RteDocumentOf,
    type RteMarkPatternTrim,
    type RtePlugin,
} from '#/core';
import { type MountedDocument, type MountOptions } from '#/editor/port';
import { defaultPlugins } from '#/plugins';

import { mountEditorForTests } from './editing';

/**
 * Test-only: the editor as `mountDocument` mounts it, with the view handed out
 * so a spec can place the selection and type as the engine's input handling
 * does. Portals go to a shell that renders none of them; node views have specs
 * of their own.
 */

const mounted: MountedDocument[] = [];

/** Destroy every editor `editorWith` mounted. Call it from `afterEach`. */
export const destroyEditors = (): void => {
    for (const editor of mounted.splice(0)) {
        editor.destroy();
    }
    window.document.body.replaceChildren();
};

/** Where a stretch of text sits in the engine's document. Inline atoms count as one character. */
const findText = (doc: PmNode, needle: string): { from: number; to: number } => {
    let found: { from: number; to: number } | null = null;
    doc.descendants((node, pos) => {
        if (found !== null) {
            return false;
        }
        if (!node.isTextblock) {
            return true;
        }
        const positions: number[] = [];
        let text = '';
        let start = pos + 1;
        for (let childIndex = 0; childIndex < node.childCount; childIndex++) {
            const child = node.child(childIndex);
            const content = child.isText ? (child.text ?? '') : '￼';
            for (let index = 0; index < content.length; index++) {
                text += content.charAt(index);
                positions.push(start + index);
            }
            start += child.nodeSize;
        }
        const index = text.indexOf(needle);
        const first = positions[index];
        const last = positions[index + needle.length - 1];
        if (index >= 0 && first !== undefined && last !== undefined) {
            found = { from: first, to: last + 1 };
        }
        return false;
    });
    if (found === null) {
        throw new Error(`"${needle}" is not in the document`);
    }
    return found;
};

/**
 * A block as a spec writes it: the plugin's own attributes sit flat on it, which
 * the open `RteBlockNode` cannot name.
 */
type BlockInput = RteBlockNode | (Record<string, unknown> & { type: string });

/** Shipped plugins by id, taken from `defaultPlugins` — the one plugin import this folder may make. */
export const shipped = (...ids: string[]): RtePlugin[] => defaultPlugins.filter((plugin) => ids.includes(plugin.id));

export const editorWith = (
    plugins: readonly RtePlugin[],
    blocks: BlockInput[],
    options: Partial<Pick<MountOptions, 'placeholder' | 'attributes'>> = {},
) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const onDocChange = vi.fn<(doc: RteDocumentOf) => void>();

    const { mounted: editor, view } = mountEditorForTests({
        container,
        initialDoc: { version: 1, blocks: blocks as RteBlockNode[] },
        registry: buildPluginRegistry(plugins),
        placeholder: options.placeholder ?? '',
        attributes: options.attributes ?? {},
        placeholderClassName: 'placeholder',
        onDocChange,
        onDocApplied: () => {},
        onStateChange: () => {},
        viewPortals: { set: () => {}, delete: () => {} },
    });
    mounted.push(editor);
    const { api } = editor.handle;

    const setSelection = (from: number, to = from): void => {
        view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, from, to)));
    };

    return {
        api,
        view,
        editor,
        onDocChange,
        /** The blocks of the document last reported to the host, or null when nothing was. */
        stored: (): RteBlockNode[] | null => onDocChange.mock.lastCall?.[0].blocks ?? null,
        /** Select the first occurrence of `text`. */
        select: (text: string): void => {
            const { from, to } = findText(view.state.doc, text);
            setSelection(from, to);
        },
        /** Select from the start of `first` to the end of `last`, across blocks. */
        selectBetween: (first: string, last: string): void => {
            setSelection(findText(view.state.doc, first).from, findText(view.state.doc, last).to);
        },
        caretBefore: (text: string): void => setSelection(findText(view.state.doc, text).from),
        caretAfter: (text: string): void => setSelection(findText(view.state.doc, text).to),
        /** Type character by character, through the engine's text-input handling as a keypress would. */
        type: (text: string): void => {
            for (const character of text) {
                const { from, to } = view.state.selection;
                const insert = () => view.state.tr.insertText(character, from, to);
                const handled = view.someProp('handleTextInput', (handle) => handle(view, from, to, character, insert));
                if (handled !== true) {
                    view.dispatch(insert());
                }
            }
        },
        /** Paste HTML, as the engine reads a paste from the clipboard. */
        pasteHTML: (html: string): boolean => view.pasteHTML(html),
        /** Paste text (and HTML, when given) with a clipboard that holds them, as a paste event carries it. */
        paste: (plain: string, html: string | null = null): boolean => {
            const data: Record<string, string> = { 'text/plain': plain, 'text/html': html ?? '' };
            const event = {
                clipboardData: { getData: (type: string) => data[type] ?? '' },
                preventDefault: () => {},
            } as unknown as ClipboardEvent;
            return html === null ? view.pasteText(plain, event) : view.pasteHTML(html, event);
        },
    };
};

export const paragraph = (...children: Record<string, unknown>[]): RteBlockNode =>
    ({ type: 'paragraph', children }) as RteBlockNode;

export const text = (value: string, marks: Record<string, unknown> = {}): Record<string, unknown> => ({
    text: value,
    ...marks,
});

/** The tokens the generic `token` plugin marks while typing: `tok:` and everything up to the next space. */
const TOKEN_PATTERN = /tok:[^\s]+/;

/** A trim in the shape any plugin can declare: sentence punctuation and quotes, and closing brackets with no opening one. */
export const TOKEN_TRIM: RteMarkPatternTrim = {
    punctuation: /[.,;:!?"'”’]+/,
    pairs: { ')': '(', ']': '[', '}': '{', '>': '<' },
};

/** What the `token` mark carries. */
export type TokenValue = { id: string };

/** The `token` mark as a stored text node carries it. */
export const token = (value: string, id = value): Record<string, unknown> => text(value, { token: { id } });

/** What a spec decides about the generic `token` plugin. */
export type TokenPluginOptions = {
    /** The trim the typing rule declares. Leave out for a rule that trims nothing. */
    trim?: RteMarkPatternTrim;
    /** The typing rule's pattern. */
    pattern?: RegExp;
    /** Tokens the rule refuses, which stay as typed. */
    refuses?: (value: string) => boolean;
    /** The paste handler the plugin brings. */
    onPaste?: PasteHandler;
};

/**
 * A plugin of the engine's own specs: a mark that carries a value, a typing rule that marks a token, and
 * optionally a paste handler. It stands in for a shipped feature, so the engine is tested through its contract alone.
 */
export const tokenPlugin = ({
    trim,
    pattern = TOKEN_PATTERN,
    refuses = () => false,
    onPaste,
}: TokenPluginOptions = {}): RtePlugin =>
    definePlugin({
        id: 'token',
        content: defineContent({
            marks: {
                token: defineMark<TokenValue>({
                    inclusive: false,
                    toHtml: ({ id }) => ({ tag: 'a', attrs: { 'data-token': id }, children: true }),
                    parse: [
                        {
                            tag: 'a[data-token]',
                            value: (element) => ({ id: element.getAttribute('data-token') ?? '' }),
                        },
                    ],
                }),
            },
        }),
        inputRules: [
            {
                kind: 'markPattern',
                pattern,
                mark: 'token',
                trim,
                value: (value) => {
                    if (refuses(value)) {
                        return null;
                    }
                    return { id: value };
                },
            },
        ],
        onPaste,
    });
