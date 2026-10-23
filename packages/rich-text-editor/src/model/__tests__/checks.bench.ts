/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { expect, test } from 'vitest';

import { enUS } from '#/locales/en-US';
import { findContentIssues } from '#/model/checks';

import { measureNode } from '../../../perf/node';

import { perfDocument, perfModel } from './fixtures/perf/documents';

test('a full content check runs over the large fixture', async ({ bench }) => {
    const document = perfDocument('large', perfModel);

    expect(findContentIssues(document, { locale: enUS, model: perfModel }).length).toBeGreaterThan(0);
    await measureNode(bench, 'checks-large-p95', {
        findContentIssues: () => findContentIssues(document, { locale: enUS, model: perfModel }),
    });
}, 600_000);
