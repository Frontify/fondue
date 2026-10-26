/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic, type ResourceLimits } from '#/model';

import { contentChecksApi, rangeOf } from './api/editorApi';
import { type AsyncOperation, type AsyncRequest } from './async/async';
import { type MediaSession } from './capabilities/media/session';
import {
    acceptSuggestion,
    activeSuggestion,
    dismissSuggestion,
    moveSuggestion,
} from './capabilities/suggestions/plugin';
import { endComposition, nodeChromeAt, resyncSelection, selectionRect } from './dom/viewBridge';
import { engineOf } from './portEngine';
import {
    type ActiveSuggestion,
    type ColumnState,
    type InputOutcome,
    type NodeActions,
    type NodeTarget,
    type RuntimeHandle,
} from './portTypes';
import { isEmpty, runtimeOf } from './runtime';
import { mediaOf as mediaOfRuntime } from './session/lifecycle/uploadsWiring';
import {
    type AuthoringPolicy,
    type CaptureResult,
    type CaptureTargetOptions,
    type OperationMetric,
    type Unsubscribe,
} from './types';

export {
    INSERT_IMAGE,
    MAX_IMAGE_SIDE,
    megabytes,
    REPLACE_IMAGE,
    UPLOAD_FEATURE,
} from './capabilities/media/uploads/constants';
export { type MediaSession } from './capabilities/media/session';
export { referenceValues } from './capabilities/suggestions/references';
export { passesToBrowser } from './dom/browserKeys';
export {
    type ActiveSuggestion,
    type ColumnState,
    type RuntimeHandle,
    type SuggestionItem,
    type UploadEvent,
    type UploadPlace,
    type UploadRejection,
} from './portTypes';
export {
    type AuthoringPolicy,
    type CaptureResult,
    type CaptureTargetOptions,
    type CommandArgs,
    type CommandKey,
    type CommandResult,
    type CommandState,
    type CommitOptions,
    type CommitResult,
    type DocumentChange,
    type EditorSummary,
    type FeaturePolicy,
    type LoadedDocument,
    type OperationMetric,
    type ReferenceValue,
    type SaveStatus,
    type SelectionHandle,
    type SelectionSummary,
    type SessionToken,
    type ShippedCommands,
    type Snapshot,
    type Unsubscribe,
} from './types';

/** The runtime as the React layers hold it: the members that name no engine type. */
export type EditorPort = {
    handle: RuntimeHandle;
    suggestionListId: string;
    nextDomId: () => string;
    interactionRoots: ReadonlySet<HTMLElement>;
    policy: AuthoringPolicy;
    limits: ResourceLimits;
    detach(): void;
    report(diagnostic: Diagnostic): void;
    select(target: { anchor: number; head: number; scroll?: boolean } | { node: number; scroll?: boolean }): void;
    captureRange(range: { from: number; to: number }, options: CaptureTargetOptions): CaptureResult;
    watch<T>(read: () => T, isEqual: (previous: T, next: T) => boolean, listener: (value: T) => void): Unsubscribe;
    startAsync(request: AsyncRequest): AsyncOperation;
    changeServices(members: readonly string[]): void;
    faultView(): void;
    setDisabled(disabled: boolean): void;
    setColumns(columns: ColumnState): void;
    nodeActions(target: NodeTarget): NodeActions;
    saveStatusChanged(): void;
    afterInput(settled: (outcome: InputOutcome) => void, timeoutMs: number): void;
    clearHistory(): void;
    measure(kind: OperationMetric['kind'], started: number, failureCode: string | null): void;
    runChecks(): boolean;
};

/** The media session of the session behind `port`, `undefined` when its model does not install `media.image`. */
export const mediaOf = (port: EditorPort): MediaSession | undefined => mediaOfRuntime(engineOf(port));

/** The content-checks API of the session behind `port`. */
export const contentChecksOf = (port: EditorPort) => contentChecksApi(engineOf(port));

/** The port of the session behind a handle the runtime made. */
export const portOfHandle = (handle: object): EditorPort | undefined => runtimeOf(handle);

/** Whether the surface is attached. */
export const hasSurface = (port: EditorPort | undefined): boolean =>
    port !== undefined && engineOf(port).view !== undefined;

/** The surface element while its view is attached. */
export const surfaceElement = (port: EditorPort | undefined): HTMLElement | undefined => {
    if (port === undefined) {
        return undefined;
    }

    return engineOf(port).view?.dom;
};

/** Whether an input composition runs on the surface. */
export const isComposing = (port: EditorPort): boolean => engineOf(port).view?.composing === true;

/** Whether the document is one empty textblock. */
export const isEmptyDocument = (port: EditorPort): boolean => isEmpty(engineOf(port).state);

/** The selection's two ends and whether it is a caret. */
export const selectionSpan = (port: EditorPort): { anchor: number; head: number; empty: boolean } => {
    const { anchor, head, empty } = engineOf(port).state.selection;

    return { anchor, head, empty };
};

/** The position of the selected node, or `undefined` when the selection is not a node selection. */
export const selectedNodePosition = (port: EditorPort): number | undefined => {
    const { selection } = engineOf(port).state;
    if ('node' in selection) {
        return selection.from;
    }

    return undefined;
};

/** The type names of the selected node and of every node around the selection, innermost first. */
export const selectedNodeNames = (port: EditorPort | undefined): readonly string[] => {
    const selection = port === undefined ? undefined : engineOf(port).view?.state.selection;
    if (selection === undefined) {
        return [];
    }

    const names: string[] = [];
    if ('node' in selection) {
        names.push((selection.node as { type: { name: string } }).type.name);
    }

    for (let depth = selection.$from.depth; depth >= 0; depth -= 1) {
        names.push(selection.$from.node(depth).type.name);
    }

    return names;
};

/** The type name of the block that holds the selection's start, or an empty string without a surface. */
export const selectionBlockName = (port: EditorPort | undefined): string => {
    const view = port === undefined ? undefined : engineOf(port).view;
    if (view === undefined) {
        return '';
    }

    return view.state.selection.$from.parent.type.name;
};

/** The selection's rectangle, or `undefined` without a surface. */
export const selectionRectOf = (port: EditorPort): DOMRect | undefined => {
    const { view } = engineOf(port);
    if (view === undefined) {
        return undefined;
    }

    return selectionRect(view);
};

/** Ends a composition while focus stays in the surface. */
export const endCompositionOf = (port: EditorPort): void => {
    endComposition(engineOf(port).view);
};

/** Writes the selection to the DOM again, while the surface has focus. */
export const resyncSelectionOf = (port: EditorPort | undefined): void => {
    resyncSelection(port === undefined ? undefined : engineOf(port).view);
};

/** The node chrome toolbar at the selection, or `null`. */
export const nodeChromeOf = (port: EditorPort): HTMLElement | null => {
    const { view } = engineOf(port);
    if (view === undefined) {
        return null;
    }

    return nodeChromeAt(view);
};

/** The position of the atom node, such as an image, whose view holds `target`, else `undefined`. */
export const atomPositionAt = (port: EditorPort, target: Node): number | undefined => {
    const { view } = engineOf(port);
    if (view === undefined) {
        return undefined;
    }

    // A leaf view maps a node inside it to the position before or after its node.
    const pos = view.posAtDOM(target, 0);
    const { nodeBefore, nodeAfter } = view.state.doc.resolve(pos);
    const candidates = [{ node: nodeAfter, at: pos }];
    if (nodeBefore !== null) {
        candidates.push({ node: nodeBefore, at: pos - nodeBefore.nodeSize });
    }

    return candidates.find(
        ({ node, at }) => node !== null && node.isAtom && !node.isText && view.nodeDOM(at)?.contains(target) === true,
    )?.at;
};

/** How the schema treats node type `name`: `undefined` when unknown, `leaf` for a leaf or atom, else `branch`. */
export const nodeKindOf = (port: EditorPort, name: string): 'leaf' | 'branch' | undefined => {
    const nodeType = engineOf(port).state.schema.nodes[name];
    if (nodeType === undefined) {
        return undefined;
    }

    if (nodeType.isLeaf || nodeType.isAtom) {
        return 'leaf';
    }

    return 'branch';
};

/** The suggestion list that shows now, or `null`. */
export const activeSuggestionOf = (port: EditorPort): ActiveSuggestion | null => activeSuggestion(engineOf(port).state);

/** The position range `from` to `to` of the current document, as a plugin's `EditorRange`. */
export const rangeOfPort = (port: EditorPort, from: number, to: number) => rangeOf(engineOf(port).state.doc, from, to);

/** The position range of the open suggestion list's trigger, or `undefined` while none shows or no surface is attached. */
export const suggestionAnchorRange = (port: EditorPort | undefined) => {
    if (port === undefined) {
        return undefined;
    }

    const runtime = engineOf(port);
    const doc = runtime.view?.state.doc;
    const current = activeSuggestion(runtime.state);
    if (current === null || doc === undefined) {
        return undefined;
    }

    return rangeOf(doc, current.from, current.from);
};

/** Accepts the option `index` of the open suggestion list. */
export const acceptSuggestionIn = (port: EditorPort, index: number): void => {
    const { view } = engineOf(port);
    if (view !== undefined) {
        acceptSuggestion(view, index);
    }
};

/** Moves the open suggestion list to the option `index`. */
export const moveSuggestionIn = (port: EditorPort, index: number): void => {
    const { view } = engineOf(port);
    if (view !== undefined) {
        moveSuggestion(view, index);
    }
};

/** Closes the open suggestion list. */
export const dismissSuggestionIn = (port: EditorPort): void => {
    const { view } = engineOf(port);
    if (view !== undefined) {
        dismissSuggestion(view);
    }
};
