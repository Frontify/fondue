/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type EditorState, NodeSelection, TextSelection, type Transaction } from 'prosemirror-state';

import { type CompiledDefinition, type EngineCommand } from '#/definition';
import { type ResourceLimits, isRecord } from '#/model';
import { attributesOf, compiledModel, isValidValue } from '#/model/internal';

import { insertPicked, pickedAsset, refillPicked } from '../capabilities/media/media';
import { type SuggestionHost } from '../capabilities/suggestions/host';
import { type NodeActions, type NodeTarget } from '../portTypes';
import { positionOf } from '../positions';
import { type CommandResult, type SelectionHandle } from '../types';

import { checkedPayload, type Commands, rejected } from './commands';
import { type Commit } from './commit';
import { type Store } from './store';
import { type TargetsService } from './targets';
import { type RejectedCode } from './types';

export type { NodeActions, NodeTarget };

export type Actions = {
    nodeActions(target: NodeTarget): NodeActions;
    placeAsset(
        asset: unknown,
        place: { readonly target: SelectionHandle } | { readonly nodeId: string },
    ): CommandResult;
    acceptSuggestion: SuggestionHost['accept'];
    searchSuggestions: SuggestionHost['search'];
};

export const createActions = (a: {
    definition: CompiledDefinition;
    limits: ResourceLimits;
    store: Store;
    commit: Pick<Commit, 'commit'>;
    commands: Pick<Commands, 'runOn' | 'queryOn'>;
    targets: Pick<TargetsService, 'baseOf' | 'coordinator'>;
}): Actions => {
    const { definition, limits, store, commit, commands, targets } = a;
    const { coordinator, baseOf } = targets;

    /** The state with exactly `from` to `to` selected as text, which an accepted suggestion replaces. */
    const rangeBase = (from: number, to: number): EditorState | RejectedCode => {
        if (from < 0 || to > store.state.doc.content.size || from > to) {
            return 'target-invalid';
        }

        const selection = TextSelection.between(store.state.doc.resolve(from), store.state.doc.resolve(to));
        if (selection.from !== from || selection.to !== to) {
            return 'target-invalid';
        }

        return store.state.apply(store.state.tr.setSelection(selection));
    };

    const acceptSuggestion: Actions['acceptSuggestion'] = (range, id, payload) =>
        commands.runOn(
            definition.commands.get(id),
            checkedPayload(payload),
            () => rangeBase(range.from, range.to),
            'host',
        );
    /** The position of `target` in `doc` when it holds a node there, read when it is needed. */
    const targetIn = (doc: Node, target: NodeTarget): number | undefined => {
        if (typeof target === 'string') {
            return positionOf(doc, target);
        }

        const pos = target();
        if (pos === undefined || pos < 0 || pos >= doc.content.size || doc.nodeAt(pos) === null) {
            return undefined;
        }

        return pos;
    };

    /** The state with the node `target` selected, as a node view action runs on it. */
    const nodeBase = (target: NodeTarget): EditorState | RejectedCode => {
        const pos = targetIn(store.state.doc, target);
        if (pos === undefined) {
            return 'target-invalid';
        }

        return store.state.apply(store.state.tr.setSelection(NodeSelection.create(store.state.doc, pos)));
    };

    /** A command that changes the node `target` wherever it is when it runs. */
    const nodeCommand = (
        target: NodeTarget,
        change: (tr: Transaction, pos: number, node: Node) => boolean,
    ): EngineCommand => ({
        run: (base, dispatch) => {
            const pos = targetIn(base.doc, target);
            if (pos === undefined) {
                return false;
            }

            const node = base.doc.nodeAt(pos);
            const { tr } = base;
            if (node === null || !change(tr, pos, node)) {
                return false;
            }

            dispatch?.(tr);

            return true;
        },
        active: () => false,
    });
    const nodeActions = (target: NodeTarget): NodeActions => ({
        update: (attrs) => {
            const checked = checkedPayload(attrs);
            if (checked === undefined || !isRecord(checked.payload)) {
                return rejected('invalid-payload');
            }

            const values = checked.payload;
            const update = nodeCommand(target, (tr, pos, node) => {
                const declared = compiledModel(definition.model).nodes.find(({ name }) => name === node.type.name);
                if (declared === undefined) {
                    return false;
                }

                const attributes = attributesOf(declared);
                for (const [name, value] of Object.entries(values)) {
                    const attribute = attributes[name];
                    // An action never changes the ID it finds its node by.
                    if (name === 'nodeId' || attribute === undefined || !isValidValue(attribute, value)) {
                        return false;
                    }

                    tr.setNodeAttribute(pos, name, value);
                }

                return true;
            });

            return commands.runOn(update, { payload: undefined }, () => store.state, 'host');
        },
        remove: () => {
            const remove = nodeCommand(target, (tr, pos, node) => {
                tr.delete(pos, pos + node.nodeSize);

                return true;
            });

            return commands.runOn(remove, { payload: undefined }, () => store.state, 'host');
        },
        select: () => {
            const pos = targetIn(store.state.doc, target);
            if (pos !== undefined) {
                commit.commit(store.state.tr.setSelection(NodeSelection.create(store.state.doc, pos)));
            }
        },
        // The author's selection stays, so typing after a press on chrome, such as a task checkbox, keeps the node.
        execute: (id, payload) =>
            commands.runOn(definition.commands.get(id), checkedPayload(payload), () => nodeBase(target), 'node'),
        query: (id, payload) =>
            commands.queryOn(definition.commands.get(id), checkedPayload(payload), nodeBase(target)),
    });

    const placeAsset: Actions['placeAsset'] = (value, place) => {
        const asset = pickedAsset(value, { maxLength: limits.maxAttributeLength });
        if (asset === undefined) {
            return rejected('invalid-payload');
        }

        if ('target' in place) {
            const insert = insertPicked(definition.schema, asset);

            return commands.runOn(insert, { payload: undefined }, () => baseOf({ target: place.target }), 'host');
        }

        const { nodeId } = place;
        if (positionOf(store.state.doc, nodeId) === undefined) {
            return rejected('target-invalid');
        }

        return commands.runOn(refillPicked(nodeId, asset), { payload: undefined }, () => store.state, 'host');
    };

    /** One search of a suggestion list, as one operation of the coordinator that the list's newer search supersedes. */
    const searchSuggestions: Actions['searchSuggestions'] = ({ key, featureId, command, run }, receive) => {
        const operation = coordinator.start({
            key,
            // The only host service a search reaches through the editor API.
            service: 'references',
            featureId,
            action: 'create',
            command,
            run: ({ signal }) => run(signal),
            deliver: (result) => {
                receive(result as Awaited<ReturnType<typeof run>>);

                return undefined;
            },
        });

        return () => coordinator.abortWhere((other) => other === operation);
    };

    return { nodeActions, placeAsset, acceptSuggestion, searchSuggestions };
};
