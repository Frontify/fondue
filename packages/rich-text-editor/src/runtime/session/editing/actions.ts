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
    (tr: Transaction, pos: number, node: Node): boolean => {
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
const rangeBase = (a: ActionArgs, from: number, to: number): EditorState | RejectedCode => {
    if (from < 0 || to > a.store.state.doc.content.size || from > to) {
        return 'target-invalid';
    }

    const selection = TextSelection.between(a.store.state.doc.resolve(from), a.store.state.doc.resolve(to));
    if (selection.from !== from || selection.to !== to) {
        return 'target-invalid';
    }

    return a.store.state.apply(a.store.state.tr.setSelection(selection));
};

const acceptRange = (a: ActionArgs, range: { from: number; to: number }, id: string, payload: JsonObject) =>
    a.commands.runOn(
        a.definition.commands.get(id),
        checkedPayload(payload),
        () => rangeBase(a, range.from, range.to),
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
const nodeBase = (a: ActionArgs, target: NodeTarget): EditorState | RejectedCode => {
    const pos = targetIn(a.store.state.doc, target);
    if (pos === undefined) {
        return 'target-invalid';
    }

    return a.store.state.apply(a.store.state.tr.setSelection(NodeSelection.create(a.store.state.doc, pos)));
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

const updateNode = (a: ActionArgs, target: NodeTarget, attrs: JsonObject) => {
    const checked = checkedPayload(attrs);
    if (checked === undefined || !isRecord(checked.payload)) {
        return rejected('invalid-payload');
    }

    const values = checked.payload;
    const update = nodeCommand(target, attributeUpdate(a.definition, values));

    return a.commands.runOn(update, { payload: undefined }, () => a.store.state, 'host');
};

const removeNode = (a: ActionArgs, target: NodeTarget) => {
    const remove = nodeCommand(target, (tr, pos, node) => {
        tr.delete(pos, pos + node.nodeSize);

        return true;
    });

    return a.commands.runOn(remove, { payload: undefined }, () => a.store.state, 'host');
};

const selectNode = (a: ActionArgs, target: NodeTarget) => {
    const pos = targetIn(a.store.state.doc, target);
    if (pos !== undefined) {
        a.commit.commit(a.store.state.tr.setSelection(NodeSelection.create(a.store.state.doc, pos)));
    }
};

const nodeActionsOf = (a: ActionArgs, target: NodeTarget): NodeActions => ({
    update: (attrs) => updateNode(a, target, attrs),
    remove: () => removeNode(a, target),
    select: () => selectNode(a, target),
    // The author's selection stays, so typing after a press on chrome, such as a task checkbox, keeps the node.
    execute: (id, payload) =>
        a.commands.runOn(a.definition.commands.get(id), checkedPayload(payload), () => nodeBase(a, target), 'node'),
    query: (id, payload) =>
        a.commands.queryOn(a.definition.commands.get(id), checkedPayload(payload), nodeBase(a, target)),
});

const placePicked = (a: ActionArgs, value: unknown, place: { target: SelectionHandle } | { nodeId: string }) => {
    const asset = pickedAsset(value, { maxLength: a.limits.maxAttributeLength });
    if (asset === undefined) {
        return rejected('invalid-payload');
    }

    if ('target' in place) {
        const insert = insertPicked(a.definition.schema, asset);

        return a.commands.runOn(
            insert,
            { payload: undefined },
            () => a.targets.baseOf({ target: place.target }),
            'host',
        );
    }

    const { nodeId } = place;
    if (positionOf(a.store.state.doc, nodeId) === undefined) {
        return rejected('target-invalid');
    }

    return a.commands.runOn(refillPicked(nodeId, asset), { payload: undefined }, () => a.store.state, 'host');
};

/** One search of a suggestion list, as one operation of the coordinator that the list's newer search supersedes. */
const searchFor = <T>(
    a: ActionArgs,
    { key, featureId, command, run }: SuggestionSearch<T>,
    receive: (result: T) => void,
) => {
    const operation = a.targets.coordinator.start({
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

    return () => a.targets.coordinator.abortWhere((other) => other === operation);
};

export const createActions = (a: ActionArgs): Actions => ({
    nodeActions: (target) => nodeActionsOf(a, target),
    placeAsset: (value, place) => placePicked(a, value, place),
    acceptSuggestion: (range, id, payload) => acceptRange(a, range, id, payload),
    searchSuggestions: (request, receive) => searchFor(a, request, receive),
});
