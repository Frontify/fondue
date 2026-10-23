/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import {
    AllSelection,
    EditorState,
    NodeSelection,
    Plugin,
    PluginKey,
    Selection,
    TextSelection,
    type Transaction,
} from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { COMMAND_META, type CompiledDefinition, ORIGIN_META } from '#/definition';
import { type CapabilityRef, type Diagnostic, type RichTextDocument } from '#/model';
import { type TreeNode } from '#/model/content';
import { encodeTree } from '#/model/encode';
import { diagnostic } from '#/model/format';
import { randomId } from '#/model/random-id';

import { createEventBus, type Listener } from './events';
import { nodeStatePlugin } from './node-state';
import {
    type ChangeOrigin,
    type CommandResult,
    type EditorSummary,
    type SelectionSummary,
    type SessionToken,
    type Unsubscribe,
} from './types';

type Mode = EditorSummary['mode'];
type RejectedCode = Extract<CommandResult, { readonly status: 'rejected' }>['code'];

/** What the host calls. */
export interface RuntimeHandle {
    getSummary(): EditorSummary;
    setMode(mode: Mode): void;
    focus(where?: 'current' | 'start' | 'end'): void;
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
    /**
     * Selects the text between two positions, or the node at one, as the `src/testing` helpers name it.
     */
    select(target: { readonly anchor: number; readonly head: number } | { readonly node: number }): void;
}

export interface EditorRuntimeOptions {
    readonly definition: CompiledDefinition;
    readonly documentId: string;
    /** The decoded island tree the session's document starts from. */
    readonly tree: TreeNode;
    /** The stored document's capabilities, kept while islands keep their content. */
    readonly capabilities: readonly CapabilityRef[];
    /** For the session id; default `randomId`. */
    readonly generateId?: () => string;
    readonly mode: Mode;
}

/** What every live runtime owns, which the `src/testing` probe reads. */
export const liveResources = {
    views: new Set<EditorView>(),
    frames: 0,
};

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

export const summarize = (selection: Selection): SelectionSummary => {
    let selectedNodeId: string | null = null;
    if (selection instanceof NodeSelection && typeof selection.node.attrs.nodeId === 'string') {
        selectedNodeId = selection.node.attrs.nodeId;
    }
    const { parent } = selection.$from;
    let blockType: string | null = null;
    if (parent.isTextblock) {
        blockType = parent.type.name;
    }
    return { kind: kindOf(selection), collapsed: selection.empty, blockType, selectedNodeId };
};

const UI_ORIGINS: ReadonlySet<string> = new Set(['paste', 'cut', 'drop']);

/** The origin of an action: a command, paste, cut or drop. */
const actionOrigin = (root: Transaction): ChangeOrigin | undefined => {
    const event: unknown = root.getMeta('uiEvent');
    if (root.getMeta(COMMAND_META) !== undefined) {
        return 'command';
    }
    if (typeof event === 'string' && UI_ORIGINS.has(event)) {
        return event as ChangeOrigin;
    }
    return undefined;
};

/** Where a batch came from: typing is a DOM change after a recorded `beforeinput`, which `commit` marks. */
const originOf = (root: Transaction): ChangeOrigin => {
    const action = actionOrigin(root);
    if (action !== undefined) {
        return action;
    }
    if (root.getMeta(ORIGIN_META) === 'input') {
        return 'input';
    }
    return 'unknown';
};

/** One empty paragraph is an empty document, which shows the placeholder. */
export const isEmpty = ({ doc }: EditorState) =>
    doc.childCount === 1 && doc.firstChild !== null && doc.firstChild.isTextblock && doc.firstChild.content.size === 0;

/** A batch that is applied and not yet installed. */
interface Candidate {
    readonly candidate: EditorState;
    readonly root: Transaction;
}
/** A candidate, or why a batch cannot be installed. */
type Prepared =
    | Candidate
    | {
          readonly code: RejectedCode;
      };

/** One editing session: its state, its view while a surface is attached, the commit path and its events. */
export const createEditorRuntime = (options: EditorRuntimeOptions): EditorRuntime => {
    const { definition } = options;
    const generate = options.generateId ?? randomId;
    const session: SessionToken = {
        documentId: options.documentId,
        sessionId: generate(),
        generation: 0,
    };
    const { capabilities } = options;
    let phase: EditorSummary['phase'] = 'mounting';
    let mode = options.mode;
    // The mode the surface shows, which follows `mode` until the view faults.
    let shownMode = mode;
    let commitSequence = 0;
    let sequence = 0;
    let typing = false;
    let view: EditorView | undefined;
    // The state the view threw on.
    // ProseMirror runs that throwing update again on `setProps` and `destroy`.
    let recovery: EditorState | undefined;
    let readyFrame: number | undefined;
    // Set when a view call threw.
    let viewThrew = false;
    // Commits and notifications in progress.
    let busy = 0;
    let installing = false;
    // Roots that plugin views dispatch while an install runs, committed once its events are done.
    const deferred: Transaction[] = [];

    // Records typing before any other handler sees the event, so the view itself gets no event handler.
    const typingRecorder = new Plugin({
        key: new PluginKey('rte.typing'),
        props: {
            handleDOMEvents: {
                beforeinput: () => {
                    typing = true;
                    return false;
                },
            },
        },
    });
    let state = EditorState.create({
        doc: definition.schema.nodeFromJSON(options.tree),
        plugins: [typingRecorder, nodeStatePlugin(), ...definition.plugins],
    });
    // The state whose document `sequence` last published.
    let published = state;

    const busyWith = <T>(work: () => T): T => {
        busy += 1;
        try {
            return work();
        } finally {
            busy -= 1;
        }
    };

    const isDisposed = () => phase === 'disposed';
    const { emit, subscribe, clear } = createEventBus({ isDisposed, around: busyWith });

    const report = (diagnostic: Diagnostic) => emit('diagnostic', diagnostic);

    const encode = (doc: Node): RichTextDocument =>
        encodeTree(doc.toJSON() as TreeNode, definition.model, capabilities).document;

    // Recomputes `editable` and the surface attributes from the phase and the mode.
    const refreshView = () => {
        if (recovery !== undefined) {
            return;
        }
        shownMode = mode;
        if (view !== undefined) {
            view.setProps({});
        }
    };

    const fault = (diagnostic: Diagnostic) => {
        phase = 'faulted';
        refreshView();
        report(diagnostic);
    };

    /** The view threw while it installed `candidate`: editing stops. */
    const viewFault = (attached: EditorView, candidate: EditorState) => {
        recovery = candidate;
        attached.dom.setAttribute('contenteditable', 'false');
        fault(diagnostic('runtime.view-fault', undefined, undefined, 'error'));
    };

    /** Applies a root transaction and every transaction plugins append to it. */
    const prepare = (root: Transaction): Prepared => {
        const applied = state.applyTransaction(root);
        if (applied.transactions.length === 0) {
            return { code: 'not-applicable' };
        }
        return { candidate: applied.state, root };
    };

    /** Publishes a prepared batch, then commits the roots that plugin views dispatched while it was installed. */
    const install = (prepared: Candidate): boolean => guarded(() => publish(prepared));

    /** Runs `work`, which installs states, then commits the roots that plugin views dispatched meanwhile. */
    const guarded = <T>(work: () => T): T => {
        installing = true;
        let result: T;
        try {
            result = work();
        } finally {
            installing = false;
        }
        for (let next = deferred.shift(); next !== undefined; next = deferred.shift()) {
            // A listener of this install may have faulted or disposed the session, which then commits nothing more.
            if (phase !== 'ready') {
                deferred.length = 0;
                break;
            }
            commit(next);
        }
        return result;
    };

    /** Publishes the current state's document: counts an effective change, then emits the change. */
    const announce = (origin: ChangeOrigin, commandId: string | null): boolean => {
        const previous = published;
        const current = state;
        published = current;
        // An effective change compares documents by node equality, never by serializing them.
        const changed = !current.doc.eq(previous.doc);
        if (changed) {
            sequence += 1;
        }
        if (changed) {
            let document: RichTextDocument | undefined;
            emit('documentChange', {
                stamp: { ...session, sequence },
                commitSequence,
                origin,
                commandId,
                readDocument: () => {
                    if (document === undefined) {
                        document = encode(current.doc);
                    }
                    return document;
                },
            });
        }
        return changed;
    };

    /** Runs a view call; `threw` when it threw. */
    const callView = <T>(work: () => T): { readonly threw: boolean; readonly value: T | undefined } => {
        let value: T | undefined;
        try {
            value = work();
        } catch {
            viewThrew = true;
        }
        const threw = viewThrew;
        viewThrew = false;
        return { threw, value };
    };

    /** Installs a state in the view and counts it as a commit; `false` when the view threw and the session faulted. */
    const installState = (next: EditorState): boolean => {
        const previous = state;
        state = next;
        const attached = view;
        if (attached !== undefined && callView(() => attached.updateState(next)).threw) {
            state = previous;
            viewFault(attached, next);
            return false;
        }
        commitSequence += 1;
        return true;
    };

    /** Installs a batch in the view and counts it, then publishes it. */
    const publish = ({ candidate, root }: Candidate): boolean => {
        if (!installState(candidate)) {
            return false;
        }
        const origin = originOf(root);
        const command: unknown = root.getMeta(COMMAND_META);
        let commandId: string | null = null;
        if (origin === 'command' && typeof command === 'string') {
            commandId = command;
        }
        return announce(origin, commandId);
    };

    /** The view's `dispatchTransaction`: the one path by which any change reaches the view. */
    const commit = (root: Transaction) => {
        // A plugin view's `update` may dispatch inside `view.updateState`; its root waits for the install to publish.
        if (installing) {
            deferred.push(root);
            return;
        }
        // A recorded `beforeinput` describes this batch only, accepted or not.
        const typed = typing;
        typing = false;
        // A faulted session installs nothing more, so a broken view never updates again.
        if (phase === 'faulted' || phase === 'disposed') {
            return;
        }
        if (root.before !== state.doc) {
            report(diagnostic('runtime.stale-transaction', undefined, undefined, 'error'));
            return;
        }
        if (typed && actionOrigin(root) === undefined) {
            root.setMeta(ORIGIN_META, 'input');
        }
        busyWith(() => {
            const prepared = prepare(root);
            if ('candidate' in prepared) {
                install(prepared);
            }
        });
    };

    const cancelReady = () => {
        if (readyFrame !== undefined) {
            cancelAnimationFrame(readyFrame);
            readyFrame = undefined;
            liveResources.frames -= 1;
        }
    };

    const detach = () => {
        cancelReady();
        if (view !== undefined) {
            liveResources.views.delete(view);
            try {
                view.destroy();
            } catch (error) {
                // A view that threw on an update runs it again while it is destroyed, and `dispose` throws nothing.
                if (recovery === undefined) {
                    throw error;
                }
            }
            view = undefined;
        }
    };

    const dispose = () => {
        if (phase === 'disposed') {
            return;
        }
        // Set first, so `disposed` listeners read the final phase.
        phase = 'disposed';
        deferred.length = 0;
        emit('disposed', session);
        clear();
        detach();
    };

    const focus = (where: 'current' | 'start' | 'end' = 'current') => {
        if (phase !== 'ready' || view === undefined) {
            return;
        }
        if (where === 'start') {
            commit(state.tr.setSelection(Selection.atStart(state.doc)));
        }
        if (where === 'end') {
            commit(state.tr.setSelection(Selection.atEnd(state.doc)));
        }
        if (shownMode === 'editable') {
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

    const handle: RuntimeHandle = {
        getSummary: () => {
            return {
                session,
                phase,
                mode,
                commitSequence,
                sequence,
                compositionActive: view !== undefined && view.composing,
                selection: summarize(state.selection),
            };
        },
        setMode: (next) => {
            if (phase === 'disposed') {
                return;
            }
            mode = next;
            refreshView();
        },
        focus,
        subscribe,
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
            const { threw, value: attached } = callView(
                () =>
                    new EditorView(
                        { mount: element },
                        {
                            state,
                            editable: () => phase === 'ready' && shownMode === 'editable',
                            attributes: (current) => {
                                const attributes: Record<string, string> = {};
                                if (shownMode === 'readonly') {
                                    // A surface that is not contenteditable takes no focus by itself.
                                    attributes.tabindex = '0';
                                    attributes['aria-readonly'] = 'true';
                                }
                                if (isEmpty(current)) {
                                    attributes['data-rte-empty'] = '';
                                }
                                return attributes;
                            },
                            dispatchTransaction: commit,
                        },
                    ),
            );
            if (attached === undefined || threw) {
                // A view constructor that throws faults the session, which keeps the decoded document.
                fault(diagnostic('runtime.view-fault', undefined, undefined, 'error'));
                return;
            }
            view = attached;
            liveResources.views.add(attached);
            if (phase !== 'mounting') {
                return;
            }
            // The first frame stands in for the first portal flush, which node views join.
            readyFrame = requestAnimationFrame(() => {
                readyFrame = undefined;
                liveResources.frames -= 1;
                phase = 'ready';
                refreshView();
                emit('ready', session);
            });
            liveResources.frames += 1;
        },
        detach,
        report,
        select: (target) => {
            let transaction = state.tr;
            if ('node' in target) {
                transaction = transaction.setSelection(NodeSelection.create(state.doc, target.node));
            } else {
                transaction = transaction.setSelection(TextSelection.create(state.doc, target.anchor, target.head));
            }
            commit(transaction);
        },
    };
    runtimes.set(handle, runtime);
    return runtime;
};
