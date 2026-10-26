/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkType, type Node, type NodeType, type Schema } from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';

import { type JsonObject } from '#/model';
import { type CommandLookup, type EngineCommand } from '#/runtime/definition';

/** Builds the engine command of one edit from its arguments. */
export type CapabilityImplementation = (args: JsonObject, schema: Schema, command: CommandLookup) => EngineCommand;

/** The type that `name` names among a schema's mark or node `types`, or `undefined` when the schema lacks it. */
export const typeIn = <Type>(types: Readonly<Record<string, Type>>, name: unknown): Type | undefined => {
    if (typeof name !== 'string') {
        return undefined;
    }

    return types[name];
};

/** The command of an edit whose type the schema lacks: it never applies, as a command that cannot apply reports. */
export const REJECTED: EngineCommand = { run: () => false, active: () => false };

/** Whether all of `total` items match, some of them, or none. */
export const tristate = (matching: number, total: number): boolean | 'mixed' => {
    if (matching === 0) {
        return false;
    }

    if (matching === total) {
        return true;
    }

    return 'mixed';
};

/** The textblocks the selection touches, with their positions. */
export const selectedTextblocks = (state: EditorState): { node: Node; pos: number }[] => {
    const blocks: { node: Node; pos: number }[] = [];
    for (const { $from, $to } of state.selection.ranges) {
        state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
            if (node.isTextblock) {
                blocks.push({ node, pos });
            }
        });
    }

    return blocks;
};

/** The attributes a block keeps as `target`: its own ones that `target` declares, with `over` applied on top. */
export const carried = (block: Node, target: NodeType, over: Readonly<Record<string, unknown>>) => {
    const attrs: Record<string, unknown> = {};
    for (const name of Object.keys(target.spec.attrs ?? {})) {
        if (Object.hasOwn(block.attrs, name)) {
            attrs[name] = block.attrs[name];
        }
    }

    for (const [name, value] of Object.entries(over)) {
        attrs[name] = value;
    }

    return attrs;
};

export const markTypesOf = (marks: unknown, schema: Schema): MarkType[] => {
    const names = Array.isArray(marks) ? (marks as readonly unknown[]) : [marks];

    return names.flatMap((name) => {
        const type = typeof name === 'string' ? schema.marks[name] : undefined;
        if (type === undefined) {
            return [];
        }

        return [type];
    });
};
