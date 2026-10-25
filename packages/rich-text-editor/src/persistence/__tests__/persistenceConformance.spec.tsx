/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe } from 'vitest';

import { runPersistenceConformance } from '#/testing';
import { createFakeServer } from '#/testing/persistence';

import { WRITER, para, loaded, installPersistenceHooks } from './fixtures/mounted';

installPersistenceHooks();

describe('the persistence conformance kit', () => {
    describe('runs against the reference fake', () => {
        runPersistenceConformance(() => ({
            ...createFakeServer(),
            rejectedWriter: { ...WRITER, capabilities: [] },
            writer: WRITER,
            document: loaded(null, para('ab')).document,
        }));
    });
});
