/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    CONTENT_CHECKS_FEATURE,
    CONTENT_ISSUES_PLUGIN,
    declaresNodeIds,
    ENGINE_PLUGINS,
    NODE_IDS_PLUGIN,
    orderPlugins,
    type PluginContribution,
} from './capabilities';
import {
    attributesOf,
    checkAttributes,
    checkedRule,
    checkHtml,
    checkMarkMarkdown,
    checkNodeMarkdown,
    checkParse,
    duplicate,
    failure,
    isUrlAttribute,
    OWN_PARSE_MEMBERS,
} from './compileChecks';
import {
    type CompiledFeature,
    type CompiledMark,
    type CompiledNode,
    type CompiledParseRule,
    type SharedAttribute,
} from './compileTypes';
import { contentNames } from './contentExpression';
import { type MarkDeclaration, type NodeDeclaration } from './declarations';
import { DefinitionError, pointer } from './errors';
import { isSrcdocAttribute, isStyleAttribute } from './values';

export type MutableNode = CompiledNode & { readonly shared: SharedAttribute[] };

/** Every node and mark the features declare, in feature order, with no name declared twice. */
export const collectMembers = (list: readonly CompiledFeature[]) => {
    const nodes = new Map<string, MutableNode>();
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
    return { nodes, marks };
};

/** Checks every node's and mark's own declaration and returns the names of the textblocks. */
export const checkMembers = (nodes: ReadonlyMap<string, MutableNode>, marks: ReadonlyMap<string, CompiledMark>) => {
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
    return textblocks;
};

/** Adds each feature's shared attributes to the nodes they target. */
export const attachSharedAttributes = (
    list: readonly CompiledFeature[],
    nodes: ReadonlyMap<string, MutableNode>,
    textblocks: readonly string[],
) => {
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
};

/** The document root must build from nothing, so every attribute has a default and none is exactly-one. */
export const checkRootNode = (nodes: ReadonlyMap<string, MutableNode>) => {
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
};

/** Compiles the features' function parse rules and checks every node's and mark's HTML spec and parse rules. */
export const compileParseRules = (
    list: readonly CompiledFeature[],
    nodes: ReadonlyMap<string, MutableNode>,
    marks: ReadonlyMap<string, CompiledMark>,
) => {
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
    return parseRules;
};

/** The model's plugins, from the engine's own and those the features' declarations call for, in plugin order. */
export const orderedPlugins = (list: readonly CompiledFeature[]) => {
    const contributions: PluginContribution[] = ENGINE_PLUGINS.map((plugin) => ({ featureId: '', plugin }));
    for (const feature of list) {
        if (feature.id === CONTENT_CHECKS_FEATURE) {
            contributions.push({ featureId: feature.id, plugin: CONTENT_ISSUES_PLUGIN });
        }
        if (declaresNodeIds(feature.declaration)) {
            contributions.push({ featureId: feature.id, plugin: NODE_IDS_PLUGIN });
        }
    }
    return orderPlugins(contributions);
};
