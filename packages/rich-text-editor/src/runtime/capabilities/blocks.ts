/* (c) Copyright Frontify Ltd., all rights reserved. */

import { wrapIn as wrapInEngine } from 'prosemirror-commands';
import { type Node, NodeRange, type NodeType, type ResolvedPos } from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';
import { liftTarget } from 'prosemirror-transform';

import { isRecord } from '#/model';

import { type CapabilityImplementation, carried, REJECTED, selectedTextblocks, tristate, typeIn } from './shared';

/**
 * Turns the selected textblocks into the block `node`, with the payload's fields as its attributes; with `toggle`,
 * into paragraphs when they all are that block already. `refuses` reports content the new block would drop.
 */
export const setBlock: CapabilityImplementation = (args, schema) => {
    const type = typeIn(schema.nodes, args.node);
    const paragraph = typeIn(schema.nodes, 'paragraph');
    if (type === undefined || paragraph === undefined) {
        return REJECTED;
    }

    // The payload's fields are attributes of the node, such as `level` for `heading.set`.
    const attrsOf = (payload: unknown) => {
        const attrs: Record<string, unknown> = {};
        if (isRecord(payload)) {
            for (const [name, value] of Object.entries(payload)) {
                attrs[name] = value;
            }
        }

        return attrs;
    };

    const matches = (block: Node, attrs: Readonly<Record<string, unknown>>) =>
        block.type === type && Object.entries(attrs).every(([name, value]) => block.attrs[name] === value);
    /** The selected textblocks and what they become: the node, or a paragraph when the toggle finds them all set. */
    const planOf = (state: EditorState, payload: unknown) => {
        const blocks = selectedTextblocks(state);
        if (args.toggle === true && blocks.length > 0 && blocks.every(({ node }) => matches(node, attrsOf(payload)))) {
            return { blocks, target: paragraph, over: {} };
        }

        return { blocks, target: type, over: attrsOf(payload) };
    };

    return {
        run: (state, dispatch, payload) => {
            const { blocks, target, over } = planOf(state, payload);
            const applicable = blocks.some(({ node, pos }) => {
                if (node.hasMarkup(target, carried(node, target, over))) {
                    return false;
                }

                const $pos = state.doc.resolve(pos);

                return node.type === target || $pos.parent.canReplaceWith($pos.index(), $pos.index() + 1, target);
            });
            if (!applicable) {
                return false;
            }

            if (dispatch !== undefined) {
                // `setBlockType` takes a function of the old node for its attributes, so each block keeps its own.
                const transaction = state.tr;
                for (const { $from, $to } of state.selection.ranges) {
                    transaction.setBlockType($from.pos, $to.pos, target, (node) => carried(node, target, over));
                }

                dispatch(transaction.scrollIntoView());
            }

            return true;
        },
        active: (state, payload) => {
            const attrs = attrsOf(payload);
            const blocks = selectedTextblocks(state);

            return tristate(blocks.filter(({ node }) => matches(node, attrs)).length, blocks.length);
        },
        // `setBlockType` drops the marks and inline nodes the target refuses, such as a mention turned into code.
        refuses: (state, payload) => {
            const { blocks, target } = planOf(state, payload);

            return blocks.some(({ node }) => node.type !== target && !target.validContent(node.content));
        },
    };
};

/** The blocks the selection spans inside the nearest ancestor of `type`, or `undefined` outside one. */
const rangeIn = ($from: ResolvedPos, $to: ResolvedPos, type: NodeType): NodeRange | undefined =>
    $from.blockRange($to, (node) => node.type === type) ?? undefined;

/** Wraps the selected blocks in the container `node`, with the payload as its attributes, or lifts them out when inside one. */
export const wrapIn: CapabilityImplementation = (args, schema) => {
    const type = typeIn(schema.nodes, args.node);
    if (type === undefined) {
        return REJECTED;
    }

    return {
        run: (state, dispatch, payload) => {
            const { $from, $to } = state.selection;
            const range = rangeIn($from, $to, type);
            if (range === undefined) {
                // The payload holds the attributes of the new container.
                let attrs: Readonly<Record<string, unknown>> | undefined;
                if (isRecord(payload)) {
                    attrs = payload;
                }

                return wrapInEngine(type, attrs)(state, dispatch);
            }

            const target = liftTarget(range);
            if (target === null) {
                return false;
            }

            dispatch?.(state.tr.lift(range, target).scrollIntoView());

            return true;
        },
        active: (state, payload) => {
            let attrs: Readonly<Record<string, unknown>> = {};
            if (isRecord(payload)) {
                attrs = payload;
            }

            const blocks = selectedTextblocks(state);
            const within = blocks.filter(({ pos }) => {
                const $pos = state.doc.resolve(pos);
                for (let depth = $pos.depth; depth > 0; depth -= 1) {
                    const node = $pos.node(depth);
                    if (
                        node.type === type &&
                        Object.entries(attrs).every(([name, value]) => node.attrs[name] === value)
                    ) {
                        return true;
                    }
                }

                return false;
            });

            return tristate(within.length, blocks.length);
        },
    };
};

/** Swaps the blocks the selection spans with their previous or next sibling, so the selection moves with them. */
export const block: CapabilityImplementation = (args) => ({
    run: (state, dispatch) => {
        const { $from, $to } = state.selection;
        let range = $from.blockRange($to);
        // Blocks that fill their container, as the only paragraph of a quote does, move with it.
        while (
            range !== null &&
            range.depth > 0 &&
            range.startIndex === 0 &&
            range.endIndex === range.parent.childCount
        ) {
            const { depth } = range;
            range = new NodeRange(
                state.doc.resolve($from.before(depth)),
                state.doc.resolve($from.after(depth)),
                depth - 1,
            );
        }

        if (range === null) {
            return false;
        }

        const { parent, start, end, startIndex, endIndex } = range;
        if (args.action === 'move-up') {
            if (startIndex === 0) {
                return false;
            }

            const previous = parent.child(startIndex - 1);
            dispatch?.(
                state.tr
                    .insert(end, previous)
                    .delete(start - previous.nodeSize, start)
                    .scrollIntoView(),
            );

            return true;
        }

        if (endIndex === parent.childCount) {
            return false;
        }

        const next = parent.child(endIndex);
        dispatch?.(
            state.tr
                .delete(end, end + next.nodeSize)
                .insert(start, next)
                .scrollIntoView(),
        );

        return true;
    },
    active: () => false,
});
