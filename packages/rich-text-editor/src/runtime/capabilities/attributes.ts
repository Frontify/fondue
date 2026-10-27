/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node, type NodeType, type Schema } from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';

import { isRecord } from '#/model';
import { appliesToOf } from '#/model/internal';
import { stylesOf } from '#/runtime/statePlugins/styles';

import { nearest, positionOf } from '../transform/positions';

import { type CapabilityImplementation, tristate } from './shared';

/** The node types a `setAttributes` command names: one, a list, or every textblock type. */
const typesOf = (node: unknown, schema: Schema): readonly NodeType[] => {
    if (node === 'textblocks') {
        return Object.values(schema.nodes).filter((type) => type.isTextblock);
    }

    const names = Array.isArray(node) ? (node as readonly unknown[]) : [node];

    return names.flatMap((name) => {
        const type = typeof name === 'string' ? schema.nodes[name] : undefined;
        if (type === undefined) {
            return [];
        }

        return [type];
    });
};

type Located = { node: Node; pos: number };

/** The default of a node type's attribute, which a toggle that removes a value restores. */
export const defaultOf = (type: NodeType, name: string): unknown => {
    const specs = type.spec.attrs;
    if (specs === undefined) {
        return null;
    }

    const spec = specs[name];
    if (spec === undefined) {
        return null;
    }

    return spec.default;
};

/** The innermost node of `types` that holds the textblock at `pos`, or that textblock itself. */
const holderOf = (doc: Node, pos: number, types: readonly NodeType[]): Located | undefined => {
    const $inside = doc.resolve(pos + 1);
    for (let depth = $inside.depth; depth > 0; depth -= 1) {
        const node = $inside.node(depth);
        if (types.includes(node.type)) {
            return { node, pos: $inside.before(depth) };
        }
    }

    return undefined;
};

/**
 * The nodes of `types` the selection touches, in document order: each selected atom of a type, and for each selected
 * textblock the innermost node of a type that holds it, so a caret in a nested list names that list only.
 */
const selectedOf = (state: EditorState, types: readonly NodeType[]): Located[] => {
    const found = new Map<number, Located>();
    for (const { $from, $to } of state.selection.ranges) {
        state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
            if (node.isTextblock) {
                const holder = holderOf(state.doc, pos, types);
                if (holder !== undefined) {
                    found.set(holder.pos, holder);
                }
            } else if (node.isAtom && types.includes(node.type)) {
                found.set(pos, { node, pos });
            }
        });
    }

    return [...found.values()].sort((a, b) => a.pos - b.pos);
};

/** The nodes a `setAttributes` command changes: the one `nodeId` names, else the selected nodes of `types`, else the nearest node of `types`. */
const attributeTargets = (state: EditorState, types: readonly NodeType[], nodeId: unknown): Located[] => {
    if (typeof nodeId === 'string') {
        const pos = positionOf(state.doc, nodeId);
        if (pos === undefined) {
            return [];
        }

        const node = state.doc.nodeAt(pos);
        if (node === null || !types.includes(node.type)) {
            return [];
        }

        return [{ node, pos }];
    }

    const selected = selectedOf(state, types);
    if (selected.length > 0) {
        return selected;
    }

    for (const type of types) {
        const found = nearest(state, type);
        if (found !== undefined) {
            return [found];
        }
    }

    return [];
};

/** The targets a brand style lands on: those whose node type its `appliesTo` names, when the session holds the style. */
const styleTargets = (state: EditorState, targets: Located[], attrs: Readonly<Record<string, unknown>>): Located[] => {
    if (typeof attrs.styleId !== 'string') {
        return targets;
    }

    const applies = appliesToOf(stylesOf(state), attrs.styleId);
    if (applies === undefined) {
        return targets;
    }

    return targets.filter(({ node }) => applies.includes(node.type.name));
};

/** The targets that declare at least one of `attrs`, which the others skip. */
const declaring = (targets: Located[], attrs: Readonly<Record<string, unknown>>): Located[] =>
    targets.filter(({ node }) => Object.keys(attrs).some((name) => node.type.spec.attrs?.[name] !== undefined));

/** The targets of `parts`: its node, or the selection, narrowed to those that take a brand style and declare an attribute. */
const targetsOf = (
    state: EditorState,
    types: readonly NodeType[],
    parts: { nodeId: unknown; attrs: Readonly<Record<string, unknown>> },
): Located[] => declaring(styleTargets(state, attributeTargets(state, types, parts.nodeId), parts.attrs), parts.attrs);

/**
 * Sets the payload's other fields on the node its `nodeId` names, else on the selected nodes of the listed types,
 * else on the nearest node of one; with `toggle`, removes the values when every target already has them. A `styleId`
 * of a session style lands only on the node types the style applies to.
 */
export const setAttributes: CapabilityImplementation = (args, schema) => {
    const types = typesOf(args.node, schema);
    const has = (node: Node, attrs: Readonly<Record<string, unknown>>) =>
        Object.entries(attrs).every(([name, value]) => node.attrs[name] === value);
    const split = (payload: unknown) => {
        if (!isRecord(payload)) {
            return undefined;
        }

        const { nodeId, ...attrs } = payload;

        return { nodeId, attrs };
    };

    return {
        run: (state, dispatch, payload) => {
            const parts = split(payload);
            if (parts === undefined) {
                return false;
            }

            const targets = targetsOf(state, types, parts);
            const removes =
                args.toggle === true && targets.length > 0 && targets.every(({ node }) => has(node, parts.attrs));
            const changes = targets.flatMap(({ node, pos }) =>
                Object.entries(parts.attrs)
                    .filter(([name]) => node.type.spec.attrs?.[name] !== undefined)
                    .map(([name, value]) => {
                        if (removes) {
                            return { pos, name, value: defaultOf(node.type, name) };
                        }

                        return { pos, name, value };
                    })
                    .filter(({ name, value }) => node.attrs[name] !== value),
            );
            if (changes.length === 0) {
                return false;
            }

            if (dispatch !== undefined) {
                const transaction = state.tr;
                for (const { pos, name, value } of changes) {
                    transaction.setNodeAttribute(pos, name, value);
                }

                dispatch(transaction);
            }

            return true;
        },
        active: (state, payload) => {
            const parts = split(payload);
            if (parts === undefined) {
                return false;
            }

            const targets = targetsOf(state, types, parts);

            return tristate(targets.filter(({ node }) => has(node, parts.attrs)).length, targets.length);
        },
    };
};
