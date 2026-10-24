/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, type Transaction } from 'prosemirror-state';

import { type Diagnostic } from '#/model';

import { type ExceededLimit } from '../limits';
import { type CommandResult, type EditorSummary, type ReplaceResult } from '../types';

/** How a wait for input to settle ended. */
export type InputOutcome = 'settled' | 'timeout' | 'disposed';
export type Mode = EditorSummary['mode'];
export type RejectedCode = Extract<CommandResult, { readonly status: 'rejected' }>['code'];
export type ReplaceCode = Extract<ReplaceResult, { readonly status: 'rejected' }>['code'];

/** A batch checked against policy and limits and not installed, with how it maps positions. */
export interface Candidate {
    readonly candidate: EditorState;
    readonly root: Transaction;
    /** The root and what plugins appended to it. */
    readonly transactions: readonly Transaction[];
    readonly mapping: Transaction['mapping'];
    /** When the batch started, and how many transactions plugins appended to it. */
    readonly started: number;
    readonly appended: number;
}
/** What the `operationMetric` of a batch that changed the document reports. */
export type BatchMetric = Pick<Candidate, 'started' | 'appended'> & { readonly kind: 'commit' | 'paste' };
/** A candidate, or why a batch cannot be installed. */
export type Prepared =
    | Candidate
    | {
          readonly code: RejectedCode;
          readonly diagnostic?: Diagnostic;
          readonly fault?: Diagnostic;
          readonly limit?: ExceededLimit | undefined;
      };
/** Who runs a command: a host call, a queued intent, or an async result. */
export type Route = 'host' | 'queue' | 'async' | 'node';
/** What a command would do now: nothing, a prepared batch, or a rejection. */
export type Attempt = Prepared | { readonly unchanged: true };

export interface Intent {
    readonly id: string;
    readonly payload: unknown;
    readonly options: unknown;
    readonly depth: number;
    readonly resolve: (result: CommandResult) => void;
}
