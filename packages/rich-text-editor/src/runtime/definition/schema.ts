/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type AttributeSpec,
    type DOMOutputSpec,
    Fragment,
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
import {
    hasNodeId,
    attributesOf,
    compiledModel,
    type SharedAttribute,
    ISLAND_BLOCK,
    ISLAND_INLINE,
    ISLAND_MARK,
    resolveHtmlSpec,
    ownValue,
    parsedAttributes,
} from '#/model/internal';

type Values = Readonly<Record<string, unknown>>;

const GROUPS = { block: 'block section', section: 'section', inline: 'inline' } as const;

/** The engine's DOM output for one `HtmlSpec`, from the layers the reader and codecs resolve too. */
const render = (
    spec: HtmlSpec,
    values: Values,
    options: JsonObject,
    shared: readonly SharedAttribute[],
): DOMOutputSpec => {
    const { layers, content } = resolveHtmlSpec(spec, values, options, shared);
    let inner: readonly unknown[] = [];
    if (content) {
        inner = [0];
    }

    for (const { tag, attrs } of [...layers].reverse()) {
        inner = [[tag, attrs, ...inner]];
    }

    return inner[0] as DOMOutputSpec;
};

/** Whether a node's type carries an occurrence `nodeId`, which the schema gives a null default below. */
export const carriesNodeId = (node: Node): boolean => hasNodeId(node.type.spec.attrs ?? {});

/** `fragment` with each `nodeId` that a node carries set to the next value. */
export const withNodeIds = (fragment: Fragment, next: () => string | null): Fragment => {
    const nodes: Node[] = [];
    for (const node of fragment.content) {
        if (node.isText) {
            nodes.push(node);
            continue;
        }

        let { attrs } = node;
        if (carriesNodeId(node)) {
            attrs = { ...attrs, nodeId: next() };
        }

        nodes.push(node.type.create(attrs, withNodeIds(node.content, next), node.marks));
    }

    return Fragment.from(nodes);
};

/**
 * Declared attributes, then `unknownAttributes`, which holds what the vocabulary does not declare. With `generated`,
 * every required attribute gets a null default too, for a leaf the engine must be able to create where its parent
 * requires it, such as a figure's image; decode and parse rules still require the values.
 */
const attributeSpecs = (declarations: AttributeDeclarations, generated = false) => {
    const specs: Record<string, AttributeSpec> = {};
    for (const [name, declaration] of Object.entries(declarations)) {
        if (name === 'nodeId' || (generated && !('default' in declaration))) {
            // The runtime fills it before a commit publishes, so engine-made nodes may start without one; decode still requires it.
            specs[name] = { default: null };
            continue;
        }

        specs[name] = 'default' in declaration ? { default: declaration.default } : {};
    }

    specs.unknownAttributes = { default: null };

    return specs;
};

// The engine's message for a required position that only nodes with required attributes can fill.
const NON_GENERATABLE = /Only non-generatable nodes \(([^)]*)\) in a required position/;

const RGB = /^rgba?\((\d+), ?(\d+), ?(\d+)(?:, ?([\d.]+))?\)$/;

/** A CSS colour as the `#rrggbb` or `#rrggbbaa` of a `color` value, since DOM implementations report `rgb()`. */
const hexOf = (text: string) => {
    const rgb = RGB.exec(text);
    if (rgb === null) {
        return text.toLowerCase();
    }

    const channels = rgb.slice(1, 4).map(Number);
    if (rgb[4] !== undefined) {
        channels.push(Math.round(Number(rgb[4]) * 255));
    }

    return `#${channels.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
};

/** An HTML attribute or CSS value as its declaration types it, or `undefined` when it holds none. */
const valueOf = (text: string, declaration: AttributeDeclaration): unknown => {
    if (declaration.type === 'color') {
        return hexOf(text);
    }

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

/** The value one parse source gives an attribute from `element`, or `undefined` when the element holds none. */
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

    // HTML matches `dir` values in any case, so `RTL` is `rtl`.
    if (text !== null && source.from.toLowerCase() === 'dir') {
        text = text.toLowerCase();
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
    rule: Extract<ParseRule, { tag: string }>,
    declarations: AttributeDeclarations,
    shared: readonly SharedAttribute[],
    exactlyOne: readonly string[] = [],
): TagParseRule => {
    const sources: Record<string, ParseAttributeSource> = {};
    for (const { name, declaration } of shared) {
        const { parse } = declaration;
        if (parse === undefined) {
            continue;
        }

        if ('style' in parse) {
            sources[name] = { fromStyle: parse.style };
        } else {
            sources[name] = { from: parse.attr };
        }
    }

    Object.assign(sources, rule.attrs);
    const getAttrs = (element: HTMLElement) =>
        parsedAttributes(declarations, exactlyOne, (name, declaration) => {
            const source = ownValue(sources, name);
            if (source === undefined) {
                return undefined;
            }

            return readSource(element, source, declaration);
        }) ?? false;
    const engine: TagParseRule = { tag: rule.tag, getAttrs };
    // A tag with a class or attribute wins over another feature's bare tag.
    if (/[.[]/.test(rule.tag)) {
        engine.priority = 51;
    }

    return engine;
};

/** Opaque islands keep stored content the model cannot hold as one non-editable atom. */
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
/** Excludes nothing, not even itself, so two different unknown marks share one text. */
const ISLAND_MARK_SPEC: MarkSpec = {
    attrs: { original: {}, unknownAttributes: { default: null } },
    excludes: '',
    toDOM: () => ['span', 0],
};

type CompiledSchema = ReturnType<typeof compiledModel>;

/** The node specs of the model, in declared order, then the island nodes. */
const nodeSpecs = (compiled: CompiledSchema, optionsOf: ReadonlyMap<string, JsonObject>): Record<string, NodeSpec> => {
    const nodes: Record<string, NodeSpec> = {};
    for (const node of compiled.nodes) {
        const { declaration, shared } = node;
        const options = optionsOf.get(node.featureId) ?? {};
        const attributes = attributesOf(node);
        let specs: Record<string, AttributeSpec> = {};
        // A text node takes no attribute.
        if (node.name !== 'text') {
            specs = attributeSpecs(attributes);
        }

        const spec: NodeSpec = {
            attrs: specs,
            toDOM: (instance) => render(declaration.html, instance.attrs, options, shared),
            // The engine reads style rules only for marks.
            parseDOM: declaration.parse.flatMap((rule) =>
                'tag' in rule ? [tagRule(rule, attributes, shared, declaration.exactlyOne)] : [],
            ),
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

    return nodes;
};

/** The mark specs of the model, by rank, then the island mark. */
const markSpecs = (compiled: CompiledSchema, optionsOf: ReadonlyMap<string, JsonObject>): Record<string, MarkSpec> => {
    const marks: Record<string, MarkSpec> = {};
    for (const { name, featureId, declaration } of compiled.marks) {
        const options = optionsOf.get(featureId) ?? {};
        const specs = attributeSpecs(declaration.attrs);
        const spec: MarkSpec = {
            attrs: specs,
            toDOM: (instance) => render(declaration.html, instance.attrs, options, []),
            parseDOM: declaration.parse.map(
                (rule): EngineParseRule =>
                    'tag' in rule
                        ? tagRule(rule, declaration.attrs, [], declaration.exactlyOne)
                        : { style: `${rule.style}=${rule.value}` },
            ),
        };
        if (declaration.excludes !== undefined) {
            spec.excludes = '';
            if (declaration.excludes.length > 0) {
                spec.excludes = [...declaration.excludes, name].join(' ');
            }
        }

        if (declaration.inclusive !== undefined) {
            spec.inclusive = declaration.inclusive;
        }

        // Input rules never fire inside inline code.
        if (name === 'code') {
            spec.code = true;
        }

        marks[name] = spec;
    }

    marks[ISLAND_MARK] = ISLAND_MARK_SPEC;

    return marks;
};

/** Builds the schema, and gives null defaults to leaves the engine cannot create until it can. */
const schemaOf = (
    compiled: CompiledSchema,
    nodes: Record<string, NodeSpec>,
    marks: Record<string, MarkSpec>,
): Schema => {
    // The leaves the engine reports it cannot create in a required position get null defaults, and only those.
    const leaves = new Map(
        compiled.nodes
            .filter(({ name, declaration }) => name !== 'text' && declaration.content === undefined)
            .map((node) => [node.name, attributesOf(node)]),
    );
    const generated = new Set<string>();
    for (;;) {
        try {
            return new Schema({ nodes, marks, topNode: 'doc' });
        } catch (error) {
            const engine = error instanceof Error ? error.message : String(error);
            const names = NON_GENERATABLE.exec(engine)?.[1];
            let named: string[] = [];
            if (names !== undefined) {
                named = names.split(', ');
            }

            const fixable = named.filter((name) => leaves.has(name) && !generated.has(name));
            if (fixable.length === 0) {
                throw new DefinitionError('definition.invalid-declaration', { engine });
            }

            for (const name of fixable) {
                generated.add(name);
                nodes[name] = { ...nodes[name], attrs: attributeSpecs(leaves.get(name) ?? {}, true) };
            }
        }
    }
};

/** Builds the engine schema of a content model: nodes in declared order, marks by rank; an engine error becomes a `DefinitionError`. */
export const buildSchema = (model: ContentModel): Schema => {
    const compiled = compiledModel(model);
    const optionsOf = new Map(compiled.features.map(({ id, options }) => [id, options]));

    return schemaOf(compiled, nodeSpecs(compiled, optionsOf), markSpecs(compiled, optionsOf));
};
