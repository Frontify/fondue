/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Schema } from 'prosemirror-model';
import { type EditorView } from 'prosemirror-view';

import { type RteDocumentOf } from '#/core';
import { type MountOptions } from '#/editor/port';

import { rootExtrasOf, toEngineDocument, toRteDocument } from './documentConversion';
import { createHostRecord, hostDocAction, recordAgreed, recordEcho, recordHandOver, recordReport } from './hostRecord';
import { syncDocument } from './syncDocument';
import { HOST_DOC } from './transactionMeta';
import { dispatchOutsideHistory } from './userEdits';

/** Schedules the next try of a host document held while text is composed. */
export type FrameScheduler = {
    request: (callback: () => void) => number;
    cancel: (frame: number) => void;
};

export type HostSyncOptions = {
    getView: () => EditorView;
    schema: Schema;
    initialDoc: RteDocumentOf;
    frames: FrameScheduler;
    onDocChange: MountOptions['onDocChange'];
    onDocApplied: MountOptions['onDocApplied'];
    onStateChange: MountOptions['onStateChange'];
};

export type HostSync = {
    /** Takes a document the host hands over: applies it, holds it while text is composed, or ignores an echo. */
    setDoc: (doc: RteDocumentOf) => void;
    /** Builds the document for an edit the user made, records it as reported and hands it to the host. */
    report: () => void;
    document: () => RteDocumentOf;
    destroy: () => void;
};

/** The value protocol between the host and the view: what was reported, what the host handed back, and when to apply it. */
export const createHostSync = ({
    getView,
    schema,
    initialDoc,
    frames,
    onDocChange,
    onDocApplied,
    onStateChange,
}: HostSyncOptions): HostSync => {
    let record = createHostRecord(initialDoc);
    // The order each document was reported in, which tells an echo from a reset.
    const reportOrders = new WeakMap<RteDocumentOf, number>();
    // The document's own undeclared keys: only the host changes them, so they live here, not in the engine document.
    let rootExtras = rootExtrasOf(initialDoc);
    let heldDocFrame: number | null = null;

    const applyDoc = (doc: RteDocumentOf): void => {
        record = recordHandOver(record);
        rootExtras = rootExtrasOf(doc);

        const view = getView();
        const transaction = view.state.tr;
        syncDocument(transaction, toEngineDocument(doc, schema));

        if (transaction.docChanged) {
            transaction.setMeta(HOST_DOC, true);
            if (dispatchOutsideHistory(view, transaction)) {
                onStateChange();
            }
        }

        record = recordAgreed(record, doc);
        onDocApplied(doc);
    };

    const dropHeldDoc = (): void => {
        if (heldDocFrame !== null) {
            frames.cancel(heldDocFrame);
            heldDocFrame = null;
        }
    };

    const setDoc = (doc: RteDocumentOf): void => {
        // The newest document the host hands over wins, so one still held is dropped whatever this one is.
        dropHeldDoc();

        const action = hostDocAction({
            record,
            doc,
            reportOrder: reportOrders.get(doc),
            composing: getView().composing,
        });

        switch (action.kind) {
            case 'unchanged':
                return;
            case 'echo':
                record = recordEcho(record, action.order);
                return;
            case 'wait':
                // Held or not, the host now holds a document of its own, so what it hands back after this is a reset.
                record = recordHandOver(record);
                heldDocFrame = frames.request(() => {
                    heldDocFrame = null;
                    setDoc(doc);
                });
                return;
            case 'apply':
                applyDoc(doc);
                return;
        }
    };

    const report = (): void => {
        const emitted = toRteDocument(getView().state.doc, rootExtras);
        record = recordReport(record);
        reportOrders.set(emitted, record.reportCount);
        onDocChange(emitted);
    };

    return {
        setDoc,
        report,
        document: () => toRteDocument(getView().state.doc, rootExtras),
        destroy: dropHeldDoc,
    };
};
