/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { JSDOM } from 'jsdom';
import { describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { compileContentModel } from '#/model';
import { highlight, highlightDocument } from '#/plugins/__tests__/fixtures/outsideFeature';
import { align } from '#/plugins/Align/feature';
import { core } from '#/plugins/Core/feature';
import { heading } from '#/plugins/Heading/feature';
import { renderReader } from '#/reader/__tests__/helpers/helpers';
import { fromHTML } from '#/runtime/import/fromHtml';

vi.mock('#/model/compile', { spy: true });

describe('one compiled model with the outside fixture feature on a server', () => {
    it('renders its fixture in the reader and through every codec from that model alone', () => {
        vi.mocked(compileContentModel).mockClear();
        const model = compileContentModel([core(), heading(), align(), highlight()], {
            id: 'fixture.highlight',
            version: 1,
        });
        const codecs = createCodecs(model);
        const { html } = codecs.toHTML(highlightDocument);
        const outputs = [
            renderReader(highlightDocument, model),
            html,
            codecs.toPlainText(highlightDocument).text,
            codecs.toMarkdown(highlightDocument).markdown,
        ];
        const imported = fromHTML(html, model, { window: new JSDOM('').window as unknown as Window });

        // server.spec.ts pins each output; this case proves they all come from the one compiled model.
        expect(outputs.every((output) => output.length > 0)).toBe(true);
        expect(imported.status === 'editable' && imported.document.content).toEqual(highlightDocument.content);
        expect(vi.mocked(compileContentModel)).toHaveBeenCalledTimes(1);
    });
});
