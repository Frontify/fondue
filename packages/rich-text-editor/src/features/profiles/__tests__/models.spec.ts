/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { beforeAll, describe, expect, it } from 'vitest';

import { featureFixtures } from '#/features/conformance/fixtures';
import { type RichTextDocument } from '#/model';

const load = async () => ({
    codecs: await import('#/codecs'),
    features: await import('#/features'),
    model: await import('#/model'),
    helpers: await import('#/reader/__tests__/helpers/helpers'),
});
let loaded: Awaited<ReturnType<typeof load>>;
beforeAll(async () => {
    loaded = await load();
});

// A Document profile document: headings, a task list and a link, stored under the profile's model.
const stored = (feature: string): RichTextDocument => ({
    ...(Object.values(featureFixtures[feature] ?? {})[0] as RichTextDocument),
    model: loaded.features.documentModel.ref,
});

describe('the compiled Document profile model of ./features', () => {
    it('renders a Document fixture through RichTextReader with no compile call', () => {
        const html = loaded.helpers.renderReader(stored('blocks.heading'), loaded.features.documentModel);

        expect(html).toContain('<h1');
        expect(html).toContain('Level 1');
    });

    it('converts a Document fixture through createCodecs(documentModel)', () => {
        const codecs = loaded.codecs.createCodecs(loaded.features.documentModel);
        const document = stored('lists.task');

        expect(codecs.toHTML(document).diagnostics).toEqual([]);
        expect(codecs.toPlainText(document).text).not.toBe('');
        expect(codecs.toMarkdown(document).markdown).toContain('- [');
    });

    it('decodes a Document fixture as editable under the model it was stored with', () => {
        expect(loaded.model.decodeDocument(stored('links'), loaded.features.documentModel).status).toBe('editable');
    });
});
