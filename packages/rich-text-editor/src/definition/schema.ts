/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type AttributeSpec,
    type DOMOutputSpec,
    type MarkSpec,
    type Node,
    type NodeSpec,
    type ParseRule as EngineParseRule,
    Schema,
    type TagParseRule,
} from 'prosemirror-model';

import {
    type AttributeDeclaration,
    type AttributeDeclarations,
    checkHref,
    type ContentModel,
    DefinitionError,
    type HtmlSpec,
    type JsonObject,
    type ParseAttributeSource,
    type ParseRule,
} from '#/model';
import { hasNodeId } from '#/model/capabilities';
import { attributesOf, compiledModel, type SharedAttribute } from '#/model/compile';
import { ISLAND_BLOCK, ISLAND_INLINE, ISLAND_MARK } from '#/model/content';
import { resolveHtmlSpec } from '#/model/html-spec';
import { isValidValue, ownValue } from '#/model/values';

type Values = Readonly<Record<string, unknown>>;

const GROUPS = { block: 'block section', section: 'section', inline: 'inline' } as const;

/** The engine's DOM output for one `HtmlSpec`, from the layers the reader and codecs resolve too (SPEC-rich-text/AC-073). */
const render = (
    spec: HtmlSpec,
    values: Values,
    options: JsonObject,
    shared: readonly SharedAttribute[],
): DOMOutputSpec => {
    const { layers, content } = resolveHtmlSpec(spec, values, options, shared);
    let inner: readonly DOMOutputSpec[] = [];
    if (content) {
        inner = [0 as unknown as DOMOutputSpec];
    }
    for (const { tag, attrs } of [...layers].reverse()) {
        inner = [[tag, attrs, ...inner]];
    }
    return inner[0] as DOMOutputSpec;
};

/** Whether a node's type carries an occurrence `nodeId`, which the schema gives a null default below. */
export const carriesNodeId = (node: Node): boolean => hasNodeId(node.type.spec.attrs ?? {});

/** Declared attributes, then `unknownAttributes`, which holds what the vocabulary does not declare (SPEC-rich-text-format, Vocabulary). */
const attributeSpecs = (declarations: AttributeDeclarations) => {
    const specs: Record<string, AttributeSpec> = {};
    for (const [name, declaration] of Object.entries(declarations)) {
        if (name === 'nodeId') {
            // The runtime fills it before a commit publishes, so engine-made nodes may start without one; decode still requires it.
            specs[name] = { default: null };
            continue;
        }
        specs[name] = 'default' in declaration ? { default: declaration.default } : {};
    }
    specs.unknownAttributes = { default: null };
    return specs;
};

/** An HTML attribute or CSS value as its declaration types it, or `undefined` when it holds none. */
const valueOf = (text: string, declaration: AttributeDeclaration): unknown => {
    if (declaration.type === 'integer' || declaration.type === 'number') {
        if (text.trim() === '') {
            return undefined;
        }
        return Number(text);
    }
    if (declaration.type === 'url') {
        const href = checkHref(text);
        if (!href.ok) {
            return undefined;
        }
        return href.href;
    }
    return text;
};

const readSource = (element: HTMLElement, source: ParseAttributeSource, declaration: AttributeDeclaration) => {
    if ('value' in source) {
        return source.value;
    }
    if ('fromStyle' in source) {
        const text = element.style.getPropertyValue(source.fromStyle);
        if (text === '') {
            return undefined;
        }
        return valueOf(text, declaration);
    }
    let target: Element | null = element;
    if (source.child !== undefined) {
        target = element.querySelector(source.child);
    }
    let text: string | null = null;
    if (target !== null) {
        text = target.getAttribute(source.from);
    }
    if (source.equals !== undefined) {
        return text === source.equals;
    }
    if (declaration.type === 'boolean') {
        return text !== null;
    }
    if (text === null) {
        return undefined;
    }
    return valueOf(text, declaration);
};

/**
 * The engine rule of one tag rule, which reads every typed, composed and pasted DOM change. A value that fails its
 * declaration keeps the default; a rule that cannot fill an attribute with no default does not match.
 */
const tagRule = (
    rule: Extract<ParseRule, { readonly tag: string }>,
    declarations: AttributeDeclarations,
    specs: Readonly<Record<string, AttributeSpec>>,
): TagParseRule => {
    const sources = rule.attrs ?? {};
    const getAttrs = (element: HTMLElement) => {
        const attrs: Record<string, unknown> = {};
        for (const [name, declaration] of Object.entries(declarations)) {
            const source = ownValue(sources, name);
            let value: unknown;
            if (source !== undefined) {
                value = readSource(element, source, declaration);
            }
            if (value !== undefined && isValidValue(declaration, value)) {
                attrs[name] = value;
            } else if (!('default' in (specs[name] ?? {}))) {
                return false;
            }
        }
        return attrs;
    };
    return { tag: rule.tag, getAttrs };
};

/** Opaque islands keep stored content the model cannot hold as one non-editable atom (DR-041). */
const ISLAND_NODES: Readonly<Record<string, NodeSpec>> = {
    [ISLAND_BLOCK]: {
        group: GROUPS.block,
        atom: true,
        attrs: { original: {}, feature: { default: null }, unknownAttributes: { default: null } },
        toDOM: () => ['div'],
    },
    [ISLAND_INLINE]: {
        group: GROUPS.inline,
        inline: true,
        atom: true,
        attrs: { original: {}, feature: { default: null }, unknownAttributes: { default: null } },
        toDOM: () => ['span'],
    },
};
/** Excludes nothing, not even itself, so two different unknown marks share one text (SPEC-rich-text-format/AC-054). */
const ISLAND_MARK_SPEC: MarkSpec = {
    attrs: { original: {}, unknownAttributes: { default: null } },
    excludes: '',
    toDOM: () => ['span', 0],
};

/** Builds the engine schema of a content model: nodes in declared order, marks by rank; an engine error becomes a `DefinitionError`. */
export const buildSchema = (model: ContentModel): Schema => {
    const compiled = compiledModel(model);
    const optionsOf = new Map(compiled.features.map(({ id, options }) => [id, options]));
    const nodes: Record<string, NodeSpec> = {};
    for (const node of compiled.nodes) {
        const { declaration, shared } = node;
        const options = optionsOf.get(node.featureId) ?? {};
        const attributes = attributesOf(node);
        let specs: Record<string, AttributeSpec> = {};
        // A text node takes no attribute (SPEC-rich-text-format/AC-053).
        if (node.name !== 'text') {
            specs = attributeSpecs(attributes);
        }
        const spec: NodeSpec = {
            attrs: specs,
            toDOM: (instance) => render(declaration.html, instance.attrs, options, shared),
            // The engine reads style rules only for marks.
            parseDOM: declaration.parse.flatMap((rule) => ('tag' in rule ? [tagRule(rule, attributes, specs)] : [])),
        };
        if (declaration.content !== undefined) {
            spec.content = declaration.content;
        }
        if (declaration.group !== undefined) {
            spec.group = GROUPS[declaration.group];
            spec.inline = declaration.group === 'inline';
        }
        if (declaration.atom !== undefined) {
            spec.atom = declaration.atom;
        }
        if (declaration.marks !== undefined) {
            spec.marks = declaration.marks.join(' ');
        }
        if (declaration.whitespace === 'pre') {
            spec.code = true;
            spec.whitespace = 'pre';
        }
        nodes[node.name] = spec;
    }
    for (const [name, spec] of Object.entries(ISLAND_NODES)) {
        nodes[name] = spec;
    }
    const marks: Record<string, MarkSpec> = {};
    for (const { name, featureId, declaration } of compiled.marks) {
        const options = optionsOf.get(featureId) ?? {};
        const specs = attributeSpecs(declaration.attrs);
        const spec: MarkSpec = {
            attrs: specs,
            toDOM: (instance) => render(declaration.html, instance.attrs, options, []),
            parseDOM: declaration.parse.map(
                (rule): EngineParseRule =>
                    'tag' in rule ? tagRule(rule, declaration.attrs, specs) : { style: `${rule.style}=${rule.value}` },
            ),
        };
        if (declaration.excludes !== undefined) {
            spec.excludes = declaration.excludes.length === 0 ? '' : [...declaration.excludes, name].join(' ');
        }
        if (declaration.inclusive !== undefined) {
            spec.inclusive = declaration.inclusive;
        }
        marks[name] = spec;
    }
    marks[ISLAND_MARK] = ISLAND_MARK_SPEC;
    try {
        return new Schema({ nodes, marks, topNode: 'doc' });
    } catch (error) {
        const engine = error instanceof Error ? error.message : String(error);
        throw new DefinitionError('definition.invalid-declaration', { engine });
    }
};
