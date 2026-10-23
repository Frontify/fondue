/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node, Slice } from 'prosemirror-model';

import { type ImportedHtml, importModelHtml } from '#/clipboard/import/html';
import { withoutRefused } from '#/clipboard/import/policy';
import { buildSchema, withNodeIds } from '#/definition/schema';
import { type ContentModel, type DecodeResult, decodeDocument, type ResourceLimits } from '#/model';
import { type TreeNode } from '#/model/content';
import { limitsOf } from '#/model/decode';
import { encodeTree } from '#/model/encode';
import { diagnostic } from '#/model/format';
import { randomId } from '#/model/random-id';
import { exceedsBytes } from '#/model/read';

/** What `fromHTML` reads of a `CompiledEditorDefinition`, which `./html` cannot import from the editor layers. */
interface HtmlImportDefinition {
    readonly authoring: {
        // The shape of PastePolicy, whose module imports prosemirror-model.
        readonly features: Readonly<Record<string, { readonly paste: boolean }>>;
        readonly creatableHeadingLevels: readonly number[];
    };
    readonly limits: ResourceLimits;
}

/** Options for reading HTML into a document: the DOM to use and the definition whose creation policy applies. */
export interface HtmlImportOptions {
    /** A DOM implementation: the browser window, or one from jsdom or linkedom on a server. */
    readonly window: Window;
    /** Applies that definition's creation policy, as paste does; without it, everything the model holds is kept. */
    readonly definition?: HtmlImportDefinition;
    readonly limits?: Partial<ResourceLimits>;
    /** For the `nodeId`s of imported occurrences; `randomId` when omitted. */
    readonly generateId?: () => string;
}

/**
 * Converts HTML to a document through the paste pipeline, with no editor mounted, so it runs on a server with only a
 * DOM implementation. The result equals pasting `html` into an empty editor of `model` and `options.definition`.
 */
export const fromHTML = (html: string, model: ContentModel, options: HtmlImportOptions): DecodeResult => {
    const { definition } = options;
    const limits = limitsOf(options.limits, definition?.limits);
    if (exceedsBytes(html, limits.maxPasteBytes)) {
        const limit = diagnostic('format.limit-exceeded', '', { limit: 'maxPasteBytes' }, 'error');
        return { status: 'blocked', reason: 'limit-exceeded', original: html, diagnostics: [limit] };
    }
    const schema = buildSchema(model);
    const headingLevels = definition?.authoring.creatableHeadingLevels;
    let imported: ImportedHtml;
    try {
        imported = importModelHtml(html, model, schema, options.window, { limits, headingLevels });
    } catch (error) {
        // Markup nested past the call stack is a structure limit; any other throw is unreadable input, never a throw.
        if (error instanceof RangeError) {
            const limit = diagnostic('format.limit-exceeded', '', { limit: 'maxDepth' }, 'error');
            return { status: 'blocked', reason: 'limit-exceeded', original: html, diagnostics: [limit] };
        }
        const unreadable = diagnostic('format.invalid-structure', '', undefined, 'error');
        return { status: 'blocked', reason: 'invalid', original: html, diagnostics: [unreadable] };
    }
    let { content } = imported;
    if (definition !== undefined) {
        content = withoutRefused(new Slice(content, 0, 0), schema, model, definition.authoring.features).content;
    }
    const generateId = options.generateId ?? randomId;
    // The parse fits its content to `doc`, and an empty one gets the paragraph `doc` requires.
    const doc = schema.topNodeType.createAndFill(null, withNodeIds(content, generateId)) as Node;
    const { document } = encodeTree(doc.toJSON() as TreeNode, model);
    return decodeDocument(document, model, { limits, generateId });
};
