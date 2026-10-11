/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DOMParser as SchemaParser, Fragment, type Mark, type Node, type Schema } from 'prosemirror-model';

import { type ResourceLimits } from '#/model';

import { type ColorReading, NO_COLORS, normalizeColors } from './colors';
import { descriptorOf } from './dom';
import { cleanGoogleDocs } from './google-docs';
import { removeEmptySpans, removeItemBreaks, removeMarkup, splitDecorations } from './markup';
import { rebuildOfficeLists, removeOfficeMarkup } from './office';
import { adoptTaskLists } from './task-lists';

/** The host's DOM implementation, whose constructors and prototypes the import reads. */
type DomWindow = Window & typeof globalThis;

export interface HtmlSettings {
    readonly limits: ResourceLimits;
    /** The creatable heading levels of the definition, or `undefined` to keep every level. */
    readonly headingLevels: readonly number[] | undefined;
    /** The depth, as `exceededStructure` counts it, at which the imported blocks land. */
    readonly depth: number;
    /** The pasted colours the model keeps; none when omitted. */
    readonly colors?: ColorReading;
}

export interface ImportedHtml {
    readonly content: Fragment;
    /** Images dropped without fetching, for the announcement. */
    readonly droppedImages: number;
    /** Colours the model does not keep, removed for the announcement. */
    readonly removedColors: number;
}

/**
 * Turns each `form` into a `div`, through prototype accessors only, since a control named `nodeType` or `firstChild`
 * shadows that property on its form and would hide the form's text from the parse.
 */
const replaceForms = (dom: DomWindow, inert: Document) => {
    const node = dom.Node.prototype;
    const query = descriptorOf(dom.Document.prototype, 'querySelectorAll').value as Document['querySelectorAll'];
    const create = descriptorOf(dom.Document.prototype, 'createElement').value as Document['createElement'];
    const firstChild = descriptorOf(node, 'firstChild').get as () => ChildNode | null;
    const parentNode = descriptorOf(node, 'parentNode').get as () => ParentNode | null;
    const append = descriptorOf(node, 'appendChild').value as globalThis.Node['appendChild'];
    const replace = descriptorOf(node, 'replaceChild').value as globalThis.Node['replaceChild'];
    for (const form of Array.from(query.call(inert, 'form'))) {
        const block = create.call(inert, 'div');
        for (let child = firstChild.call(form); child !== null; child = firstChild.call(form)) {
            append.call(block, child);
        }
        const parent = parentNode.call(form);
        if (parent !== null) {
            replace.call(parent, block, form);
        }
    }
};

/** Removes the notes that the package's HTML writer adds after content, such as the islands notice, which are no content. */
const removeNotes = (body: HTMLElement) => {
    for (const note of Array.from(body.querySelectorAll('[data-rte-message]'))) {
        note.remove();
    }
};

/** Replaces each SVG and MathML element with its text, since the engine's tag rules match their elements by name alone. */
const replaceForeign = (body: HTMLElement) => {
    for (const foreign of Array.from(body.querySelectorAll('svg, math'))) {
        for (const hidden of Array.from(foreign.querySelectorAll('script, style, title'))) {
            hidden.remove();
        }
        // The whitespace at its edges lays out markup, and would stay as a leading space between blocks.
        foreign.replaceWith((foreign.textContent ?? '').trim());
    }
};

/** The engine ignores `object` with its children; a skip rule keeps its fallback text. */
const removeObjectChildren = (body: HTMLElement) => {
    for (const nested of Array.from(body.querySelectorAll('object object, object embed, object param'))) {
        nested.remove();
    }
};

/** Replaces each image with its `alt` text, so nothing fetches it, and counts them. */
const replaceImages = (body: HTMLElement) => {
    const images = Array.from(body.querySelectorAll('img'));
    for (const image of images) {
        const alt = image.getAttribute('alt') ?? '';
        if (alt === '') {
            image.remove();
        } else {
            image.replaceWith(alt);
        }
    }
    return images.length;
};

/** WebKit and Chrome write a copied space as a span holding only U+00A0, which ProseMirror's own paste turns back. */
const restoreSpaces = (body: HTMLElement) => {
    for (const span of Array.from(
        body.querySelectorAll('span.Apple-converted-space, span:not([class]):not([style])'),
    )) {
        if (span.childNodes.length === 1 && span.textContent === '\u00A0') {
            span.replaceWith(' ');
        }
    }
};

const SPACED = /(?<= )\u00A0/g;

/** Turns each U+00A0 after a U+0020 outside code blocks back into U+0020, reversing the space encoding of copied HTML. */
const withSpaces = (schema: Schema, fragment: Fragment): Fragment => {
    const nodes: Node[] = [];
    for (const node of fragment.content) {
        if (node.isLeaf || node.type.spec.code === true) {
            nodes.push(node);
            continue;
        }
        if (!node.isTextblock) {
            nodes.push(node.copy(withSpaces(schema, node.content)));
            continue;
        }
        let previous = '';
        const inline: Node[] = [];
        for (const child of node.content.content) {
            if (child.text === undefined) {
                previous = '';
                inline.push(child);
                continue;
            }
            const text = `${previous}${child.text}`.replace(SPACED, ' ').slice(previous.length);
            previous = child.text.slice(-1);
            inline.push(schema.text(text, child.marks));
        }
        nodes.push(node.copy(Fragment.from(inline)));
    }
    return Fragment.from(nodes);
};

/** The allowed level nearest `level`, the lower on a tie, or none. */
const nearestLevel = (level: number, levels: readonly number[]) => {
    let nearest: number | undefined;
    for (const allowed of [...levels].sort((left, right) => left - right)) {
        if (nearest === undefined || Math.abs(allowed - level) < Math.abs(nearest - level)) {
            nearest = allowed;
        }
    }
    return nearest;
};

/**
 * Attributes as `decodeDocument` accepts them: a string longer than `maxAttributeLength` takes its default, and a
 * mark or node with no default for it goes, keeping its text, so the saved document still decodes as `editable`.
 * Each heading takes the nearest creatable level, or becomes a paragraph when none is.
 */
const withValidAttributes = (
    schema: Schema,
    fragment: Fragment,
    limits: ResourceLimits,
    levels: readonly number[] | undefined,
): Fragment => {
    const valid = (type: Node['type'] | Mark['type'], attrs: Node['attrs']) => {
        const result: Record<string, unknown> = { ...attrs };
        for (const [name, value] of Object.entries(attrs)) {
            if (typeof value !== 'string' || value.length <= limits.maxAttributeLength) {
                continue;
            }
            const attribute = type.spec.attrs?.[name];
            if (attribute === undefined || !('default' in attribute)) {
                return undefined;
            }
            result[name] = attribute.default;
        }
        return result;
    };
    const paragraph = schema.nodes.paragraph as Node['type'];
    // Only what the paragraph declares carries over from the node it replaces.
    const asParagraph = (node: Node, content: Fragment, marks: readonly Mark[]) => {
        const declared = Object.fromEntries(
            Object.keys(paragraph.spec.attrs ?? {}).map((name) => [name, node.attrs[name]]),
        );
        return paragraph.create(valid(paragraph, declared) ?? null, content, marks);
    };
    const nodes: Node[] = [];
    for (const node of fragment.content) {
        const marks = node.marks.flatMap((mark) => {
            const attrs = valid(mark.type, mark.attrs);
            if (attrs === undefined) {
                return [];
            }
            return [mark.type.create(attrs)];
        });
        if (node.text !== undefined) {
            nodes.push(node.mark(marks));
            continue;
        }
        const content = withValidAttributes(schema, node.content, limits, levels);
        const attrs = valid(node.type, node.attrs);
        if (attrs === undefined) {
            // A required value decode would reject cannot take a default, so the node goes and its text stays, as with paste: false.
            if (node.isTextblock) {
                nodes.push(asParagraph(node, content, marks));
            } else if (!node.isLeaf) {
                nodes.push(...content.content);
            }
            continue;
        }
        if (node.type.name !== 'heading' || levels === undefined) {
            nodes.push(node.type.create(attrs, content, marks));
            continue;
        }
        const level = nearestLevel(node.attrs.level as number, levels);
        if (level === undefined) {
            nodes.push(asParagraph(node, content, marks));
            continue;
        }
        nodes.push(node.type.create({ ...attrs, level }, content, marks));
    }
    return Fragment.from(nodes);
};

/**
 * Parses `html` into an inert document of the host's DOM, cleans it, and reads it with the schema's parse rules,
 * which are the only filter, then makes spaces, attributes and heading levels valid.
 */
export const importHtml = (html: string, schema: Schema, window: Window, settings: HtmlSettings): ImportedHtml => {
    const dom = window as DomWindow;
    const inert = new dom.DOMParser().parseFromString(html, 'text/html');
    // An element named `body` shadows `document.body`.
    const body = (descriptorOf(dom.Document.prototype, 'body').get as () => HTMLElement | null).call(inert);
    if (body === null) {
        return { content: Fragment.empty, droppedImages: 0, removedColors: 0 };
    }
    // Forms go first, since their controls shadow what later steps read; comments and contentless elements next, so
    // the vendor steps meet content only; Office lists before the Office markup goes, since they read its `mso-list`
    // and marker spans; decorations once the Office styles are rewritten; empty spans last, after the steps that empty them.
    replaceForms(dom, inert);
    removeNotes(body);
    removeMarkup(body);
    cleanGoogleDocs(body);
    // Without a task list in the model, other editors' task lists stay plain lists, which the list rules read.
    if (schema.nodes.task_list !== undefined) {
        adoptTaskLists(body);
    }
    rebuildOfficeLists(body, settings.limits.maxDepth, settings.depth);
    removeOfficeMarkup(body);
    splitDecorations(body);
    const removedColors = normalizeColors(body, settings.colors ?? NO_COLORS);
    removeItemBreaks(body);
    replaceForeign(body);
    const droppedImages = replaceImages(body);
    restoreSpaces(body);
    removeObjectChildren(body);
    removeEmptySpans(body);
    const parser = new SchemaParser(schema, [{ tag: 'object', skip: true }, ...SchemaParser.fromSchema(schema).rules]);
    let content = withSpaces(schema, parser.parse(body).content);
    content = withValidAttributes(schema, content, settings.limits, settings.headingLevels);
    return { content, droppedImages, removedColors };
};
