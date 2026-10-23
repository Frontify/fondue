/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { expect, test } from 'vitest';

import { decodeDocument } from '#/model';

import { measureNode } from '../../../perf/node';

import { perfDocument, perfModel } from './fixtures/perf/documents';

test('decodeDocument runs over the large fixture', async ({ bench }) => {
    const document = perfDocument('large', perfModel);

    expect(decodeDocument(document, perfModel).status).toBe('editable');
    await measureNode(bench, 'decode-large-p95', { decodeDocument: () => decodeDocument(document, perfModel) });
}, 600_000);
