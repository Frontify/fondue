/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen, within } from '@testing-library/react';
import { TextSelection } from 'prosemirror-state';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { mountStyled } from '#/features/__tests__/fixtures/style-editor';
import { plain, STYLE_MAP, styled, styledHeading, styleFeatures } from '#/features/__tests__/fixtures/styles';
import { vocabularyAlign } from '#/features/__tests__/fixtures/vocabulary';
import { codeBlock } from '#/features/blocks-code/feature';
import { compileContentModel, resolveStyle } from '#/model';
import { textFeatures } from '#/react/__tests__/fixtures/text';
import { setSelection, typeText } from '#/testing';

import { brandStyles } from '../feature';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

type Mounted = ReturnType<typeof mountStyled>;

const blocksOf = ({ handle }: Mounted) => handle.getSnapshot().document.content.content ?? [];
const classOf = (styleId: string | null, type = 'paragraph') => resolveStyle(STYLE_MAP, type, styleId).style?.className;
const openPicker = (mounted: Mounted, name: string) => {
    act(() => {
        fireEvent.pointerDown(mounted.getByRole('button', { name }), {
            button: 0,
            ctrlKey: false,
            pointerType: 'mouse',
        });
    });
    return screen.getAllByRole('menuitemradio');
};
const flush = () =>
    act(async () => {
        await Promise.resolve();
    });

describe('styles.brand', () => {
    it('keeps a paragraph a paragraph with no heading level for every brand style applied to it, setting only the paragraph styles', () => {
        const applied = STYLE_MAP.map(({ id }) => {
            const mounted = mountStyled({ blocks: [styled(null, plain('Body'))] });
            setSelection(mounted.handle, { text: 'Body', from: 1, to: 1 });
            const result = mounted.handle.execute('block.style.set', { styleId: id });
            const [block] = blocksOf(mounted);
            mounted.unmount();
            const type = block?.type;
            const attrs = block?.attrs;
            return [result.status, type, attrs];
        });

        expect(applied).toEqual(
            STYLE_MAP.map(({ id, appliesTo }) => {
                if (appliesTo.includes('paragraph')) {
                    return ['applied', 'paragraph', { lang: null, styleId: id }];
                }
                return ['rejected', 'paragraph', { lang: null, styleId: null }];
            }),
        );
    });

    it('sets a heading style only on the headings of a selection that also holds a paragraph', () => {
        const mounted = mountStyled({
            blocks: [styled(null, plain('One')), styledHeading(null, 2, plain('Two')), styled(null, plain('Three'))],
        });
        const { state } = mounted.view;
        mounted.view.dispatch(state.tr.setSelection(TextSelection.create(state.doc, 1, state.doc.content.size - 1)));

        const result = mounted.handle.execute('block.style.set', { styleId: 'brand.title' });

        expect(result.status).toBe('applied');
        expect(blocksOf(mounted).map((block) => [block.type, block.attrs?.styleId])).toEqual([
            ['paragraph', null],
            ['heading', 'brand.title'],
            ['paragraph', null],
        ]);
    });

    it('reports a style active over a paragraph and a heading that both carry it', () => {
        const mounted = mountStyled({
            blocks: [styled('brand.title', plain('One')), styledHeading('brand.title', 2, plain('Two'))],
        });
        const { state } = mounted.view;
        mounted.view.dispatch(state.tr.setSelection(TextSelection.create(state.doc, 1, state.doc.content.size - 1)));

        expect(mounted.handle.query('block.style.set', { styleId: 'brand.title' }).active).toBe(true);
    });

    it('reports a style active over a paragraph that carries it and a code block, which the style never changes', () => {
        const model = compileContentModel([...styleFeatures(), codeBlock()], { id: 'test.styles', version: 1 });
        const mounted = mountStyled({
            model,
            blocks: [
                styled('brand.lead', plain('One')),
                { type: 'code_block', attrs: { languageId: null }, content: [plain('two')] },
            ],
        });
        const { state } = mounted.view;
        mounted.view.dispatch(state.tr.setSelection(TextSelection.create(state.doc, 1, state.doc.content.size - 1)));

        expect(mounted.handle.query('block.style.set', { styleId: 'brand.lead' }).active).toBe(true);
    });

    it('reports one styles.unknown-style warning per style ID when the presentation has no styles', async () => {
        const mounted = mountStyled({
            blocks: [styled('brand.lead', plain('One')), styled('brand.lead', plain('Two'))],
            presentation: { styles: [] },
        });
        await flush();

        expect(mounted.diagnostics.filter(({ code }) => code === 'styles.unknown-style')).toEqual([
            {
                code: 'styles.unknown-style',
                severity: 'warning',
                messageKey: 'styles.unknown-style',
                path: '/content/content/0',
                featureId: 'styles.brand',
            },
        ]);
    });

    it('offers in the selection toolbar the brand styles of the block type at the selection, checking the block style', () => {
        const mounted = mountStyled({
            blocks: [styled('brand.lead', plain('Body text'))],
            presentation: { toolbar: [['text-style']] },
            toolbarMode: 'bubble',
        });
        act(() => mounted.view.dom.focus());
        act(() => setSelection(mounted.handle, { text: 'Body' }));
        const bubble = screen.getByRole('toolbar', { name: 'Selection formatting' });
        act(() => {
            fireEvent.keyDown(within(bubble).getByRole('button', { name: 'Normal text' }), { key: 'Enter' });
        });
        const rows = within(screen.getByText('Brand styles').closest('[role="group"]') as HTMLElement)
            .getAllByRole('menuitemradio')
            .map((row) => [
                row.textContent,
                row.getAttribute('aria-checked'),
                row.querySelector('[data-name="right"] svg') !== null,
            ]);

        act(() => {
            fireEvent.click(screen.getByRole('menuitemradio', { name: 'Caption' }));
        });

        expect(rows).toEqual([
            ['Default style', 'false', false],
            ['Lead', 'true', true],
            ['Caption', 'false', false],
        ]);
        expect(blocksOf(mounted)).toEqual([styled('brand.caption', plain('Body text'))]);
    });

    it('changes only the styleId of a heading with block.style.set, never its type, level, nodeId or text, and null resets it', () => {
        const mounted = mountStyled({ blocks: [styledHeading(null, 3, plain('Title'))] });
        setSelection(mounted.handle, { text: 'Title', from: 2, to: 2 });

        mounted.handle.execute('block.style.set', { styleId: 'brand.title' });
        const styledBlock = blocksOf(mounted)[0];
        mounted.handle.execute('block.style.set', { styleId: null });
        const reset = blocksOf(mounted)[0];

        expect(styledBlock).toEqual(styledHeading('brand.title', 3, plain('Title')));
        expect(reset).toEqual(styledHeading(null, 3, plain('Title')));
    });

    it('sets the style of every selected paragraph and heading as one undo step', () => {
        const mounted = mountStyled({
            blocks: [styled(null, plain('One')), styledHeading(null, 2, plain('Two')), styled(null, plain('Three'))],
        });
        const { state } = mounted.view;
        mounted.view.dispatch(state.tr.setSelection(TextSelection.create(state.doc, 1, state.doc.content.size - 1)));

        mounted.handle.execute('block.style.set', { styleId: 'brand.caption' });
        const set = blocksOf(mounted).map((block) => block.attrs?.styleId);
        mounted.handle.execute('history.undo');

        expect(set).toEqual(['brand.caption', 'brand.caption', 'brand.caption']);
        expect(blocksOf(mounted).map((block) => block.attrs?.styleId)).toEqual([null, null, null]);
    });

    it('keeps an unknown and a deprecated style ID in the document and renders those blocks with the default style of their type', () => {
        const blocks = [styled('brand.unknown', plain('Unknown')), styled('brand.legacy', plain('Deprecated'))];
        const paragraphStyle = {
            id: 'paragraph',
            label: 'Body',
            appliesTo: ['paragraph' as const],
            deprecated: false,
            recipe: { fontSize: 15 },
        };
        const styles = [...STYLE_MAP, paragraphStyle];
        const mounted = mountStyled({ blocks, presentation: { styles } });
        const snapshot = mounted.handle.getSnapshot();
        const rendered = [...mounted.view.dom.querySelectorAll('p')].map((element) => [
            element.dataset.rteStyle,
            element.className,
        ]);

        expect([snapshot.stamp.sequence, mounted.changes.length, snapshot.document.content.content]).toEqual([
            0,
            0,
            blocks,
        ]);
        const defaultClass = resolveStyle(styles, 'paragraph', null).style?.className;
        expect(rendered).toEqual([
            ['brand.unknown', defaultClass],
            ['brand.legacy', defaultClass],
        ]);
    });

    it('reports one styles.unknown-style warning per style ID and session, from styles.brand', async () => {
        const mounted = mountStyled({
            blocks: [
                styled('brand.unknown', plain('One')),
                styled('brand.unknown', plain('Two')),
                styled('brand.legacy', plain('Three')),
            ],
        });
        await flush();
        setSelection(mounted.handle, { text: 'One', from: 3, to: 3 });
        typeText(mounted.handle, '!');
        await flush();

        expect(mounted.diagnostics.filter(({ code }) => code === 'styles.unknown-style')).toEqual([
            {
                code: 'styles.unknown-style',
                severity: 'warning',
                messageKey: 'styles.unknown-style',
                path: '/content/content/0',
                featureId: 'styles.brand',
            },
            {
                code: 'styles.unknown-style',
                severity: 'warning',
                messageKey: 'styles.unknown-style',
                path: '/content/content/2',
                featureId: 'styles.brand',
            },
        ]);
    });

    it('lists in the text style picker only the styles that are not deprecated and apply to the block type, paragraph and heading', () => {
        const rowsOn = (text: string, picker: string) => {
            const mounted = mountStyled({
                blocks: [styled(null, plain('Body')), styledHeading(null, 2, plain('Title'))],
                presentation: { toolbar: [['text-style']] },
            });
            act(() => {
                setSelection(mounted.handle, { text, from: 1, to: 1 });
            });
            const rows = openPicker(mounted, picker).map((row) => row.textContent);
            mounted.unmount();
            return rows;
        };
        const onParagraph = rowsOn('Body', 'Normal text');
        const onHeading = rowsOn('Title', 'Heading 2');

        expect(onParagraph).toEqual([
            'Normal text',
            'Heading 1',
            'Heading 2',
            'Heading 3',
            'Heading 4',
            'Heading 5',
            'Heading 6',
            'Quote',
            'Default style',
            'Lead',
            'Caption',
        ]);
        expect(onHeading.slice(-3)).toEqual(['Default style', 'Title', 'Caption']);
    });

    it('previews each brand style row in its font family, size and weight on a unitless line height, without its colour, and checks the block style with a check mark', () => {
        const mounted = mountStyled({
            blocks: [styledHeading('brand.title', 2, plain('Title'))],
            presentation: { toolbar: [['text-style']] },
        });
        setSelection(mounted.handle, { text: 'Title', from: 1, to: 1 });

        const rows = openPicker(mounted, 'Heading 2');
        const title = rows.find((row) => row.textContent === 'Title');
        const preview = title?.querySelector<HTMLElement>('[data-rte-style-preview]');

        expect(preview?.getAttribute('style')).toBe(
            'font-family: Georgia, serif; font-size: 32px; font-weight: 700; line-height: 1.25;',
        );
        expect(
            rows.map((row) => [
                row.textContent,
                row.getAttribute('aria-checked'),
                row.querySelector('[data-name="right"] svg') !== null,
            ]),
        ).toEqual(
            expect.arrayContaining([
                ['Heading 2', 'true', true],
                ['Title', 'true', true],
                ['Heading 1', 'false', false],
                ['Caption', 'false', false],
            ]),
        );
    });

    it('sets a brand style from the picker as one change of styleId', () => {
        const mounted = mountStyled({
            blocks: [styled(null, plain('Body'))],
            presentation: { toolbar: [['text-style']] },
        });
        setSelection(mounted.handle, { text: 'Body', from: 1, to: 1 });
        const lead = openPicker(mounted, 'Normal text').find((row) => row.textContent === 'Lead') as HTMLElement;

        act(() => {
            fireEvent.click(lead);
        });

        expect(mounted.changes.map(({ commandId }) => commandId)).toEqual(['block.style.set']);
        expect(blocksOf(mounted)).toEqual([styled('brand.lead', plain('Body'))]);
    });

    it('renders every use of a style ID with a changed recipe at the next render, with no document change', () => {
        const mounted = mountStyled({
            blocks: [styled('brand.lead', plain('One')), styled('brand.lead', plain('Two'))],
        });
        const before = mounted.handle.getSnapshot();
        const changed = STYLE_MAP.map((style) => {
            if (style.id !== 'brand.lead') {
                return style;
            }
            return { ...style, recipe: { fontSize: 26 } };
        });

        mounted.rerenderWith({ styles: changed });
        const after = mounted.handle.getSnapshot();
        const newClass = resolveStyle(changed, 'paragraph', 'brand.lead').style?.className;
        const sheets = [...document.head.querySelectorAll('style[data-rte-styles]')].map(
            ({ textContent }) => textContent,
        );

        expect(newClass).not.toBe(classOf('brand.lead'));
        expect([...mounted.view.dom.querySelectorAll('p')].map(({ className }) => className)).toEqual([
            newClass,
            newClass,
        ]);
        expect(sheets).toEqual([expect.stringContaining(`.${newClass}{font-size:26px}`)]);
        expect([after.stamp.sequence, after.document]).toEqual([before.stamp.sequence, before.document]);
        expect(mounted.changes).toEqual([]);
    });

    it('keeps the styleId of the shipped styles.brand, and align and lang, when paragraph.set runs on a heading', () => {
        const model = compileContentModel([...textFeatures(), brandStyles(), vocabularyAlign()], {
            id: 'test.styles',
            version: 1,
        });
        const mounted = mountStyled({
            model,
            blocks: [
                {
                    type: 'heading',
                    attrs: { nodeId: 'heading-1', level: 2, lang: 'de-CH', align: 'center', styleId: 'brand-title' },
                    content: [plain('Kept '), { type: 'text', text: 'bold', marks: [{ type: 'bold' }] }],
                },
            ],
        });
        setSelection(mounted.handle, { text: 'Kept', from: 2, to: 2 });

        expect(mounted.handle.execute('paragraph.set').status).toBe('applied');
        expect(blocksOf(mounted)).toEqual([
            {
                type: 'paragraph',
                attrs: { lang: 'de-CH', styleId: 'brand-title', align: 'center' },
                content: [plain('Kept '), { type: 'text', text: 'bold', marks: [{ type: 'bold' }] }],
            },
        ]);
    });
});
