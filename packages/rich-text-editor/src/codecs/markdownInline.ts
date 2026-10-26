/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Token as MarkdownToken } from 'markdown-it';

import { checkHref } from '#/model';
import { type TreeMark, type TreeNode } from '#/model/internal';

import { type Builder } from './markdownBuilder';

const MARKS_OF: Readonly<Record<string, string>> = { em: 'italic', strong: 'bold', s: 'strike' };
export const TASK = /^\[([ xX])\](?:[ \t]|$)/;

/** What an inline token holds as both Markdown readers take it, or `undefined` for one each treats on its own. */
type InlineToken =
    | { kind: 'text' | 'code'; text: string }
    | { kind: 'break' | 'close' }
    | { kind: 'open'; mark: string; href: string };

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

export const inlineNodes = (builder: Builder, token: MarkdownToken, path: string, stripTask: boolean): TreeNode[] => {
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
                const href = checkHref(read.href, builder.linkPolicy);
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
