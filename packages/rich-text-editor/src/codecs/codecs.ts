/* (c) Copyright Frontify Ltd., all rights reserved. */

import { enUS } from '#/locales/en-US';
import { type ContentModel, type DecodeOptions, type Diagnostic, styleSheetOf } from '#/model';
import { markHrefPolicy, type TreeNode, decodeToTree, codecContext, columnLayout, randomId } from '#/model/internal';

import { createParser, readMarkdown } from './fromMarkdown';
import { checkCodecs, codecPlanOf } from './plan';
import { writeHtml } from './toHtml';
import { writeMarkdown } from './toMarkdown';
import { writeText } from './toText';
import { type CodecsOptions, type RichTextCodecs } from './types';

/** Checks the model once, then returns `toHTML`, `toPlainText`, `toMarkdown` and `fromMarkdown` bound to it. */
export const createCodecs = (model: ContentModel, options: CodecsOptions = {}): RichTextCodecs => {
    const plan = codecPlanOf(model);
    checkCodecs(plan);
    const generateId = options.generateId ?? randomId;
    let decodeOptions: DecodeOptions = {};
    if (options.limits !== undefined) {
        decodeOptions = { limits: options.limits };
    }

    const parser = createParser(markHrefPolicy(model, 'link'));
    /** The decode diagnostics and the island tree, or no tree when the document is blocked. */
    const decode = (document: unknown): { tree?: TreeNode; diagnostics: readonly Diagnostic[]; blocked: boolean } => {
        const { result, tree } = decodeToTree(document, model, decodeOptions);
        const blocked = result.status === 'blocked';
        if (blocked || tree === undefined) {
            return { diagnostics: result.diagnostics, blocked };
        }

        return { tree, diagnostics: result.diagnostics, blocked };
    };

    return {
        toHTML: (document, htmlOptions = {}) => {
            const { inlineStyles = [], colorTokens = [] } = htmlOptions;
            const css = styleSheetOf(inlineStyles);
            const { tree, diagnostics, blocked } = decode(document);
            if (tree === undefined) {
                return { html: '', css, diagnostics, blocked };
            }

            const context = codecContext(htmlOptions.locale, enUS, htmlOptions.resolveAssetUrl);
            const { contentClassName, listLevels, resolveReference } = htmlOptions;
            const output = writeHtml(plan, tree, context, {
                contentClassName,
                listLevels,
                resolveReference,
                columns: columnLayout(htmlOptions.columns, htmlOptions.columnGap),
                styles: { styles: inlineStyles, colorTokens, inline: true },
            });

            return { html: output.html, css, diagnostics: [...diagnostics, ...output.diagnostics], blocked };
        },
        toPlainText: (document) => {
            const { tree, diagnostics, blocked } = decode(document);
            if (tree === undefined) {
                return { text: '', losses: [], diagnostics, blocked };
            }

            const output = writeText(plan, tree, codecContext(undefined, enUS));

            return {
                text: output.text,
                losses: output.losses,
                diagnostics: [...diagnostics, ...output.diagnostics],
                blocked,
            };
        },
        toMarkdown: (document, markdownOptions = {}) => {
            const { tree, diagnostics, blocked } = decode(document);
            if (tree === undefined) {
                return { markdown: '', losses: [], diagnostics, blocked };
            }

            const context = codecContext(markdownOptions.locale, enUS, markdownOptions.resolveAssetUrl);
            const output = writeMarkdown(plan, tree, context, parser);

            return {
                markdown: output.markdown,
                losses: output.losses,
                diagnostics: [...diagnostics, ...output.diagnostics],
                blocked,
            };
        },
        fromMarkdown: (markdown) => readMarkdown(parser, markdown, model, generateId, { ...decodeOptions, generateId }),
    };
};
