/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { defineReactPresentation } from '#/index';
import { type ReferenceResolution } from '#/model';
import { RichTextReader } from '#/reader';

import { mention, mentionModel, mountMentions, para, storedIn, text } from './fixtures/mount';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
});

const model = mentionModel();
const twoMentions = [para(text('Ask '), mention('m-1', 'Ada'), text(' and '), mention('m-2', 'Grace', 'user-2'))];

/** The chips of the surface, which the node views render once the portals flush. */
const chips = async (mounted: ReturnType<typeof mountMentions>) => {
    await act(async () => {
        await Promise.resolve();
    });
    return [...mounted.view.dom.querySelectorAll('[data-rte-chrome] > span')];
};

const resolving = (resolve: (resourceType: string, resourceId: string) => ReferenceResolution) =>
    defineReactPresentation({ toolbar: [], resolveReference: resolve });

const readerMarkup = (
    blocks: Parameters<typeof storedIn>[1],
    resolve?: (type: string, id: string) => ReferenceResolution,
) =>
    renderToStaticMarkup(
        createElement(RichTextReader, {
            document: storedIn(model, blocks),
            model,
            ...(resolve === undefined
                ? {}
                : { presentation: { styles: [], colorTokens: [], resolveReference: resolve } }),
        }),
    );

describe('mention display', () => {
    it('isolates an Arabic label with bdi inside English text in the editor, the reader and toHTML', async () => {
        const blocks = [para(text('Ask '), mention('m-1', 'ليلى'), text(' today'))];
        const mounted = mountMentions({ blocks });
        const [chip] = await chips(mounted);

        expect(chip?.innerHTML).toMatchInlineSnapshot(`"@<bdi>ليلى</bdi>"`);
        expect(readerMarkup(blocks)).toMatchInlineSnapshot(
            `"<div class="fondue-rte-content"><p dir="auto">Ask <span data-mention="">@<bdi>ليلى</bdi></span> today</p></div>"`,
        );
        expect(createCodecs(model).toHTML(storedIn(model, blocks)).html).toBe(readerMarkup(blocks));
    });

    it('shows the current label while labelSnapshot stays unchanged in the document', async () => {
        const mounted = mountMentions({
            blocks: twoMentions,
            presentation: resolving((_type, id) => ({
                status: 'current',
                label: id === 'user-1' ? 'Ada King' : 'Grace',
            })),
        });

        const shown = await chips(mounted);

        expect(shown.map((chip) => chip.textContent)).toEqual(['@Ada King', '@Grace']);
        expect(mounted.inline()[1]?.attrs?.labelSnapshot).toBe('Ada');
    });

    it('shows an unavailable mention by its snapshot with a note and reports it once per node and session, with its code and no label', async () => {
        const unavailable = resolving((_type, id) =>
            id === 'user-1' ? { status: 'unavailable', code: 'forbidden' } : { status: 'unavailable', code: 'deleted' },
        );
        const mounted = mountMentions({ blocks: twoMentions, presentation: unavailable });
        const shown = await chips(mounted);
        mounted.rerenderWith({ presentation: resolving(() => ({ status: 'unavailable', code: 'deleted' })) });
        await chips(mounted);

        expect(shown.map((chip) => chip.textContent)).toEqual(['@Ada (unavailable)', '@Grace (unavailable)']);
        expect(mounted.inline().filter((node) => node.type === 'mention')).toHaveLength(2);
        expect(mounted.view.dom.innerHTML).not.toMatch(/user-1|user-2|forbidden|deleted/);
        const reported = mounted.diagnostics.filter(({ code }) => code === 'reference.unavailable');
        expect(reported.map(({ severity, details }) => [severity, details])).toEqual([
            ['warning', { code: 'forbidden' }],
            ['warning', { code: 'deleted' }],
        ]);
        expect(JSON.stringify(reported)).not.toMatch(/Ada|Grace/);
    });

    it.each([
        ['absent', undefined],
        ['unknown', (): ReferenceResolution => ({ status: 'unknown' })],
        [
            'throwing for the first mention only',
            (_type: string, id: string): ReferenceResolution => {
                if (id === 'user-1') {
                    throw new Error('resolver failed');
                }
                return { status: 'current', label: 'Grace Hopper' };
            },
        ],
    ])(
        'falls back to labelSnapshot with no note for that mention only when resolveReference is %s',
        async (_name, resolve) => {
            let presentation;
            if (resolve !== undefined) {
                presentation = resolving(resolve);
            }
            const mounted = mountMentions({ blocks: twoMentions, presentation });
            const [first, second] = await chips(mounted);

            expect(first?.textContent).toBe('@Ada');
            if (resolve !== undefined && resolve('user', 'user-2').status === 'current') {
                expect(second?.textContent).toBe('@Grace Hopper');
            } else {
                expect(second?.textContent).toBe('@Grace');
            }
            expect(mounted.diagnostics.filter(({ code }) => code === 'reference.unavailable')).toEqual([]);
        },
    );

    it('shows Unknown and the resource type for an empty labelSnapshot in the editor, the reader and toHTML', async () => {
        const blocks = [para(mention('m-1', '', 'user-1', 'user'))];
        const mounted = mountMentions({ blocks });

        const shown = await chips(mounted);

        expect(shown.map((chip) => chip.innerHTML)).toEqual(['@<bdi>Unknown user</bdi>']);
        expect(readerMarkup(blocks)).toMatchInlineSnapshot(
            `"<div class="fondue-rte-content"><p dir="auto"><span data-mention="">@<bdi>Unknown user</bdi></span></p></div>"`,
        );
        expect(createCodecs(model).toHTML(storedIn(model, blocks)).html).toBe(readerMarkup(blocks));
    });

    it('renders an unavailable mention in the reader by its snapshot with the note and no resource ID', () => {
        const markup = readerMarkup([para(mention('m-1', 'Ada'))], () => ({ status: 'unavailable', code: 'deleted' }));

        expect(markup).toBe(
            '<div class="fondue-rte-content"><p dir="auto"><span data-mention="">@<bdi>Ada</bdi> (unavailable)</span></p></div>',
        );
    });
});
