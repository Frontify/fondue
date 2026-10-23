/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    CONTENT_CHECKS_FEATURE,
    CONTENT_ISSUES_PLUGIN,
    declaresNodeIds,
    ENGINE_PLUGINS,
    findCycle,
    NODE_IDS_PLUGIN,
    orderPlugins,
    type PluginContribution,
    type PluginDescriptor,
} from './capabilities';
import { contentNames } from './content-expression';
import {
    type AttributeDeclaration,
    type AttributeDeclarations,
    type ContentModel,
    type ContentModelOptions,
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
    type SharedAttributeDeclaration,
} from './declarations';
import { DefinitionError, type DefinitionErrorCode, pointer } from './errors';
import { featureInternals } from './feature';
import { canonicalJson, sha256 } from './hash';
import { checkHref, type HrefPolicy, hrefPolicyOf } from './href';
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
const isUrlAttribute = (name: string) => URL_ATTRIBUTES.has(name.toLowerCase().split(/[\s:]/).at(-1) ?? '');

export interface CompiledFeature {
    readonly id: string;
    readonly version: number;
    readonly declaration: FeatureDeclaration;
    /** Every declared option, defaulted. */
    readonly options: JsonObject;
}
export interface SharedAttribute {
    readonly name: string;
    readonly featureId: string;
    readonly declaration: SharedAttributeDeclaration;
}
export interface CompiledNode {
    readonly name: string;
    readonly featureId: string;
    readonly declaration: NodeDeclaration;
    /** Attributes other features add, in feature order. */
    readonly shared: readonly SharedAttribute[];
}
export interface CompiledMark {
    readonly name: string;
    readonly featureId: string;
    readonly declaration: MarkDeclaration;
}
/** A feature's function parse rule, whose answers meet the declarations of its mark or node as a tag rule's do. */
export interface CompiledParseRule {
    readonly tag: string;
    readonly kind: 'mark' | 'node';
    /** The mark or node it reads. */
    readonly name: string;
    /** The checked attributes, `null` when the element is not one, or `undefined` for an answer decode would reject. */
    readonly read: (element: HTMLElement) => Record<string, unknown> | null | undefined;
}
/** What the definition compiler and later layers read from a content model. */
export interface CompiledModel {
    readonly features: readonly CompiledFeature[];
    /** In the model's declared order. */
    readonly nodes: readonly CompiledNode[];
    /** By rank, lowest outermost, then in declared order. */
    readonly marks: readonly CompiledMark[];
    readonly plugins: readonly PluginDescriptor[];
    readonly migrations: readonly ModelMigration[];
    /** In feature order, for every reader of pasted or imported HTML. */
    readonly parseRules: readonly CompiledParseRule[];
}

const COMPILED = Symbol('compiled-model');

export const compiledModel = (model: ContentModel): CompiledModel =>
    (model as unknown as { readonly [COMPILED]: CompiledModel })[COMPILED];

/** The URL policy of the feature that declares `mark`, from its `allowedSchemes` and `allowedHosts` options. */
export const markHrefPolicy = (model: ContentModel, mark: string): HrefPolicy | undefined => {
    const { marks, features } = compiledModel(model);
    const owner = marks.find(({ name }) => name === mark)?.featureId;
    const feature = features.find(({ id }) => id === owner);
    return feature === undefined ? undefined : hrefPolicyOf(feature.options);
};

/** Own attributes, then shared ones. */
export const attributesOf = (node: CompiledNode): Readonly<Record<string, AttributeDeclaration>> => {
    const attributes: Record<string, AttributeDeclaration> = { ...node.declaration.attrs };
    for (const shared of node.shared) {
        attributes[shared.name] = shared.declaration.value;
    }
    return attributes;
};

const failure = (code: DefinitionErrorCode, feature: string, path: string, reason?: string) =>
    new DefinitionError(code, reason === undefined ? { feature, path } : { feature, path, reason });
const OWN_PARSE_MEMBERS = "a parse rule names only its own feature's marks and nodes";
const isVersion = (version: unknown) => Number.isInteger(version) && (version as number) > 0;
const duplicate = (kind: string, id: string, first: string, second: string) =>
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
const checkMigrations = (steps: readonly ModelMigration[] = [], version: number, feature?: string) => {
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

const readFeatures = (features: readonly Feature[]): CompiledFeature[] => {
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

const checkDependencies = (features: readonly CompiledFeature[]) => {
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

const checkAttributes = (feature: string, attrs: AttributeDeclarations, path: readonly string[]) => {
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

const checkHtml = (
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
const checkParse = (
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
const checkedRule = (
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

const checkNodeMarkdown = (featureId: string, name: string, markdown: unknown) => {
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

const checkMarkMarkdown = (featureId: string, name: string, markdown: unknown) => {
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

/**
 * Compiles a feature list once under a model ID and version. The same list always gives the same model,
 * manifest and fingerprint; every inconsistency throws `DefinitionError` before anything runs.
 */
export const compileContentModel = <const Features extends readonly Feature[]>(
    features: Features,
    options: ContentModelOptions,
): ContentModel<Features> => {
    if (!isVersion(options.version)) {
        throw new DefinitionError('definition.invalid-declaration', { path: pointer('version') });
    }
    const list = readFeatures(features);
    checkDependencies(list);
    checkMigrations(options.migrations, options.version);

    const nodes = new Map<string, CompiledNode & { readonly shared: SharedAttribute[] }>();
    const marks = new Map<string, CompiledMark>();
    for (const feature of list) {
        for (const [name, declaration] of Object.entries(feature.declaration.nodes ?? {})) {
            const first = nodes.get(name) ?? marks.get(name);
            if (first !== undefined) {
                throw duplicate('node', name, first.featureId, feature.id);
            }
            if ((declaration as Partial<NodeDeclaration>).html === undefined) {
                throw failure('definition.missing-schema', feature.id, pointer('nodes', name, 'html'));
            }
            nodes.set(name, { name, featureId: feature.id, declaration, shared: [] });
        }
        for (const [name, declaration] of Object.entries(feature.declaration.marks ?? {})) {
            const first = marks.get(name) ?? nodes.get(name);
            if (first !== undefined) {
                throw duplicate('mark', name, first.featureId, feature.id);
            }
            if ((declaration as Partial<MarkDeclaration>).html === undefined) {
                throw failure('definition.missing-schema', feature.id, pointer('marks', name, 'html'));
            }
            marks.set(name, { name, featureId: feature.id, declaration });
        }
    }
    for (const required of ['doc', 'text']) {
        if (!nodes.has(required)) {
            throw new DefinitionError('definition.invalid-declaration', { path: pointer('nodes', required) });
        }
    }
    const checkMarks = (featureId: string, names: readonly string[] | undefined, path: readonly string[]) => {
        const unknown = (names ?? []).findIndex((name) => !marks.has(name));
        if (unknown >= 0) {
            throw failure('definition.invalid-declaration', featureId, pointer(...path, unknown));
        }
    };

    const groups = new Map<string, string[]>();
    const join = (group: string, name: string) => groups.set(group, [...(groups.get(group) ?? []), name]);
    for (const { name, declaration } of nodes.values()) {
        if (declaration.group === 'block') {
            join('block', name);
        }
        if (declaration.group !== undefined) {
            join(declaration.group === 'block' ? 'section' : declaration.group, name);
        }
    }
    const membersOf = (name: string) => (nodes.has(name) ? [name] : (groups.get(name) ?? []));
    const textblocks: string[] = [];
    for (const { name, featureId, declaration } of nodes.values()) {
        checkAttributes(featureId, declaration.attrs, ['nodes', name, 'attrs']);
        checkMarks(featureId, declaration.marks, ['nodes', name, 'marks']);
        checkNodeMarkdown(featureId, name, declaration.markdown);
        if (declaration.content === undefined) {
            continue;
        }
        const path = pointer('nodes', name, 'content');
        const names = contentNames(declaration.content);
        if (names === undefined || names.some((term) => membersOf(term).length === 0)) {
            throw failure('definition.invalid-declaration', featureId, path);
        }
        const inline = new Set(
            names.flatMap(membersOf).map((member) => nodes.get(member)?.declaration.group === 'inline'),
        );
        if (inline.size > 1) {
            throw failure('definition.invalid-declaration', featureId, path);
        }
        if (inline.has(true) && declaration.group !== 'inline') {
            textblocks.push(name);
        }
    }
    for (const { name, featureId, declaration } of marks.values()) {
        checkAttributes(featureId, declaration.attrs, ['marks', name, 'attrs']);
        checkMarks(featureId, declaration.excludes, ['marks', name, 'excludes']);
        checkMarkMarkdown(featureId, name, declaration.markdown);
    }

    for (const feature of list) {
        for (const [name, shared] of Object.entries(feature.declaration.attributes ?? {})) {
            checkAttributes(feature.id, { value: shared.value }, ['attributes', name]);
            const binding = shared.html;
            const boundName = binding !== undefined && 'attr' in binding ? binding.attr : '';
            if (isStyleAttribute(boundName)) {
                throw failure('definition.invalid-declaration', feature.id, pointer('attributes', name, 'html'));
            }
            if (isSrcdocAttribute(boundName) || (isUrlAttribute(boundName) && shared.value.type !== 'url')) {
                throw failure('definition.unsafe-url-binding', feature.id, pointer('attributes', name, 'html'));
            }
            let targets = textblocks;
            if (shared.on !== 'textblocks') {
                // A target the model lacks is skipped, so an attribute is an orphan only when it reaches no node.
                targets = shared.on.filter((target) => nodes.has(target));
                if (targets.length === 0) {
                    throw failure('definition.orphan-behavior', feature.id, pointer('attributes', name, 'on'));
                }
            }
            for (const target of targets) {
                const node = nodes.get(target);
                if (node === undefined) {
                    continue;
                }
                const owner = Object.hasOwn(node.declaration.attrs, name)
                    ? node
                    : node.shared.find((attribute) => attribute.name === name);
                if (owner !== undefined) {
                    throw duplicate('attribute', `${target}.${name}`, owner.featureId, feature.id);
                }
                node.shared.push({ name, featureId: feature.id, declaration: shared });
            }
        }
    }
    const doc = nodes.get('doc');
    if (doc !== undefined) {
        const rootFault = Object.entries(attributesOf(doc)).find(([, attribute]) => !('default' in attribute));
        if (rootFault !== undefined) {
            throw failure(
                'definition.invalid-declaration',
                doc.featureId,
                pointer('nodes', 'doc', 'attrs', rootFault[0]),
            );
        }
        if ((doc.declaration.exactlyOne ?? []).length > 0) {
            throw failure('definition.invalid-declaration', doc.featureId, pointer('nodes', 'doc', 'exactlyOne'));
        }
    }
    const parseRules: CompiledParseRule[] = [];
    for (const feature of list) {
        for (const [index, rule] of (feature.declaration.parseRules ?? []).entries()) {
            // A rule reads only its own feature's members, so its `null` refuses no other feature's rules.
            if ('mark' in rule) {
                const mark = marks.get(rule.mark);
                if (mark?.featureId !== feature.id) {
                    throw failure(
                        'definition.orphan-behavior',
                        feature.id,
                        pointer('parseRules', index, 'mark'),
                        OWN_PARSE_MEMBERS,
                    );
                }
                parseRules.push(checkedRule(rule, mark.declaration.attrs, mark.declaration.exactlyOne));
                continue;
            }
            const node = nodes.get(rule.node);
            if (node?.featureId !== feature.id) {
                throw failure(
                    'definition.orphan-behavior',
                    feature.id,
                    pointer('parseRules', index, 'node'),
                    OWN_PARSE_MEMBERS,
                );
            }
            parseRules.push(checkedRule(rule, attributesOf(node), node.declaration.exactlyOne));
        }
        for (const [name, declaration] of Object.entries(feature.declaration.nodes ?? {})) {
            const node = nodes.get(name);
            const attrs = node === undefined ? declaration.attrs : attributesOf(node);
            checkHtml(feature, declaration.html, attrs, pointer('nodes', name, 'html'));
            checkParse(feature, declaration.parse, attrs, ['nodes', name, 'parse']);
        }
        for (const [name, declaration] of Object.entries(feature.declaration.marks ?? {})) {
            checkHtml(feature, declaration.html, declaration.attrs, pointer('marks', name, 'html'));
            checkParse(feature, declaration.parse, declaration.attrs, ['marks', name, 'parse']);
        }
    }

    const contributions: PluginContribution[] = ENGINE_PLUGINS.map((plugin) => ({ featureId: '', plugin }));
    for (const feature of list) {
        if (feature.id === CONTENT_CHECKS_FEATURE) {
            contributions.push({ featureId: feature.id, plugin: CONTENT_ISSUES_PLUGIN });
        }
        if (declaresNodeIds(feature.declaration)) {
            contributions.push({ featureId: feature.id, plugin: NODE_IDS_PLUGIN });
        }
    }
    const plugins = orderPlugins(contributions);

    const rankOf = (mark: CompiledMark) => mark.declaration.rank ?? 0;
    const compiled: CompiledModel = {
        features: list,
        nodes: [...nodes.values()],
        marks: [...marks.values()].sort((a, b) => rankOf(a) - rankOf(b)),
        plugins,
        migrations: options.migrations ?? [],
        parseRules,
    };
    const manifest: JsonObject = snapshot({
        model: { id: options.id, version: options.version },
        features: list.map(({ id, version, options: values }) => ({ id, version, options: values })),
        nodes: compiled.nodes.map(({ name }) => name),
        marks: compiled.marks.map(({ name }) => name),
    });
    const model = {
        ref: { id: options.id, version: options.version },
        capabilities: list.map(({ id, version }) => ({ id, version })),
        manifest,
        fingerprint: sha256(canonicalJson(manifest)),
        [COMPILED]: compiled,
    };
    return Object.freeze(model) as unknown as ContentModel<Features>;
};
