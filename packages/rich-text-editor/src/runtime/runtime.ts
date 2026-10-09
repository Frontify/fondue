/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import {
    AllSelection,
    EditorState,
    NodeSelection,
    Selection,
    TextSelection,
    type Transaction,
} from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { COMMAND_META, type CompiledDefinition } from '#/definition';
import { type CapabilityRef, type Diagnostic, type RichTextDocument, type RuntimeEnvironment } from '#/model';
import { type TreeNode } from '#/model/content';
import { encodeTree } from '#/model/encode';

import {
    type ChangeOrigin,
    type CommandState,
    type DocumentChange,
    type EditorSummary,
    type SelectionSummary,
    type SessionToken,
    type Unsubscribe,
} from './types';

type Mode = EditorSummary['mode'];

/** The events this runtime emits; the handle accepts the other `EditorEventMap` names, which later layers emit. */
interface RuntimeEvents {
    readonly ready: SessionToken;
    readonly documentChange: DocumentChange;
    readonly diagnostic: Diagnostic;
    readonly disposed: SessionToken;
}
type Listener = (value: never) => void;

const notBuiltYet = (member: string, pair: string) => (): never => {
    throw new Error(`EditorHandle.${member} is not built yet; it lands with ${pair}.`);
};

/** What the host calls: the `EditorHandle` members a later pair builds throw an error naming that pair (DR-063). */
export interface RuntimeHandle {
    getSummary(): EditorSummary;
    getSnapshot(): never;
    getSaveStatus(): never;
    getRecoveryCandidate(): never;
    query(id: string, ...args: readonly unknown[]): CommandState;
    execute(): never;
    enqueue(): never;
    captureTarget(): never;
    releaseTarget(): never;
    requestCommit(): never;
    replaceDocument(): never;
    setMode(mode: Mode): void;
    updatePolicy(): never;
    focus(where?: 'current' | 'start' | 'end'): void;
    registerInteractionRoot(): never;
    subscribe(event: string, listener: Listener): Unsubscribe;
    dispose(): void;
}

export interface EditorRuntime {
    readonly handle: RuntimeHandle;
    /** The view on the attached surface, for the `src/testing` helpers. */
    readonly view: EditorView | undefined;
    /** Shows the document in `element`, which becomes the editable surface. */
    attach(element: HTMLElement): void;
    /** Destroys the view synchronously; the session and its state stay. */
    detach(): void;
    report(diagnostic: Diagnostic): void;
    /** Selects the text between two positions, or the node at one, as the `src/testing` helpers name it. */
    select(target: { readonly anchor: number; readonly head: number } | { readonly node: number }): void;
}

export interface EditorRuntimeOptions {
    readonly definition: CompiledDefinition;
    readonly documentId: string;
    /** The decoded island tree the session's document starts from. */
    readonly tree: TreeNode;
    /** The stored document's capabilities, kept while islands keep their content. */
    readonly capabilities: readonly CapabilityRef[];
    readonly environment: RuntimeEnvironment;
    readonly mode: Mode;
}

/** Views, subscriptions and pending frames of every live runtime, which the `src/testing` probe reads. */
export const liveResources = { views: new Set<EditorView>(), subscriptions: 0, frames: 0 };

const runtimes = new WeakMap<object, EditorRuntime>();

/** The runtime behind a handle this module made. */
export const runtimeOf = (handle: object): EditorRuntime | undefined => runtimes.get(handle);

const kindOf = (selection: Selection): SelectionSummary['kind'] => {
    if (selection instanceof TextSelection) {
        return 'text';
    }
    if (selection instanceof NodeSelection) {
        return 'node';
    }
    if (selection instanceof AllSelection) {
        return 'all';
    }
    return 'none';
};

const summarize = (selection: Selection): SelectionSummary => {
    let selectedNodeId: string | null = null;
    if (selection instanceof NodeSelection && typeof selection.node.attrs.nodeId === 'string') {
        selectedNodeId = selection.node.attrs.nodeId;
    }
    const { parent } = selection.$from;
    return {
        kind: kindOf(selection),
        collapsed: selection.empty,
        blockType: parent.isTextblock ? parent.type.name : null,
        selectedNodeId,
    };
};

const UI_ORIGINS: ReadonlySet<string> = new Set(['paste', 'cut', 'drop']);

/** Where a batch came from: typing is a DOM change after a recorded `beforeinput`, which ProseMirror does not mark. */
const originOf = (root: Transaction, typing: boolean): ChangeOrigin => {
    const event: unknown = root.getMeta('uiEvent');
    if (root.getMeta(COMMAND_META) !== undefined) {
        return 'command';
    }
    if (typeof event === 'string' && UI_ORIGINS.has(event)) {
        return event as ChangeOrigin;
    }
    return typing ? 'input' : 'unknown';
};

/** One empty paragraph is an empty document, which shows the placeholder (SPEC-rich-text-react/AC-030). */
const isEmpty = ({ doc }: EditorState) =>
    doc.childCount === 1 && doc.firstChild !== null && doc.firstChild.isTextblock && doc.firstChild.content.size === 0;

/** One editing session: its state, its view while a surface is attached, the commit path and its events. */
export const createEditorRuntime = (options: EditorRuntimeOptions): EditorRuntime => {
    const { definition, environment } = options;
    const session: SessionToken = {
        documentId: options.documentId,
        sessionId: environment.ids.next('session'),
        generation: 0,
    };
    let state = EditorState.create({
        doc: definition.schema.nodeFromJSON(options.tree),
        plugins: [...definition.plugins],
    });
    let phase: EditorSummary['phase'] = 'mounting';
    let mode = options.mode;
    let commitSequence = 0;
    let sequence = 0;
    let typing = false;
    let view: EditorView | undefined;
    let readyFrame: number | undefined;
    const listeners = new Map<string, Set<Listener>>();

    const emit = <K extends keyof RuntimeEvents>(event: K, value: RuntimeEvents[K]) => {
        for (const listener of listeners.get(event) ?? []) {
            (listener as (value: RuntimeEvents[K]) => void)(value);
        }
    };

    const encode = (doc: Node): RichTextDocument =>
        encodeTree(doc.toJSON() as TreeNode, definition.model, options.capabilities).document;

    /** Installs one batch: the root and every transaction plugins append to it (SPEC-rich-text-runtime/AC-002). */
    const commit = (root: Transaction) => {
        const { state: candidate, transactions } = state.applyTransaction(root);
        if (transactions.length === 0) {
            return;
        }
        const previous = state;
        state = candidate;
        if (view !== undefined) {
            view.updateState(candidate);
        }
        commitSequence += 1;
        const origin = originOf(root, typing);
        typing = false;
        // An effective change compares documents by node equality, never by serializing them (SPEC-rich-text-runtime/AC-019).
        if (candidate.doc.eq(previous.doc)) {
            return;
        }
        sequence += 1;
        let document: RichTextDocument | undefined;
        const command: unknown = root.getMeta(COMMAND_META);
        emit('documentChange', {
            stamp: { ...session, sequence },
            commitSequence,
            origin,
            commandId: typeof command === 'string' ? command : null,
            readDocument: () => {
                if (document === undefined) {
                    document = encode(candidate.doc);
                }
                return document;
            },
        });
    };

    const cancelReady = () => {
        if (readyFrame !== undefined) {
            environment.scheduler.cancelFrame(readyFrame);
            readyFrame = undefined;
            liveResources.frames -= 1;
        }
    };

    // Recomputes `editable` and the surface attributes from the phase and the mode.
    const refreshView = () => {
        if (view !== undefined) {
            view.setProps({});
        }
    };

    const detach = () => {
        cancelReady();
        if (view !== undefined) {
            liveResources.views.delete(view);
            view.destroy();
            view = undefined;
        }
    };

    const dispose = () => {
        if (phase === 'disposed') {
            return;
        }
        emit('disposed', session);
        for (const set of listeners.values()) {
            liveResources.subscriptions -= set.size;
        }
        listeners.clear();
        detach();
        phase = 'disposed';
    };

    const focus = (where: 'current' | 'start' | 'end' = 'current') => {
        if (phase !== 'ready' || view === undefined) {
            return;
        }
        if (where !== 'current') {
            const selection = where === 'start' ? Selection.atStart(state.doc) : Selection.atEnd(state.doc);
            commit(state.tr.setSelection(selection));
        }
        if (mode === 'editable') {
            view.focus();
            return;
        }
        // ProseMirror's `focus()` does nothing while the view is not editable, and it syncs no DOM selection there.
        view.dom.focus();
        const anchor = view.domAtPos(state.selection.anchor);
        const head = view.domAtPos(state.selection.head);
        const selection = view.dom.ownerDocument.getSelection();
        if (selection !== null) {
            selection.setBaseAndExtent(anchor.node, anchor.offset, head.node, head.offset);
        }
    };

    const query = (id: string): CommandState => {
        const command = definition.commands.get(id);
        if (command === undefined) {
            return { enabled: false, active: false, disabledReason: 'unknown-command' };
        }
        const active = command.active(state);
        if (phase !== 'ready') {
            return { enabled: false, active, disabledReason: 'not-ready' };
        }
        if (mode === 'readonly') {
            return { enabled: false, active, disabledReason: 'readonly' };
        }
        const enabled = command.run(state);
        return { enabled, active, disabledReason: enabled ? null : 'not-applicable' };
    };

    const handle: RuntimeHandle = {
        getSummary: () => ({
            session,
            phase,
            mode,
            commitSequence,
            sequence,
            compositionActive: view === undefined ? false : view.composing,
            selection: summarize(state.selection),
        }),
        getSnapshot: notBuiltYet('getSnapshot', 'pair 13, TASK-rte-runtime-async'),
        getSaveStatus: notBuiltYet('getSaveStatus', 'pair 17, TASK-rte-persistence'),
        getRecoveryCandidate: notBuiltYet('getRecoveryCandidate', 'pair 13, TASK-rte-runtime-async'),
        query,
        execute: notBuiltYet('execute', 'pair 11, TASK-rte-runtime'),
        enqueue: notBuiltYet('enqueue', 'pair 11, TASK-rte-runtime'),
        captureTarget: notBuiltYet('captureTarget', 'pair 11, TASK-rte-runtime'),
        releaseTarget: notBuiltYet('releaseTarget', 'pair 13, TASK-rte-runtime-async'),
        requestCommit: notBuiltYet('requestCommit', 'pair 17, TASK-rte-persistence'),
        replaceDocument: notBuiltYet('replaceDocument', 'pair 17, TASK-rte-persistence'),
        setMode: (next) => {
            if (phase === 'disposed') {
                return;
            }
            mode = next;
            refreshView();
        },
        updatePolicy: notBuiltYet('updatePolicy', 'pair 11, TASK-rte-runtime'),
        focus,
        registerInteractionRoot: notBuiltYet('registerInteractionRoot', 'pair 19, TASK-rte-chrome'),
        subscribe: (event, listener) => {
            if (phase === 'disposed') {
                return () => undefined;
            }
            let set = listeners.get(event);
            if (set === undefined) {
                set = new Set();
                listeners.set(event, set);
            }
            const subscribed = set;
            subscribed.add(listener);
            liveResources.subscriptions += 1;
            return () => {
                if (subscribed.delete(listener)) {
                    liveResources.subscriptions -= 1;
                }
            };
        },
        dispose,
    };

    const runtime: EditorRuntime = {
        handle,
        get view() {
            return view;
        },
        attach: (element) => {
            if (phase === 'disposed') {
                return;
            }
            detach();
            const attached = new EditorView(
                { mount: element },
                {
                    state,
                    editable: () => phase === 'ready' && mode === 'editable',
                    attributes: (current) => {
                        const attributes: Record<string, string> = {};
                        if (mode === 'readonly') {
                            // A surface that is not contenteditable takes no focus by itself (SPEC-rich-text-react/AC-028).
                            attributes.tabindex = '0';
                            attributes['aria-readonly'] = 'true';
                        }
                        if (isEmpty(current)) {
                            attributes['data-rte-empty'] = '';
                        }
                        return attributes;
                    },
                    dispatchTransaction: commit,
                    handleDOMEvents: {
                        beforeinput: () => {
                            typing = true;
                            return false;
                        },
                    },
                },
            );
            view = attached;
            liveResources.views.add(attached);
            if (phase !== 'mounting') {
                return;
            }
            // The first frame stands in for the first portal flush, which node views join (TASK-rte-bridge).
            readyFrame = environment.scheduler.frame(() => {
                readyFrame = undefined;
                liveResources.frames -= 1;
                phase = 'ready';
                refreshView();
                emit('ready', session);
            });
            liveResources.frames += 1;
        },
        detach,
        report: (diagnostic) => emit('diagnostic', diagnostic),
        select: (target) => {
            if ('node' in target) {
                commit(state.tr.setSelection(NodeSelection.create(state.doc, target.node)));
                return;
            }
            commit(state.tr.setSelection(TextSelection.create(state.doc, target.anchor, target.head)));
        },
    };
    runtimes.set(handle, runtime);
    return runtime;
};
