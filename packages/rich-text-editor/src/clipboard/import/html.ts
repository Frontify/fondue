/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type ParseRule,
    DOMParser as SchemaParser,
    Fragment,
    type Mark,
    type Node,
    type Schema,
} from 'prosemirror-model';

import { type ContentModel, type ResourceLimits } from '#/model';
import { type CompiledParseRule, compiledModel, markHrefPolicy } from '#/model/compile';

import { descriptorOf } from './dom';
import { exceedsMarkupDepth } from './limits';
import { removeMarkup } from './markup';
import { withinLinkPolicy } from './policy';

/** The host's DOM implementation, whose constructors and prototypes the import reads. */
type DomWindow = Window & typeof globalThis;

export interface HtmlSettings {
    readonly limits: ResourceLimits;
    /** The creatable heading levels of the definition, or `undefined` to keep every level. */
    readonly headingLevels: readonly number[] | undefined;
    /** The model's function parse rules, which read an element before the schema's rules do. */
    readonly rules: readonly CompiledParseRule[];
}

type Answer = ReturnType<CompiledParseRule['read']>;

/** The answers of function rules, each read once before the parse, and the elements refused per mark or node name. */
interface Answers {
    readonly byRule: ReadonlyMap<CompiledParseRule, ReadonlyMap<Element, Answer>>;
    readonly refused: ReadonlyMap<string, ReadonlySet<Element>>;
}

/** The custom property on an element whose rule refuses mark `name`, since the engine clears a mark only by a style rule. */
const refusalOf = (name: string) => `--rte-refused-${name}`;

/**
 * Reads every function rule before the parse, then marks each element a mark rule refuses, so it, its own styles and
 * its content lose that mark, as CSS reads a `span` of normal weight inside a bold one.
 */
const readAnswers = (body: HTMLElement, rules: readonly CompiledParseRule[]): Answers => {
    const byRule = new Map<CompiledParseRule, Map<Element, Answer>>();
    const refused = new Map<string, Set<Element>>();
    for (const rule of rules) {
        const answers = new Map<Element, Answer>();
        byRule.set(rule, answers);
        for (const element of Array.from(body.querySelectorAll<HTMLElement>(rule.tag))) {
            const answer = rule.read(element);
            answers.set(element, answer);
            if (answer !== null) {
                continue;
            }
            const elements = refused.get(rule.name) ?? new Set<Element>();
            elements.add(element);
            refused.set(rule.name, elements);
        }
    }
    // Only once every rule has read the elements, so no rule reads the property.
    for (const rule of rules) {
        if (rule.kind !== 'mark') {
            continue;
        }
        for (const element of refused.get(rule.name) ?? []) {
            (element as HTMLElement).style.setProperty(refusalOf(rule.name), 'refused');
        }
    }
    return { byRule, refused };
};

/** The engine rules of function rules, ahead of the schema's; a mark rule leaves the element to later rules for other marks. */
const functionRules = (schema: Schema, rules: readonly CompiledParseRule[], answers: Answers): ParseRule[] =>
    rules.flatMap((rule): ParseRule[] => {
        const getAttrs = (element: HTMLElement) => answers.byRule.get(rule)?.get(element) ?? false;
        if (rule.kind === 'mark') {
            return schema.marks[rule.name] === undefined
                ? []
                : [{ tag: rule.tag, mark: rule.name, getAttrs, consuming: false }];
        }
        return schema.nodes[rule.name] === undefined ? [] : [{ tag: rule.tag, node: rule.name, getAttrs }];
    });

/** A schema tag rule that no longer reads an element that a function rule of its own mark or node refuses. */
const withRefusals = (rule: ParseRule, answers: Answers): ParseRule => {
    if (rule.tag === undefined) {
        return rule;
    }
    const owner = rule.mark ?? rule.node;
    const refused = answers.refused.get(owner ?? '');
    if (refused === undefined) {
        return rule;
    }
    const { getAttrs } = rule;
    const fixed = rule.attrs ?? null;
    return {
        ...rule,
        getAttrs: (element: HTMLElement) => {
            if (refused.has(element)) {
                return false;
            }
            if (getAttrs === undefined) {
                return fixed;
            }
            return getAttrs(element);
        },
    };
};

/** Style rules, after every other, that clear each refused mark from its marked elements. */
const clearingRules = (schema: Schema, answers: Answers): ParseRule[] =>
    [...answers.refused.keys()]
        .filter((name) => schema.marks[name] !== undefined)
        .map((name) => ({ style: refusalOf(name), clearMark: (mark: Mark) => mark.type.name === name }));

export interface ImportedHtml {
    readonly content: Fragment;
    /** Images dropped without fetching, for the announcement. */
    readonly droppedImages: number;
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

/**
 * Cuts each class attribute to `max` characters, since jsdom parses a class attribute again on each class query, in time
 * that grows with the square of its tokens. No parse rule reads a class that far in.
 */
const limitClasses = (body: HTMLElement, max: number) => {
    for (const element of [body, ...Array.from(body.querySelectorAll('[class]'))]) {
        const value = element.getAttribute('class');
        if (value !== null && value.length > max) {
            element.setAttribute('class', value.slice(0, max));
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
        // An outer element's replacement already detached and read the ones nested in it.
        if (!foreign.isConnected) {
            continue;
        }
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

/** Turns each cell of a table the schema cannot hold into a block, so each cell's text stays a paragraph. */
const replaceTables = (body: HTMLElement, schema: Schema) => {
    const holdsCells = SchemaParser.fromSchema(schema).rules.some(
        ({ tag }) => tag !== undefined && /^t[dh]\b/.test(tag),
    );
    if (holdsCells) {
        return;
    }
    for (const cell of Array.from(body.querySelectorAll('td, th'))) {
        const block = cell.ownerDocument.createElement('div');
        block.append(...Array.from(cell.childNodes));
        cell.replaceWith(block);
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
        // A span with any other attribute, such as a language mark's `lang`, holds a mark, not a copied space.
        const copied = span.classList.contains('Apple-converted-space') || span.attributes.length === 0;
        if (copied && span.childNodes.length === 1 && span.textContent === '\u00A0') {
            span.replaceWith(' ');
        }
    }
};

const SPACED = /(?<= )\u00A0/g;

/** Turns each U+00A0 after a U+0020 outside code blocks back into U+0020, reversing the space encoding of copied HTML. */
const withSpaces = (fragment: Fragment): Fragment => {
    const nodes: Node[] = [];
    for (const node of fragment.content) {
        if (node.isLeaf || node.type.spec.code === true) {
            nodes.push(node);
            continue;
        }
        if (!node.isTextblock) {
            nodes.push(node.copy(withSpaces(node.content)));
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
            inline.push(child.type.schema.text(text, child.marks));
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
 * Attributes as `decodeDocument` accepts them: a string but `href` longer than `maxAttributeLength` takes its default, and a
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
            // Decode exempts `href` from `maxAttributeLength`: the URL check bounds it.
            if (name === 'href' || typeof value !== 'string' || value.length <= limits.maxAttributeLength) {
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
        return { content: Fragment.empty, droppedImages: 0 };
    }
    // First, since a control of a form shadows what every later step reads.
    replaceForms(dom, inert);
    // Before any step that queries by class.
    limitClasses(body, settings.limits.maxAttributeLength);
    // Before the steps below, so they meet content only: a comment or `style` element between blocks would hide their adjacency.
    removeNotes(body);
    removeMarkup(body);
    // Before any step that reads `style`, which SVG and MathML elements lack in some DOM implementations.
    replaceForeign(body);
    const droppedImages = replaceImages(body);
    replaceTables(body, schema);
    restoreSpaces(body);
    removeObjectChildren(body);
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
    return { content, droppedImages };
};

/**
 * The import of `html` as the model reads it: its parse rules, then its link policy, the one order that
 * paste and `fromHTML` share.
 */
export const importModelHtml = (
    html: string,
    model: ContentModel,
    schema: Schema,
    window: Window,
    settings: Pick<HtmlSettings, 'limits' | 'headingLevels'>,
): ImportedHtml => {
    const imported = importHtml(html, schema, window, {
        ...settings,
        rules: compiledModel(model).parseRules,
    });
    return { ...imported, content: withinLinkPolicy(imported.content, markHrefPolicy(model, 'link')) };
};
