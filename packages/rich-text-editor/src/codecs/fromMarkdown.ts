/* (c) Copyright Frontify Ltd., all rights reserved. */

import MarkdownIt, { type MarkdownIt as Parser, type Token as MarkdownToken } from 'markdown-it';

import {
    type AttributeDeclaration,
    checkHref,
    type ContentModel,
    type DecodeOptions,
    type DecodeResult,
    decodeDocument,
    type HrefPolicy,
} from '#/model';
import { attributesOf, encodeTree, isValidValue } from '#/model/internal';

import { Builder, type Frame } from './markdownBuilder';
import { inlineNodes, TASK } from './markdownInline';

export { inlineToken } from './markdownInline';

// markdown-it's own link check refuses this scheme, so the destination stays literal text.
const REFUSED_LINK = 'javascript:';

/** The text from a linkify match to the next space, which the URL check judges whole, so a refused URL links no part of it. */
const candidateAt = (text: string, index: number): string => text.slice(index).split(/\s/, 1)[0] ?? '';

/**
 * One dialect: CommonMark with GFM tables and strikethrough, raw HTML off, `http`, `https` and email literals linked.
 * `policy` is the `allowedSchemes` and `allowedHosts` of the feature that declares `link`, which links must pass too.
 */
export const createParser = (policy?: HrefPolicy): Parser => {
    const parser = new MarkdownIt('default', { html: false, linkify: true });
    parser.linkify.set({ fuzzyLink: true });
    const accepts = (url: string) => checkHref(url, policy).ok;

    // Of the links with no scheme, only `www.` ones become links, as GitHub's extended autolinks do; a bare domain stays text.
    const match = parser.linkify.match.bind(parser.linkify);
    parser.linkify.match = (text) =>
        (match(text) ?? []).filter(({ schema, raw, index, url }) => {
            const isLinkable = schema !== '' || /^www\./i.test(raw);

            return isLinkable && accepts(url) && accepts(candidateAt(text, index));
        });

    const matchAtStart = parser.linkify.matchAtStart.bind(parser.linkify);
    parser.linkify.matchAtStart = (text) => {
        const found = matchAtStart(text);
        if (found === null || !accepts(found.url) || !accepts(candidateAt(text, 0))) {
            return null;
        }

        return found;
    };

    // A destination that fails the URL check as written stays text, though markdown-it's encoding would repair it.
    const normalizeLink = parser.normalizeLink.bind(parser);
    parser.normalizeLink = (url) => (accepts(url) ? normalizeLink(url) : REFUSED_LINK);

    return parser;
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

/** The fence's language when the model's `code_block` declares it as valid, else null. */
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

/** The reader's state across tokens: whether the list item just opened is a task item. */
type Reading = {
    taskItem: boolean;
};

/** Opens a paragraph, heading or blockquote, or the paragraph or unwrapped stand-in when the model lacks it. */
const openTextBlock = (builder: Builder, token: MarkdownToken): void => {
    if (token.type === 'paragraph_open') {
        builder.open('paragraph');
    } else if (token.type === 'heading_open') {
        if (builder.has('heading')) {
            builder.open('heading', { level: Number(token.tag.slice(1)) });
        } else {
            builder.unsupported('heading');
            builder.open('paragraph');
        }
    } else if (builder.has('blockquote')) {
        builder.open('blockquote');
    } else {
        builder.unsupported('blockquote');
        builder.unwrap();
    }
};

const openList = (builder: Builder, tokens: readonly MarkdownToken[], index: number, token: MarkdownToken): void => {
    if (token.type === 'ordered_list_open') {
        if (builder.has('ordered_list')) {
            builder.open('ordered_list', { start: Number(token.attrGet('start') ?? 1) });
        } else {
            builder.unsupported('ordered_list');
            builder.unwrap();
        }

        return;
    }

    const task = isTaskList(tokens, index) && builder.has('task_list') && builder.has('task_item');
    if (task) {
        builder.open('task_list', {}, true);
    } else if (builder.has('bullet_list')) {
        builder.open('bullet_list');
    } else {
        builder.unsupported('bullet_list');
        builder.unwrap();
    }
};

const openListItem = (
    builder: Builder,
    tokens: readonly MarkdownToken[],
    index: number,
    frame: Frame,
    taskItem: boolean,
): void => {
    const inline = tokens[index + 2];
    if (frame.node === undefined) {
        builder.unwrap();
    } else if (taskItem) {
        const checked = inline !== undefined && /^\[[xX]\]/.test(inline.content);
        builder.open('task_item', { checked });
    } else {
        builder.open('list_item');
    }
};

const readCode = (builder: Builder, token: MarkdownToken): void => {
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

        return;
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
};

const readRule = (builder: Builder): void => {
    if (builder.has('horizontal_rule')) {
        builder.open('horizontal_rule');
        builder.close();
    } else {
        builder.unsupported('horizontal_rule');
    }
};

const openTable = (builder: Builder): void => {
    if (builder.has('table') && builder.has('table_row') && builder.has('table_cell')) {
        builder.open('table');
    } else {
        builder.unsupported('table');
        builder.unwrap();
    }
};

const openRow = (builder: Builder, frame: Frame): void => {
    if (frame.node === undefined) {
        builder.unwrap();
    } else {
        builder.open('table_row');
    }
};

const openCell = (builder: Builder, token: MarkdownToken): void => {
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
};

const readToken = (
    builder: Builder,
    tokens: readonly MarkdownToken[],
    index: number,
    token: MarkdownToken,
    reading: Reading,
): void => {
    const frame = builder.current();
    switch (token.type) {
        case 'paragraph_open':
        case 'heading_open':
        case 'blockquote_open':
            openTextBlock(builder, token);
            break;
        case 'bullet_list_open':
        case 'ordered_list_open':
            openList(builder, tokens, index, token);
            break;
        case 'list_item_open':
            reading.taskItem = frame.task === true;
            openListItem(builder, tokens, index, frame, reading.taskItem);
            break;
        case 'inline': {
            const parent = frame.node;
            const path = frame.path;
            if (parent !== undefined) {
                parent.content.push(...inlineNodes(builder, token, path, reading.taskItem));
            }

            reading.taskItem = false;
            break;
        }

        case 'fence':
        case 'code_block':
            readCode(builder, token);
            break;
        case 'hr':
            readRule(builder);
            break;
        case 'table_open':
            openTable(builder);
            break;
        case 'tr_open':
            openRow(builder, frame);
            break;
        case 'th_open':
        case 'td_open':
            openCell(builder, token);
            break;
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
};

/** The model's document for `markdown`, through `decodeDocument`, with one warning per structure the model cannot hold. */
export const readMarkdown = (
    parser: Parser,
    markdown: string,
    model: ContentModel,
    generateId: () => string,
    options: DecodeOptions,
): DecodeResult => {
    const builder = new Builder(model, generateId);
    const tokens = parser.parse(markdown, {});
    const reading: Reading = { taskItem: false };
    for (const [index, token] of tokens.entries()) {
        readToken(builder, tokens, index, token, reading);
    }

    if (builder.root.content.length === 0) {
        builder.root.content.push({ type: 'paragraph', attrs: builder.attrsFor('paragraph', {}) });
    }

    const { document } = encodeTree(builder.root, model);
    const result = decodeDocument(document, model, options);

    return { ...result, diagnostics: [...result.diagnostics, ...builder.diagnostics] };
};
