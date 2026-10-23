/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { expect, test } from 'vitest';

import { createCodecs } from '#/codecs';

import { measureNode } from '../../../perf/node';
import { perfDocument, perfModel } from '../../model/__tests__/fixtures/perf/documents';

test('toHTML, toPlainText and toMarkdown run over the large fixture', async ({ bench }) => {
    const document = perfDocument('large', perfModel);
    const codecs = createCodecs(perfModel);

    expect(codecs.toHTML(document).html).not.toBe('');
    await measureNode(bench, 'codecs-large-p95', {
        toHTML: () => codecs.toHTML(document),
        toPlainText: () => codecs.toPlainText(document),
        toMarkdown: () => codecs.toMarkdown(document),
    });
}, 600_000);
