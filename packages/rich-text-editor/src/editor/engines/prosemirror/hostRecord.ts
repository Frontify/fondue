/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteDocumentOf } from '#/core';

/** What the editor reported to the host and what the host last handed over, to tell echoes from resets. */
export type HostRecord = {
    /** The last document the host handed over that the editor still holds unedited. */
    agreed: RteDocumentOf | null;
    /** How many documents the editor has reported, so the newest one's order. */
    reportCount: number;
    /**
     * The newest report order the host has overtaken. A reported document
     * handed back at or below it is a reset, one above it is an echo.
     */
    supersededThrough: number;
};

export type HostDocAction = { kind: 'unchanged' } | { kind: 'echo'; order: number } | { kind: 'apply' };

export const createHostRecord = (initialDoc: RteDocumentOf): HostRecord => ({
    agreed: initialDoc,
    reportCount: 0,
    supersededThrough: 0,
});

export type HostDocActionParams = {
    record: Readonly<HostRecord>;
    doc: RteDocumentOf;
    /** The order `doc` was reported in, when the editor reported it. */
    reportOrder: number | undefined;
};

export const hostDocAction = ({ record, doc, reportOrder }: HostDocActionParams): HostDocAction => {
    if (doc === record.agreed) {
        return { kind: 'unchanged' };
    }

    if (reportOrder !== undefined && reportOrder > record.supersededThrough) {
        return { kind: 'echo', order: reportOrder };
    }

    return { kind: 'apply' };
};

/** The editor reported a document to the host, so it no longer holds an unedited host document. */
export const recordReport = (record: HostRecord): HostRecord => ({
    ...record,
    reportCount: record.reportCount + 1,
    agreed: null,
});

export const recordEcho = (record: HostRecord, order: number): HostRecord => ({ ...record, supersededThrough: order });

/** The host now holds a document of its own, newer than everything reported so far. */
export const recordHandOver = (record: HostRecord): HostRecord => ({
    ...record,
    supersededThrough: record.reportCount,
});

/** The editor holds `doc`, handed over by the host, unedited. */
export const recordAgreed = (record: HostRecord, doc: RteDocumentOf): HostRecord => ({ ...record, agreed: doc });
