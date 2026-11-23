/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteDocumentOf } from '#/core';

/** What the editor reported to the host and what the host last handed over, to tell echoes from resets. */
export type HostRecord = {
    /** The last document the host handed over that the editor still holds unedited. */
    agreed: RteDocumentOf | null;
    /** How many documents the editor has reported, so the newest one's order. */
    reportCount: number;
    /** Reports at or below this are older than what the host holds; one above it handed back is an echo. */
    hostSeq: number;
};

export type HostDocAction = { kind: 'ignore' } | { kind: 'echo'; seq: number } | { kind: 'apply' };

export const createHostRecord = (initialDoc: RteDocumentOf): HostRecord => ({
    agreed: initialDoc,
    reportCount: 0,
    hostSeq: 0,
});

export type HostDocActionParams = {
    record: Readonly<HostRecord>;
    doc: RteDocumentOf;
    /** The order `doc` was reported in, when the editor reported it. */
    reportedSeq: number | undefined;
};

export const hostDocAction = ({ record, doc, reportedSeq }: HostDocActionParams): HostDocAction => {
    if (doc === record.agreed) {
        return { kind: 'ignore' };
    }

    if (reportedSeq !== undefined && reportedSeq > record.hostSeq) {
        return { kind: 'echo', seq: reportedSeq };
    }

    return { kind: 'apply' };
};

/** The editor reported a document to the host, so it no longer holds an unedited host document. */
export const recordReport = (record: HostRecord): HostRecord => ({
    ...record,
    reportCount: record.reportCount + 1,
    agreed: null,
});

export const recordEcho = (record: HostRecord, seq: number): HostRecord => ({ ...record, hostSeq: seq });

/** The host now holds a document of its own, newer than everything reported so far. */
export const recordHandOver = (record: HostRecord): HostRecord => ({ ...record, hostSeq: record.reportCount });

/** The editor holds `doc`, handed over by the host, unedited. */
export const recordAgreed = (record: HostRecord, doc: RteDocumentOf): HostRecord => ({ ...record, agreed: doc });
