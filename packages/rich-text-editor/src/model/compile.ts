/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    CAPABILITY_NAMES,
    CAPABILITY_PLUGINS,
    findCycle,
    INPUT_RULES_PLUGIN,
    keymapPlugin,
    orderPlugins,
    type PluginContribution,
    type PluginDescriptor,
} from './capabilities';
import { contentNames } from './content-expression';
import {
    type AttributeDeclaration,
    type AttributeDeclarations,
    type CommandDefinition,
    type CommandRef,
    type ContentModel,
    type ContentModelOptions,
    type Feature,
    type FeatureDeclaration,
    type HtmlAttributeValue,
    type HtmlSpec,
    type JsonObject,
    type JsonValue,
    type MarkDeclaration,
    type NodeDeclaration,
    type OptionGuard,
    type ParseRule,
    type SharedAttributeDeclaration,
} from './declarations';
import { DefinitionError, type DefinitionErrorCode, pointer } from './errors';
import { featureInternals } from './feature';
import { canonicalJson, sha256 } from './hash';
import { checkHref } from './href';
import { markdownDelimiterPattern, markdownFencePattern } from './markdown';
import {
    findInvalidPayload,
    findUnsafeJson,
    isRecord,
    isValidValue,
    MAX_DEPTH,
    ownValue,
    PROTOTYPE_KEYS,
    snapshot,
} from './values';

/** HTML attributes whose value is a URL. */
export const URL_ATTRIBUTES = new Set(
    'href src srcset action formaction poster cite data xlink:href ping background longdesc usemap manifest codebase icon profile'.split(
        ' ',
    ),
);
/** By local name: the engine sets a `namespace name` key with `setAttributeNS`, and `xlink:href` is `href`. */
const isUrlAttribute = (name: string) => URL_ATTRIBUTES.has(name.toLowerCase().split(/[\s:]/).at(-1) ?? '');
const NODE_ARGUMENTS = ['node', 'nodes', 'list', 'item'];
const MARK_ARGUMENTS = ['mark', 'marks'];

export interface CompiledFeature {
    readonly id: string;
    readonly version: number;
    readonly declaration: FeatureDeclaration;
    /** Every declared option, defaulted. */
    readonly options: JsonObject;
    readonly manifest: boolean;
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
export interface CompiledCommand {
    readonly id: string;
    readonly featureId: string;
    readonly definition: CommandDefinition<unknown>;
}
export interface KeymapEntry {
    readonly plugin: string;
    readonly key: string;
    readonly command: string;
    readonly payload: JsonValue | null;
}
/** What the definition compiler and later layers read from a content model. */
export interface CompiledModel {
    readonly features: readonly CompiledFeature[];
    /** In the model's declared order. */
    readonly nodes: readonly CompiledNode[];
    /** By rank, lowest outermost, then in declared order. */
    readonly marks: readonly CompiledMark[];
    readonly commands: readonly CompiledCommand[];
    /** In plugin order. */
    readonly keymap: readonly KeymapEntry[];
    readonly plugins: readonly PluginDescriptor[];
}

const COMPILED = Symbol('compiled-model');

export const compiledModel = (model: ContentModel): CompiledModel =>
    (model as unknown as { readonly [COMPILED]: CompiledModel })[COMPILED];

/** Own attributes, then shared ones. */
export const attributesOf = (node: CompiledNode): Readonly<Record<string, AttributeDeclaration>> => {
    const attributes: Record<string, AttributeDeclaration> = { ...node.declaration.attrs };
    for (const shared of node.shared) {
        attributes[shared.name] = shared.declaration.value;
    }
    return attributes;
};

const failure = (code: DefinitionErrorCode, feature: string, path: string) =>
    new DefinitionError(code, { feature, path });
const isVersion = (version: unknown) => Number.isInteger(version) && (version as number) > 0;
const duplicate = (kind: string, id: string, first: string, second: string) =>
    new DefinitionError('definition.duplicate-id', { kind, id, features: [first, second] });

const resolveOptions = (id: string, declaration: FeatureDeclaration, given: unknown, manifest: boolean): JsonObject => {
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
        throw failure(manifest ? 'definition.invalid-manifest' : 'definition.invalid-option', id, unsafe);
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
    rejectPrototypeKeys(id, declaration.commands, '/commands');
    rejectPrototypeKeys(id, declaration.keys, '/keys');
    for (const kind of ['nodes', 'marks'] as const) {
        const members: Readonly<Record<string, NodeDeclaration | MarkDeclaration>> = declaration[kind] ?? {};
        rejectPrototypeKeys(id, members, pointer(kind));
        for (const [name, member] of Object.entries(members)) {
            rejectPrototypeKeys(id, member.attrs, pointer(kind, name, 'attrs'));
        }
    }
    for (const [name, command] of Object.entries(declaration.commands ?? {})) {
        rejectPrototypeKeys(id, command.payload?.fields, pointer('commands', name, 'payload', 'fields'));
    }
};

const readFeatures = (features: readonly Feature[]): CompiledFeature[] => {
    const seen = new Set<string>();
    return features.map((feature, index) => {
        const internals = featureInternals(feature);
        if (internals === undefined) {
            throw new DefinitionError('definition.invalid-declaration', { path: pointer(index) });
        }
        const { declaration, manifest } = internals;
        if (!isVersion(declaration.version)) {
            throw failure('definition.invalid-declaration', declaration.id, pointer('version'));
        }
        checkNames(declaration);
        if (seen.has(declaration.id)) {
            throw duplicate('feature', declaration.id, declaration.id, declaration.id);
        }
        seen.add(declaration.id);
        const options = resolveOptions(declaration.id, declaration, internals.options, manifest);
        return { id: declaration.id, version: declaration.version, declaration, options, manifest };
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
        if (typeof value === 'string') {
            if (isUrl && !checkHref(value).ok) {
                throw failure('definition.unsafe-url-binding', feature.id, at);
            }
        } else if ('attr' in value) {
            const attribute = ownValue(attrs, value.attr);
            if (attribute === undefined) {
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

const guardHolds = (feature: CompiledFeature, when: OptionGuard | undefined, path: string) => {
    if (when === undefined) {
        return true;
    }
    const unsafe = findUnsafeJson(when.equals, `${path}/when/equals`);
    if (unsafe !== undefined) {
        throw failure(
            feature.manifest ? 'definition.invalid-manifest' : 'definition.invalid-option',
            feature.id,
            unsafe,
        );
    }
    const value = ownValue(feature.options, when.option);
    if (value === undefined) {
        throw failure('definition.invalid-declaration', feature.id, `${path}/when`);
    }
    return canonicalJson(value) === canonicalJson(when.equals);
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
            if (isUrlAttribute(boundName) && shared.value.type !== 'url') {
                throw failure('definition.unsafe-url-binding', feature.id, pointer('attributes', name, 'html'));
            }
            for (const target of shared.on === 'textblocks' ? textblocks : shared.on) {
                const node = nodes.get(target);
                if (node === undefined) {
                    throw failure('definition.orphan-behavior', feature.id, pointer('attributes', name, 'on'));
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
    for (const feature of list) {
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

    const commands = new Map<string, CompiledCommand>();
    /** Every command ID, guarded out or not, with its feature. */
    const owners = new Map<string, string>();
    const guardedOut = new Set<string>();
    for (const feature of list) {
        for (const [id, definition] of Object.entries(feature.declaration.commands ?? {})) {
            const first = owners.get(id);
            if (first !== undefined) {
                throw duplicate('command', id, first, feature.id);
            }
            owners.set(id, feature.id);
            if (!CAPABILITY_NAMES.includes(definition.capability)) {
                throw failure('definition.invalid-declaration', feature.id, pointer('commands', id, 'capability'));
            }
            if (!guardHolds(feature, definition.when, pointer('commands', id))) {
                guardedOut.add(id);
                continue;
            }
            const argument = (name: string) =>
                feature.manifest ? pointer('commands', id, name) : pointer('commands', id, 'args', name);
            const { args } = definition;
            for (const name of [...NODE_ARGUMENTS, ...MARK_ARGUMENTS]) {
                const value = args[name];
                const known: ReadonlyMap<string, unknown> = NODE_ARGUMENTS.includes(name) ? nodes : marks;
                const names = Array.isArray(value) ? value : [value];
                const declared = (term: JsonValue | undefined) =>
                    term === 'textblocks' || (typeof term === 'string' && known.has(term));
                if (value !== undefined && !names.every(declared)) {
                    throw failure('definition.orphan-behavior', feature.id, argument(name));
                }
            }
            if (args.attrs !== undefined) {
                const node = typeof args.node === 'string' ? nodes.get(args.node) : undefined;
                const mark = typeof args.mark === 'string' ? marks.get(args.mark) : undefined;
                const declared = node === undefined ? mark?.declaration.attrs : attributesOf(node);
                if (!isRecord(args.attrs)) {
                    throw failure('definition.invalid-declaration', feature.id, argument('attrs'));
                }
                for (const [name, value] of Object.entries(args.attrs)) {
                    const attribute = declared === undefined ? undefined : ownValue(declared, name);
                    if (attribute === undefined || !isValidValue(attribute, value)) {
                        throw failure(
                            'definition.invalid-declaration',
                            feature.id,
                            `${argument('attrs')}${pointer(name)}`,
                        );
                    }
                }
            }
            commands.set(id, { id, featureId: feature.id, definition });
        }
    }

    /** The command and payload a key, rule marker or toolbar entry runs, or `undefined` when a guard drops it. */
    const resolve = (feature: CompiledFeature, ref: CommandRef, path: string) => {
        const target = typeof ref === 'string' ? { command: ref } : ref;
        if (typeof ref !== 'string' && !guardHolds(feature, ref.when, path)) {
            return undefined;
        }
        const command = commands.get(target.command);
        if (command === undefined && guardedOut.has(target.command)) {
            return undefined;
        }
        if (command === undefined) {
            throw failure('definition.orphan-behavior', feature.id, path);
        }
        const invalid = findInvalidPayload(command.definition.payload, target.payload);
        if (invalid !== undefined) {
            const at = typeof ref === 'string' ? path : `${path}/payload${invalid}`;
            throw failure('definition.invalid-declaration', feature.id, at);
        }
        return { command: target.command, payload: target.payload === undefined ? null : target.payload };
    };

    const keymap: KeymapEntry[] = [];
    const contributions: PluginContribution[] = [];
    for (const feature of list) {
        const plugin = keymapPlugin(feature.id);
        for (const [key, ref] of Object.entries(feature.declaration.keys ?? {})) {
            const resolved = resolve(feature, ref, pointer('keys', key));
            if (resolved !== undefined) {
                keymap.push({ plugin: plugin.id, key, command: resolved.command, payload: resolved.payload });
            }
        }
        const rules = feature.declaration.inputRules ?? [];
        for (const [index, rule] of rules.entries()) {
            const path = pointer('inputRules', index);
            if (rule.kind === 'mark-delimiter' && !marks.has(rule.mark)) {
                throw failure('definition.orphan-behavior', feature.id, `${path}/mark`);
            }
            if (rule.kind === 'line-start') {
                if (!commands.has(rule.command) && !guardedOut.has(rule.command)) {
                    throw failure('definition.orphan-behavior', feature.id, `${path}/command`);
                }
                for (const [markerIndex, marker] of rule.markers.entries()) {
                    const ref =
                        typeof marker === 'string' ? rule.command : { command: rule.command, payload: marker.payload };
                    resolve(
                        feature,
                        ref,
                        typeof marker === 'string' ? `${path}/command` : `${path}/markers/${markerIndex}`,
                    );
                }
            }
        }
        for (const [index, entry] of (feature.declaration.toolbar ?? []).entries()) {
            const path = pointer('toolbar', index);
            if (!guardHolds(feature, entry.when, path)) {
                continue;
            }
            if (entry.kind === 'menu') {
                resolve(feature, entry.command, path);
                for (const [itemIndex, item] of entry.items.entries()) {
                    resolve(feature, item, `${path}/items/${itemIndex}`);
                }
            } else {
                const { command, payload } = entry;
                resolve(feature, payload === undefined ? command : { command, payload }, path);
            }
        }
        for (const command of commands.values()) {
            if (command.featureId === feature.id) {
                const plugins = CAPABILITY_PLUGINS[command.definition.capability] ?? [];
                contributions.push(...plugins.map((descriptor) => ({ featureId: feature.id, plugin: descriptor })));
            }
        }
        if (keymap.some((entry) => entry.plugin === plugin.id)) {
            contributions.push({ featureId: feature.id, plugin });
        }
        if (rules.length > 0) {
            contributions.push({ featureId: feature.id, plugin: INPUT_RULES_PLUGIN });
        }
    }
    const plugins = orderPlugins(contributions);

    const rankOf = (mark: CompiledMark) => mark.declaration.rank ?? 0;
    const compiled: CompiledModel = {
        features: list,
        nodes: [...nodes.values()],
        marks: [...marks.values()].sort((a, b) => rankOf(a) - rankOf(b)),
        commands: [...commands.values()],
        keymap,
        plugins,
    };
    const manifest: JsonObject = snapshot({
        model: { id: options.id, version: options.version },
        features: list.map(({ id, version, options: values }) => ({ id, version, options: values })),
        nodes: compiled.nodes.map(({ name }) => name),
        marks: compiled.marks.map(({ name }) => name),
        plugins: plugins.map(({ id }) => id),
        commands: compiled.commands.map(({ id }) => id),
        keys: keymap.map(({ key, command, payload }) => ({ key, command, payload })),
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
