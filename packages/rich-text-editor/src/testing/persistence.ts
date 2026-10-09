/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defaultIdSource, type JsonValue, type RichTextDocument } from '#/model';
import { findMisshapenCapabilities, isRoot } from '#/model/envelope';
import { canonicalJson } from '#/model/hash';
import { isRecord } from '#/model/values';
import { type PersistenceService, type SaveRequest, type SaveResponse } from '#/persistence/types';
import { type DocumentStamp, type ServerRevision } from '#/runtime/types';

/** The server under test plus what the kit needs for the access and fencing cases of Server obligation 5. */
export interface PersistenceServerHarness {
    readonly service: PersistenceService;
    /** The same server for a user who may not write. */
    readonly readOnlyService: PersistenceService;
    /** A writer descriptor the host's fencing refuses. */
    readonly rejectedWriter: SaveRequest['writer'];
    /** A writer descriptor the host's fencing accepts, which every other case sends (DR-073). */
    readonly writer: SaveRequest['writer'];
    /** A stored document in the host's model that the server's `decodeDocument` run accepts (DR-073). */
    readonly document: RichTextDocument;
}

const rejected = (code: 'forbidden' | 'invalid' | 'incompatible-writer'): SaveResponse => ({
    status: 'rejected',
    code,
    diagnostics: [],
});

/** Whether the writer installs the document's model and each capability it requires at that version or higher (Fencing). */
const represents = (writer: SaveRequest['writer'], document: RichTextDocument) => {
    if (writer.model.id !== document.model.id || writer.model.version < document.model.version) {
        return false;
    }
    const installed = new Map(writer.capabilities.map(({ id, version }) => [id, version]));
    return document.requiredCapabilities.every(({ id, version }) => (installed.get(id) ?? -1) >= version);
};

/** The envelope and root shape, which is what a server without the host's content model can check. */
const wellFormed = (document: unknown) =>
    isRecord(document) &&
    document.format === 'frontify.rich-text' &&
    document.formatVersion === 1 &&
    isRecord(document.model) &&
    findMisshapenCapabilities(document.requiredCapabilities) === undefined &&
    isRoot(document.content);

/** The reference server: one in-memory store, with a service for a writer and one for a user who may not write. */
export const createFakeServer = (): Pick<PersistenceServerHarness, 'service' | 'readOnlyService'> => {
    const records = new Map<string, { readonly revision: ServerRevision; readonly document: RichTextDocument }>();
    const outcomes = new Map<string, { readonly payload: string; readonly response: SaveResponse }>();
    let revisions = 0;

    // Checks the base revision and writes in one synchronous step, so no other save runs in between (obligation 3).
    const write = (request: SaveRequest): SaveResponse => {
        if (!wellFormed(request.document)) {
            return rejected('invalid');
        }
        const { documentId } = request.stamp;
        const current = records.get(documentId);
        if (
            !represents(request.writer, request.document) ||
            (current !== undefined && !represents(request.writer, current.document))
        ) {
            return rejected('incompatible-writer');
        }
        if (current === undefined && request.baseRevision !== null) {
            return rejected('invalid');
        }
        if (current !== undefined && request.baseRevision !== current.revision) {
            return { status: 'conflict', currentRevision: current.revision };
        }
        revisions += 1;
        const revision = `revision-${revisions}`;
        records.set(documentId, { revision, document: structuredClone(request.document) });
        return {
            status: 'saved',
            acknowledgment: { operationId: request.operationId, stamp: request.stamp, revision },
        };
    };

    const save = (request: SaveRequest, writable: boolean): Promise<SaveResponse> => {
        if (!writable) {
            return Promise.resolve(rejected('forbidden'));
        }
        const { stamp, baseRevision, document, writer } = request;
        const payload = canonicalJson({ stamp, baseRevision, document, writer } as unknown as JsonValue);
        const first = outcomes.get(request.operationId);
        if (first !== undefined) {
            if (first.payload !== payload) {
                return Promise.resolve(rejected('invalid'));
            }
            return Promise.resolve(first.response);
        }
        const response = write(request);
        outcomes.set(request.operationId, { payload, response });
        return Promise.resolve(response);
    };
    const read: PersistenceService['read'] = (documentId) => {
        const record = records.get(documentId);
        if (record === undefined) {
            return Promise.reject(new Error(`The fake server holds no document ${documentId}.`));
        }
        return Promise.resolve({ documentId, revision: record.revision, document: structuredClone(record.document) });
    };
    return {
        service: { save: (request) => save(request, true), read },
        readOnlyService: { save: (request) => save(request, false), read },
    };
};

/** Reference fakes: an in-memory server that meets every Server obligation, for host component tests and the kit. */
export const createFakePersistenceService = (): PersistenceService => createFakeServer().service;

/** The ambient `describe`, `it` and `expect` of the host's test runner, which the kit registers its cases with. */
interface TestRunner {
    describe(name: string, body: () => void): void;
    it(name: string, body: () => Promise<void>): void;
    expect(actual: unknown): { toBe(expected: unknown): void; toEqual(expected: unknown): void };
}

/**
 * Registers one case or more for each Server obligation of `SPEC-rich-text-persistence` against a fresh harness. Every
 * case but the refused ones sends the harness `document` with its `writer`; requests differ by stamp (DR-073).
 */
export const runPersistenceConformance = (createHarness: () => PersistenceServerHarness): void => {
    const { describe, it, expect } = globalThis as Partial<TestRunner>;
    if (describe === undefined || it === undefined || expect === undefined) {
        throw new Error('runPersistenceConformance registers its cases through the global describe, it and expect.');
    }
    /** A harness, a new document ID on it, and the requests and documents the cases send. */
    const setup = () => {
        const harness = createHarness();
        const documentId = `rte-conformance-${defaultIdSource.next('session')}`;
        let operations = 0;
        const request = (base: ServerRevision | null, sequence = 1): SaveRequest => {
            operations += 1;
            const stamp: DocumentStamp = { documentId, sessionId: 'rte-conformance', generation: 0, sequence };
            return {
                operationId: `${documentId}-operation-${operations}`,
                stamp,
                baseRevision: base,
                document: harness.document,
                writer: harness.writer,
            };
        };
        const save = (sent: SaveRequest) => harness.service.save(sent, context(sent.stamp));
        return { harness, documentId, request, save };
    };
    const context = (stamp: DocumentStamp) => ({
        signal: new AbortController().signal,
        session: { documentId: stamp.documentId, sessionId: stamp.sessionId, generation: stamp.generation },
    });
    const revisionOf = (response: SaveResponse) => {
        if (response.status !== 'saved') {
            throw new Error(`The server answered ${response.status} where the case needs saved.`);
        }
        return response.acknowledgment.revision;
    };
    const created = async (save: (sent: SaveRequest) => Promise<SaveResponse>, sent: SaveRequest) =>
        revisionOf(await save(sent));

    describe('PersistenceService Server obligations', () => {
        it('Server obligation 1 answers a repeated operation with its first outcome and writes nothing again', async () => {
            const { harness, documentId, request, save } = setup();
            const first = request(null);
            const answered = await save(first);
            expect(await save(first)).toEqual(answered);
            const stored = await harness.service.read(documentId, context(first.stamp));
            expect(answered.status === 'saved' && stored.revision === answered.acknowledgment.revision).toBe(true);
        });

        it('Server obligation 2 rejects a reused operationId with a different payload as invalid', async () => {
            const { request, save } = setup();
            const first = request(null);
            await created(save, first);
            // The other stamp makes the payload differ under the same operation ID.
            const reused = await save({ ...request(null, 2), operationId: first.operationId });
            expect(reused.status === 'rejected' && reused.code).toBe('invalid');
        });

        it('Server obligation 3 writes only one of two concurrent saves with the same base revision', async () => {
            const { request, save } = setup();
            const base = await created(save, request(null));
            const responses = await Promise.all([save(request(base, 2)), save(request(base, 2))]);
            const statuses = responses.map(({ status }) => status).sort();
            expect(statuses).toEqual(['conflict', 'saved']);
            const saved = responses.find((response) => response.status === 'saved');
            const conflict = responses.find((response) => response.status === 'conflict');
            expect(
                saved !== undefined &&
                    conflict !== undefined &&
                    saved.status === 'saved' &&
                    conflict.status === 'conflict' &&
                    conflict.currentRevision === saved.acknowledgment.revision,
            ).toBe(true);
        });

        it('Server obligation 4 treats a null baseRevision as create-only', async () => {
            const { request, save } = setup();
            const revision = await created(save, request(null));
            expect(await save(request(null, 2))).toEqual({ status: 'conflict', currentRevision: revision });
        });

        it('Server obligation 5 rejects a user who may not write as forbidden and writes nothing', async () => {
            const { harness, request, save } = setup();
            const sent = request(null);
            const response = await harness.readOnlyService.save(sent, context(sent.stamp));
            expect(response.status === 'rejected' && response.code).toBe('forbidden');
            // A create-only write still succeeds, so the refused one stored nothing.
            const created = await save(request(null));
            expect(created.status).toBe('saved');
        });

        it('Server obligation 5 rejects a document that does not decode as invalid', async () => {
            const { request, save } = setup();
            const sent = request(null);
            const response = await save({ ...sent, document: { ...sent.document, content: { type: 'doc' } } });
            expect(response.status === 'rejected' && response.code).toBe('invalid');
        });

        it('Server obligation 5 rejects the writer its fencing refuses as incompatible-writer', async () => {
            const { harness, request, save } = setup();
            const base = await created(save, request(null));
            const response = await save({ ...request(base, 2), writer: harness.rejectedWriter });
            expect(response.status === 'rejected' && response.code).toBe('incompatible-writer');
        });

        it("Server obligation 6 answers saved with the request's operationId and stamp and a new revision", async () => {
            const { request, save } = setup();
            const first = request(null);
            const answered = await save(first);
            expect(answered.status === 'saved' && answered.acknowledgment.operationId).toBe(first.operationId);
            expect(answered.status === 'saved' && answered.acknowledgment.stamp).toEqual(first.stamp);
            const base = revisionOf(answered);
            const second = request(base, 2);
            const updated = await save(second);
            expect(updated.status === 'saved' && updated.acknowledgment.stamp).toEqual(second.stamp);
            expect(updated.status === 'saved' && updated.acknowledgment.revision !== base).toBe(true);
        });

        it('Server obligation 7 stores the submitted document as sent', async () => {
            const { harness, documentId, request, save } = setup();
            const sent = request(null);
            await created(save, sent);
            const stored = await harness.service.read(documentId, context(sent.stamp));
            expect(stored.document).toEqual(sent.document);
        });
    });
};
