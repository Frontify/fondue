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
    view: () => EditorView;
    schema: Schema;
    initialDoc: RteDocumentOf;
    frames: FrameScheduler;
    onDocApplied: MountOptions['onDocApplied'];
    onStateChange: MountOptions['onStateChange'];
};

export type HostSync = {
    /** Takes a document the host hands over: applies it, holds it while text is composed, or ignores an echo. */
    setDoc: (doc: RteDocumentOf) => void;
    /** Builds the document for an edit the user made and records it as reported. */
    report: () => RteDocumentOf;
    document: () => RteDocumentOf;
    destroy: () => void;
};

/** The value protocol between the host and the view: what was reported, what the host handed back, and when to apply it. */
export const createHostSync = ({
    view,
    schema,
    initialDoc,
    frames,
    onDocApplied,
    onStateChange,
}: HostSyncOptions): HostSync => {
    let record = createHostRecord(initialDoc);
    // The order each document was reported in, which tells an echo from a reset.
    const reported = new WeakMap<RteDocumentOf, number>();
    // The document's own undeclared keys: only the host changes them, so they live here, not in the engine document.
    let rootExtras = rootExtrasOf(initialDoc);
    let pendingFrame: number | null = null;

    const applyDoc = (doc: RteDocumentOf): void => {
        record = recordHandOver(record);
        rootExtras = rootExtrasOf(doc);

        const transaction = view().state.tr;
        syncDocument(transaction, toEngineDocument(doc, schema));

        if (transaction.docChanged) {
            transaction.setMeta(HOST_DOC, true);
            if (dispatchOutsideHistory(view(), transaction)) {
                onStateChange();
            }
        }

        record = recordAgreed(record, doc);
        onDocApplied(doc);
    };

    // The newest document the host hands over wins, so one still held is dropped whatever this one is.
    const release = (): void => {
        if (pendingFrame !== null) {
            frames.cancel(pendingFrame);
            pendingFrame = null;
        }
    };

    const setDoc = (doc: RteDocumentOf): void => {
        release();

        const action = hostDocAction({
            record,
            doc,
            reportedSeq: reported.get(doc),
            composing: view().composing,
        });

        switch (action.kind) {
            case 'ignore':
                return;
            case 'echo':
                record = recordEcho(record, action.seq);
                return;
            case 'wait':
                // Held or not, the host now holds a document of its own, so what it hands back after this is a reset.
                record = recordHandOver(record);
                pendingFrame = frames.request(() => {
                    pendingFrame = null;
                    setDoc(doc);
                });
                return;
            case 'apply':
                applyDoc(doc);
                return;
        }
    };

    const report = (): RteDocumentOf => {
        const emitted = toRteDocument(view().state.doc, rootExtras);
        record = recordReport(record);
        reported.set(emitted, record.reportCount);

        return emitted;
    };

    return {
        setDoc,
        report,
        document: () => toRteDocument(view().state.doc, rootExtras),
        destroy: release,
    };
};
