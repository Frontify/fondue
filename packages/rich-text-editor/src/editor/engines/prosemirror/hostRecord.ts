/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteDocumentOf } from '#/core';

/** What the editor reported to the host and what the host last handed over, to tell echoes from resets. */
export type HostRecord = {
    /** The last document the host handed over that the editor still holds unedited. */
    agreed: RteDocumentOf | null;
    /** The order each reported document was reported in. */
    reported: WeakMap<RteDocumentOf, number>;
    reportCount: number;
    /** Reports at or below this are older than what the host holds; one above it handed back is an echo. */
    hostSeq: number;
};

/** What `setDoc` does with a document the host hands over. */
export type HostDocAction = { kind: 'ignore' } | { kind: 'echo'; seq: number } | { kind: 'wait' } | { kind: 'apply' };

/** A record for an editor that holds `initialDoc`, which the host handed over. */
export const createHostRecord = (initialDoc: RteDocumentOf): HostRecord => ({
    agreed: initialDoc,
    reported: new WeakMap(),
    reportCount: 0,
    hostSeq: 0,
});

export const hostDocAction = (record: Readonly<HostRecord>, doc: RteDocumentOf, composing: boolean): HostDocAction => {
    if (doc === record.agreed) {
        return { kind: 'ignore' };
    }
    const seq = record.reported.get(doc);
    if (seq !== undefined && seq > record.hostSeq) {
        return { kind: 'echo', seq };
    }
    // Replacing text mid-composition breaks the word being composed, so the change waits for it to end, as in Slate.
    if (composing) {
        return { kind: 'wait' };
    }
    return { kind: 'apply' };
};

/** The editor reported `emitted` to the host, so it no longer holds an unedited host document. */
export const recordReport = (record: HostRecord, emitted: RteDocumentOf): HostRecord => {
    const reportCount = record.reportCount + 1;
    // Records share one registry of reports, which only ever grows.
    record.reported.set(emitted, reportCount);
    return { ...record, reportCount, agreed: null };
};

/** The host handed back the report numbered `seq`. */
export const recordEcho = (record: HostRecord, seq: number): HostRecord => ({ ...record, hostSeq: seq });

/** The host now holds a document of its own, newer than everything reported so far. */
export const recordHandOver = (record: HostRecord): HostRecord => ({ ...record, hostSeq: record.reportCount });

/** The editor holds `doc`, handed over by the host, unedited. */
export const recordAgreed = (record: HostRecord, doc: RteDocumentOf): HostRecord => ({ ...record, agreed: doc });
