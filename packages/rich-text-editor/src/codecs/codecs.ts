/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentModel, defaultIdSource, type DecodeOptions, type Diagnostic } from '#/model';
import { type TreeNode } from '#/model/content';
import { decodeToTree } from '#/model/decode';

import { codecContext } from './context';
import { createParser, readMarkdown } from './from-markdown';
import { checkCodecs, planOf } from './plan';
import { writeHtml } from './to-html';
import { writeMarkdown } from './to-markdown';
import { writeText } from './to-text';
import { type CodecsOptions, type RichTextCodecs } from './types';

/** Checks the model once, then returns `toHTML`, `toPlainText`, `toMarkdown` and `fromMarkdown` bound to it. */
export const createCodecs = (model: ContentModel, options: CodecsOptions = {}): RichTextCodecs => {
    const plan = planOf(model);
    checkCodecs(plan);
    const ids = options.ids ?? defaultIdSource;
    let decodeOptions: DecodeOptions = {};
    if (options.limits !== undefined) {
        decodeOptions = { limits: options.limits };
    }
    const parser = createParser();
    /** The decode diagnostics and the island tree, or no tree when the document is blocked. */
    const decode = (document: unknown): { readonly tree?: TreeNode; readonly diagnostics: readonly Diagnostic[] } => {
        const { result, tree } = decodeToTree(document, model, decodeOptions);
        if (result.status === 'blocked' || tree === undefined) {
            return { diagnostics: result.diagnostics };
        }
        return { tree, diagnostics: result.diagnostics };
    };
    return {
        toHTML: (document, htmlOptions = {}) => {
            const { tree, diagnostics } = decode(document);
            if (tree === undefined) {
                return { html: '', diagnostics };
            }
            const output = writeHtml(plan, tree, codecContext(htmlOptions.locale, htmlOptions.resolveAssetUrl));
            return { html: output.html, diagnostics: [...diagnostics, ...output.diagnostics] };
        },
        toPlainText: (document) => {
            const { tree, diagnostics } = decode(document);
            if (tree === undefined) {
                return { text: '', losses: [], diagnostics };
            }
            const output = writeText(plan, tree, codecContext());
            return { text: output.text, losses: output.losses, diagnostics: [...diagnostics, ...output.diagnostics] };
        },
        toMarkdown: (document, markdownOptions = {}) => {
            const { tree, diagnostics } = decode(document);
            if (tree === undefined) {
                return { markdown: '', losses: [], diagnostics };
            }
            const context = codecContext(markdownOptions.locale, markdownOptions.resolveAssetUrl);
            const output = writeMarkdown(plan, tree, context, parser);
            return {
                markdown: output.markdown,
                losses: output.losses,
                diagnostics: [...diagnostics, ...output.diagnostics],
            };
        },
        fromMarkdown: (markdown) => readMarkdown(parser, markdown, model, ids, { ...decodeOptions, ids }),
    };
};
