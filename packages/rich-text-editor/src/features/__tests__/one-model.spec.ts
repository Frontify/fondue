/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { highlight, highlightDocument } from '#/features/__tests__/fixtures/outside-feature';
import { align } from '#/features/blocks-align/feature';
import { heading } from '#/features/blocks-heading/feature';
import { core } from '#/features/core/feature';
import { compileContentModel } from '#/model';
import { renderReader } from '#/reader/__tests__/helpers/helpers';

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

        // server.spec.ts pins each output; this case proves they all come from the one compiled model.
        expect(outputs.every((output) => output.length > 0)).toBe(true);
        expect(vi.mocked(compileContentModel)).toHaveBeenCalledTimes(1);
    });
});
