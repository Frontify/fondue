/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type JsonObject } from '#/model';
import { diagnostic } from '#/model/internal';

import { positionOf } from '../../../transform/positions';
import { type SelectionHandle } from '../../../types';

import { uploadLimits } from './cache';
import { checkFiles, nameOf, sortChecked } from './check';
import { insertion, nodeIn, replacement, slotAttrs } from './commands';
import { fresh, isRetryable } from './machine';
import { type Transport } from './transport';
import { type Checked, type UploadPlace } from './types';

/** Creates a slot per accepted file, inserts their figures at `target` and starts the uploads; returns the started names. */
const insertSlots = (
    { link: { host, cells }, send }: Transport,
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
        const cell = { slot: fresh(host.generateId(), 'insert', checked) };
        const node = figure.create(
            { nodeId: host.generateId() },
            image.create({ nodeId: cell.slot.nodeId, ...slotAttrs(checked) }),
        );

        return { cell, node };
    });
    for (const { cell } of added) {
        cells.set(cell.slot.nodeId, cell);
    }

    const start = { kind: 'insert', nodeIds: added.map(({ cell }) => cell.slot.nodeId) } as const;
    const applied = host.run(
        insertion(
            added.map(({ node }) => node),
            place.origin,
            start,
        ),
        target,
    );
    for (const { cell } of added) {
        if (applied) {
            send(cell, false);
        } else {
            cells.delete(cell.slot.nodeId);
        }
    }

    if (!applied) {
        return [];
    }

    return added.map(({ cell }) => cell.slot.name);
};

/** Starts a replacement upload on the image `nodeId`; returns the started names. */
const replaceSlot = (
    { link: { host, cells }, send }: Transport,
    checked: Checked,
    nodeId: string,
): readonly string[] => {
    const { doc } = host.state();
    const node = nodeIn(doc, nodeId);
    if (node === null || node.type.name !== 'asset_image') {
        return [];
    }

    const previous: JsonObject = Object.fromEntries(
        Object.keys(slotAttrs(checked)).map((name) => [name, node.attrs[name] as JsonObject[string]]),
    );
    const before = cells.get(nodeId);
    const cell = { slot: fresh(nodeId, 'replace', checked) };
    cells.set(nodeId, cell);
    if (!host.run(replacement(nodeId, checked, previous), undefined)) {
        if (before === undefined) {
            cells.delete(nodeId);
        } else {
            cells.set(nodeId, before);
        }

        return [];
    }

    send(cell, false);

    return [cell.slot.name];
};

/** Checks the chosen, pasted or dropped files and starts their uploads: the part of an upload before its slot exists. */
export const createGestures = (transport: Transport) => {
    const { link, send } = transport;
    const { host, cache, cells } = link;

    const cacheFull = () => {
        if (cache.size < uploadLimits.cacheEntries) {
            return false;
        }

        host.report(diagnostic('media.cache-full', undefined, { entries: cache.size }, 'warning'));

        return true;
    };

    /** Whether `place` takes new uploads: the cache has room and the policy lets `media.image` take its action. */
    const admits = (place: UploadPlace) => {
        if (cacheFull()) {
            return false;
        }

        if (place.kind === 'replace') {
            return host.allows('edit');
        }

        if (place.origin === 'command') {
            return host.allows('create');
        }

        return host.allows('create') && host.allows('paste');
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
                for (const file of files) {
                    host.event({ kind: 'failed', name: nameOf(file) });
                }

                return;
            }
        }

        const session = host.session();
        try {
            const checked = await checkFiles(host, files);
            const current = host.session();
            if (current.sessionId !== session.sessionId || current.generation !== session.generation) {
                return;
            }

            const { accepted, refused } = sortChecked(files, checked);
            let started: readonly string[] = [];
            if (accepted.length > 0 && admits(place)) {
                if (place.kind === 'replace') {
                    started = replaceSlot(transport, accepted[0] as Checked, place.nodeId);
                } else if (target !== undefined) {
                    started = insertSlots(transport, accepted, place, target);
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
        const cell = cells.get(nodeId);
        const pos = positionOf(host.state().doc, nodeId);
        if (cell === undefined || !isRetryable(cell.slot) || pos === undefined || cacheFull()) {
            return;
        }

        if (host.state().doc.nodeAt(pos)?.attrs.assetId !== null) {
            return;
        }

        let action: 'create' | 'edit' = 'edit';
        if (cell.slot.kind === 'insert') {
            action = 'create';
        }

        if (!host.allows(action)) {
            return;
        }

        send(cell);
    };

    return { admits, begin, retry };
};
