/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node, Slice } from 'prosemirror-model';

import { importHtml } from '#/clipboard/import/html';
import { type PastePolicy, withoutRefused } from '#/clipboard/import/policy';
import { buildSchema, withNodeIds } from '#/definition/schema';
import { type ContentModel, type DecodeResult, decodeDocument, type ResourceLimits } from '#/model';
import { type TreeNode } from '#/model/content';
import { limitsOf } from '#/model/decode';
import { encodeTree } from '#/model/encode';
import { randomId } from '#/model/random-id';

/** What `fromHTML` reads of a `CompiledEditorDefinition`, which `./html` cannot import from the editor layers. */
interface HtmlImportDefinition {
    readonly authoring: {
        readonly features: PastePolicy;
        readonly creatableHeadingLevels: readonly number[];
    };
    readonly limits: ResourceLimits;
}

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
    const schema = buildSchema(model);
    const headingLevels = definition?.authoring.creatableHeadingLevels;
    // The blocks of a new document sit below `doc`, which `exceededStructure` counts as depth 1.
    let { content } = importHtml(html, schema, options.window, { limits, headingLevels, depth: 2 });
    if (definition !== undefined) {
        content = withoutRefused(new Slice(content, 0, 0), schema, model, definition.authoring.features).content;
    }
    const generateId = options.generateId ?? randomId;
    // The parse fits its content to `doc`, and an empty one gets the paragraph `doc` requires.
    const doc = schema.topNodeType.createAndFill(null, withNodeIds(content, generateId)) as Node;
    const { document } = encodeTree(doc.toJSON() as TreeNode, model);
    return decodeDocument(document, model, { limits, generateId });
};
