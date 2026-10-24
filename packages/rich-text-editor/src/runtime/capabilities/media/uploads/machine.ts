/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AsyncOperation } from '../../../async';
import { type UploadStatus } from '../../../types';
import { type PickedAsset } from '../media';

import { type Checked, type UploadEvent } from './types';

/** Where one upload slot stands, from its start in the document to its completion. */
export type Phase = 'pending' | UploadStatus['state'] | 'done';

/** One upload slot: what its start set, and what its upload has done since. */
export interface SlotState {
    readonly nodeId: string;
    readonly kind: 'insert' | 'replace';
    readonly name: string;
    /** What the slot's start set, which only the same slot after undo or redo still shows. */
    readonly label: string;
    readonly width: number | null;
    readonly height: number | null;
    /** Kept until the upload completes, which a retry sends again. */
    readonly file: File | undefined;
    readonly phase: Phase;
    readonly progress: number | null;
    readonly operation: AsyncOperation | undefined;
    /** The operation whose completion this slot shows, which the cache is read with. */
    readonly operationId: string | undefined;
}

/** The attributes of the slot's node in the document, as the transport read them. */
export interface NodeFacts {
    readonly assetId?: unknown;
    readonly labelSnapshot?: unknown;
    readonly width?: unknown;
    readonly height?: unknown;
}

/** What the transport observed or got back; `own` is the operation the coordinator returned, once it has. */
export type SlotEvent =
    | { readonly type: 'send'; readonly announce: boolean; readonly service: boolean }
    | {
          readonly type: 'started';
          readonly operation: AsyncOperation;
          readonly aborted: boolean;
          readonly announce: boolean;
      }
    | { readonly type: 'running'; readonly own: AsyncOperation | undefined }
    | { readonly type: 'progress'; readonly fraction: number; readonly aborted: boolean }
    | { readonly type: 'answered'; readonly own: AsyncOperation | undefined; readonly value: unknown }
    | { readonly type: 'parsed'; readonly asset: PickedAsset | undefined }
    | {
          readonly type: 'filled';
          readonly asset: PickedAsset;
          readonly code: string | undefined;
          readonly intent: unknown;
      }
    | { readonly type: 'failed'; readonly own: AsyncOperation | undefined }
    | { readonly type: 'aborted'; readonly operation: AsyncOperation }
    | {
          readonly type: 'committed';
          readonly history: boolean;
          readonly node: NodeFacts | null;
          /** A published change set the slot's asset itself: an undo, a cancel or another replacement. */
          readonly reset: boolean;
          /** The cache holds the completion of the slot's `operationId`. */
          readonly cached: boolean;
      }
    | { readonly type: 'reset'; readonly keeps: boolean; readonly present: boolean };

export type Effect =
    | { readonly type: 'changed' }
    | { readonly type: 'release' }
    /** What the coordinator's `deliver` answers: `undefined` for a result applied. */
    | { readonly type: 'reply'; readonly code: string | undefined }
    | { readonly type: 'parse'; readonly value: unknown }
    | { readonly type: 'fill'; readonly asset: PickedAsset }
    | { readonly type: 'cache'; readonly operationId: string; readonly asset: PickedAsset }
    | { readonly type: 'announce'; readonly event: UploadEvent }
    | { readonly type: 'reportFailure' }
    | { readonly type: 'replaced'; readonly assetId: string }
    | { readonly type: 'start'; readonly announce: boolean }
    | { readonly type: 'watch'; readonly operation: AsyncOperation }
    | { readonly type: 'end'; readonly operation: AsyncOperation }
    | { readonly type: 'refill' }
    | { readonly type: 'drop' };

export interface Step {
    readonly state: SlotState;
    readonly effects: readonly Effect[];
}

type Of<T extends SlotEvent['type']> = Extract<SlotEvent, { readonly type: T }>;

/** A new slot, before its start is applied to the document. */
export const fresh = (nodeId: string, kind: SlotState['kind'], checked: Checked): SlotState => ({
    ...checked,
    nodeId,
    kind,
    label: checked.name,
    phase: 'pending',
    progress: null,
    operation: undefined,
    operationId: undefined,
});

/** Whether the slot's upload runs or waits, which Cancel ends. */
export const isActive = ({ phase }: SlotState) => phase === 'pending' || phase === 'queued' || phase === 'running';

/** Whether the slot is not done: a failed or stopped slot keeps how it entered the document, which Cancel reverses. */
export const isKept = ({ phase }: SlotState) => phase !== 'done';

/** Whether the slot keeps the file of an upload that failed or stopped, which Retry sends again. */
export const isRetryable = ({ file, phase }: SlotState) =>
    file !== undefined && (phase === 'failed' || phase === 'stopped');

/** What the chrome shows of the slot's upload, `undefined` before it starts and after it completes. */
export const statusOf = ({ phase, progress, name }: SlotState): UploadStatus | undefined => {
    if (phase === 'pending' || phase === 'done') {
        return undefined;
    }
    return { state: phase, progress, name };
};

/** The slot with its effects in order; a `false` or `undefined` entry is an effect that does not apply. */
const stay = (state: SlotState, ...effects: (Effect | false | undefined)[]): Step => ({
    state,
    effects: effects.filter(Boolean) as Effect[],
});

const stopped = (state: SlotState, phase: Phase): SlotState => ({ ...state, phase, operation: undefined });

const halt = (state: SlotState): Step => stay(stopped(state, 'stopped'), { type: 'changed' });

/** The slot fails: its operation is released first when `release` is set, and `reply` answers the coordinator. */
const failedWith = (state: SlotState, release: boolean, report: boolean, reply?: string): Step =>
    stay(
        stopped(state, 'failed'),
        release && { type: 'release' },
        { type: 'changed' },
        report && { type: 'reportFailure' },
        { type: 'announce', event: { kind: 'failed', name: state.name } },
        reply !== undefined && { type: 'reply', code: reply },
    );

/** The transition table: what each event does to a slot in any phase. */
const TRANSITIONS: { readonly [T in SlotEvent['type']]: (state: SlotState, event: Of<T>) => Step } = {
    send: (state, { announce, service }) =>
        service && state.file !== undefined
            ? stay({ ...state, phase: 'queued', progress: null, operation: undefined }, { type: 'start', announce })
            : halt(state),
    started: (state, { operation, aborted, announce }) =>
        aborted
            ? halt(state)
            : stay(
                  { ...state, operation, operationId: operation.id },
                  { type: 'watch', operation },
                  announce && { type: 'announce', event: { kind: 'started', name: state.name } },
                  { type: 'changed' },
              ),
    running: (state, { own }) =>
        state.operation === undefined || state.operation === own
            ? stay({ ...state, phase: 'running' }, { type: 'changed' })
            : stay(state),
    progress: (state, { fraction, aborted }) => {
        const percent = Math.round(Math.min(1, Math.max(0, fraction)) * 100);
        if (aborted || state.phase !== 'running' || !Number.isFinite(fraction) || percent === state.progress) {
            return stay(state);
        }
        return stay({ ...state, progress: percent }, { type: 'changed' });
    },
    answered: (state, { own, value }) => {
        if (own === undefined) {
            return stay(state, { type: 'reply', code: 'superseded' });
        }
        // A completion for an operation that another start replaced, or that left the document, sets nothing.
        if (state.operation !== own) {
            return stay(state, { type: 'release' }, { type: 'reply', code: 'superseded' });
        }
        return stay(state, { type: 'parse', value });
    },
    parsed: (state, { asset }) =>
        asset === undefined ? failedWith(state, true, true, 'invalid-payload') : stay(state, { type: 'fill', asset }),
    filled: (state, { asset, code, intent }) => {
        if (code !== undefined) {
            return failedWith(state, true, false, code);
        }
        const altMissing = intent !== 'meaningful' && intent !== 'decorative';
        // An image with no alternative text keeps asking for it, which no review replaces.
        const review = state.kind === 'replace' && !altMissing;
        return stay(
            { ...stopped(state, 'done'), file: undefined },
            state.operation && { type: 'cache', operationId: state.operation.id, asset },
            { type: 'announce', event: { kind: 'completed', name: state.name, altMissing, review } },
            review && { type: 'replaced', assetId: asset.assetId },
            { type: 'changed' },
            { type: 'reply', code: undefined },
        );
    },
    failed: (state, { own }) => (state.operation === own ? failedWith(state, false, true) : stay(state)),
    aborted: (state, { operation }) =>
        state.operation === operation
            ? stay(
                  stopped(state, 'stopped'),
                  { type: 'release' },
                  { type: 'changed' },
                  { type: 'announce', event: { kind: 'cancelled', name: state.name } },
              )
            : stay(state, { type: 'release' }),
    committed: (state, { history, node, reset, cached }) => {
        const { operation, operationId } = state;
        // Only a running upload can end here, and only an undo or a redo reads the cache.
        if (state.phase === 'pending' || (operation === undefined && !history)) {
            return stay(state);
        }
        if (operation !== undefined) {
            return stay(state, (node === null || reset) && { type: 'end', operation });
        }
        return stay(
            state,
            operationId !== undefined &&
                node !== null &&
                node.assetId === null &&
                node.labelSnapshot === state.label &&
                node.width === state.width &&
                node.height === state.height &&
                cached && { type: 'refill' },
        );
    },
    reset: (state, { keeps, present }) =>
        stay(state, (!keeps || state.phase === 'done' || !present) && { type: 'drop' }),
};

/** The slot after `event` and the effects a transport runs, in order; it reads no clock, file, network or document. */
export const next = (state: SlotState, event: SlotEvent): Step =>
    (TRANSITIONS[event.type] as (state: SlotState, event: SlotEvent) => Step)(state, event);
