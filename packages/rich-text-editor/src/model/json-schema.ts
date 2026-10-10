/* (c) Copyright Frontify Ltd., all rights reserved. */

import { attributesOf, compiledModel } from './compile';
import { contentNames } from './content-expression';
import {
    type AttributeDeclarations,
    type ContentModel,
    type Feature,
    type JsonObject,
    type JsonValue,
    type ValueDeclaration,
} from './declarations';
import { DefinitionError } from './errors';
import { featureInternals } from './feature';

const KINDS: Readonly<Record<string, string>> = {
    string: 'string',
    url: 'string',
    id: 'string',
    color: 'string',
    language: 'string',
    integer: 'integer',
    number: 'number',
    boolean: 'boolean',
    list: 'array',
};
/** `url` and `language` cannot run `checkHref` or `Intl.getCanonicalLocales` here, so they get their length cap and a necessary shape. */
const EXTRA: Readonly<Record<string, JsonObject>> = {
    url: { maxLength: 2048 },
    id: { pattern: '^[a-z0-9][a-z0-9._:-]{0,127}$' },
    color: { pattern: '^#[0-9a-f]{6}([0-9a-f]{2})?$' },
    language: { pattern: '^[A-Za-z]{2,8}(-[A-Za-z0-9]{1,8})*$' },
};
const BOUNDS = [
    ['minLength', 'minLength'],
    ['maxLength', 'maxLength'],
    ['min', 'minimum'],
    ['max', 'maximum'],
    ['maxItems', 'maxItems'],
] as const;
/** What a feature schema says of a child node or mark: another feature's schema judges it. */
const OPEN: JsonObject = {
    type: 'object',
    additionalProperties: false,
    required: ['type'],
    properties: {
        type: { type: 'string' },
        attrs: { type: 'object' },
        content: { type: 'array' },
        marks: { type: 'array' },
        text: { type: 'string' },
    },
};
/** Decode reads an empty `content` or `marks` array as no key, so a node that holds none still accepts it. */
const NONE: JsonObject = { type: 'array', maxItems: 0 };

/** A declaration read as plain data, for the keywords it shares with JSON Schema. */
type Keywords = Readonly<Record<string, JsonValue | undefined>>;

const valueSchema = (declaration: ValueDeclaration): JsonObject => {
    const { type, nullable } = declaration;
    if (type === 'json') {
        return nullable ? {} : { not: { type: 'null' } };
    }
    const schema: Record<string, JsonValue> = {};
    if (type === 'enum') {
        schema.enum = nullable ? [...declaration.values, null] : declaration.values;
    } else {
        const kind = KINDS[type] ?? 'string';
        schema.type = nullable ? [kind, 'null'] : kind;
    }
    Object.assign(schema, EXTRA[type]);
    const keywords: Keywords = declaration;
    for (const [from, to] of BOUNDS) {
        const value = keywords[from];
        if (value !== undefined) {
            schema[to] = value;
        }
    }
    if (declaration.type === 'list') {
        schema.items = valueSchema(declaration.items);
    }
    return schema;
};

const attrsSchema = (attrs: AttributeDeclarations, exactlyOne: readonly string[] = []): JsonObject => {
    const entries = Object.entries(attrs);
    const schema: Record<string, JsonValue> = {
        type: 'object',
        additionalProperties: false,
        properties: Object.fromEntries(entries.map(([name, declaration]) => [name, valueSchema(declaration)])),
    };
    const required = entries.filter(([, declaration]) => !('default' in declaration)).map(([name]) => name);
    if (required.length > 0) {
        schema.required = required;
    }
    if (exactlyOne.length > 0) {
        // Exactly one branch holds when exactly one named attribute is non-null.
        schema.oneOf = exactlyOne.map((name) => ({
            required: [name],
            properties: { [name]: { not: { type: 'null' } } },
        }));
    }
    return schema;
};

const shape = (type: string, properties: JsonObject, required: readonly string[]): JsonObject => ({
    type: 'object',
    additionalProperties: false,
    required: ['type', ...required],
    properties: { type: { const: type }, ...properties },
});

const array = (items: JsonObject): JsonObject => ({ type: 'array', items });
const isEmpty = (names: readonly string[] | undefined) => names !== undefined && names.length === 0;

/** A node (`node`), or a mark; a node takes an empty `content` and `marks`, except `doc` no `marks` and `text` no `content`. */
const nodeShape = (
    name: string,
    attrs: AttributeDeclarations,
    exactlyOne: readonly string[] | undefined,
    content: JsonObject | undefined,
    marks: JsonObject | undefined,
    node = false,
): JsonObject => {
    const properties: Record<string, JsonValue> = {};
    const required: string[] = [];
    if (name === 'text') {
        properties.text = { type: 'string', minLength: 1 };
        required.push('text');
    } else {
        const schema = attrsSchema(attrs, exactlyOne);
        properties.attrs = schema;
        if ('required' in schema || 'oneOf' in schema) {
            required.push('attrs');
        }
    }
    // The root shape: a `doc` holds at least one child.
    if (name === 'doc') {
        required.push('content');
    }
    if (content !== undefined || (node && name !== 'text')) {
        properties.content = name === 'doc' ? { ...content, minItems: 1 } : (content ?? NONE);
    }
    if (marks !== undefined || (node && name !== 'doc')) {
        properties.marks = marks ?? NONE;
    }
    return shape(name, properties, required);
};

const choice = (options: readonly JsonObject[]): JsonObject => {
    const [only] = options;
    return options.length === 1 && only !== undefined ? only : { oneOf: options };
};
const refTo = (key: string): JsonObject => ({ $ref: `#/$defs/${encodeURIComponent(key)}` });
const identity = (id: JsonObject): JsonObject => ({
    type: 'object',
    additionalProperties: false,
    required: ['id', 'version'],
    properties: { id, version: { type: 'integer' } },
});

const featureSchema = (feature: Feature): JsonObject => {
    const internals = featureInternals(feature);
    if (internals === undefined) {
        throw new DefinitionError('definition.invalid-declaration', { path: '' });
    }
    const { id, nodes = {}, marks = {}, attributes = {} } = internals.declaration;
    const defs: Record<string, JsonObject> = {};
    for (const [name, declaration] of Object.entries(nodes)) {
        const takesMarks = declaration.group === 'inline' && !isEmpty(declaration.marks);
        defs[`n.${name}`] = nodeShape(
            name,
            declaration.attrs,
            declaration.exactlyOne,
            declaration.content === undefined ? undefined : array(OPEN),
            takesMarks ? array(OPEN) : undefined,
            true,
        );
    }
    for (const [name, declaration] of Object.entries(marks)) {
        defs[`m.${name}`] = nodeShape(name, declaration.attrs, declaration.exactlyOne, undefined, undefined);
    }
    for (const [name, shared] of Object.entries(attributes)) {
        defs[`a.${name}`] = valueSchema(shared.value);
    }
    const members = Object.keys(defs).filter((key) => !key.startsWith('a.'));
    return {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        title: id,
        ...(members.length > 0 ? { oneOf: members.map(refTo) } : {}),
        $defs: defs,
    };
};

const modelSchema = (model: ContentModel): JsonObject => {
    const { nodes, marks } = compiledModel(model);
    const nodeBy = new Map(nodes.map((node) => [node.name, node]));
    const markBy = new Map(marks.map((mark) => [mark.name, mark]));
    const markNames = marks.map(({ name }) => name);
    const groups = new Map<string, string[]>();
    const join = (group: string, name: string) => groups.set(group, [...(groups.get(group) ?? []), name]);
    for (const { name, declaration } of nodes) {
        const { group } = declaration;
        if (group === 'block') {
            join('block', name);
        }
        if (group !== undefined) {
            join(group === 'block' ? 'section' : group, name);
        }
    }
    const members = (term: string) => (nodeBy.has(term) ? [term] : (groups.get(term) ?? []));
    const childrenOf = (content: string | undefined) => {
        const terms = content === undefined ? undefined : contentNames(content);
        return [...new Set((terms ?? []).flatMap(members))];
    };

    const defs: Record<string, JsonObject> = {};
    /** Registers a definition once, before building it, so a node that holds itself refers back to it. */
    const define = (key: string, build: () => JsonObject) => {
        if (!Object.hasOwn(defs, key)) {
            defs[key] = {};
            defs[key] = build();
        }
        return refTo(key);
    };
    const markRef = (name: string) =>
        define(`m.${name}`, () => {
            const mark = markBy.get(name);
            if (mark === undefined) {
                return {};
            }
            return nodeShape(name, mark.declaration.attrs, mark.declaration.exactlyOne, undefined, undefined);
        });
    /** `listed` is the mark list of the parent whose content holds the node. */
    const nodeRef = (name: string, listed: readonly string[] | undefined): JsonObject => {
        const node = nodeBy.get(name);
        if (node === undefined) {
            return {};
        }
        const { declaration } = node;
        const inline = declaration.group === 'inline';
        let names: readonly string[] = [];
        if (inline && !isEmpty(declaration.marks) && !isEmpty(listed)) {
            names = listed ?? markNames;
        }
        const variant = inline && names !== markNames ? `@${names.join(',')}` : '';
        return define(`n.${name}${variant}`, () => {
            const kids = childrenOf(declaration.content);
            return nodeShape(
                name,
                attributesOf(node),
                declaration.exactlyOne,
                declaration.content === undefined
                    ? undefined
                    : array(choice(kids.map((kid) => nodeRef(kid, declaration.marks)))),
                names.length === 0 ? undefined : array(choice(names.map(markRef))),
                true,
            );
        });
    };

    return {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        type: 'object',
        additionalProperties: false,
        required: ['format', 'formatVersion', 'model', 'requiredCapabilities', 'content'],
        properties: {
            format: { const: 'frontify.rich-text' },
            formatVersion: { const: 1 },
            model: identity({ const: model.ref.id }),
            requiredCapabilities: { type: 'array', uniqueItems: true, items: identity({ type: 'string' }) },
            content: nodeRef('doc', undefined),
        },
        $defs: defs,
    };
};

/**
 * A JSON Schema 2020-12 document for a model's stored envelope and vocabulary, or for one feature's nodes and
 * marks from its declaration alone. Content expressions, `checkHref`,
 * `Intl.getCanonicalLocales` and the cross-node rules of decode are not expressible, so decode stays the check.
 */
export const toJsonSchema = (source: ContentModel | Feature): JsonObject =>
    'ref' in source ? modelSchema(source) : featureSchema(source);
