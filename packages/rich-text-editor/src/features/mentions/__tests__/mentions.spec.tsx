/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { AllSelection } from 'prosemirror-state';
import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';

import { defineReactPresentation } from '#/entries/authoring';
import { core, mentions } from '#/features';
import { type EditorServices } from '#/index';
import { defaultLimits, type RichTextSlice } from '#/model';
import { SLICE_TYPE } from '#/runtime/clipboard/slice';
import { runtimeOf } from '#/runtime/runtime';
import { paste, pressKey, probeRuntimes, setSelection, typeText } from '#/testing';

import {
    ADA,
    advance,
    deferredService,
    DESIGN,
    flush,
    GRACE,
    mention,
    mentionModel,
    mountMentions,
    page,
    para,
    text,
} from './fixtures/mount';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
});

/** Types `@` and `query`, waits out the search delay, and answers the search with `items`. */
const openWith = async (
    mounted: ReturnType<typeof mountMentions>,
    pending: ReturnType<typeof deferredService>['pending'],
    query: string,
    items: readonly unknown[],
) => {
    typeText(mounted.handle, `@${query}`);
    await advance(200);
    pending.at(-1)?.resolve(page(items));
    await flush();
};

describe('mention suggestions', () => {
    it('opens the list with an empty query on @ at the block start, after a space and after punctuation, and not inside a word', () => {
        const { service } = deferredService();
        const opened = ['@', 'Hi @', 'Ask (@', 'Say "@', 'See [@'].map((typed) => {
            const mounted = mountMentions({ services: { references: service } });
            typeText(mounted.handle, typed);

            return mounted.active();
        });
        const inWord = mountMentions({ services: { references: service } });
        typeText(inWord.handle, 'mail@');

        expect(opened.map((active) => active?.featureId)).toEqual(Array(5).fill('mentions'));
        expect(opened.map((active) => active?.query)).toEqual(Array(5).fill(''));
        expect(opened[0]?.status).toBe('loading');
        expect(inWord.active()).toBeNull();
        expect(inWord.textOf()).toBe('mail@');
    });

    it('asks ReferenceService.search once, 200 ms after the last of five keystrokes 50 ms apart, with the query and resource types', async () => {
        const { service, search } = deferredService();
        const mounted = mountMentions({
            model: mentionModel([core(), mentions({ resourceTypes: ['user', 'group'] })]),
            services: { references: service },
        });
        typeText(mounted.handle, '@');
        for (const character of 'gracy') {
            await advance(50);
            typeText(mounted.handle, character);
        }

        await advance(199);
        expect(search).not.toHaveBeenCalled();

        await advance(1);

        expect(search).toHaveBeenCalledTimes(1);
        expect(search.mock.calls[0]?.[0]).toEqual({ query: 'gracy', resourceTypes: ['user', 'group'], cursor: null });
    });

    it('aborts the older search when a newer query is sent and ignores its result when it resolves last', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@a');
        await advance(200);
        const older = pending[0];
        typeText(mounted.handle, 'd');
        await advance(200);
        const newer = pending[1];

        newer?.resolve(page([ADA]));
        await flush();
        older?.resolve(page([GRACE]));
        await flush();

        expect(older?.context.signal.aborted).toBe(true);
        expect(newer?.context.signal.aborted).toBe(false);
        expect(mounted.active()?.query).toBe('ad');
        expect(mounted.active()?.items.map((item) => item.label)).toEqual(['Ada Lovelace']);
    });

    it('drops results whose type, IDs or label cannot be stored or shown, and keeps every type when resourceTypes is empty', async () => {
        const hostile = [
            { resourceType: 'group', resourceId: 'group-1', labelSnapshot: 'Not asked for' },
            { resourceType: 'us er', resourceId: 'user-9', labelSnapshot: 'Spaced type' },
            { resourceType: 'user', resourceId: '', labelSnapshot: 'No ID' },
            { resourceType: 'user', resourceId: 'user-8', labelSnapshot: '' },
            {
                resourceType: 'user',
                resourceId: 'x'.repeat(defaultLimits.maxAttributeLength + 1),
                labelSnapshot: 'Long',
            },
            { resourceType: 'user', resourceId: 'user-7', labelSnapshot: 'a'.repeat(257) },
            { resourceType: 'user', resourceId: 'user-6', labelSnapshot: 'Bell\u0007' },
            { resourceType: 'user', resourceId: 'user-5', labelSnapshot: 'Two\nlines' },
            'not an item',
            null,
            { ...ADA, resourceId: 'x'.repeat(defaultLimits.maxAttributeLength) },
        ];
        const narrow = deferredService();
        const asked = mountMentions({
            model: mentionModel([core(), mentions({ resourceTypes: ['user'] })]),
            services: { references: narrow.service },
        });
        await openWith(asked, narrow.pending, '', hostile);
        const any = deferredService();
        const open = mountMentions({ services: { references: any.service } });
        const page = { resourceType: 'page', resourceId: 'page-1', labelSnapshot: 'Brand guide' };
        await openWith(open, any.pending, '', [ADA, DESIGN, page]);

        expect(asked.active()?.items.map((item) => item.label)).toEqual(['Ada Lovelace']);
        expect(any.pending[0]?.request.resourceTypes).toEqual([]);
        expect(open.active()?.items.map((item) => item.detail)).toEqual(['user', 'group', 'page']);
    });

    it('inserts one mention with a new nodeId, the resource and its label as labelSnapshot, then a space, and one undo restores the query', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ blocks: [para(text('Hi '))], services: { references: service } });
        setSelection(mounted.handle, { text: 'Hi ', from: 3, to: 3 });
        await openWith(mounted, pending, 'ad', [{ ...ADA, imageUrl: 'https://example.com/ada.png', kind: 'user' }]);

        pressKey(mounted.handle, 'Enter');
        const [before, inserted, after] = mounted.inline();

        expect(mounted.active()).toBeNull();
        expect(before).toEqual(text('Hi '));
        expect(inserted?.type).toBe('mention');
        const insertedAttrs = inserted?.attrs;
        expect(Object.keys(insertedAttrs ?? {}).sort()).toEqual([
            'labelSnapshot',
            'nodeId',
            'resourceId',
            'resourceType',
        ]);
        expect(inserted?.attrs).toMatchObject({
            resourceType: 'user',
            resourceId: 'user-1',
            labelSnapshot: 'Ada Lovelace',
        });
        expect(typeof insertedAttrs?.nodeId).toBe('string');
        expect(insertedAttrs?.nodeId).not.toBe('');
        expect(after).toEqual(text(' '));

        expect(mounted.handle.execute('history.undo')).toMatchObject({ status: 'applied' });
        await flush();
        expect(mounted.inline()).toEqual([text('Hi @ad')]);
        expect(mounted.active()).toBeNull();
    });

    it.each([
        ['Escape', (mounted: ReturnType<typeof mountMentions>) => pressKey(mounted.handle, 'Escape')],
        [
            'ArrowLeft past the @',
            (mounted: ReturnType<typeof mountMentions>) => {
                // The plugin leaves ArrowLeft to the browser, which moves the caret; this is the selection it leaves.
                pressKey(mounted.handle, 'ArrowLeft');
                setSelection(mounted.handle, { text: '@ad', from: 0, to: 0 });
            },
        ],
        [
            'a click elsewhere',
            (mounted: ReturnType<typeof mountMentions>) =>
                setSelection(mounted.handle, { text: 'Elsewhere', from: 2, to: 2 }),
        ],
    ])(
        'closes the list on %s, keeps the text and aborts the search, whose late result changes nothing',
        async (_name, leave) => {
            const { service, pending } = deferredService();
            const mounted = mountMentions({
                blocks: [para(), para(text('Elsewhere'))],
                services: { references: service },
            });
            typeText(mounted.handle, '@ad');
            await advance(200);
            const search = pending[0];
            const before = mounted.handle.getSnapshot().document;

            act(() => leave(mounted));
            search?.resolve(page([ADA]));
            await flush();
            setSelection(mounted.handle, { text: '@ad', from: 3, to: 3 });

            expect(search?.context.signal.aborted).toBe(true);
            expect(mounted.active()).toBeNull();
            expect(mounted.handle.getSnapshot().document).toEqual(before);
        },
    );

    it('keeps the list open for a query with spaces of up to 50 characters, and closes it beyond 50 or at a line break', () => {
        const { service } = deferredService();
        const named = mountMentions({ services: { references: service } });
        typeText(named.handle, '@Anna Muster');
        const long = mountMentions({ services: { references: service } });
        typeText(long.handle, `@${'a b '.repeat(12)}ab`);
        const openAtFifty = long.active()?.query.length;
        typeText(long.handle, 'c');
        const broken = mountMentions({ services: { references: service } });
        typeText(broken.handle, '@ad');
        act(() => {
            broken.handle.execute('hard-break.insert');
        });
        const split = mountMentions({ services: { references: service } });
        typeText(split.handle, '@ad');
        pressKey(split.handle, 'Enter');

        expect(named.active()?.query).toBe('Anna Muster');
        expect(openAtFifty).toBe(50);
        expect(long.active()).toBeNull();
        expect(broken.active()).toBeNull();
        expect(split.active()).toBeNull();
        expect(split.blocksOf()).toHaveLength(2);
    });

    it('inserts @ and opens no list when the host passes no ReferenceService', async () => {
        const mounted = mountMentions();
        typeText(mounted.handle, 'Hi @');
        await flush();
        await advance(500);

        expect(mounted.textOf()).toBe('Hi @');
        expect(mounted.active()).toBeNull();
        expect(mounted.queryByRole('listbox')).toBeNull();
    });

    it('asks the service again in a second session for the same query, keeping no results across sessions', async () => {
        const { service, search, pending } = deferredService();
        const first = mountMentions({ services: { references: service } });
        await openWith(first, pending, 'ad', [ADA]);
        const second = mountMentions({ services: { references: service } });
        await openWith(second, pending, 'ad', [ADA]);

        expect(search).toHaveBeenCalledTimes(2);
        expect(search.mock.calls.map(([request]) => request.query)).toEqual(['ad', 'ad']);
        expect(second.active()?.items.map((item) => item.label)).toEqual(['Ada Lovelace']);
    });

    it('ends a page with a nextCursor with Load more, which asks for the next page with that cursor', async () => {
        const { service, search, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@');
        await advance(200);
        pending[0]?.resolve(page([ADA], 'page-2'));
        await flush();
        const activeItems = mounted.active()?.items;
        const listed = activeItems ?? [];

        expect(listed.map((item) => item.action ?? item.label)).toEqual(['Ada Lovelace', 'more']);
        pressKey(mounted.handle, 'ArrowDown');
        pressKey(mounted.handle, 'Enter');
        expect(search).toHaveBeenCalledTimes(2);
        expect(search.mock.calls[1]?.[0]).toEqual({ query: '', resourceTypes: [], cursor: 'page-2' });
        pending[1]?.resolve(page([GRACE]));
        await flush();

        expect(mounted.active()?.items.map((item) => item.label)).toEqual(['Ada Lovelace', 'Grace Hopper']);
        expect(mounted.active()?.index).toBe(1);
        expect(mounted.textOf()).toBe('@');
    });

    it('offers Retry after a failed search, which asks again at once', async () => {
        const { service, search, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@ad');
        await advance(200);
        pending[0]?.reject(new Error('offline'));
        await flush();

        expect(mounted.active()).toMatchObject({ status: 'failed' });
        expect(mounted.active()?.items.map((item) => item.action)).toEqual(['retry']);
        pressKey(mounted.handle, 'Enter');
        expect(search).toHaveBeenCalledTimes(2);
        pending[1]?.resolve(page([ADA]));
        await flush();

        expect(mounted.active()).toMatchObject({ status: 'ready', query: 'ad' });
        expect(mounted.active()?.items.map((item) => item.label)).toEqual(['Ada Lovelace']);
    });

    it('restores the typed query with one undo after accepting a mention and reopens no list', async () => {
        const { service, search, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        await openWith(mounted, pending, 'ad', [ADA]);
        pressKey(mounted.handle, 'Enter');

        act(() => {
            mounted.handle.execute('history.undo');
        });
        await advance(500);

        expect(mounted.inline()).toEqual([text('@ad')]);
        expect(mounted.active()).toBeNull();
        expect(search).toHaveBeenCalledTimes(1);
        pressKey(mounted.handle, 'Enter');
        expect(mounted.inline().some((node) => node.type === 'mention')).toBe(false);
    });

    it('has no notification service, and inserting, deleting and undoing a mention calls only search', async () => {
        expectTypeOf<keyof EditorServices>().toEqualTypeOf<
            'persistence' | 'recovery' | 'references' | 'uploads' | 'assets'
        >();
        const { service, pending } = deferredService();
        const read = new Set<PropertyKey>();
        const references = new Proxy(service, {
            get: (target, name, receiver) => {
                read.add(name);

                return Reflect.get(target, name, receiver) as unknown;
            },
        });
        const mounted = mountMentions({ services: { references } });
        await openWith(mounted, pending, 'ad', [ADA]);
        pressKey(mounted.handle, 'Enter');
        act(() => {
            mounted.handle.execute('history.undo');
            mounted.handle.execute('history.redo');
        });
        setSelection(mounted.handle, { text: ' ', from: 0, to: 1 });
        act(() => {
            mounted.view.dispatch(mounted.view.state.tr.delete(1, mounted.view.state.selection.to));
        });
        act(() => {
            mounted.handle.execute('history.undo');
        });

        expect(mounted.inline().some((node) => node.type === 'mention')).toBe(true);
        expect([...read]).toEqual(['search']);
        expect(service.search).toHaveBeenCalledTimes(1);
    });

    it('gives each inserted mention its own nodeId', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        await openWith(mounted, pending, 'ad', [ADA]);
        pressKey(mounted.handle, 'Enter');
        await openWith(mounted, pending, 'gr', [GRACE]);
        pressKey(mounted.handle, 'Enter');

        const ids = mounted.inline().flatMap((node) => (node.type === 'mention' ? [node.attrs?.nodeId] : []));

        expect(ids).toHaveLength(2);
        expect(new Set(ids).size).toBe(2);
    });
});

describe('mention search through the async coordinator', () => {
    const searches = () => probeRuntimes().operations.filter((operation) => operation.key === 'suggestions:@');

    it('registers each search under one interaction key, the second query as request 2, and discards the superseded result', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@a');
        await advance(200);
        const first = searches();
        typeText(mounted.handle, 'd');
        await advance(200);
        const second = searches();
        pending[0]?.resolve(page([GRACE]));
        await flush();

        expect(first.map(({ request, service: member, featureId }) => ({ request, member, featureId }))).toEqual([
            { request: 1, member: 'references', featureId: 'mentions' },
        ]);
        expect(second.map(({ request }) => request)).toEqual([2]);
        expect(first[0]?.controller.signal.aborted).toBe(true);
        expect(mounted.diagnostics.map(({ code, details }) => [code, details])).toEqual([
            ['runtime.async-discarded', { reason: 'superseded' }],
        ]);
        expect(mounted.active()?.items).toEqual([]);
    });

    it('aborts only the search when services.references changes, with the same view and undo state', async () => {
        const { service, pending } = deferredService();
        const uploads = { upload: vi.fn(), releaseUnused: vi.fn() };
        const mounted = mountMentions({ services: { references: service, uploads } });
        typeText(mounted.handle, 'x @ad');
        await advance(200);
        const runtime = runtimeOf(mounted.handle);
        let upload: ReturnType<NonNullable<typeof runtime>['startAsync']> | undefined;
        act(() => {
            upload = runtime?.startAsync({
                key: 'upload',
                service: 'uploads',
                featureId: 'core',
                action: 'create',
                command: 'text.insert',
                run: () => new Promise(() => undefined),
            });
        });
        const undo = mounted.handle.query('history.undo');

        mounted.rerenderWith({ services: { references: deferredService().service, uploads } });
        pending[0]?.resolve(page([ADA]));
        await flush();

        expect(pending[0]?.context.signal.aborted).toBe(true);
        expect(upload?.controller.signal.aborted).toBe(false);
        expect(runtimeOf(mounted.handle)?.view).toBe(mounted.view);
        expect(mounted.handle.query('history.undo')).toEqual(undo);
        expect(mounted.active()?.items.map((item) => item.action)).toEqual(['retry']);
        expect(mounted.textOf()).toBe('x @ad');
    });

    it('changes nothing when a search from before a replacement resolves after it', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@ad');
        await advance(200);
        await act(async () => {
            await mounted.handle.replaceDocument({
                expected: mounted.handle.getSnapshot().stamp,
                next: {
                    documentId: 'document-2',
                    revision: null,
                    document: mounted.handle.getSnapshot().document,
                },
                unsaved: { action: 'discard', confirmed: true },
                selection: 'start',
                history: 'reset',
            });
        });
        const { document } = mounted.handle.getSnapshot();

        pending[0]?.resolve(page([ADA]));
        await flush();

        expect(mounted.handle.getSnapshot().document).toEqual(document);
        expect(mounted.active()).toBeNull();
        expect(pending[0]?.context.signal.aborted).toBe(true);
    });
});

describe('mentions on the clipboard', () => {
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

    it('copies a mention as @ and its label, with no chrome, contenteditable, nodeId or resource ID in the HTML', async () => {
        const mounted = mountMentions({
            blocks: [para(text('Ask '), mention('mention-7', 'Ada Lovelace', 'user-42'))],
        });
        await flush();

        const { html, text: plain } = copied(mounted);

        expect(mounted.view.dom.querySelectorAll('[data-rte-chrome]')).toHaveLength(1);
        expect(html).toBe(
            '<div class="fondue-rte-content"><p dir="auto">Ask <span data-mention="">@<bdi>Ada Lovelace</bdi></span></p></div>',
        );
        expect(html).not.toMatch(/contenteditable|data-rte-chrome|mention-7|user-42/);
        expect(plain).toBe('Ask @Ada Lovelace');
    });

    it('pastes the HTML a copied mention writes as its label text, creating no mention', async () => {
        const source = mountMentions({ blocks: [para(text('Ask '), mention('mention-7', 'Ada Lovelace', 'user-42'))] });
        await flush();
        const { html } = copied(source);
        const target = mountMentions();

        act(() => {
            paste(target.handle, { html });
        });

        expect(target.inline()).toEqual([text('Ask @Ada Lovelace')]);
    });

    it('pastes a mention from another context as its label text without bidirectional or control characters', async () => {
        const blocks = [para(text('Ask '), mention('mention-7', '\u202EAda\u202C Lovelace\u0007', 'user-42'))];
        const source = mountMentions({
            blocks,
            presentation: defineReactPresentation({ toolbar: [], sliceContext: 'a' }),
        });
        await flush();
        const clipboardData = new DataTransfer();
        act(() => {
            source.view.dispatch(source.view.state.tr.setSelection(new AllSelection(source.view.state.doc)));
            source.view.dom.dispatchEvent(
                new ClipboardEvent('copy', { clipboardData, bubbles: true, cancelable: true }),
            );
        });
        const target = mountMentions({ presentation: defineReactPresentation({ toolbar: [], sliceContext: 'b' }) });

        act(() => {
            paste(target.handle, {
                html: clipboardData.getData('text/html'),
                text: clipboardData.getData('text/plain'),
                slice: JSON.parse(clipboardData.getData(SLICE_TYPE)) as RichTextSlice,
            });
        });

        expect(target.inline()).toEqual([text('Ask Ada Lovelace')]);
    });
});
