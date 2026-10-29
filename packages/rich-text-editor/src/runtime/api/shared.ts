/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Attrs, type Node, type Schema } from 'prosemirror-model';
import { type EditorState, type Transaction } from 'prosemirror-state';

import {
    type ContentModel,
    type Diagnostic,
    type JsonObject,
    type ResourceLimits,
    type RichTextDocument,
} from '#/model';
import { snapshot } from '#/model/internal';
import { type CommandLookup, type EngineCommand } from '#/runtime/definition';

import { type CapabilityImplementation } from '../capabilities';
import { type MediaSession } from '../capabilities/media/session';
import {
    type AuthoringPolicy,
    type CaptureTargetOptions,
    type CommandOptions,
    type CommandState,
    type SelectionHandle,
} from '../types';

import { checkedAttrs } from './checked';
import { type CommandOutcome, type EditorRange } from './documentApi';

export type Positions = {
    from: number;
    to: number;
};

export const RANGES = new WeakMap<object, Positions & { doc: Node }>();

/** The range from `from` to `to` in `doc`. */
export const rangeOf = (doc: Node, from: number, to: number): EditorRange => {
    const range = Object.freeze({});
    RANGES.set(range, { from, to, doc });

    // The one place a range is minted: `EditorRange` is a brand with no runtime shape.
    return range as unknown as EditorRange;
};

/** The document positions behind a range this module made, as they were when it was read. */
export const positionsOf = (range: EditorRange): Positions | undefined => RANGES.get(range);

/** The positions of `range` in `doc`, the document it was read from, else `undefined`. */
export const positionsIn = (range: EditorRange, doc: Node): Positions | undefined => {
    const read = RANGES.get(range);
    if (read === undefined || read.doc !== doc) {
        return undefined;
    }

    return read;
};

/** Where the document API reads and writes: a running command's state, or the live session. */
export type ApiSource = {
    model: ContentModel;
    schema: Schema;
    lookup: CommandLookup;
    limits: ResourceLimits;
    state(): EditorState;
    /** The positions of `range` in the current state, or `undefined` for a range it cannot map from. */
    resolve(range: EditorRange): Positions | undefined;
    /** Runs `command` with `payload` as one edit. */
    edit(command: EngineCommand, payload?: unknown): CommandOutcome;
    /** Why the session's policy or limits refuse `transaction` from `before`, a write checked before it runs. */
    refusal(before: Node, transaction: Transaction): 'policy' | 'limit' | undefined;
    /** Notes a write refused as not allowed, which makes a running command that then fails report `not-allowed`. */
    refused(): void;
    execute(id: string, payload: unknown, options: CommandOptions | undefined): CommandOutcome;
    query(id: string, payload: unknown, options: CommandOptions | undefined): CommandState;
    capture(range: EditorRange | undefined, options: CaptureTargetOptions): SelectionHandle | undefined;
    release(target: SelectionHandle): void;
    select(transaction: Transaction, scroll: boolean): boolean;
    policy(): AuthoringPolicy;
    editable(): boolean;
    /** The position of a surface element, which only the live session has. */
    positionAt(element: Element): number | undefined;
    document(state: EditorState): RichTextDocument;
    /** Runs `effect` now, or inside a command once it has run, never for a query. */
    later(effect: () => void): void;
    /** Reports a diagnostic of work this API started after it returned. */
    report(found: Diagnostic): void;
    uploads(): MediaSession['uploads'] | undefined;
};

/** `Attrs` values are `any`. */
export const valuesOf = (attrs: Attrs): JsonObject => snapshot({ ...attrs });

export const idOf = (node: Node): string | null => {
    if (typeof node.attrs.nodeId === 'string') {
        return node.attrs.nodeId;
    }

    return null;
};

/** The edit helpers every facet of the document API shares. */
export const sharedEdits = (source: ApiSource) => {
    const { schema, lookup, model, limits } = source;
    const { maxAttributeLength } = limits;
    /** Runs `command` as one edit, refused where it would drop content its target cannot hold, as `execute` refuses it. */
    const edit = (command: EngineCommand, payload?: unknown) => {
        if (command.refuses?.(source.state(), payload) === true) {
            source.refused();

            return false;
        }

        return source.edit(command, payload).status !== 'rejected';
    };

    const capability = (implementation: CapabilityImplementation, args: JsonObject) =>
        implementation(args, schema, lookup);
    /**
     * Runs `implementation` with `args` and the checked `attrs` as its payload, or refuses attributes the types do not take;
     * `whole` attributes make a new mark or node.
     */
    const editWith = (
        implementation: CapabilityImplementation,
        args: JsonObject,
        types: readonly string[],
        attrs: JsonObject | undefined,
        whole: boolean,
        extra: JsonObject = {},
    ) => {
        const checked = checkedAttrs(model, types, attrs ?? {}, maxAttributeLength, whole);

        return checked !== undefined && edit(capability(implementation, args), Object.assign({ ...checked }, extra));
    };

    return { edit, capability, editWith };
};
