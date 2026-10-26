/* (c) Copyright Frontify Ltd., all rights reserved. */

import { findCycle } from './capabilities';
import { type CompiledFeature, type CompiledNode, type CompiledParseRule } from './compileTypes';
import {
    type AttributeDeclaration,
    type AttributeDeclarations,
    type Feature,
    type FeatureDeclaration,
    type FunctionParseRule,
    type HtmlAttributeValue,
    type HtmlSpec,
    type JsonObject,
    type JsonValue,
    type MarkDeclaration,
    type ModelMigration,
    type NodeDeclaration,
    type ParseRule,
} from './declarations';
import { DefinitionError, type DefinitionErrorCode, pointer } from './errors';
import { featureInternals } from './feature';
import { checkHref } from './href';
import { markdownDelimiterPattern, markdownFencePattern } from './markdown';
import {
    findUnsafeJson,
    isRecord,
    isSrcdocAttribute,
    isStyleAttribute,
    isValidValue,
    MAX_DEPTH,
    ownValue,
    parsedAttributes,
    PROTOTYPE_KEYS,
    snapshot,
} from './values';

/** HTML attributes whose value is a URL, by lowercase name, so the React props `xlinkHref` and `srcDoc` match too. */
export const URL_ATTRIBUTES = new Set(
    'href src srcset srcdoc action formaction poster cite data xlink:href xlinkhref ping background longdesc usemap manifest codebase icon profile'.split(
        ' ',
    ),
);
/** By local name: the engine sets a `namespace name` key with `setAttributeNS`, and `xlink:href` is `href`. */
export const isUrlAttribute = (name: string) => URL_ATTRIBUTES.has(name.toLowerCase().split(/[\s:]/).at(-1) ?? '');

/** Own attributes, then shared ones. */
export const attributesOf = (node: CompiledNode): Readonly<Record<string, AttributeDeclaration>> => {
    const attributes: Record<string, AttributeDeclaration> = { ...node.declaration.attrs };
    for (const shared of node.shared) {
        attributes[shared.name] = shared.declaration.value;
    }

    return attributes;
};

export const failure = (code: DefinitionErrorCode, feature: string, path: string, reason?: string) =>
    new DefinitionError(code, reason === undefined ? { feature, path } : { feature, path, reason });
export const OWN_PARSE_MEMBERS = "a parse rule names only its own feature's marks and nodes";
export const isVersion = (version: unknown) => Number.isInteger(version) && (version as number) > 0;
export const duplicate = (kind: string, id: string, first: string, second: string) =>
    new DefinitionError('definition.duplicate-id', { kind, id, features: [first, second] });

const resolveOptions = (id: string, declaration: FeatureDeclaration, given: unknown): JsonObject => {
    const declared = declaration.options ?? {};
    const options: Record<string, JsonValue> = {};
    for (const [name, option] of Object.entries(declared)) {
        if (!isValidValue(option, option.default)) {
            throw failure('definition.invalid-declaration', id, pointer('options', name, 'default'));
        }

        options[name] = option.default;
    }

    if (given === undefined) {
        return options;
    }

    const unsafe = findUnsafeJson(given, '/options');
    if (unsafe !== undefined) {
        throw failure('definition.invalid-option', id, unsafe);
    }

    if (!isRecord(given)) {
        throw failure('definition.invalid-option', id, '/options');
    }

    for (const [name, value] of Object.entries(given)) {
        const option = ownValue(declared, name);
        if (option === undefined || !isValidValue(option, value)) {
            throw failure('definition.invalid-option', id, pointer('options', name));
        }

        options[name] = value as JsonValue;
    }

    return snapshot(options);
};

/** A declaration-keyed record may not hold `__proto__`, `constructor` or `prototype`, which a lookup or a plain-object copy would misread. */
const rejectPrototypeKeys = (feature: string, record: object | undefined, path: string) => {
    for (const name of Object.keys(record ?? {})) {
        if (PROTOTYPE_KEYS.has(name)) {
            throw failure('definition.invalid-declaration', feature, `${path}${pointer(name)}`);
        }
    }
};

const checkNames = (declaration: FeatureDeclaration) => {
    const { id } = declaration;
    rejectPrototypeKeys(id, declaration.options, '/options');
    rejectPrototypeKeys(id, declaration.attributes, '/attributes');
    for (const kind of ['nodes', 'marks'] as const) {
        const members: Readonly<Record<string, NodeDeclaration | MarkDeclaration>> = declaration[kind] ?? {};
        rejectPrototypeKeys(id, members, pointer(kind));
        for (const [name, member] of Object.entries(members)) {
            rejectPrototypeKeys(id, member.attrs, pointer(kind, name, 'attrs'));
        }
    }
};

const SUPPORT: Readonly<Record<'html' | 'text' | 'markdown', readonly string[]>> = {
    html: ['lossless', 'lossy'],
    text: ['lossless', 'lossy', 'unsupported'],
    markdown: ['lossless', 'lossy', 'unsupported'],
};

/** HTML derives from the `html` spec every node and mark declares, so it can never be `unsupported`. */
const checkFormats = (declaration: FeatureDeclaration) => {
    const { formats } = declaration;
    if (formats === undefined) {
        return;
    }

    for (const format of ['html', 'text', 'markdown'] as const) {
        if (!SUPPORT[format].includes(formats[format])) {
            throw failure('definition.invalid-declaration', declaration.id, pointer('formats', format));
        }
    }
};

/** Each step starts below `version`, and no two steps start at one version. */
export const checkMigrations = (steps: readonly ModelMigration[] = [], version: number, feature?: string) => {
    for (const [index, { from, migrate }] of steps.entries()) {
        const repeated = steps.findIndex((step) => step.from === from) !== index;
        if (!Number.isInteger(from) || from >= version || repeated || typeof migrate !== 'function') {
            const path = pointer('migrations', index);
            throw new DefinitionError(
                'definition.invalid-declaration',
                feature === undefined ? { path } : { feature, path },
            );
        }
    }
};

export const readFeatures = (features: readonly Feature[]): CompiledFeature[] => {
    const seen = new Set<string>();

    return features.map((feature, index) => {
        const internals = featureInternals(feature);
        if (internals === undefined) {
            throw new DefinitionError('definition.invalid-declaration', { path: pointer(index) });
        }

        const { declaration } = internals;
        if (!isVersion(declaration.version)) {
            throw failure('definition.invalid-declaration', declaration.id, pointer('version'));
        }

        checkNames(declaration);
        checkFormats(declaration);
        checkMigrations(declaration.migrations, declaration.version, declaration.id);
        if (seen.has(declaration.id)) {
            throw duplicate('feature', declaration.id, declaration.id, declaration.id);
        }

        seen.add(declaration.id);
        const options = resolveOptions(declaration.id, declaration, internals.options);

        return { id: declaration.id, version: declaration.version, declaration, options };
    });
};

export const checkDependencies = (features: readonly CompiledFeature[]) => {
    const byId = new Map(features.map((feature) => [feature.id, feature]));
    const requiresOf = (id: string) => {
        const feature = byId.get(id);

        return feature === undefined ? [] : (feature.declaration.requires ?? []);
    };

    const visited = new Set<string>();
    const visit = (path: readonly string[]) => {
        const id = path.at(-1);
        if (id === undefined || visited.has(id)) {
            return;
        }

        visited.add(id);
        for (const required of requiresOf(id)) {
            const target = byId.get(required.id);
            const next = [...path, required.id];
            if (target === undefined) {
                throw new DefinitionError('definition.missing-dependency', { path: next });
            }

            if (target.version !== required.version) {
                const details = {
                    feature: id,
                    requires: required.id,
                    required: required.version,
                    installed: target.version,
                };
                throw new DefinitionError('definition.version-mismatch', details);
            }

            visit(next);
        }
    };

    for (const feature of features) {
        visit([feature.id]);
    }

    const ids = features.map(({ id }) => id);
    const cycle = findCycle(ids, (id) => requiresOf(id).map((required) => required.id));
    if (cycle !== undefined) {
        throw new DefinitionError('definition.dependency-cycle', { kind: 'feature', path: cycle });
    }
};

export const checkAttributes = (feature: string, attrs: AttributeDeclarations, path: readonly string[]) => {
    for (const [name, attribute] of Object.entries(attrs)) {
        const at = pointer(...path, name);
        if ('default' in attribute) {
            if (!isValidValue(attribute, attribute.default)) {
                throw failure('definition.invalid-declaration', feature, `${at}/default`);
            }
        } else if (attribute.required !== true) {
            throw failure('definition.invalid-declaration', feature, at);
        }
    }
};

export const checkHtml = (
    feature: CompiledFeature,
    spec: HtmlSpec,
    attrs: AttributeDeclarations,
    path: string,
    depth = 0,
): void => {
    if (depth > MAX_DEPTH) {
        throw failure('definition.invalid-declaration', feature.id, path);
    }

    const [tag, second, third] = spec;
    if (typeof tag === 'object' && !Object.hasOwn(attrs, tag.attr)) {
        throw failure('definition.invalid-declaration', feature.id, `${path}/0`);
    }

    const attributes =
        typeof second === 'object' && !Array.isArray(second)
            ? (second as Readonly<Record<string, HtmlAttributeValue>>)
            : undefined;
    rejectPrototypeKeys(feature.id, attributes, `${path}/1`);
    for (const [name, value] of Object.entries(attributes ?? {})) {
        const at = `${path}/1${pointer(name)}`;
        const isUrl = isUrlAttribute(name);
        if (isSrcdocAttribute(name)) {
            throw failure('definition.unsafe-url-binding', feature.id, at);
        }

        if (typeof value === 'string') {
            if (isUrl && !checkHref(value).ok) {
                throw failure('definition.unsafe-url-binding', feature.id, at);
            }
        } else if ('attr' in value) {
            const attribute = ownValue(attrs, value.attr);
            if (attribute === undefined || isStyleAttribute(name)) {
                throw failure('definition.invalid-declaration', feature.id, at);
            }

            if (isUrl && attribute.type !== 'url') {
                throw failure('definition.unsafe-url-binding', feature.id, at);
            }
        } else if (!Object.hasOwn(feature.options, value.option)) {
            throw failure('definition.invalid-declaration', feature.id, at);
        } else if (isUrl) {
            throw failure('definition.unsafe-url-binding', feature.id, at);
        }
    }

    const content = attributes === undefined ? second : third;
    if (Array.isArray(content)) {
        checkHtml(feature, content as HtmlSpec, attrs, `${path}/${attributes === undefined ? 1 : 2}`, depth + 1);
    }
};

/** A parse rule's literal `value` must meet its attribute's declaration, as a default does. */
export const checkParse = (
    feature: CompiledFeature,
    rules: readonly ParseRule[],
    attrs: AttributeDeclarations,
    path: readonly string[],
) => {
    for (const [index, rule] of rules.entries()) {
        rejectPrototypeKeys(feature.id, 'attrs' in rule ? rule.attrs : undefined, pointer(...path, index, 'attrs'));
        for (const [name, source] of Object.entries('attrs' in rule ? (rule.attrs ?? {}) : {})) {
            const attribute = ownValue(attrs, name);
            if ('value' in source && (attribute === undefined || !isValidValue(attribute, source.value))) {
                throw failure(
                    'definition.invalid-declaration',
                    feature.id,
                    pointer(...path, index, 'attrs', name, 'value'),
                );
            }
        }
    }
};

/** `rule` with its answers checked against `attrs` and `exactlyOne`; a `url` value is read through `checkHref`. */
export const checkedRule = (
    rule: FunctionParseRule,
    attrs: AttributeDeclarations,
    exactlyOne: readonly string[] = [],
): CompiledParseRule => {
    let kind: CompiledParseRule['kind'] = 'node';
    let name = '';
    if ('mark' in rule) {
        kind = 'mark';
        name = rule.mark;
    } else {
        name = rule.node;
    }

    const read = (element: HTMLElement) => {
        const answer: unknown = rule.value(element);
        if (answer === null) {
            return null;
        }

        if (!isRecord(answer)) {
            return undefined;
        }

        return parsedAttributes(attrs, exactlyOne, (attribute, declaration) => {
            const value = ownValue(answer, attribute);
            if (declaration.type !== 'url' || typeof value !== 'string') {
                return value;
            }

            const href = checkHref(value);
            if (!href.ok) {
                return undefined;
            }

            return href.href;
        });
    };

    return { tag: rule.tag, kind, name, read };
};

const markdownDelimiter = new RegExp(markdownDelimiterPattern);
const markdownFence = new RegExp(markdownFencePattern);
const isMarkdownDelimiter = (value: unknown) => typeof value === 'string' && markdownDelimiter.test(value);
const isMarkdownFence = (value: unknown) => typeof value === 'string' && markdownFence.test(value);

export const checkNodeMarkdown = (featureId: string, name: string, markdown: unknown) => {
    if (markdown === undefined) {
        return;
    }

    const at = pointer('nodes', name, 'markdown');
    if (!isRecord(markdown)) {
        throw failure('definition.invalid-declaration', featureId, at);
    }

    const hasPrefix = Object.hasOwn(markdown, 'prefix');
    const hasFence = Object.hasOwn(markdown, 'fence');
    if (hasPrefix === hasFence) {
        throw failure('definition.invalid-declaration', featureId, at);
    }

    if (hasPrefix && !isMarkdownDelimiter(markdown.prefix)) {
        throw failure('definition.invalid-declaration', featureId, `${at}/prefix`);
    }

    if (hasFence && !isMarkdownFence(markdown.fence)) {
        throw failure('definition.invalid-declaration', featureId, `${at}/fence`);
    }
};

export const checkMarkMarkdown = (featureId: string, name: string, markdown: unknown) => {
    if (markdown === undefined) {
        return;
    }

    const at = pointer('marks', name, 'markdown');
    if (!isRecord(markdown)) {
        throw failure('definition.invalid-declaration', featureId, at);
    }

    if (!isMarkdownDelimiter(markdown.open)) {
        throw failure('definition.invalid-declaration', featureId, `${at}/open`);
    }

    if (!isMarkdownDelimiter(markdown.close)) {
        throw failure('definition.invalid-declaration', featureId, `${at}/close`);
    }
};
