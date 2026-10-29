/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type EditorState, NodeSelection, TextSelection, type Transaction } from 'prosemirror-state';

import { type JsonObject, type ResourceLimits, isRecord } from '#/model';
import { attributesOf, compiledModel, isValidValue } from '#/model/internal';
import { type CompiledDefinition, type EngineCommand } from '#/runtime/definition';

import { insertPicked, pickedAsset, refillPicked } from '../../capabilities/media/media';
import { type SuggestionHost, type SuggestionSearch } from '../../capabilities/suggestions/host';
import { type NodeActions, type NodeTarget } from '../../portTypes';
import { positionOf } from '../../transform/positions';
import { type CommandResult, type SelectionHandle } from '../../types';
import { type TargetsService } from '../lifecycle/targets';
import { type Store } from '../state/store';
import { type RejectedCode } from '../state/types';

import { checkedPayload, type Commands, rejected } from './commands';
import { type Commit } from './commit';

export type { NodeActions, NodeTarget };

export type Actions = {
    nodeActions(target: NodeTarget): NodeActions;
    /** Inserts the picked asset at the target, or refills the node `nodeId` with it; rejects an asset that is not valid. */
    placeAsset(asset: unknown, place: { target: SelectionHandle } | { nodeId: string }): CommandResult;
    acceptSuggestion: SuggestionHost['accept'];
    searchSuggestions: SuggestionHost['search'];
};

/** A node change that sets each of `values` as an attribute, and fails unless every one is valid for the node's type. */
const attributeUpdate =
    (definition: CompiledDefinition, values: Record<string, unknown>) =>
    (transaction: Transaction, pos: number, node: Node): boolean => {
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

            transaction.setNodeAttribute(pos, name, value);
        }

        return true;
    };

/** The services node actions and asset placement read. */
type ActionArgs = {
    definition: CompiledDefinition;
    limits: ResourceLimits;
    store: Store;
    commit: Pick<Commit, 'commit'>;
    commands: Pick<Commands, 'runOn' | 'queryOn'>;
    targets: Pick<TargetsService, 'baseOf' | 'coordinator'>;
};

/** The state with exactly `from` to `to` selected as text, which an accepted suggestion replaces. */
const rangeBase = (args: ActionArgs, from: number, to: number): EditorState | RejectedCode => {
    if (from < 0 || to > args.store.state.doc.content.size || from > to) {
        return 'target-invalid';
    }

    const selection = TextSelection.between(args.store.state.doc.resolve(from), args.store.state.doc.resolve(to));
    if (selection.from !== from || selection.to !== to) {
        return 'target-invalid';
    }

    return args.store.state.apply(args.store.state.tr.setSelection(selection));
};

const acceptRange = (args: ActionArgs, range: { from: number; to: number }, id: string, payload: JsonObject) =>
    args.commands.runOn(
        args.definition.commands.get(id),
        checkedPayload(payload),
        () => rangeBase(args, range.from, range.to),
        'host',
    );

/** The position of `target` in `doc` when it holds a node there, read when it is needed. */
const targetIn = (doc: Node, target: NodeTarget): number | undefined => {
    if (typeof target === 'string') {
        return positionOf(doc, target);
    }

    const pos = target();
    const outside = pos !== undefined && (pos < 0 || pos >= doc.content.size);
    if (pos === undefined || outside || doc.nodeAt(pos) === null) {
        return undefined;
    }

    return pos;
};

/** The state with the node `target` selected, as a node view action runs on it. */
const nodeBase = (args: ActionArgs, target: NodeTarget): EditorState | RejectedCode => {
    const pos = targetIn(args.store.state.doc, target);
    if (pos === undefined) {
        return 'target-invalid';
    }

    return args.store.state.apply(args.store.state.tr.setSelection(NodeSelection.create(args.store.state.doc, pos)));
};

/** A command that changes the node `target` wherever it is when it runs. */
const nodeCommand = (
    target: NodeTarget,
    change: (transaction: Transaction, pos: number, node: Node) => boolean,
): EngineCommand => ({
    run: (base, dispatch) => {
        const pos = targetIn(base.doc, target);
        if (pos === undefined) {
            return false;
        }

        const node = base.doc.nodeAt(pos);
        const { tr: transaction } = base;
        if (node === null || !change(transaction, pos, node)) {
            return false;
        }

        dispatch?.(transaction);

        return true;
    },
    active: () => false,
});

const updateNode = (args: ActionArgs, target: NodeTarget, attrs: JsonObject) => {
    const checked = checkedPayload(attrs);
    if (checked === undefined || !isRecord(checked.payload)) {
        return rejected('invalid-payload');
    }

    const values = checked.payload;
    const update = nodeCommand(target, attributeUpdate(args.definition, values));

    return args.commands.runOn(update, { payload: undefined }, () => args.store.state, 'host');
};

const removeNode = (args: ActionArgs, target: NodeTarget) => {
    const remove = nodeCommand(target, (transaction, pos, node) => {
        transaction.delete(pos, pos + node.nodeSize);

        return true;
    });

    return args.commands.runOn(remove, { payload: undefined }, () => args.store.state, 'host');
};

const selectNode = (args: ActionArgs, target: NodeTarget) => {
    const pos = targetIn(args.store.state.doc, target);
    if (pos !== undefined) {
        args.commit.commit(args.store.state.tr.setSelection(NodeSelection.create(args.store.state.doc, pos)));
    }
};

const nodeActionsOf = (args: ActionArgs, target: NodeTarget): NodeActions => ({
    update: (attrs) => updateNode(args, target, attrs),
    remove: () => removeNode(args, target),
    select: () => selectNode(args, target),
    // The author's selection stays, so typing after a press on chrome, such as a task checkbox, keeps the node.
    execute: (id, payload) =>
        args.commands.runOn(
            args.definition.commands.get(id),
            checkedPayload(payload),
            () => nodeBase(args, target),
            'node',
        ),
    query: (id, payload) =>
        args.commands.queryOn(args.definition.commands.get(id), checkedPayload(payload), nodeBase(args, target)),
});

const placePicked = (args: ActionArgs, value: unknown, place: { target: SelectionHandle } | { nodeId: string }) => {
    const asset = pickedAsset(value, { maxLength: args.limits.maxAttributeLength });
    if (asset === undefined) {
        return rejected('invalid-payload');
    }

    if ('target' in place) {
        const insert = insertPicked(args.definition.schema, asset);

        return args.commands.runOn(
            insert,
            { payload: undefined },
            () => args.targets.baseOf({ target: place.target }),
            'host',
        );
    }

    const { nodeId } = place;
    if (positionOf(args.store.state.doc, nodeId) === undefined) {
        return rejected('target-invalid');
    }

    return args.commands.runOn(refillPicked(nodeId, asset), { payload: undefined }, () => args.store.state, 'host');
};

/** One search of a suggestion list, as one operation of the coordinator that the list's newer search supersedes. */
const searchFor = <Result>(
    args: ActionArgs,
    { key, featureId, command, run }: SuggestionSearch<Result>,
    receive: (result: Result) => void,
) => {
    const operation = args.targets.coordinator.start({
        key,
        // The only host service a search reaches through the editor API.
        service: 'references',
        featureId,
        action: 'create',
        command,
        run: ({ signal }) => run(signal),
        deliver: (result) => {
            receive(result);

            return undefined;
        },
    });

    return () => args.targets.coordinator.abortWhere((other) => other === operation);
};

export const createActions = (args: ActionArgs): Actions => ({
    nodeActions: (target) => nodeActionsOf(args, target),
    placeAsset: (value, place) => placePicked(args, value, place),
    acceptSuggestion: (range, id, payload) => acceptRange(args, range, id, payload),
    searchSuggestions: (request, receive) => searchFor(args, request, receive),
});
