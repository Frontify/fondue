/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DOMParser as SchemaParser, Fragment, type Mark, type Node, type Schema } from 'prosemirror-model';

import { type ResourceLimits } from '#/model';

/** The host's DOM implementation, whose constructors and prototypes the import reads. */
type DomWindow = Window & typeof globalThis;

export interface HtmlSettings {
    readonly limits: ResourceLimits;
    /** The creatable heading levels of the definition, or `undefined` to keep every level (SPEC-rich-text-output/AC-044). */
    readonly headingLevels: readonly number[] | undefined;
}

export interface ImportedHtml {
    readonly content: Fragment;
    /** Images dropped without fetching, for the announcement (SPEC-rich-text-clipboard/AC-017). */
    readonly droppedImages: number;
}

/** A property of `prototype` or an ancestor, never an instance's own, which a named element can shadow. */
const descriptorOf = (prototype: object, name: string): PropertyDescriptor => {
    for (
        let current: object | null = prototype;
        current !== null;
        current = Object.getPrototypeOf(current) as object | null
    ) {
        const descriptor = Object.getOwnPropertyDescriptor(current, name);
        if (descriptor !== undefined) {
            return descriptor;
        }
    }
    throw new Error(`The DOM implementation has no ${name}.`);
};

/**
 * Turns each `form` into a `div`, through prototype accessors only, since a control named `nodeType` or `firstChild`
 * shadows that property on its form and would hide the form's text from the parse (SPEC-rich-text-clipboard/AC-044).
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

/** Replaces each image with its `alt` text, so nothing fetches it, and counts them (SPEC-rich-text-clipboard/AC-017). */
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

/** WebKit and Chrome write a copied space as a span holding only U+00A0, which ProseMirror's own paste turns back (Event ownership). */
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

/** Each U+00A0 after a U+0020 outside code blocks as U+0020, reversing the space encoding of copied HTML (Paste order step 6). */
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

/**
 * Attributes as `decodeDocument` accepts them: a string longer than `maxAttributeLength` takes its default, and a
 * mark with no default for it goes, so the saved document still decodes as `editable` (SPEC-rich-text-clipboard/AC-041).
 */
const withValidAttributes = (fragment: Fragment, limits: ResourceLimits): Fragment => {
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
        nodes.push(
            node.type.create(
                valid(node.type, node.attrs) ?? node.attrs,
                withValidAttributes(node.content, limits),
                marks,
            ),
        );
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

/** Each heading at the nearest creatable level, or a paragraph when none is (SPEC-rich-text-clipboard/AC-015). */
const withLevels = (schema: Schema, fragment: Fragment, levels: readonly number[]): Fragment => {
    const nodes: Node[] = [];
    for (const node of fragment.content) {
        if (node.isLeaf) {
            nodes.push(node);
            continue;
        }
        if (node.type.name !== 'heading') {
            nodes.push(node.copy(withLevels(schema, node.content, levels)));
            continue;
        }
        const level = nearestLevel(node.attrs.level as number, levels);
        if (level !== undefined) {
            nodes.push(node.type.create({ ...node.attrs, level }, node.content, node.marks));
            continue;
        }
        const paragraph = schema.nodes.paragraph as Node['type'];
        const attrs = Object.fromEntries(
            Object.keys(paragraph.spec.attrs ?? {}).map((name) => [name, node.attrs[name]]),
        );
        nodes.push(paragraph.create(attrs, node.content, node.marks));
    }
    return Fragment.from(nodes);
};

/**
 * Paste order step 6 and the HTML checks of step 8: `html` parsed into an inert document of the host's DOM, cleaned,
 * read by the schema's parse rules, which are the only filter (DR-031), with spaces, attributes and heading levels
 * made valid.
 */
export const importHtml = (html: string, schema: Schema, window: Window, settings: HtmlSettings): ImportedHtml => {
    const dom = window as DomWindow;
    const inert = new dom.DOMParser().parseFromString(html, 'text/html');
    // An element named `body` shadows `document.body` (SPEC-rich-text-clipboard/AC-044).
    const body = (descriptorOf(dom.Document.prototype, 'body').get as () => HTMLElement | null).call(inert);
    if (body === null) {
        return { content: Fragment.empty, droppedImages: 0 };
    }
    replaceForms(dom, inert);
    removeNotes(body);
    const droppedImages = replaceImages(body);
    restoreSpaces(body);
    // The engine ignores `object` with its children; a skip rule keeps its fallback text (SPEC-rich-text-clipboard/AC-010).
    for (const nested of Array.from(body.querySelectorAll('object object, object embed, object param'))) {
        nested.remove();
    }
    const parser = new SchemaParser(schema, [{ tag: 'object', skip: true }, ...SchemaParser.fromSchema(schema).rules]);
    let content = withSpaces(schema, parser.parse(body).content);
    content = withValidAttributes(content, settings.limits);
    if (settings.headingLevels !== undefined) {
        content = withLevels(schema, content, settings.headingLevels);
    }
    return { content, droppedImages };
};
