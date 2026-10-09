/* (c) Copyright Frontify Ltd., all rights reserved. */

import MarkdownIt, { type MarkdownIt as Parser, type Token as MarkdownToken } from 'markdown-it';

import {
    type AttributeDeclaration,
    checkHref,
    type ContentModel,
    type DecodeOptions,
    type DecodeResult,
    decodeDocument,
    type Diagnostic,
    type IdSource,
} from '#/model';
import { attributesOf } from '#/model/compile';
import { type TreeMark, type TreeNode, type Vocabulary, vocabularyOf } from '#/model/content';
import { encodeTree } from '#/model/encode';
import { pointer } from '#/model/errors';
import { isValidValue, ownValue } from '#/model/values';

/** The shipped feature that holds each Markdown structure, named when the model lacks it (SPEC-rich-text-output/AC-035). */
const FEATURE_OF: Readonly<Record<string, string>> = {
    heading: 'blocks.heading',
    blockquote: 'blocks.quote',
    bullet_list: 'lists.bullet',
    ordered_list: 'lists.ordered',
    code_block: 'blocks.code',
    horizontal_rule: 'blocks.rule',
    table: 'tables',
    image: 'media.image',
    link: 'links',
    bold: 'marks.bold',
    italic: 'marks.italic',
    strike: 'marks.strike',
    code: 'marks.code',
};
const MARKS_OF: Readonly<Record<string, string>> = { em: 'italic', strong: 'bold', s: 'strike' };
const TASK = /^\[([ xX])\](?:[ \t]|$)/;

/** What an inline token holds as both Markdown readers take it, or `undefined` for one each treats on its own. */
type InlineToken =
    | { readonly kind: 'text' | 'code'; readonly text: string }
    | { readonly kind: 'break' | 'close' }
    | { readonly kind: 'open'; readonly mark: string; readonly href: string };

export const inlineToken = (token: MarkdownToken): InlineToken | undefined => {
    if (token.type === 'text' || token.type === 'text_special') {
        return { kind: 'text', text: token.content };
    }
    if (token.type === 'softbreak') {
        return { kind: 'text', text: ' ' };
    }
    if (token.type === 'code_inline') {
        return { kind: 'code', text: token.content };
    }
    if (token.type === 'hardbreak') {
        return { kind: 'break' };
    }
    if (token.type === 'link_open') {
        return { kind: 'open', mark: 'link', href: String(token.attrGet('href') ?? '') };
    }
    const mark = MARKS_OF[token.tag];
    if (mark !== undefined && token.nesting === 1) {
        return { kind: 'open', mark, href: '' };
    }
    if (token.type === 'link_close' || (mark !== undefined && token.nesting === -1)) {
        return { kind: 'close' };
    }
    return undefined;
};

/** One dialect: CommonMark with GFM tables and strikethrough, raw HTML off, `http`, `https` and email literals linked. */
export const createParser = (): Parser => {
    const parser = new MarkdownIt('default', { html: false, linkify: true });
    parser.linkify.set({ fuzzyLink: false });
    return parser;
};

interface Frame {
    readonly node: { type: string; attrs: Record<string, unknown>; content: TreeNode[] } | undefined;
    readonly path: string;
    /** List frames: whether its items become task items. */
    readonly task: boolean;
}

class Builder {
    readonly diagnostics: Diagnostic[] = [];
    readonly vocabulary: Vocabulary;
    private readonly stack: Frame[];
    readonly root: { type: string; attrs: Record<string, unknown>; content: TreeNode[] };

    constructor(
        model: ContentModel,
        private readonly ids: IdSource,
    ) {
        this.vocabulary = vocabularyOf(model);
        this.root = { type: 'doc', attrs: this.attrsFor('doc', {}), content: [] };
        this.stack = [{ node: this.root, path: '/content', task: false }];
    }

    has(name: string): boolean {
        return this.vocabulary.nodes.has(name);
    }

    hasMark(name: string): boolean {
        return this.vocabulary.marks.has(name);
    }

    /** Every declared attribute at its given value, its default, a new `nodeId`, or null. */
    attrsFor(name: string, given: Readonly<Record<string, unknown>>): Record<string, unknown> {
        const node = this.vocabulary.nodes.get(name);
        const attrs: Record<string, unknown> = {};
        if (node === undefined) {
            return attrs;
        }
        for (const [attribute, declaration] of Object.entries(attributesOf(node))) {
            const value = ownValue(given, attribute);
            if (value !== undefined && isValidValue(declaration, value)) {
                attrs[attribute] = value;
            } else if ('default' in declaration && declaration.default !== undefined) {
                attrs[attribute] = declaration.default;
            } else if (attribute === 'nodeId') {
                attrs[attribute] = this.ids.next('node');
            } else {
                attrs[attribute] = null;
            }
        }
        attrs.unknownAttributes = null;
        return attrs;
    }

    markOf(name: string, given: Readonly<Record<string, unknown>> = {}): TreeMark {
        const attrs: Record<string, unknown> = { unknownAttributes: null };
        const declared = this.vocabulary.marks.get(name)?.declaration.attrs;
        for (const [attribute, declaration] of Object.entries(declared ?? {})) {
            const value = ownValue(given, attribute);
            if (value !== undefined) {
                attrs[attribute] = value;
            } else if ('default' in declaration && declaration.default !== undefined) {
                attrs[attribute] = declaration.default;
            } else {
                attrs[attribute] = null;
            }
        }
        return { type: name, attrs };
    }

    /** The innermost frame that holds nodes; an unwrapped structure's frame holds none. */
    private target(): Frame {
        for (let index = this.stack.length - 1; index >= 0; index -= 1) {
            const frame = this.stack[index];
            if (frame?.node !== undefined) {
                return frame;
            }
        }
        return this.stack[0] as Frame;
    }

    /** Where the next node of the current parent goes. */
    nextPath(): string {
        const { node, path } = this.target();
        let index = 0;
        if (node !== undefined) {
            index = node.content.length;
        }
        return `${path}${pointer('content', index)}`;
    }

    current(): Frame {
        return this.stack.at(-1) as Frame;
    }

    unsupported(structure: string, path = this.nextPath()): void {
        this.diagnostics.push({
            code: 'codecs.markdown-unsupported',
            severity: 'warning',
            messageKey: 'codecs.markdown-unsupported',
            path,
            featureId: FEATURE_OF[structure] ?? structure,
            details: { structure },
        });
    }

    open(type: string, given: Readonly<Record<string, unknown>> = {}, task = false): void {
        const node = { type, attrs: this.attrsFor(type, given), content: [] as TreeNode[] };
        const path = this.nextPath();
        this.append(node);
        this.stack.push({ node, path, task });
    }

    /** A structure the model cannot hold: its children go to the parent. */
    unwrap(task = false): void {
        this.stack.push({ node: undefined, path: this.nextPath(), task });
    }

    close(): void {
        const frame = this.stack.pop();
        const node = frame?.node;
        if (node === undefined) {
            return;
        }
        const first = node.content[0];
        // Containers whose content starts with or requires a paragraph get an empty one, as the editor makes them.
        if (['list_item', 'task_item'].includes(node.type) && first?.type !== 'paragraph') {
            node.content.unshift({ type: 'paragraph', attrs: this.attrsFor('paragraph', {}) });
        } else if (node.content.length === 0 && ['blockquote', 'table_cell', 'table_header'].includes(node.type)) {
            node.content.push({ type: 'paragraph', attrs: this.attrsFor('paragraph', {}) });
        }
    }

    append(node: TreeNode): void {
        this.target().node?.content.push(node);
    }
}

const inlineNodes = (builder: Builder, token: MarkdownToken, path: string, stripTask: boolean): TreeNode[] => {
    const nodes: TreeNode[] = [];
    const active: TreeMark[] = [];
    const order = builder.vocabulary.markOrder;
    const marksNow = (extra: readonly TreeMark[] = []) =>
        [...active, ...extra].sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
    const pushText = (text: string, extra: readonly TreeMark[] = []) => {
        if (text === '') {
            return;
        }
        const marks = marksNow(extra);
        if (marks.length === 0) {
            nodes.push({ type: 'text', text });
        } else {
            nodes.push({ type: 'text', text, marks });
        }
    };
    let first = stripTask;
    // Closing tokens close the mark their opening pushed, which may be none when the model lacks it.
    const pushed: (TreeMark | undefined)[] = [];
    for (const child of token.children ?? []) {
        const read = inlineToken(child);
        if (read?.kind === 'text') {
            let text = read.text;
            if (first) {
                text = text.replace(TASK, '');
            }
            first = false;
            pushText(text);
            continue;
        }
        first = false;
        if (read === undefined) {
            if (child.type === 'image') {
                builder.unsupported('image', path);
                pushText(child.content);
            }
        } else if (read.kind === 'open') {
            let mark: TreeMark | undefined;
            if (read.mark === 'link') {
                const href = checkHref(read.href);
                if (href.ok && builder.hasMark('link')) {
                    mark = builder.markOf('link', { href: href.href });
                } else if (href.ok) {
                    builder.unsupported('link', path);
                }
            } else if (builder.hasMark(read.mark)) {
                mark = builder.markOf(read.mark);
            } else {
                builder.unsupported(read.mark, path);
            }
            pushed.push(mark);
            if (mark !== undefined) {
                active.push(mark);
            }
        } else if (read.kind === 'close') {
            const mark = pushed.pop();
            if (mark !== undefined) {
                active.splice(active.lastIndexOf(mark), 1);
            }
        } else if (read.kind === 'code' && builder.hasMark('code')) {
            pushText(read.text, [builder.markOf('code')]);
        } else if (read.kind === 'code') {
            builder.unsupported('code', path);
            pushText(read.text);
        } else {
            const marks = marksNow();
            if (marks.length === 0) {
                nodes.push({ type: 'hard_break' });
            } else {
                nodes.push({ type: 'hard_break', marks });
            }
        }
    }
    return nodes.map((node) => {
        if (node.type === 'hard_break') {
            return { ...node, attrs: builder.attrsFor('hard_break', {}) };
        }
        return node;
    });
};

/** Whether every item of the list at `index` starts with a task marker, as a GFM task list does. */
const isTaskList = (tokens: readonly MarkdownToken[], index: number): boolean => {
    const level = tokens[index]?.level;
    let items = 0;
    for (let at = index + 1; at < tokens.length; at += 1) {
        const token = tokens[at];
        if (token === undefined || (token.type === 'bullet_list_close' && token.level === level)) {
            break;
        }
        if (token.type === 'list_item_open' && level !== undefined && token.level === level + 1) {
            items += 1;
            const paragraph = tokens[at + 1];
            const inline = tokens[at + 2];
            const startsParagraph = paragraph?.type === 'paragraph_open';
            if (!startsParagraph || inline?.type !== 'inline' || !TASK.test(inline.content)) {
                return false;
            }
        }
    }
    return items > 0;
};

const codeLanguage = (builder: Builder, info: string): string | null => {
    const node = builder.vocabulary.nodes.get('code_block');
    let declaration: AttributeDeclaration | undefined;
    if (node !== undefined) {
        declaration = attributesOf(node).languageId;
    }
    const [language = ''] = info.trim().split(/\s+/);
    if (declaration !== undefined && language !== '' && isValidValue(declaration, language)) {
        return language;
    }
    return null;
};

/** The model's document for `markdown`, through `decodeDocument`, with one warning per structure the model cannot hold. */
export const readMarkdown = (
    parser: Parser,
    markdown: string,
    model: ContentModel,
    ids: IdSource,
    options: DecodeOptions,
): DecodeResult => {
    const builder = new Builder(model, ids);
    const tokens = parser.parse(markdown, {});
    let taskItem = false;
    for (const [index, token] of tokens.entries()) {
        const frame = builder.current();
        switch (token.type) {
            case 'paragraph_open':
                builder.open('paragraph');
                break;
            case 'heading_open':
                if (builder.has('heading')) {
                    builder.open('heading', { level: Number(token.tag.slice(1)) });
                } else {
                    builder.unsupported('heading');
                    builder.open('paragraph');
                }
                break;
            case 'blockquote_open':
                if (builder.has('blockquote')) {
                    builder.open('blockquote');
                } else {
                    builder.unsupported('blockquote');
                    builder.unwrap();
                }
                break;
            case 'bullet_list_open': {
                const task = isTaskList(tokens, index) && builder.has('task_list') && builder.has('task_item');
                if (task) {
                    builder.open('task_list', {}, true);
                } else if (builder.has('bullet_list')) {
                    builder.open('bullet_list');
                } else {
                    builder.unsupported('bullet_list');
                    builder.unwrap();
                }
                break;
            }
            case 'ordered_list_open':
                if (builder.has('ordered_list')) {
                    builder.open('ordered_list', { start: Number(token.attrGet('start') ?? 1) });
                } else {
                    builder.unsupported('ordered_list');
                    builder.unwrap();
                }
                break;
            case 'list_item_open': {
                const inline = tokens[index + 2];
                taskItem = frame.task === true;
                if (frame.node === undefined) {
                    builder.unwrap();
                } else if (taskItem) {
                    const checked = inline !== undefined && /^\[[xX]\]/.test(inline.content);
                    builder.open('task_item', { checked });
                } else {
                    builder.open('list_item');
                }
                break;
            }
            case 'inline': {
                const parent = frame.node;
                const path = frame.path;
                if (parent !== undefined) {
                    parent.content.push(...inlineNodes(builder, token, path, taskItem));
                }
                taskItem = false;
                break;
            }
            case 'fence':
            case 'code_block': {
                let text = token.content;
                if (text.endsWith('\n')) {
                    text = text.slice(0, -1);
                }
                if (builder.has('code_block')) {
                    builder.open('code_block', { languageId: codeLanguage(builder, token.info) });
                    if (text !== '') {
                        builder.append({ type: 'text', text });
                    }
                    builder.close();
                    break;
                }
                builder.unsupported('code_block');
                builder.open('paragraph');
                for (const [line, part] of text.split('\n').entries()) {
                    if (line > 0) {
                        builder.append({ type: 'hard_break', attrs: builder.attrsFor('hard_break', {}) });
                    }
                    if (part !== '') {
                        builder.append({ type: 'text', text: part });
                    }
                }
                builder.close();
                break;
            }
            case 'hr':
                if (builder.has('horizontal_rule')) {
                    builder.open('horizontal_rule');
                    builder.close();
                } else {
                    builder.unsupported('horizontal_rule');
                }
                break;
            case 'table_open':
                if (builder.has('table') && builder.has('table_row') && builder.has('table_cell')) {
                    builder.open('table');
                } else {
                    builder.unsupported('table');
                    builder.unwrap();
                }
                break;
            case 'tr_open':
                if (frame.node === undefined) {
                    builder.unwrap();
                } else {
                    builder.open('table_row');
                }
                break;
            case 'th_open':
            case 'td_open': {
                const header = token.type === 'th_open' && builder.has('table_header');
                if (builder.current().node === undefined) {
                    builder.unwrap();
                } else if (header) {
                    builder.open('table_header', { scope: 'col' });
                } else {
                    builder.open('table_cell');
                }
                // A cell holds one paragraph of its inline content.
                builder.open('paragraph');
                break;
            }
            case 'th_close':
            case 'td_close':
                builder.close();
                builder.close();
                break;
            case 'thead_open':
            case 'tbody_open':
            case 'thead_close':
            case 'tbody_close':
                break;
            default:
                if (token.nesting === -1) {
                    builder.close();
                }
        }
    }
    if (builder.root.content.length === 0) {
        builder.root.content.push({ type: 'paragraph', attrs: builder.attrsFor('paragraph', {}) });
    }
    const { document } = encodeTree(builder.root, model);
    const result = decodeDocument(document, model, options);
    return { ...result, diagnostics: [...result.diagnostics, ...builder.diagnostics] };
};
