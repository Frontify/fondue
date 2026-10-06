/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AttributeSpec, type DOMOutputSpec, type MarkSpec, type NodeSpec, Schema } from 'prosemirror-model';

import {
    type AttributeDeclarations,
    type ContentModel,
    DefinitionError,
    type HtmlAttributeValue,
    type HtmlSpec,
    type JsonObject,
} from '#/model';
import { attributesOf, compiledModel, type SharedAttribute } from '#/model/compile';
import { ownValue } from '#/model/values';

type Values = Readonly<Record<string, unknown>>;

const GROUPS = { block: 'block section', section: 'section', inline: 'inline' } as const;

/** An attribute value as HTML attribute text; `undefined` for null, which writes no HTML attribute. */
const textOf = (value: unknown): string | undefined => {
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }
    return value === null || value === undefined ? undefined : JSON.stringify(value);
};

const readValue = (value: HtmlAttributeValue, values: Values, options: JsonObject) => {
    if (typeof value === 'string') {
        return value;
    }
    if ('attr' in value) {
        return textOf(values[value.attr]);
    }
    return textOf(options[value.option]);
};

/** The engine's DOM output for one `HtmlSpec`; a null attribute writes no HTML attribute. */
const render = (
    spec: HtmlSpec,
    values: Values,
    options: JsonObject,
    shared: readonly SharedAttribute[],
): DOMOutputSpec => {
    const [tag, second, third] = spec;
    const name = typeof tag === 'string' ? tag : ownValue(tag.tags, textOf(values[tag.attr]) ?? '');
    const attributes =
        typeof second === 'object' && !Array.isArray(second)
            ? (second as Readonly<Record<string, HtmlAttributeValue>>)
            : undefined;
    const dom: Record<string, string> = {};
    for (const [attribute, binding] of Object.entries(attributes ?? {})) {
        const value = readValue(binding, values, options);
        if (value !== undefined) {
            dom[attribute] = value;
        }
    }
    for (const { name: attribute, declaration } of shared) {
        const value = textOf(values[attribute]);
        if (value === undefined || declaration.html === undefined) {
            continue;
        }
        if ('attr' in declaration.html) {
            dom[declaration.html.attr] = value;
        } else {
            dom.style = `${dom.style ?? ''}${declaration.html.style}: ${value};`;
        }
    }
    const content = attributes === undefined ? second : third;
    const children: DOMOutputSpec[] = [];
    if (content === 0) {
        children.push(0 as unknown as DOMOutputSpec);
    } else if (Array.isArray(content)) {
        children.push(render(content as HtmlSpec, values, options, []));
    }
    return [name ?? 'span', dom, ...children];
};

const attributeSpecs = (declarations: AttributeDeclarations) => {
    const specs: Record<string, AttributeSpec> = {};
    for (const [name, declaration] of Object.entries(declarations)) {
        specs[name] = 'default' in declaration ? { default: declaration.default } : {};
    }
    return specs;
};

/** Builds the engine schema of a content model: nodes in declared order, marks by rank; an engine error becomes a `DefinitionError`. */
export const buildSchema = (model: ContentModel): Schema => {
    const compiled = compiledModel(model);
    const optionsOf = new Map(compiled.features.map(({ id, options }) => [id, options]));
    const nodes: Record<string, NodeSpec> = {};
    for (const node of compiled.nodes) {
        const { declaration, shared } = node;
        const options = optionsOf.get(node.featureId) ?? {};
        const spec: NodeSpec = {
            attrs: attributeSpecs(attributesOf(node)),
            toDOM: (instance) => render(declaration.html, instance.attrs, options, shared),
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
    const marks: Record<string, MarkSpec> = {};
    for (const { name, featureId, declaration } of compiled.marks) {
        const options = optionsOf.get(featureId) ?? {};
        const spec: MarkSpec = {
            attrs: attributeSpecs(declaration.attrs),
            toDOM: (instance) => render(declaration.html, instance.attrs, options, []),
        };
        if (declaration.excludes !== undefined) {
            spec.excludes = declaration.excludes.length === 0 ? '' : [...declaration.excludes, name].join(' ');
        }
        if (declaration.inclusive !== undefined) {
            spec.inclusive = declaration.inclusive;
        }
        marks[name] = spec;
    }
    try {
        return new Schema({ nodes, marks, topNode: 'doc' });
    } catch (error) {
        const engine = error instanceof Error ? error.message : String(error);
        throw new DefinitionError('definition.invalid-declaration', { engine });
    }
};
