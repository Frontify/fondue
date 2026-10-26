/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type Schema } from 'prosemirror-model';

import type * as FromMarkdown from '#/codecs/fromMarkdown';
import { type ContentModel, type ResourceLimits } from '#/model';
import { markHrefPolicy, decodeToTree, randomId } from '#/model/internal';
import { whenIdle } from '#/runtime/idle';

type MarkdownReader = typeof FromMarkdown;
type MarkdownParser = ReturnType<MarkdownReader['createParser']>;

const PLAIN_BLOCKS = new Set(['paragraph_open', 'paragraph_close', 'inline']);
const PLAIN_INLINE = new Set(['text', 'softbreak']);

// Paste is synchronous, so Markdown reading waits for this load and a paste before it stays plain text.
let reader: MarkdownReader | undefined;

/** Loads the Markdown reader, which keeps `markdown-it` out of the editor's initial load. */
export const loadMarkdownReader = async (): Promise<void> => {
    reader ??= await import('#/codecs/fromMarkdown');
};

/** Starts `loadMarkdownReader` when the page is idle; the returned function cancels a start that has not run. */
export const loadMarkdownReaderOnIdle = (): (() => void) => {
    if (reader !== undefined) {
        return () => {};
    }

    return whenIdle(() => {
        // A failed load leaves paste as plain text.
        loadMarkdownReader().catch(() => undefined);
    });
};

const parsers = new WeakMap<ContentModel, MarkdownParser>();
/** The Markdown parser of `model`, whose links pass the policy of its `link` mark. */
const markdownParser = ({ createParser }: MarkdownReader, model: ContentModel) => {
    let parser = parsers.get(model);
    if (parser === undefined) {
        parser = createParser(markHrefPolicy(model, 'link'));
        parsers.set(model, parser);
    }

    return parser;
};

/** Whether `text` has Markdown block or inline structure; a bare URL that linkify finds is no structure. */
const isMarkdown = (loaded: MarkdownReader, text: string, model: ContentModel) =>
    markdownParser(loaded, model)
        .parse(text, {})
        .some(
            ({ type, children }) =>
                !PLAIN_BLOCKS.has(type) ||
                (children ?? []).some((child) => !PLAIN_INLINE.has(child.type) && child.markup !== 'linkify'),
        );

/** `text` converted with `fromMarkdown`; `undefined` when the reader has not loaded, `text` has no Markdown structure, or it does not convert. */
export const markdownFragment = (
    schema: Schema,
    text: string,
    { model, limits }: { model: ContentModel; limits: ResourceLimits },
): Fragment | undefined => {
    const loaded = reader;
    if (loaded === undefined || !isMarkdown(loaded, text, model)) {
        return undefined;
    }

    const result = loaded.readMarkdown(markdownParser(loaded, model), text, model, randomId, { limits });
    if (result.status !== 'editable') {
        return undefined;
    }

    const { tree } = decodeToTree(result.document, model, { limits });
    if (tree === undefined) {
        return undefined;
    }

    return Fragment.fromJSON(schema, tree.content);
};
