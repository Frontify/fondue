/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slice } from 'prosemirror-model';

import { type ContentModel, type DecodeResult, type ResourceLimits } from '#/model';
import { limitsOf, diagnostic, randomId, exceedsBytes } from '#/model/internal';
import { buildSchema } from '#/runtime/definition/schema';
import { type ImportedHtml, importModelHtml } from '#/runtime/import/html';
import { withoutRefused } from '#/runtime/import/policy';

import { documentFromFragment } from './fragmentDocument';

/** What `fromHTML` reads of a `CompiledEditorDefinition`, which `./html` cannot import from the editor layers. */
type HtmlImportDefinition = {
    authoring: {
        // The shape of PastePolicy, whose module imports prosemirror-model.
        features: Readonly<Record<string, { paste: boolean }>>;
        creatableHeadingLevels: readonly number[];
    };
    limits: ResourceLimits;
};

/** Options for reading HTML into a document: the DOM to use and the definition whose creation policy applies. */
export type HtmlImportOptions = {
    /** A DOM implementation: the browser window, or one from jsdom or linkedom on a server. */
    window: Window;
    /**
     * Applies that definition's creation policy, as paste does; without it, everything the model holds is kept.
     * @default undefined
     */
    definition?: HtmlImportDefinition;
    /**
     * Overrides single resource limits; each applies over the definition's limits, or over the model defaults when
     * there is no definition. Invalid values are ignored.
     */
    limits?: Partial<ResourceLimits>;
    /**
     * For the `nodeId`s of imported occurrences.
     * @default randomId
     */
    generateId?: () => string;
};

/**
 * Converts HTML to a document through the paste pipeline, with no editor mounted, so it runs on a server with only a
 * DOM implementation. The result equals pasting `html` into an empty editor of `model` and `options.definition`.
 *
 * Returns a `blocked` result, never a throw, when `html` is over the paste byte limit, nests past the depth limit or is
 * unreadable.
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
        // The blocks of a new document sit below `doc`, which `exceededStructure` counts as depth 1.
        imported = importModelHtml(html, model, schema, options.window, { limits, headingLevels, depth: 2 });
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

    return documentFromFragment(html, model, schema, content, limits, generateId);
};
