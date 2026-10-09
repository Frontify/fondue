/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';

import { type JsonValue } from '#/model';
import { canonicalJson } from '#/model/hash';
import { type PersistenceService, type SaveRequest, type SaveResponse, type ServiceContext } from '#/persistence/types';

import { createFakeServer, type PersistenceServerHarness, runPersistenceConformance } from './persistence';

const REJECTED: SaveRequest['writer'] = {
    build: '0.0.0',
    formatVersion: 1,
    model: { id: 'test.conformance', version: 1 },
    capabilities: [],
};

/** Registers the kit's cases on a stand-in runner, runs each one and returns the titles of those that fail. */
const failingTitles = async (createHarness: () => PersistenceServerHarness): Promise<string[]> => {
    const cases = new Map<string, () => unknown>();
    vi.stubGlobal('describe', (_name: string, body: () => void) => body());
    vi.stubGlobal('it', (name: string, body: () => unknown) => cases.set(name, body));
    try {
        runPersistenceConformance(createHarness);
    } finally {
        vi.unstubAllGlobals();
    }
    const failing: string[] = [];
    for (const [name, body] of cases) {
        try {
            await body();
        } catch {
            failing.push(name);
        }
    }
    return failing;
};

type Save = (request: SaveRequest, context: ServiceContext) => Promise<SaveResponse>;
/** What a flawed `save` gets: the reference server's, the payload sent earlier under the same operation ID, and the latest revisions. */
interface Server {
    readonly save: Save;
    readonly first: string | undefined;
    readonly calls: number;
    readonly revisions: ReadonlyMap<string, string>;
}

const payloadOf = ({ stamp, baseRevision, document, writer }: SaveRequest) =>
    canonicalJson({ stamp, baseRevision, document, writer } as unknown as JsonValue);

/** A reference server whose `save` runs through `flaw`. */
const flawed =
    (flaw: (request: SaveRequest, context: ServiceContext, server: Server) => Promise<SaveResponse>) =>
    (): PersistenceServerHarness => {
        const reference = createFakeServer();
        const payloads = new Map<string, string>();
        const revisions = new Map<string, string>();
        const save: Save = async (request, context) => {
            const response = await reference.service.save(request, context);
            if (response.status === 'saved') {
                revisions.set(request.stamp.documentId, response.acknowledgment.revision);
            }
            return response;
        };
        const service: PersistenceService = {
            save: (request, context) => {
                const first = payloads.get(request.operationId);
                if (first === undefined) {
                    payloads.set(request.operationId, payloadOf(request));
                }
                return flaw(request, context, { save, first, calls: payloads.size, revisions });
            },
            read: reference.service.read,
        };
        return { service, readOnlyService: reference.readOnlyService, rejectedWriter: REJECTED };
    };

/** Writes under a new operation ID on `base`, by default the latest revision, answering under the request's own ID. */
const writeAgain = async (
    request: SaveRequest,
    context: ServiceContext,
    server: Server,
    base = server.revisions.get(request.stamp.documentId) ?? null,
) => {
    const response = await server.save(
        { ...request, operationId: `${request.operationId}-again-${server.calls}`, baseRevision: base },
        context,
    );
    if (response.status !== 'saved') {
        return response;
    }
    return {
        status: 'saved' as const,
        acknowledgment: { ...response.acknowledgment, operationId: request.operationId },
    };
};

const trimmed = (value: unknown): unknown => {
    if (Array.isArray(value)) {
        return value.map(trimmed);
    }
    if (typeof value !== 'object' || value === null) {
        return value;
    }
    return Object.fromEntries(
        Object.entries(value).map(([key, item]) => {
            if (key === 'text' && typeof item === 'string') {
                return [key, item.trim()];
            }
            return [key, trimmed(item)];
        }),
    );
};

// One server per Server obligation that breaks only that obligation.
const BROKEN: readonly (readonly [string, string, () => PersistenceServerHarness])[] = [
    [
        'writes a repeated operation again',
        'Server obligation 1',
        flawed((request, context, server) => {
            if (server.first === payloadOf(request)) {
                return writeAgain(request, context, server);
            }
            return server.save(request, context);
        }),
    ],
    [
        'accepts a reused operation ID with another payload',
        'Server obligation 2',
        flawed((request, context, server) => {
            if (server.first !== undefined && server.first !== payloadOf(request)) {
                return writeAgain(request, context, server);
            }
            return server.save(request, context);
        }),
    ],
    [
        'checks the base revision and writes in two awaited steps',
        'Server obligation 3',
        flawed(async (request, context, server) => {
            if (server.first !== undefined) {
                return server.save(request, context);
            }
            const current = server.revisions.get(request.stamp.documentId) ?? null;
            if (current !== null && current !== request.baseRevision) {
                return { status: 'conflict', currentRevision: current };
            }
            await Promise.resolve();
            // The write step takes whatever revision is newest by then, so a save that passed the check overwrites.
            const written = await server.save(request, context);
            if (written.status !== 'conflict') {
                return written;
            }
            return writeAgain(request, context, server, written.currentRevision);
        }),
    ],
    [
        'overwrites a document on a null base revision',
        'Server obligation 4',
        flawed((request, context, server) => {
            const current = server.revisions.get(request.stamp.documentId);
            if (server.first === undefined && request.baseRevision === null && current !== undefined) {
                return server.save({ ...request, baseRevision: current }, context);
            }
            return server.save(request, context);
        }),
    ],
    [
        'writes for a user who may not write',
        'Server obligation 5 rejects a user who may not write',
        () => {
            const reference = createFakeServer();
            return { service: reference.service, readOnlyService: reference.service, rejectedWriter: REJECTED };
        },
    ],
    [
        'stores a document that does not decode',
        'Server obligation 5 rejects a document that does not decode',
        flawed((request, context, server) => {
            const { content } = request.document;
            if (content.content === undefined) {
                const repaired = { ...content, content: [{ type: 'paragraph', attrs: { lang: null } }] };
                return server.save({ ...request, document: { ...request.document, content: repaired } }, context);
            }
            return server.save(request, context);
        }),
    ],
    [
        'accepts the rejected writer',
        'Server obligation 5 rejects the writer',
        flawed((request, context, server) => {
            if (request.writer === REJECTED) {
                return server.save(
                    { ...request, writer: { ...REJECTED, capabilities: [{ id: 'core', version: 1 }] } },
                    context,
                );
            }
            return server.save(request, context);
        }),
    ],
    [
        'answers with another stamp',
        'Server obligation 6',
        flawed(async (request, context, server) => {
            const response = await server.save(request, context);
            if (response.status !== 'saved') {
                return response;
            }
            const stamp = { ...response.acknowledgment.stamp, sequence: response.acknowledgment.stamp.sequence + 1 };
            return { status: 'saved', acknowledgment: { ...response.acknowledgment, stamp } };
        }),
    ],
    [
        'stores a normalized document',
        'Server obligation 7',
        flawed((request, context, server) =>
            server.save({ ...request, document: trimmed(request.document) as SaveRequest['document'] }, context),
        ),
    ],
];

describe('runPersistenceConformance', () => {
    it('SPEC-rich-text-persistence/AC-049 passes every case against the reference fake', async () => {
        expect(await failingTitles(() => ({ ...createFakeServer(), rejectedWriter: REJECTED }))).toEqual([]);
    });

    it.each(BROKEN)(
        'SPEC-rich-text-persistence/AC-049 fails only the matching case for a server that %s',
        async (_flaw, obligation, createHarness) => {
            const failing = await failingTitles(createHarness);
            expect(failing).toHaveLength(1);
            expect(failing[0]?.startsWith(obligation)).toBe(true);
        },
    );
});
