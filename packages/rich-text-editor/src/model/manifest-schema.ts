/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CAPABILITY_NAMES } from './capabilities';
import { type JsonObject, type JsonValue } from './declarations';
import { pointer } from './errors';
import { isRecord, MAX_DEPTH } from './values';

const ref = (name: string) => ({ $ref: `#/$defs/${name}` });
const string = { type: 'string' };
const strings = { type: 'array', items: string };
const object = (properties: JsonObject, required: readonly string[] = [], allOf: readonly JsonObject[] = []) => ({
    type: 'object',
    properties,
    required,
    additionalProperties: false,
    ...(allOf.length === 0 ? {} : { allOf }),
});
const record = (values: JsonValue) => ({ type: 'object', additionalProperties: values });
const optionRef = object({ option: string }, ['option']);
const binding = { anyOf: [object({ attr: string }, ['attr']), object({ style: string }, ['style'])] };
const content = { anyOf: [{ const: 0 }, ref('html')] };
/** A Markdown form: 1 to 4 Markdown punctuation characters, then at most one space; none opens HTML, an entity or a link. */
const form = { type: 'string', pattern: '^[!"#$%\'*+,\\-./:;=>?@^_`{|}~]{1,4} ?$' };
/**
 * A fence form: a backtick or tilde run of 3 or 4, which is a code fence, or a form with no space, no backtick and
 * no leading tilde run of 3, so it neither opens a code fence nor a code span around the body.
 */
const fence = { type: 'string', pattern: '^(?:`{3,4}|~{3,4}|(?!~~~)[!"#$%\'*+,\\-./:;=>?@^_{|}~]{1,4})$' };
/** A node's Markdown form: exactly one of a line `prefix` or a `fence`; compilation checks code features against it too. */
export const nodeMarkdownSchema = object(
    { prefix: form, fence },
    [],
    [
        {
            anyOf: [
                { required: ['prefix'], properties: { fence: false } },
                { required: ['fence'], properties: { prefix: false } },
            ],
        },
    ],
);
/** A mark's Markdown form: `open` and `close` delimiters. */
export const markMarkdownSchema = object({ open: form, close: form }, ['open', 'close']);
/** The members an object needs when its `member` has the value `value`. */
const when = (member: string, value: string, required: readonly string[]) => ({
    if: { properties: { [member]: { const: value } }, required: [member] },
    then: { required },
});

/** JSON Schema 2020-12 of `FeatureManifest`: the published manifest schema (SPEC-rich-text/AC-064). */
export const featureManifestSchema: JsonObject = {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: 'https://fondue.frontify.com/schemas/rich-text-editor/feature-manifest.json',
    ...object(
        {
            id: string,
            version: ref('version'),
            requires: { type: 'array', items: object({ id: string, version: ref('version') }, ['id', 'version']) },
            options: record(ref('value')),
            nodes: record(ref('node')),
            marks: record(ref('mark')),
            attributes: record(ref('attribute')),
            formats: object(
                {
                    html: { enum: ['lossless', 'lossy'] },
                    text: { enum: ['lossless', 'lossy', 'unsupported'] },
                    markdown: { enum: ['lossless', 'lossy', 'unsupported'] },
                },
                ['html', 'text', 'markdown'],
            ),
            commands: record(ref('command')),
            keys: record(ref('commandRef')),
            inputRules: { type: 'array', items: ref('inputRule') },
            toolbar: { type: 'array', items: ref('toolbarEntry') },
        },
        ['id', 'version'],
    ),
    $defs: {
        version: { type: 'integer', minimum: 1 },
        value: object(
            {
                type: {
                    enum: [
                        'string',
                        'url',
                        'id',
                        'color',
                        'language',
                        'integer',
                        'number',
                        'boolean',
                        'enum',
                        'list',
                        'json',
                    ],
                },
                default: {},
                nullable: { type: 'boolean' },
                required: { const: true },
                optional: { type: 'boolean' },
                minLength: { type: 'integer', minimum: 0 },
                maxLength: { type: 'integer', minimum: 0 },
                min: { type: 'number' },
                max: { type: 'number' },
                values: strings,
                items: ref('value'),
                maxItems: { type: 'integer', minimum: 0 },
            },
            ['type'],
            [when('type', 'enum', ['values']), when('type', 'list', ['items'])],
        ),
        html: {
            type: 'array',
            minItems: 1,
            maxItems: 3,
            prefixItems: [
                { anyOf: [string, object({ attr: string, tags: record(string) }, ['attr', 'tags'])] },
                { anyOf: [content, record({ anyOf: [string, object({ attr: string }, ['attr']), optionRef] })] },
                content,
            ],
            /** Content in second place ends the spec. */
            if: { prefixItems: [{}, { anyOf: [{ const: 0 }, { type: 'array' }] }] },
            then: { maxItems: 2 },
        },
        parseRule: object(
            {
                tag: string,
                style: string,
                value: string,
                attrs: record(object({ from: string, equals: string, child: string, fromStyle: string, value: {} })),
            },
            [],
            [{ anyOf: [{ required: ['tag'] }, { required: ['style', 'value'] }] }],
        ),
        node: object(
            {
                group: { enum: ['block', 'inline', 'section'] },
                content: string,
                atom: { type: 'boolean' },
                marks: strings,
                whitespace: { enum: ['normal', 'pre'] },
                attrs: record(ref('value')),
                exactlyOne: strings,
                html: ref('html'),
                parse: { type: 'array', items: ref('parseRule') },
                markdown: nodeMarkdownSchema,
            },
            ['attrs', 'html', 'parse'],
        ),
        mark: object(
            {
                attrs: record(ref('value')),
                exactlyOne: strings,
                html: ref('html'),
                parse: { type: 'array', items: ref('parseRule') },
                markdown: markMarkdownSchema,
                excludes: strings,
                rank: { type: 'integer' },
                inclusive: { type: 'boolean' },
            },
            ['attrs', 'html', 'parse'],
        ),
        attribute: object(
            { on: { anyOf: [{ const: 'textblocks' }, strings] }, value: ref('value'), html: binding, parse: binding },
            ['on', 'value'],
        ),
        guard: object({ option: string, equals: {} }, ['option', 'equals']),
        payload: object({ fields: record(ref('value')), nullable: { type: 'boolean' }, exactlyOne: strings }, [
            'fields',
        ]),
        command: {
            type: 'object',
            properties: { capability: { enum: CAPABILITY_NAMES }, payload: ref('payload'), when: ref('guard') },
            required: ['capability'],
        },
        commandRef: {
            anyOf: [
                string,
                object({ command: string, payload: {}, labelKey: string, when: ref('guard') }, ['command']),
            ],
        },
        inputRule: object(
            {
                id: string,
                kind: { enum: ['line-start', 'mark-delimiter', 'text-replace', 'quotes'] },
                command: string,
                markers: {
                    type: 'array',
                    items: { anyOf: [string, object({ marker: string, payload: {} }, ['marker', 'payload'])] },
                },
                open: string,
                close: string,
                mark: string,
                find: string,
                replace: string,
                boundary: { const: 'word' },
                marker: { enum: ['"', "'"] },
            },
            ['id', 'kind'],
            [
                when('kind', 'line-start', ['command', 'markers']),
                when('kind', 'mark-delimiter', ['open', 'close', 'mark']),
                when('kind', 'text-replace', ['find', 'replace']),
                when('kind', 'quotes', ['marker']),
            ],
        ),
        toolbarEntry: object(
            {
                kind: { enum: ['toggle', 'button', 'menu'] },
                command: string,
                payload: {},
                label: { type: 'object', required: ['en-US'], additionalProperties: string },
                icon: { type: 'string', pattern: '^Icon[A-Z][A-Za-z0-9]*$' },
                items: { type: 'array', items: ref('commandRef') },
                when: ref('guard'),
            },
            ['kind', 'command', 'label', 'icon'],
            [when('kind', 'menu', ['items'])],
        ),
    },
};

const matchesType = (type: JsonValue | undefined, value: unknown) => {
    switch (type) {
        case undefined:
            return true;
        case 'object':
            return isRecord(value);
        case 'array':
            return Array.isArray(value);
        case 'integer':
            return Number.isInteger(value);
        default:
            return typeof value === type;
    }
};

const definitions = featureManifestSchema.$defs as Readonly<Record<string, JsonObject>>;

/** The JSON Pointer of the first value that breaks `schema`, for the subset of JSON Schema the manifest schema uses. */
export const findSchemaViolation = (
    schema: JsonObject,
    value: unknown,
    path: string,
    depth = 0,
): string | undefined => {
    if (depth > MAX_DEPTH) {
        return path;
    }
    if (typeof schema.$ref === 'string') {
        const target = definitions[schema.$ref.replace('#/$defs/', '')];
        return target === undefined ? path : findSchemaViolation(target, value, path, depth);
    }
    const anyOf = schema.anyOf as readonly JsonObject[] | undefined;
    const failsAnyOf =
        anyOf !== undefined && anyOf.every((option) => findSchemaViolation(option, value, path, depth) !== undefined);
    const failsEnum = Array.isArray(schema.enum) && !schema.enum.includes(value as JsonValue);
    if (!matchesType(schema.type, value) || failsAnyOf || failsEnum || ('const' in schema && schema.const !== value)) {
        return path;
    }
    if (typeof value === 'string' && typeof schema.pattern === 'string' && !new RegExp(schema.pattern).test(value)) {
        return path;
    }
    if (typeof value === 'number' && typeof schema.minimum === 'number' && value < schema.minimum) {
        return path;
    }
    if (Array.isArray(value)) {
        const tooShort = typeof schema.minItems === 'number' && value.length < schema.minItems;
        if (tooShort || (typeof schema.maxItems === 'number' && value.length > schema.maxItems)) {
            return path;
        }
        const prefix = (schema.prefixItems ?? []) as readonly JsonObject[];
        for (const [index, item] of value.entries()) {
            const itemSchema = index < prefix.length ? prefix[index] : (schema.items as JsonObject | undefined);
            const found =
                itemSchema === undefined
                    ? undefined
                    : findSchemaViolation(itemSchema, item, `${path}/${index}`, depth + 1);
            if (found !== undefined) {
                return found;
            }
        }
    }
    if (isRecord(value)) {
        const missing = ((schema.required ?? []) as readonly string[]).find((name) => !Object.hasOwn(value, name));
        if (missing !== undefined) {
            return `${path}${pointer(missing)}`;
        }
        const properties = (schema.properties ?? {}) as Readonly<Record<string, JsonObject>>;
        for (const [name, item] of Object.entries(value)) {
            const additional = schema.additionalProperties;
            const itemSchema = Object.hasOwn(properties, name) ? properties[name] : additional;
            const at = `${path}${pointer(name)}`;
            if (itemSchema === false) {
                return at;
            }
            const found = isRecord(itemSchema) ? findSchemaViolation(itemSchema, item, at, depth + 1) : undefined;
            if (found !== undefined) {
                return found;
            }
        }
    }
    for (const part of (schema.allOf ?? []) as readonly JsonObject[]) {
        const found = findSchemaViolation(part, value, path, depth);
        if (found !== undefined) {
            return found;
        }
    }
    const condition = schema.if as JsonObject | undefined;
    if (condition !== undefined && findSchemaViolation(condition, value, path, depth) === undefined) {
        return findSchemaViolation(schema.then as JsonObject, value, path, depth);
    }
    return undefined;
};
