/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AsyncOperation } from '../../../async/async';

import { type UploadCache } from './cache';
import { type SlotEvent, type SlotState } from './machine';
import { feedUpload, sendUpload } from './transportRun';
import { type UploadHost } from './types';

/** A slot's machine state, held by the map and by every upload call of the slot, even after a reset drops it. */
export type Cell = {
    slot: SlotState;
};

/** What the effects act on: the host, the cache, the cells and the batches that a commit hands on. */
export type Link = {
    host: UploadHost;
    cache: UploadCache;
    cells: Map<string, Cell>;
    /** Completions that a history change asks for from the cache, applied once no commit runs. */
    fills: string[];
    /** Operations a commit ended, aborted together. */
    ended: AsyncOperation[];
};

/** The transport the slots and gestures use: its shared state, and how a file is sent. */
export type Transport = {
    link: Link;
    /** Sends the slot's file as a new operation, and announces its start unless its gesture announces it. */
    send: (cell: Cell, announce?: boolean) => void;
    /** Feeds an event that no upload call belongs to. */
    feed: (cell: Cell, event: SlotEvent) => void;
};

/** Runs the upload machine's effects against the host's coordinator, the service and the cache. */
export const createTransport = (host: UploadHost, cache: UploadCache): Transport => {
    const link: Link = { host, cache, cells: new Map(), fills: [], ended: [] };

    return {
        link,
        send: (cell, announce = true) => sendUpload(link, cell, announce),
        feed: (cell, event) => feedUpload(link, cell, event),
    };
};
