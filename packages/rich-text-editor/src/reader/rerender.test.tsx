/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { blockquote, doc, envelope, mention, paragraph, text } from '#/features/__fixtures__/documents';
import { vocabularyMention } from '#/features/__fixtures__/vocabulary';
import { core } from '#/features/core/feature';
import { compileContentModel } from '#/model';
import { decodeToTree } from '#/model/decode';
import type * as DecodeModule from '#/model/decode';

import { semanticModel } from '../../fixtures/reader/semantic';

import { defineReaderFeature } from './define';
import { RichTextReader } from './reader';

// The spy wraps the real decoder the reader calls, so the output stays real.
vi.mock('#/model/decode', async (importOriginal) => {
    const actual = await importOriginal<typeof DecodeModule>();
    return { ...actual, decodeToTree: vi.fn(actual.decodeToTree) };
});

const model = semanticModel();
const create = () => envelope(doc(paragraph(text('Same')), blockquote(paragraph(text('Words')))));

describe('RichTextReader rerenders', () => {
    it('SPEC-rich-text-output/AC-048 decodes once across three renders of the same document object and presentation', () => {
        vi.mocked(decodeToTree).mockClear();
        const document = create();
        const presentation = {};
        const view = render(<RichTextReader document={document} model={model} presentation={presentation} />);
        const first = view.container.innerHTML;

        view.rerender(<RichTextReader document={document} model={model} presentation={presentation} />);
        view.rerender(<RichTextReader document={document} model={model} presentation={presentation} />);

        expect(decodeToTree).toHaveBeenCalledTimes(1);
        expect(view.container.innerHTML).toBe(first);
        expect(first).toContain('<p>Same</p>');
    });

    it('SPEC-rich-text-output/AC-048 builds the output again for another document object or another presentation', () => {
        vi.mocked(decodeToTree).mockClear();
        const document = create();
        const view = render(<RichTextReader document={document} model={model} />);

        view.rerender(<RichTextReader document={create()} model={model} />);
        view.rerender(<RichTextReader document={document} model={model} presentation={{}} />);

        expect(decodeToTree).toHaveBeenCalledTimes(3);
    });

    it('SPEC-rich-text-output/AC-048 decodes once for limits with the same value and again for other limits', () => {
        vi.mocked(decodeToTree).mockClear();
        const document = create();
        const view = render(<RichTextReader document={document} model={model} limits={{ maxDocumentNodes: 50 }} />);

        view.rerender(<RichTextReader document={document} model={model} limits={{ maxDocumentNodes: 50 }} />);
        expect(decodeToTree).toHaveBeenCalledTimes(1);

        view.rerender(<RichTextReader document={document} model={model} limits={{ maxDocumentNodes: 60 }} />);
        expect(decodeToTree).toHaveBeenCalledTimes(2);
    });

    it('SPEC-rich-text-output/AC-048 decodes once for the same JSON text across renders and again for other text', () => {
        vi.mocked(decodeToTree).mockClear();
        const view = render(<RichTextReader document={JSON.stringify(create())} model={model} />);
        const first = view.container.innerHTML;

        view.rerender(<RichTextReader document={JSON.stringify(create())} model={model} />);
        expect(decodeToTree).toHaveBeenCalledTimes(1);
        expect(view.container.innerHTML).toBe(first);

        view.rerender(
            <RichTextReader document={JSON.stringify(envelope(doc(paragraph(text('Other')))))} model={model} />,
        );
        expect(decodeToTree).toHaveBeenCalledTimes(2);
        expect(view.container.innerHTML).toContain('<p>Other</p>');
    });

    it('SPEC-rich-text-output/AC-048 reports each diagnostic to a callback once, not on every rerender', () => {
        const Throws = () => {
            throw new Error('boom');
        };
        const failing = compileContentModel([core(), defineReaderFeature(vocabularyMention(), { mention: Throws })], {
            id: 'fixture.vocabulary',
            version: 1,
        });
        const document = envelope(doc(paragraph(mention('m-1'))), ['core', 'fixture.mention']);
        const onDiagnostic = vi.fn();
        const view = render(<RichTextReader document={document} model={failing} onDiagnostic={onDiagnostic} />);

        view.rerender(<RichTextReader document={document} model={failing} onDiagnostic={onDiagnostic} />);

        expect(onDiagnostic).toHaveBeenCalledTimes(1);
        expect(onDiagnostic).toHaveBeenCalledWith(expect.objectContaining({ code: 'reader.override-failed' }));
    });
});
