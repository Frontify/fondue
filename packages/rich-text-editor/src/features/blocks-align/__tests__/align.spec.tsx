/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { brandDocumentModel } from '#/features/__tests__/fixtures/brand-document';
import { align } from '#/features/blocks-align/feature';
import { heading } from '#/features/blocks-heading/feature';
import { core } from '#/features/core/feature';
import { fromHTML } from '#/html';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { deDE } from '#/locales/de-DE';
import { compileContentModel, type ContentModel } from '#/model';
import { mountText, para, storedIn, text, textFeatures, textModel } from '#/react/__tests__/fixtures/text';
import { runtimeOf } from '#/runtime/runtime';
import { setSelection, typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const ALIGN = ['left', 'center', 'right', 'justify'] as const;
const toolbar = ALIGN.map((align) => ({ command: 'block.align.set', payload: { align } }));

const modelOf = (justify: boolean) =>
    compileContentModel([core(), heading(), align(justify ? undefined : { justify: false })], {
        id: 'test.align',
        version: 1,
    });

const blockAttrs = (handle: EditorHandle) => {
    const block = handle.getSnapshot().document.content.content?.[0];
    return block?.attrs ?? {};
};

const selectAll = (handle: EditorHandle) => {
    const runtime = runtimeOf(handle);
    const view = runtime?.view;
    if (runtime === undefined || view === undefined) {
        throw new Error('The editor has no view.');
    }
    runtime.select({ anchor: 1, head: view.state.doc.content.size - 1 });
};

describe('alignment', () => {
    it('stores each alignment without changing the document direction', () => {
        const model = modelOf(true);
        const stored = storedIn(model, [para(text('Note'))]);
        const document = { ...stored, content: { ...stored.content, attrs: { lang: null, dir: 'rtl' } } };
        const { handle } = mountText({ model, document });

        for (const value of ALIGN) {
            const before = handle.getSnapshot().document;
            expect(handle.execute('block.align.set', { align: value }).status).toBe('applied');
            const after = handle.getSnapshot().document;
            expect(after.content.attrs).toEqual(before.content.attrs);
            expect(blockAttrs(handle).align).toBe(value);
            expect(blockAttrs(handle).lang).toBe(null);
            expect(handle.execute('history.undo').status).toBe('applied');
            expect(blockAttrs(handle).align).toBe(null);
        }
    });

    it('keeps a stored left or right alignment while the author types', () => {
        const model = modelOf(true);
        for (const value of ['left', 'right'] as const) {
            const block = para(text('Side'));
            const aligned = { ...block, attrs: { lang: null, align: value } };
            const { handle, unmount } = mountText({ model, blocks: [aligned] });
            setSelection(handle, { text: 'Side', from: 4, to: 4 });
            typeText(handle, 'ways');
            expect(blockAttrs(handle).align).toBe(value);
            expect(handle.getSnapshot().document.content.content?.[0]?.content?.[0]?.text).toBe('Sideways');
            unmount();
        }
    });

    it('offers left, center, right and justify, and leaves justify out when it is off', () => {
        const offered = (model: ContentModel) => {
            const { unmount } = mountText({ model, toolbar: [toolbar], blocks: [para(text('Note'))] });
            const names = screen.getAllByRole('button').map((button) => button.getAttribute('aria-label'));
            unmount();
            return names;
        };
        const brand = offered(brandDocumentModel());
        const plain = offered(modelOf(false));

        expect(brand).toEqual(expect.arrayContaining(['Align left', 'Align center', 'Align right', 'Justify']));
        expect(plain).toEqual(expect.arrayContaining(['Align left', 'Align center', 'Align right']));
        expect(plain).not.toContain('Justify');

        const { handle } = mountText({ model: modelOf(false), blocks: [para(text('Note'))] });
        const before = JSON.stringify(handle.getSnapshot().document);
        expect(handle.execute('block.align.set', { align: 'justify' })).toMatchObject({
            status: 'rejected',
            code: 'invalid-payload',
        });
        expect(JSON.stringify(handle.getSnapshot().document)).toBe(before);
        expect(handle.execute('block.align.set', { align: 'center' }).status).toBe('applied');
        expect(blockAttrs(handle).align).toBe('center');
    });

    it('keeps stored direction and alignment when the theme direction and the locale change', () => {
        const model = modelOf(true);
        const stored = storedIn(model, [{ ...para(text('Note')), attrs: { lang: null, align: 'left' } }]);
        const document = { ...stored, content: { ...stored.content, attrs: { lang: 'en', dir: 'rtl' } } };
        const definition = defineEditor({ id: 'test.align', model });
        const ref = createRef<EditorHandle>();
        const element = (dir: 'ltr' | 'rtl') => {
            const locale = dir === 'rtl' ? { locale: deDE } : {};
            return (
                <ThemeProvider dir={dir}>
                    <RichTextEditor
                        {...locale}
                        aria-label="Notes"
                        definition={definition}
                        defaultValue={{ documentId: 'document-1', revision: null, document }}
                        ref={ref}
                    />
                </ThemeProvider>
            );
        };
        const view = render(element('ltr'));
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        const before = ref.current?.getSnapshot().document;
        view.rerender(element('rtl'));
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        const after = ref.current?.getSnapshot().document;

        expect(after).toEqual(before);
        expect(after?.content.attrs).toEqual({ lang: 'en', dir: 'rtl' });
        expect(after?.content.content?.[0]?.attrs).toMatchObject({ align: 'left' });
        expect(after).toMatchSnapshot();
    });

    it('removes the alignment when its control is pressed and every selected block already has it', () => {
        const model = textModel([...textFeatures(), align()]);
        const { handle } = mountText({
            model,
            toolbar: [toolbar],
            blocks: [para(text('One')), para(text('Two'))],
        });
        act(() => selectAll(handle));
        fireEvent.click(screen.getByRole('button', { name: 'Align center' }));
        expect(handle.getSnapshot().document.content.content?.map((block) => block.attrs?.align)).toEqual([
            'center',
            'center',
        ]);

        fireEvent.click(screen.getByRole('button', { name: 'Align center' }));

        expect(handle.getSnapshot().document.content.content?.map((block) => block.attrs?.align)).toEqual([null, null]);
    });

    it('shows a mixed pressed state and applies the pressed alignment to every selected block', () => {
        const model = textModel([...textFeatures(), align()]);
        const left = { ...para(text('Left')), attrs: { lang: null, align: 'left' } };
        const center = { ...para(text('Center')), attrs: { lang: null, align: 'center' } };
        const { handle } = mountText({ model, toolbar: [toolbar], blocks: [left, center] });
        act(() => selectAll(handle));
        const pressed = (name: string) => screen.getByRole('button', { name }).getAttribute('aria-pressed');

        expect([pressed('Align left'), pressed('Align center'), pressed('Align right'), pressed('Justify')]).toEqual([
            'mixed',
            'mixed',
            'false',
            'false',
        ]);

        fireEvent.click(screen.getByRole('button', { name: 'Align center' }));

        expect(handle.getSnapshot().document.content.content?.map((block) => block.attrs?.align)).toEqual([
            'center',
            'center',
        ]);
        expect(pressed('Align center')).toBe('true');
        expect(pressed('Align left')).toBe('false');
    });
});

describe('pasted alignment', () => {
    const pasted = (model: ContentModel, html: string) => {
        const result = fromHTML(html, model, { window });
        if (result.status !== 'editable') {
            throw new Error(`fromHTML returned ${result.status}`);
        }
        return (result.document.content.content ?? []).map((block) => block.attrs?.align ?? null);
    };

    it('keeps center and justify when justify is on, and drops justify and start otherwise', () => {
        const html = [
            '<p style="text-align: center">Centered</p>',
            '<p style="text-align: justify">Justified</p>',
            '<p style="text-align: start">Start</p>',
        ].join('');

        expect(pasted(modelOf(true), html)).toEqual(['center', 'justify', null]);
        expect(pasted(modelOf(false), html)).toEqual(['center', null, null]);
    });
});
