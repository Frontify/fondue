/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { expect, test } from 'vitest';

import { RichTextReader } from '#/entries/reader';

import { measureNode } from '../../../perf/node';
import { perfDocument, perfModel } from '../../model/__tests__/fixtures/perf/documents';

test('RichTextReader renders the large fixture to a string', async ({ bench }) => {
    const document = perfDocument('large', perfModel);
    // A new object each call, since the reader keeps one output per document object.
    const presentation = { styles: [], colorTokens: [], resolveAssetUrl: (id: string) => `https://assets.test/${id}` };
    const render = () =>
        renderToString(createElement(RichTextReader, { document: { ...document }, model: perfModel, presentation }));

    const html = render();
    // A resolved image keeps its unavailable note hidden, for the browser to show when the image fails to load.
    expect(html).toContain('<img src="https://assets.test/');
    expect(html).not.toMatch(/data-rte-message="[^"]*"(?! hidden="")/);
    await measureNode(bench, 'reader-large-p95', { renderToString: render });
}, 600_000);
