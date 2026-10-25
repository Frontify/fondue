/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, DOMParser as SchemaParser, type Schema } from 'prosemirror-model';

import { type ContentModel, type ResourceLimits } from '#/model';
import { type CompiledParseRule, compiledModel, markHrefPolicy } from '#/model/internal';

import {
    type DomWindow,
    limitClasses,
    removeNotes,
    removeObjectChildren,
    replaceForeign,
    replaceForms,
    replaceImages,
    replaceTables,
    restoreSpaces,
} from './clean';
import { type ColorReading, colorReadingOf, normalizeColors } from './colors';
import { descriptorOf } from './dom';
import { withSpaces, withValidAttributes } from './fragment';
import { cleanGoogleDocs } from './google-docs';
import { exceedsMarkupDepth } from './limits';
import { removeEmptySpans, removeItemBreaks, removeMarkup } from './markup';
import { rebuildOfficeLists, removeOfficeMarkup } from './office';
import { clearingRules, functionRules, readAnswers, withRefusals } from './parse-rules';
import { withinLinkPolicy } from './policy';

export interface HtmlSettings {
    readonly limits: ResourceLimits;
    /** The creatable heading levels of the definition, or `undefined` to keep every level. */
    readonly headingLevels: readonly number[] | undefined;
    /** The depth, as `exceededStructure` counts it, at which the imported blocks land. */
    readonly depth: number;
    /** The pasted colours the model keeps. */
    readonly colors: ColorReading;
    /** The model's function parse rules, which read an element before the schema's rules do. */
    readonly rules: readonly CompiledParseRule[];
}

export interface ImportedHtml {
    readonly content: Fragment;
    /** Images dropped without fetching, for the announcement. */
    readonly droppedImages: number;
    /** Colours the model does not keep, removed for the announcement. */
    readonly removedColors: number;
    /** Tables the schema cannot hold, whose cells became blocks, for the announcement. */
    readonly removedTables: number;
}

/**
 * Parses `html` into an inert document of the host's DOM, cleans it, and reads it with the schema's parse rules,
 * which are the only filter, then makes spaces, attributes and heading levels valid.
 */
export const importHtml = (html: string, schema: Schema, window: Window, settings: HtmlSettings): ImportedHtml => {
    const dom = window as DomWindow;
    // Before the parse, whose cost in jsdom grows with the square of the nesting; `fromHTML` reads a RangeError as a limit.
    if (exceedsMarkupDepth(html)) {
        throw new RangeError('The markup nests deeper than a browser parser reads.');
    }
    const inert = new dom.DOMParser().parseFromString(html, 'text/html');
    // No rule reads a base URL, and jsdom throws resolving URLs against a `base` whose `xlink:href` it misreads.
    const query = descriptorOf(dom.Document.prototype, 'querySelectorAll').value as Document['querySelectorAll'];
    for (const base of Array.from(query.call(inert, 'base'))) {
        base.remove();
    }
    // An element named `body` shadows `document.body`.
    const body = (descriptorOf(dom.Document.prototype, 'body').get as () => HTMLElement | null).call(inert);
    if (body === null) {
        return { content: Fragment.empty, droppedImages: 0, removedColors: 0, removedTables: 0 };
    }
    // First, since a control of a form shadows what every later step reads.
    replaceForms(dom, inert);
    // Before any step that queries by class.
    limitClasses(body, settings.limits.maxAttributeLength);
    // Before the vendor steps, so they meet content only: a comment or `style` element between blocks would hide their adjacency.
    removeNotes(body);
    removeMarkup(body);
    // Before any step that reads `style`, which SVG and MathML elements lack in some DOM implementations.
    replaceForeign(body);
    cleanGoogleDocs(body);
    // Before removeOfficeMarkup, which removes the `mso-list` styles and marker spans it reads.
    rebuildOfficeLists(body, settings.limits.maxDepth, settings.depth);
    removeOfficeMarkup(body);
    const removedColors = normalizeColors(body, settings.colors);
    removeItemBreaks(body);
    const droppedImages = replaceImages(body);
    const removedTables = replaceTables(body, schema);
    // After removeOfficeMarkup, which strips the `Mso` class and `mso-` styles that keep a spacing span from matching.
    restoreSpaces(body);
    removeObjectChildren(body);
    // Last, after the steps that empty spans: replaceImages and removeOfficeMarkup.
    removeEmptySpans(body);
    const { rules } = settings;
    const answers = readAnswers(body, rules);
    const parser = new SchemaParser(schema, [
        { tag: 'object', skip: true },
        ...functionRules(schema, rules, answers),
        ...SchemaParser.fromSchema(schema).rules.map((rule) => withRefusals(rule, answers)),
        ...clearingRules(schema, answers),
    ]);
    // The package's HTML writes every space it means, so a space at a block's edge stays as the browser shows it.
    const preserveWhitespace = body.querySelector('.fondue-rte-content') !== null;
    let content = withSpaces(parser.parse(body, { preserveWhitespace }).content);
    content = withValidAttributes(schema, content, settings.limits, settings.headingLevels);
    return { content, droppedImages, removedColors, removedTables };
};

/**
 * The import of `html` as the model reads it: its colours and parse rules, then its link policy, the one order that
 * paste and `fromHTML` share.
 */
export const importModelHtml = (
    html: string,
    model: ContentModel,
    schema: Schema,
    window: Window,
    settings: Pick<HtmlSettings, 'limits' | 'headingLevels' | 'depth'>,
): ImportedHtml => {
    const imported = importHtml(html, schema, window, {
        ...settings,
        colors: colorReadingOf(model),
        rules: compiledModel(model).parseRules,
    });
    return { ...imported, content: withinLinkPolicy(imported.content, markHrefPolicy(model, 'link')) };
};
