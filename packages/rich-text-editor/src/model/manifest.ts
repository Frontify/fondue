/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type CommandDefinition,
    type FeatureDeclaration,
    type FeatureFactory,
    type FeatureManifest,
    type HtmlAttributeValue,
    type HtmlSpec,
    type JsonObject,
    type JsonValue,
    type MarkDeclaration,
    type NodeDeclaration,
    type ParseRule,
} from './declarations';
import { DefinitionError, pointer } from './errors';
import { createFeature } from './feature';
import { featureManifestSchema, findSchemaViolation } from './manifest-schema';
import { findUnsafeJson, snapshot } from './values';

/** The tags a manifest `html` spec and its parse rules may name (SPEC-rich-text, Feature contract). */
const MANIFEST_TAGS = new Set(
    (
        'p h1 h2 h3 h4 h5 h6 blockquote pre code ul ol li dl dt dd table thead tbody tfoot tr th td caption figure ' +
        'figcaption section aside details summary div span a strong em b i u s sub sup mark small abbr cite q kbd ' +
        'samp var time hr br'
    ).split(' '),
);
const MANIFEST_ATTRIBUTES = new Set(
    'aria-label aria-describedby title lang dir colspan rowspan start scope href class'.split(' '),
);
const DATA_ATTRIBUTE = /^data-[a-z0-9-]+$/;
/** First segments of shipped feature IDs, which no customer vendor may take. */
const RESERVED_VENDORS = new Set(
    'a11y blocks core emoji format input-rules layout links lists marks media mentions nav styles tables'.split(' '),
);
const VENDOR_ID = /^([a-z][a-z0-9-]*)\.[a-z0-9][a-z0-9.-]*$/;

const invalid = (path: string) => new DefinitionError('definition.invalid-manifest', { path });

/** A Markdown form: 1 to 4 Markdown punctuation characters, then at most one space; none opens HTML, an entity or a link. */
const MARKDOWN_FORM = /^[!"#$%'*+,\-./:;=>?@^_`{|}~]{1,4} ?$/;

const checkMarkdown = (form: Readonly<Record<string, string>> | undefined, path: string) => {
    for (const [name, value] of Object.entries(form ?? {})) {
        if (!MARKDOWN_FORM.test(value)) {
            throw invalid(`${path}${pointer(name)}`);
        }
    }
};

const isManifestAttribute = (name: string) => DATA_ATTRIBUTE.test(name) || MANIFEST_ATTRIBUTES.has(name);

const checkAttribute = (name: string, value: HtmlAttributeValue, path: string) => {
    const allowed = isManifestAttribute(name);
    const literal = typeof value === 'string';
    const bound = !literal && 'attr' in value;
    if (!allowed || (name === 'class' && !literal) || (name === 'href' && !bound)) {
        throw invalid(path);
    }
};

const checkHtml = (spec: HtmlSpec, path: string): void => {
    const [tag, second, third] = spec;
    const tags = typeof tag === 'string' ? [tag] : Object.values(tag.tags);
    if (!tags.every((name) => MANIFEST_TAGS.has(name))) {
        throw invalid(`${path}/0`);
    }
    const attributes =
        typeof second === 'object' && !Array.isArray(second)
            ? (second as Readonly<Record<string, HtmlAttributeValue>>)
            : undefined;
    for (const [name, value] of Object.entries(attributes ?? {})) {
        checkAttribute(name, value, `${path}/1${pointer(name)}`);
    }
    const content = attributes === undefined ? second : third;
    if (Array.isArray(content)) {
        checkHtml(content as HtmlSpec, `${path}/${attributes === undefined ? 1 : 2}`);
    }
};

/** A manifest tag, optionally with class names: no list, combinator, universal or attribute selector. */
const isManifestSelector = (selector: string) => {
    const tag = /^([a-z][a-z0-9]*)(?:\.[\w-]+)*$/i.exec(selector)?.[1];
    return tag !== undefined && MANIFEST_TAGS.has(tag.toLowerCase());
};

const checkParse = (rules: readonly ParseRule[], path: string) => {
    for (const [index, rule] of rules.entries()) {
        if ('tag' in rule && !isManifestSelector(rule.tag)) {
            throw invalid(`${path}/${index}/tag`);
        }
        for (const [name, source] of Object.entries('attrs' in rule ? (rule.attrs ?? {}) : {})) {
            if ('child' in source && source.child !== undefined && !isManifestSelector(source.child)) {
                throw invalid(`${path}/${index}/attrs${pointer(name)}/child`);
            }
        }
    }
};

const checkVendor = (manifest: FeatureManifest) => {
    const vendor = VENDOR_ID.exec(manifest.id);
    if (vendor === null || RESERVED_VENDORS.has(vendor[1] ?? '')) {
        throw invalid('/id');
    }
    for (const [member, separator] of [
        ['nodes', '_'],
        ['marks', '_'],
        ['commands', '.'],
    ] as const) {
        for (const name of Object.keys(manifest[member] ?? {})) {
            if (!name.startsWith(`${vendor[1]}${separator}`)) {
                throw invalid(pointer(member, name));
            }
        }
    }
};

const toDeclaration = (manifest: FeatureManifest): FeatureDeclaration => {
    const commands: Record<string, CommandDefinition<unknown>> = {};
    for (const [id, data] of Object.entries(manifest.commands ?? {})) {
        const { capability, payload, when, ...args } = data;
        const definition: Record<string, JsonValue> = { capability, args: args as JsonObject };
        if (payload !== undefined) {
            definition.payload = payload as unknown as JsonObject;
        }
        if (when !== undefined) {
            definition.when = when as unknown as JsonObject;
        }
        commands[id] = definition as unknown as CommandDefinition<unknown>;
    }
    return { ...(manifest as unknown as FeatureDeclaration), commands };
};

/** Validates remote or local JSON against `featureManifestSchema` and the manifest rules; throws `DefinitionError`. */
export const featureFromManifest = (
    input: unknown,
): FeatureFactory<Readonly<Record<string, JsonValue>>, object, object, object> => {
    const manifest = snapshot(input) as FeatureManifest;
    const violation = findUnsafeJson(input, '') ?? findSchemaViolation(featureManifestSchema, manifest, '');
    if (violation !== undefined) {
        throw invalid(violation);
    }
    checkVendor(manifest);
    for (const member of ['nodes', 'marks'] as const) {
        const declarations: Readonly<Record<string, NodeDeclaration | MarkDeclaration>> = manifest[member] ?? {};
        for (const [name, declaration] of Object.entries(declarations)) {
            checkHtml(declaration.html, pointer(member, name, 'html'));
            checkParse(declaration.parse, pointer(member, name, 'parse'));
            checkMarkdown(declaration.markdown, pointer(member, name, 'markdown'));
        }
    }
    for (const [name, shared] of Object.entries(manifest.attributes ?? {})) {
        for (const key of ['html', 'parse'] as const) {
            const binding = shared[key];
            if (binding !== undefined) {
                checkAttribute(
                    'attr' in binding ? binding.attr : 'style',
                    { attr: name },
                    pointer('attributes', name, key),
                );
            }
        }
    }
    const declaration = toDeclaration(manifest);
    return (options) => createFeature(declaration, options, true);
};
