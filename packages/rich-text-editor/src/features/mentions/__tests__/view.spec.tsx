/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { AllSelection } from 'prosemirror-state';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { defineReactPresentation } from '#/entries/authoring';
import { RichTextReader } from '#/entries/reader';
import { type ReferenceResolution } from '#/model';

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
        const mention = mounted.inline()[1];
        const attrs = mention?.attrs;
        expect(attrs?.labelSnapshot).toBe('Ada');
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

describe('mention labels in every output', () => {
    const codecs = createCodecs(model);
    const copied = (mounted: ReturnType<typeof mountMentions>) => {
        const clipboardData = new DataTransfer();
        act(() => {
            mounted.view.dispatch(mounted.view.state.tr.setSelection(new AllSelection(mounted.view.state.doc)));
            mounted.view.dom.dispatchEvent(
                new ClipboardEvent('copy', { clipboardData, bubbles: true, cancelable: true }),
            );
        });

        return { html: clipboardData.getData('text/html'), text: clipboardData.getData('text/plain') };
    };

    it('writes Unknown and the resource type for an empty labelSnapshot in plain text and Markdown too', () => {
        const document = storedIn(model, [para(text('Ask '), mention('m-1', ''))]);

        expect(codecs.toPlainText(document).text).toBe('Ask @Unknown user');
        expect(codecs.toMarkdown(document).markdown).toContain('@Unknown user');
    });

    it('writes the current label, or the snapshot with the unavailable note, in toHTML given resolveReference, and the snapshot without it', () => {
        const document = storedIn(model, twoMentions);
        const resolveReference = (_type: string, id: string): ReferenceResolution =>
            id === 'user-1' ? { status: 'current', label: 'Ada King' } : { status: 'unavailable', code: 'deleted' };

        const resolved = codecs.toHTML(document, { resolveReference }).html;

        expect(resolved).toBe(readerMarkup(twoMentions, resolveReference));
        expect(resolved).toContain('@<bdi>Ada King</bdi></span>');
        expect(resolved).toContain('@<bdi>Grace</bdi> (unavailable)</span>');
        expect(codecs.toHTML(document).html).toBe(readerMarkup(twoMentions));
    });

    it('copies the label the chip shows, through the session resolver, in HTML and plain text', async () => {
        const mounted = mountMentions({
            blocks: twoMentions,
            presentation: resolving((_type, id) =>
                id === 'user-1' ? { status: 'current', label: 'Ada King' } : { status: 'unavailable', code: 'deleted' },
            ),
        });
        const shown = await chips(mounted);

        const { html, text: plain } = copied(mounted);

        expect(shown.map((chip) => chip.textContent)).toEqual(['@Ada King', '@Grace (unavailable)']);
        expect(html).toContain('@<bdi>Ada King</bdi>');
        expect(html).toContain('@<bdi>Grace</bdi> (unavailable)');
        expect(plain).toBe('Ask @Ada King and @Grace (unavailable)');
    });

    it('strips bidirectional controls from stored and current labels and keeps the letters of every script', async () => {
        const blocks = [
            para(mention('m-1', '\u202EAda\u202C\u200F'), text(' '), mention('m-2', 'ليلى\u2066', 'user-2')),
        ];
        const mounted = mountMentions({
            blocks,
            presentation: resolving((_type, id) =>
                id === 'user-2' ? { status: 'current', label: '\u061Cليلى حسن\u2069' } : { status: 'unknown' },
            ),
        });
        const document = storedIn(model, blocks);

        const shown = await chips(mounted);

        expect(shown.map((chip) => chip.textContent)).toEqual(['@Ada', '@ليلى حسن']);
        expect(readerMarkup(blocks)).toContain('@<bdi>Ada</bdi></span> <span data-mention="">@<bdi>ليلى</bdi>');
        expect(codecs.toHTML(document).html).toBe(readerMarkup(blocks));
        expect(codecs.toPlainText(document).text).toBe('@Ada @ليلى');
        expect(codecs.toMarkdown(document).markdown).not.toMatch(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/u);
    });

    it('resolves a stored mention by its resource ID as stored, a bidirectional mark included', async () => {
        const asked: string[] = [];
        const mounted = mountMentions({
            blocks: [para(mention('m-1', 'Ada', 'ada\u200E'))],
            presentation: resolving((_type, id) => {
                asked.push(id);

                return id === 'ada' ? { status: 'current', label: 'Mallory' } : { status: 'unknown' };
            }),
        });
        const shown = await chips(mounted);

        expect(shown.map((chip) => chip.textContent)).toEqual(['@Ada']);
        expect(new Set(asked)).toEqual(new Set(['ada\u200E']));
        expect(
            codecs.toHTML(storedIn(model, [para(mention('m-1', 'Ada', 'ada\u200E'))]), {
                resolveReference: (_type, id) =>
                    id === 'ada' ? { status: 'current', label: 'Mallory' } : { status: 'unknown' },
            }).html,
        ).toContain('@<bdi>Ada</bdi>');
    });

    it('strips C0 and C1 controls from a stored label in the chip, the reader and copied plain text', async () => {
        const label = 'Ada\u001B]8;;https://evil.example\u0007 Lovelace\u009B';
        const blocks = [para(mention('m-1', label))];
        const mounted = mountMentions({ blocks });
        const shown = await chips(mounted);

        const { text: plain } = copied(mounted);

        expect(shown.map((chip) => chip.textContent)).toEqual(['@Ada]8;;https://evil.example Lovelace']);
        expect(readerMarkup(blocks)).not.toMatch(/[\u0000-\u001F\u007F-\u009F]/u);
        expect(plain).toBe('@Ada]8;;https://evil.example Lovelace');
        expect(codecs.toPlainText(storedIn(model, blocks)).text).toBe(plain);
    });
});
