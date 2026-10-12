/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type Node, Slice } from 'prosemirror-model';
import { type EditorState, Selection, type Transaction } from 'prosemirror-state';
import { AttrStep } from 'prosemirror-transform';

import { COMMAND_META, type EngineCommand } from '#/definition';
import { type Diagnostic, type JsonObject, type ResourceLimits } from '#/model';
import { diagnostic } from '#/model/format';

import { type AsyncOperation, type AsyncRequest } from './async';
import { placeBlock } from './capabilities';
import { readImageHeader, svgHoldsScript } from './image-header';
import { INSERT_IMAGE, type PickedAsset, pickedAsset, REPLACE_IMAGE } from './media';
import { positionOf } from './positions';
import { type SelectionHandle, type SessionToken } from './types';
import { SLOT_START_META, type SlotStart } from './upload-slots';

/** The feature whose slots the uploads fill, and whose policy decides whether they may. */
export const UPLOAD_FEATURE = 'media.image';
/** What `media.image` accepts when its `acceptTypes` option is not set: no SVG, which can hold script. */
export const DEFAULT_ACCEPT_TYPES: readonly string[] = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/webp',
    'image/avif',
];
/** The most pixels an image may have on either side. */
export const MAX_IMAGE_SIDE = 65_535;
/** The transaction meta of an upload's completion, which ends no upload of its slot. */
const FILL_META = 'rte.upload-fill';
const POOL = 'uploads';

/** How many completed references one session keeps, which the `src/testing` probe lowers. */
export const uploadLimits = { cacheEntries: 10_000 };

/** A completed upload, by its operation ID: the slot it filled and the asset it set. */
export interface CompletedUpload {
    readonly nodeId: string;
    readonly asset: PickedAsset;
}

/** The completed-reference cache of one session, keyed by operation ID; it never evicts an entry. */
export class UploadCache {
    readonly #entries = new Map<string, CompletedUpload & { readonly release: () => void }>();

    get size(): number {
        return this.#entries.size;
    }

    read(operationId: string): CompletedUpload | undefined {
        return this.#entries.get(operationId);
    }

    write(operationId: string, entry: CompletedUpload & { readonly release: () => void }): void {
        this.#entries.set(operationId, entry);
    }

    /** Calls `releaseUnused` for each entry whose asset `kept` does not hold, then empties the cache. */
    empty(kept: ReadonlySet<string>): void {
        for (const entry of this.#entries.values()) {
            if (!kept.has(entry.asset.assetId)) {
                entry.release();
            }
        }
        this.#entries.clear();
    }
}

/** The cache of every live session, which the `src/testing` probe reads. */
export const liveUploadCaches = new Set<UploadCache>();

/** The `UploadService` shape the session calls, whose answers it checks as untrusted input. */
export interface UploadServiceLike {
    upload(
        request: { readonly operationId: string; readonly blob: Blob; readonly filename: string },
        context: {
            readonly signal: AbortSignal;
            readonly session: SessionToken;
            readonly reportProgress: (fraction: number) => void;
        },
    ): Promise<unknown>;
    releaseUnused(
        operationId: string,
        context: { readonly signal: AbortSignal; readonly session: SessionToken },
    ): Promise<void>;
}

/**
 * Why a file did not upload, which the editor says with how to fix it: its type, its size, its pixels, a size its
 * header does not tell, or an SVG that holds active content.
 */
export type UploadRejection = 'type' | 'size' | 'pixels' | 'unreadable' | 'unsafe';

/**
 * What the live region announces: once per gesture of chosen, pasted or dropped files, with each file refused and
 * the uploads it started, then once per upload's later start, end, failure or cancel.
 */
export type UploadEvent =
    | { readonly kind: 'started' | 'failed' | 'cancelled'; readonly name: string }
    | {
          readonly kind: 'completed';
          readonly name: string;
          readonly altMissing: boolean;
          /** Whether a replacement asks the author to review the alternative text it kept. */
          readonly review: boolean;
      }
    | {
          readonly kind: 'gesture';
          readonly refused: readonly { readonly name: string; readonly reason: UploadRejection }[];
          readonly started: readonly string[];
      };

/** What the chrome of a slot shows of its upload; never a document attribute. */
export interface UploadStatus {
    readonly state: 'queued' | 'running' | 'failed' | 'stopped';
    /** Whole percent once the service reports progress, else `null`. */
    readonly progress: number | null;
    readonly name: string;
}

/** Where chosen, pasted or dropped files go: new slots at the selection or a range, or the image `nodeId`. */
export type UploadPlace =
    | {
          readonly kind: 'insert';
          readonly origin: 'command' | 'paste' | 'drop';
          readonly range?: { readonly from: number; readonly to: number };
      }
    | { readonly kind: 'replace'; readonly nodeId: string };

/** What the uploads read of the session and run through it. */
export interface UploadHost {
    readonly state: () => EditorState;
    readonly limits: ResourceLimits;
    /** The media types `media.image` accepts. */
    readonly acceptTypes: readonly string[];
    readonly service: () => UploadServiceLike | undefined;
    readonly session: () => SessionToken;
    readonly generateId: () => string;
    /** Whether the policy lets `media.image` take this action. */
    readonly allows: (action: 'create' | 'edit' | 'paste') => boolean;
    readonly start: (request: AsyncRequest) => AsyncOperation;
    /** Aborts `operations` together, so none of them starts another waiting one. */
    readonly abort: (operations: readonly AsyncOperation[]) => void;
    readonly capture: (
        range: { readonly from: number; readonly to: number } | undefined,
    ) => SelectionHandle | undefined;
    readonly release: (target: SelectionHandle) => void;
    /** Runs `command` as the author's own undo step, from the state with the selection at `target` when set. */
    readonly run: (command: EngineCommand, target: SelectionHandle | undefined) => boolean;
    /** Applies a completion with no undo step, or returns why it cannot. */
    readonly fill: (command: EngineCommand) => string | undefined;
    /** Asks the author to review the alternative text of a replaced image while it holds `assetId`. */
    readonly reviewAlt: (nodeId: string, assetId: string) => void;
    readonly report: (diagnostic: Diagnostic) => void;
    readonly event: (event: UploadEvent) => void;
    /** The chrome reads a new status, such as a progress step. */
    readonly changed: () => void;
}

interface Slot {
    readonly nodeId: string;
    readonly kind: 'insert' | 'replace';
    readonly name: string;
    /** What the slot's start set, which only the same slot after undo or redo still shows. */
    readonly label: string;
    readonly width: number | null;
    readonly height: number | null;
    file: File | undefined;
    state: 'pending' | UploadStatus['state'] | 'done';
    progress: number | null;
    operation: AsyncOperation | undefined;
    /** The operation whose completion this slot shows, which the cache is read with. */
    operationId: string | undefined;
}

interface Checked {
    readonly file: File;
    readonly name: string;
    readonly width: number | null;
    readonly height: number | null;
}

const MIB = 1024 * 1024;

/** The `asset_image` attributes that every slot's start sets. */
const slotAttrs = ({ name, width, height }: Checked) => ({ assetId: null, labelSnapshot: name, width, height });

/** The file name a slot shows, which a pasted image without one takes from its type. */
const nameOf = (file: File) => {
    if (file.name !== '') {
        return file.name;
    }
    const subtype = file.type.split('/')[1] ?? 'image';
    return `image.${subtype.split('+')[0] ?? subtype}`;
};

/** The documents's asset IDs, which the uploads it still holds keep. */
const assetsIn = (doc: Node): Set<string> => {
    const assets = new Set<string>();
    doc.descendants((node) => {
        if (node.type.name === 'asset_image' && typeof node.attrs.assetId === 'string') {
            assets.add(node.attrs.assetId);
        }
    });
    return assets;
};

/**
 * The uploads of one session. A chosen, pasted or dropped file is checked against `acceptTypes`, `maxAssetBytes` and
 * the pixel limits from its header, never decoded, and starts as a slot in the document; the service call runs
 * through the async coordinator, at most `maxConcurrentUploads` at once, and fills the slot with no undo step. An undo,
 * a deletion or a cancel of the slot aborts its call, which `releaseUnused` then cleans up once.
 */
export const createUploads = (host: UploadHost) => {
    const slots = new Map<string, Slot>();
    const cache = new UploadCache();
    liveUploadCaches.add(cache);
    // Completions that a history change asks for from the cache, applied once no commit runs.
    const fills: string[] = [];

    const releaseOf = (service: UploadServiceLike, operationId: string, session: SessionToken) => () => {
        // The session may have ended, so the cleanup gets a signal of its own.
        try {
            service
                .releaseUnused(operationId, { signal: new AbortController().signal, session })
                .catch(() => undefined);
        } catch {
            // A service that throws instead of rejecting cleans up nothing either.
        }
    };

    const active = (nodeId: string) => {
        const state = slots.get(nodeId)?.state;
        return state === 'pending' || state === 'queued' || state === 'running';
    };
    // A failed or stopped slot keeps how it entered the document, which a retry's Cancel then reverses.
    const kept = (nodeId: string) => {
        const state = slots.get(nodeId)?.state;
        return state !== undefined && state !== 'done';
    };
    const retryable = (nodeId: string) => {
        const slot = slots.get(nodeId);
        return slot !== undefined && slot.file !== undefined && (slot.state === 'failed' || slot.state === 'stopped');
    };

    const check = async (file: File): Promise<Checked | UploadRejection> => {
        if (file.size > host.limits.maxAssetBytes) {
            return 'size';
        }
        const header = await readImageHeader(file);
        // Only the content names the type, so an HTML file named `photo.png`, or content no reader knows, is refused.
        const type = header.mediaType;
        if (type === null || !host.acceptTypes.includes(type)) {
            return 'type';
        }
        const { width, height } = header;
        if (type === 'image/svg+xml') {
            if (svgHoldsScript(await file.text())) {
                return 'unsafe';
            }
        } else if (width === null || height === null) {
            return 'unreadable';
        } else if (width > MAX_IMAGE_SIDE || height > MAX_IMAGE_SIDE || width * height > host.limits.maxImagePixels) {
            return 'pixels';
        }
        const measured = (value: number | null) => (value === null || value < 1 ? null : value);
        return { file, name: nameOf(file), width: measured(width), height: measured(height) };
    };

    const cacheFull = () => {
        if (cache.size < uploadLimits.cacheEntries) {
            return false;
        }
        host.report(diagnostic('media.cache-full', undefined, { entries: cache.size }, 'warning'));
        return true;
    };

    const stop = (slot: Slot, state: 'failed' | 'stopped') => {
        slot.state = state;
        slot.operation = undefined;
        host.changed();
    };

    /** Sets the completed asset on the slot, unless it left the document or another start replaced it. */
    const complete = (
        slot: Slot,
        operation: AsyncOperation,
        value: unknown,
        release: () => void,
    ): string | undefined => {
        if (slot.operation !== operation) {
            release();
            return 'superseded';
        }
        // An answer that holds a URL or token, a type the session does not accept, or no asset fails the upload.
        const asset = pickedAsset(value, {
            mediaTypes: host.acceptTypes,
            maxLength: host.limits.maxAttributeLength,
        });
        if (asset === undefined) {
            release();
            stop(slot, 'failed');
            host.report(diagnostic('media.upload-failed', undefined, undefined, 'warning'));
            host.event({ kind: 'failed', name: slot.name });
            return 'invalid-payload';
        }
        const code = host.fill({
            run: (state, dispatch) => {
                const pos = positionOf(state.doc, slot.nodeId);
                const node = pos === undefined ? null : state.doc.nodeAt(pos);
                if (pos === undefined || node === null || node.attrs.assetId !== null) {
                    return false;
                }
                const tr = state.tr.setMeta(FILL_META, true);
                for (const [name, attribute] of Object.entries(asset)) {
                    tr.setNodeAttribute(pos, name, attribute);
                }
                dispatch?.(tr);
                return true;
            },
            active: () => false,
        });
        if (code !== undefined) {
            release();
            stop(slot, 'failed');
            host.event({ kind: 'failed', name: slot.name });
            return code;
        }
        cache.write(operation.id, { nodeId: slot.nodeId, asset, release });
        slot.state = 'done';
        slot.file = undefined;
        slot.operation = undefined;
        const { doc } = host.state();
        const pos = positionOf(doc, slot.nodeId);
        const intent: unknown = pos === undefined ? undefined : doc.nodeAt(pos)?.attrs.altIntent;
        const altMissing = intent !== 'meaningful' && intent !== 'decorative';
        // An image with no alternative text keeps asking for it, which no review replaces.
        const review = slot.kind === 'replace' && !altMissing;
        host.event({ kind: 'completed', name: slot.name, altMissing, review });
        if (review) {
            host.reviewAlt(slot.nodeId, asset.assetId);
        }
        host.changed();
        return undefined;
    };

    /**
     * Sends the slot's file as a new operation, which waits while `maxConcurrentUploads` others run, and announces its
     * start unless its gesture announces it.
     */
    const send = (slot: Slot, announce = true) => {
        const service = host.service();
        const { file } = slot;
        if (service === undefined || file === undefined) {
            stop(slot, 'stopped');
            return;
        }
        let sent = false;
        let released = false;
        let release = () => undefined as void;
        // The service's own answer to the request, after which a cleanup can no longer race it.
        let settled: Promise<unknown> = Promise.resolve();
        const releaseOnce = () => {
            if (sent && !released) {
                released = true;
                settled.then(() => release()).catch(() => undefined);
            }
        };
        slot.state = 'queued';
        slot.progress = null;
        slot.operation = undefined;
        // The operation the coordinator returns, which its own callbacks compare with the slot's.
        const own: { operation?: AsyncOperation } = {};
        const started = host.start({
            key: `upload:${slot.nodeId}`,
            service: 'uploads',
            featureId: UPLOAD_FEATURE,
            action: slot.kind === 'insert' ? 'create' : 'edit',
            command: slot.kind === 'insert' ? INSERT_IMAGE : REPLACE_IMAGE,
            pool: { name: POOL, limit: Math.max(1, host.limits.maxConcurrentUploads) },
            run: ({ signal, session, operationId }) => {
                sent = true;
                release = releaseOf(service, operationId, session);
                if (slot.operation === undefined || slot.operation === own.operation) {
                    slot.state = 'running';
                    host.changed();
                }
                const reportProgress = (fraction: number) => {
                    if (signal.aborted || slot.state !== 'running' || !Number.isFinite(fraction)) {
                        return;
                    }
                    const percent = Math.round(Math.min(1, Math.max(0, fraction)) * 100);
                    if (percent !== slot.progress) {
                        slot.progress = percent;
                        host.changed();
                    }
                };
                // A service that throws instead of rejecting fails the same way.
                const call = Promise.resolve().then(() =>
                    service.upload(
                        { operationId, blob: file, filename: slot.name },
                        { signal, session, reportProgress },
                    ),
                );
                settled = call.then(
                    () => undefined,
                    () => undefined,
                );
                return call;
            },
            deliver: (result) =>
                own.operation === undefined ? 'superseded' : complete(slot, own.operation, result, releaseOnce),
            fail: () => {
                if (slot.operation !== own.operation) {
                    return;
                }
                stop(slot, 'failed');
                host.report(diagnostic('media.upload-failed', undefined, undefined, 'warning'));
                host.event({ kind: 'failed', name: slot.name });
            },
        });
        own.operation = started;
        const { signal } = started.controller;
        // A session that is not ready starts nothing.
        if (signal.aborted) {
            stop(slot, 'stopped');
            return;
        }
        slot.operation = started;
        slot.operationId = started.id;
        signal.addEventListener('abort', () => {
            releaseOnce();
            if (slot.operation === started) {
                stop(slot, 'stopped');
                host.event({ kind: 'cancelled', name: slot.name });
            }
        });
        if (announce) {
            host.event({ kind: 'started', name: slot.name });
        }
        host.changed();
    };

    /** The step that inserts `nodes` as new slots: at the selection as `image.insert` does, or over a pasted range. */
    const insertion = (
        nodes: readonly Node[],
        origin: 'command' | 'paste' | 'drop',
        start: SlotStart,
    ): EngineCommand => ({
        run: (state, dispatch) => {
            const { figure } = state.schema.nodes;
            if (figure === undefined) {
                return false;
            }
            let tr: Transaction | undefined;
            if (origin === 'command') {
                tr = placeBlock(state, Fragment.from(nodes));
            } else {
                const { from, to } = state.selection;
                tr = state.tr.replaceRange(from, to, new Slice(Fragment.from(nodes), 0, 0));
                const end = tr.mapping.map(to, 1);
                tr.setSelection(Selection.near(tr.doc.resolve(Math.min(end, tr.doc.content.size)), -1));
                tr.setMeta('uiEvent', origin).scrollIntoView();
            }
            if (tr === undefined) {
                return false;
            }
            if (origin === 'command') {
                tr.setMeta(COMMAND_META, INSERT_IMAGE);
            }
            dispatch?.(tr.setMeta(SLOT_START_META, start));
            return true;
        },
        active: () => false,
    });

    /** The step that starts a replacement: the file's label and size on the image `nodeId`, which keeps the rest. */
    const replacement = (nodeId: string, checked: Checked, previous: JsonObject): EngineCommand => ({
        run: (state, dispatch) => {
            const pos = positionOf(state.doc, nodeId);
            if (pos === undefined || state.doc.nodeAt(pos)?.type.name !== 'asset_image') {
                return false;
            }
            const tr = state.tr;
            for (const [name, attribute] of Object.entries(slotAttrs(checked))) {
                tr.setNodeAttribute(pos, name, attribute);
            }
            const start: SlotStart = { kind: 'replace', nodeId, previous };
            dispatch?.(tr.setMeta(COMMAND_META, REPLACE_IMAGE).setMeta(SLOT_START_META, start));
            return true;
        },
        active: () => false,
    });

    const slotOf = (nodeId: string, kind: Slot['kind'], checked: Checked): Slot => ({
        nodeId,
        kind,
        name: checked.name,
        label: checked.name,
        width: checked.width,
        height: checked.height,
        file: checked.file,
        state: 'pending',
        progress: null,
        operation: undefined,
        operationId: undefined,
    });

    const insert = (
        accepted: readonly Checked[],
        place: Extract<UploadPlace, { kind: 'insert' }>,
        target: SelectionHandle,
    ): readonly string[] => {
        const { schema } = host.state();
        const { figure, asset_image: image } = schema.nodes;
        if (figure === undefined || image === undefined) {
            return [];
        }
        const added = accepted.map((checked) => {
            const slot = slotOf(host.generateId(), 'insert', checked);
            const node = figure.create(
                { nodeId: host.generateId() },
                image.create({ nodeId: slot.nodeId, ...slotAttrs(checked) }),
            );
            return { slot, node };
        });
        for (const { slot } of added) {
            slots.set(slot.nodeId, slot);
        }
        const start: SlotStart = { kind: 'insert', nodeIds: added.map(({ slot }) => slot.nodeId) };
        const applied = host.run(
            insertion(
                added.map(({ node }) => node),
                place.origin,
                start,
            ),
            target,
        );
        for (const { slot } of added) {
            if (applied) {
                send(slot, false);
            } else {
                slots.delete(slot.nodeId);
            }
        }
        return applied ? added.map(({ slot }) => slot.name) : [];
    };

    const replace = (checked: Checked, nodeId: string): readonly string[] => {
        const { doc } = host.state();
        const pos = positionOf(doc, nodeId);
        const node = pos === undefined ? null : doc.nodeAt(pos);
        if (node === null || node.type.name !== 'asset_image') {
            return [];
        }
        const previous: JsonObject = Object.fromEntries(
            Object.keys(slotAttrs(checked)).map((name) => [name, node.attrs[name] as JsonObject[string]]),
        );
        const before = slots.get(nodeId);
        const slot = slotOf(nodeId, 'replace', checked);
        slots.set(nodeId, slot);
        if (!host.run(replacement(nodeId, checked, previous), undefined)) {
            if (before === undefined) {
                slots.delete(nodeId);
            } else {
                slots.set(nodeId, before);
            }
            return [];
        }
        send(slot, false);
        return [slot.name];
    };

    /** Checks `files` and starts their uploads at `place`, once their headers are read. */
    const begin = async (files: readonly File[], place: UploadPlace): Promise<void> => {
        if (host.service() === undefined || files.length === 0) {
            return;
        }
        let target: SelectionHandle | undefined;
        if (place.kind === 'insert') {
            target = host.capture(place.range);
            if (target === undefined) {
                return;
            }
        }
        const session = host.session();
        try {
            const checked = await Promise.all(
                files.map(async (file) => check(file).catch((): UploadRejection => 'type')),
            );
            const current = host.session();
            if (current.sessionId !== session.sessionId || current.generation !== session.generation) {
                return;
            }
            const accepted: Checked[] = [];
            const refused: { readonly name: string; readonly reason: UploadRejection }[] = [];
            for (const [index, result] of checked.entries()) {
                if (typeof result === 'string') {
                    refused.push({ name: nameOf(files[index] as File), reason: result });
                } else {
                    accepted.push(result);
                }
            }
            let started: readonly string[] = [];
            if (accepted.length > 0 && !cacheFull()) {
                const action = place.kind === 'replace' || place.origin === 'command' ? 'create' : 'paste';
                if (place.kind === 'replace') {
                    if (host.allows('edit')) {
                        started = replace(accepted[0] as Checked, place.nodeId);
                    }
                } else if (target !== undefined && host.allows('create') && host.allows(action)) {
                    started = insert(accepted, place, target);
                }
            }
            // One message per gesture, so no refusal or start overwrites another in the polite region.
            if (refused.length > 0 || started.length > 0) {
                host.event({ kind: 'gesture', refused, started });
            }
        } finally {
            if (target !== undefined) {
                host.release(target);
            }
        }
    };

    /** Sends a failed or stopped slot's file again as a new operation, with no undo step. */
    const retry = (nodeId: string) => {
        const slot = slots.get(nodeId);
        const pos = positionOf(host.state().doc, nodeId);
        if (slot === undefined || !retryable(nodeId) || pos === undefined || cacheFull()) {
            return;
        }
        if (host.state().doc.nodeAt(pos)?.attrs.assetId !== null) {
            return;
        }
        if (!host.allows(slot.kind === 'insert' ? 'create' : 'edit')) {
            return;
        }
        send(slot);
    };

    /** Whether `transactions` set the asset of slot `nodeId` themselves: an undo, a cancel or another replacement. */
    const resets = (transactions: readonly Transaction[], nodeId: string) =>
        transactions.some(
            (tr) =>
                tr.getMeta(FILL_META) !== true &&
                tr.steps.some(
                    (step, index) =>
                        step instanceof AttrStep &&
                        step.attr === 'assetId' &&
                        tr.docs[index]?.nodeAt(step.pos)?.attrs.nodeId === nodeId,
                ),
        );

    /**
     * Ends the upload of each slot that a published change removed or whose asset it set, and after an undo or a redo
     * fills a slot that shows a completed upload's start from the cache, keyed by that upload's operation ID.
     */
    const committed = (transactions: readonly Transaction[], history: boolean) => {
        const { doc } = host.state();
        const ended: AsyncOperation[] = [];
        for (const slot of slots.values()) {
            // Only a running upload can end here, and only an undo or a redo reads the cache.
            if (slot.state === 'pending' || (slot.operation === undefined && !history)) {
                continue;
            }
            const pos = positionOf(doc, slot.nodeId);
            const node = pos === undefined ? null : doc.nodeAt(pos);
            if (slot.operation !== undefined && (node === null || resets(transactions, slot.nodeId))) {
                ended.push(slot.operation);
                continue;
            }
            if (
                history &&
                slot.operation === undefined &&
                slot.operationId !== undefined &&
                node !== null &&
                node.attrs.assetId === null &&
                node.attrs.labelSnapshot === slot.label &&
                node.attrs.width === slot.width &&
                node.attrs.height === slot.height &&
                cache.read(slot.operationId) !== undefined
            ) {
                fills.push(slot.nodeId);
            }
        }
        if (ended.length > 0) {
            host.abort(ended);
        }
    };

    /** Applies the completions that `committed` found in the cache, as the upload's own completion did. */
    const flush = () => {
        for (let nodeId = fills.shift(); nodeId !== undefined; nodeId = fills.shift()) {
            const slot = slots.get(nodeId);
            const entry = slot?.operationId === undefined ? undefined : cache.read(slot.operationId);
            if (slot === undefined || entry === undefined) {
                continue;
            }
            const { asset } = entry;
            host.fill({
                run: (state, dispatch) => {
                    const pos = positionOf(state.doc, nodeId);
                    if (pos === undefined || state.doc.nodeAt(pos)?.attrs.assetId !== null) {
                        return false;
                    }
                    const tr = state.tr.setMeta(FILL_META, true);
                    for (const [name, attribute] of Object.entries(asset)) {
                        tr.setNodeAttribute(pos, name, attribute);
                    }
                    dispatch?.(tr);
                    return true;
                },
                active: () => false,
            });
        }
    };

    /**
     * History reset, `replaceDocument` or `dispose`: each completed upload whose asset `left` no longer holds is
     * released, then the cache empties. Where the session keeps the document, as a history reset does, its slots that
     * are not done stay with their uploads; otherwise none stays.
     */
    const reset = (left: Node, keeps = false) => {
        cache.empty(assetsIn(left));
        fills.length = 0;
        for (const [nodeId, slot] of slots) {
            if (!keeps || slot.state === 'done' || positionOf(left, nodeId) === undefined) {
                slots.delete(nodeId);
            }
        }
        host.changed();
    };

    const dispose = (left: Node) => {
        reset(left);
        slots.clear();
        liveUploadCaches.delete(cache);
    };

    const statusOf = (nodeId: string): UploadStatus | undefined => {
        const slot = slots.get(nodeId);
        if (slot === undefined || slot.state === 'pending' || slot.state === 'done') {
            return undefined;
        }
        return { state: slot.state, progress: slot.progress, name: slot.name };
    };

    return { begin, retry, statusOf, active, kept, retryable, committed, flush, reset, dispose, cache };
};

export type Uploads = ReturnType<typeof createUploads>;

/** The size limit in megabytes, as an upload error names it. */
export const megabytes = (bytes: number): number => Math.round((bytes / MIB) * 10) / 10;
