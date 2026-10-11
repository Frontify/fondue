/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { setSelection } from '#/testing';

import { ADA, advance, deferredService, flush, GRACE, mountMentions, page, para, text } from './fixtures/mount';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
});

const field = () => screen.getByRole('combobox', { name: 'Search to mention' });
const press = (key: string) =>
    act(() => {
        fireEvent.keyDown(field(), { key });
    });

describe('mention search dialog', () => {
    it('inserts the result chosen by keyboard as a mention at the target captured when it opened', async () => {
        const { service, search, pending } = deferredService();
        const mounted = mountMentions({
            blocks: [para(text('Hi there')), para(text('Elsewhere'))],
            services: { references: service },
            toolbar: [['mention.search.open']],
        });
        setSelection(mounted.handle, { text: 'Hi there', from: 3, to: 3 });
        act(() => {
            mounted.handle.execute('mention.search.open');
        });
        await flush();

        expect(screen.getByRole('dialog', { name: 'Mention' })).toBeDefined();
        setSelection(mounted.handle, { text: 'Elsewhere', from: 0, to: 0 });
        act(() => {
            fireEvent.change(field(), { target: { value: 'ho' } });
        });
        await advance(200);
        expect(search.mock.calls.at(-1)?.[0]).toEqual({ query: 'ho', resourceTypes: [], cursor: null });
        pending.at(-1)?.resolve(page([ADA, GRACE]));
        await flush();
        const options = within(screen.getByRole('listbox', { name: 'Mention suggestions' })).getAllByRole('option');
        expect(options).toHaveLength(2);

        press('ArrowDown');
        expect(field().getAttribute('aria-activedescendant')).toBe(options[1]?.id);
        press('Enter');
        await flush();

        expect(screen.queryByRole('dialog')).toBeNull();
        const [first, second] = mounted.blocksOf();
        expect(first?.content?.map((node) => node.type)).toEqual(['text', 'mention', 'text']);
        expect(first?.content?.[0]).toEqual(text('Hi '));
        expect(first?.content?.[1]?.attrs).toMatchObject({ resourceId: 'user-2', labelSnapshot: 'Grace Hopper' });
        expect(first?.content?.[2]).toEqual(text(' there'));
        expect(second).toEqual(para(text('Elsewhere')));
    });

    it('closes on Escape with no change and aborts its search', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        act(() => {
            mounted.handle.execute('mention.search.open');
        });
        await flush();
        await advance(200);
        const before = mounted.handle.getSnapshot().document;

        act(() => {
            fireEvent.keyDown(field(), { key: 'Escape' });
        });
        pending[0]?.resolve(page([ADA]));
        await flush();

        expect(screen.queryByRole('dialog')).toBeNull();
        expect(pending[0]?.context.signal.aborted).toBe(true);
        expect(mounted.handle.getSnapshot().document).toEqual(before);
    });

    /** Every text the dialog's status region is given once it exists, without the clears before each message. */
    const statusWrites = () => {
        const region = within(screen.getByRole('dialog')).getByRole('status');
        const written: string[] = [];
        const descriptor = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
        Object.defineProperty(region, 'textContent', {
            configurable: true,
            get: () => descriptor?.get?.call(region) as string,
            set: (value: string) => {
                if (value !== '') {
                    written.push(value);
                }
                descriptor?.set?.call(region, value);
            },
        });
        return written;
    };
    const type = (value: string) =>
        act(() => {
            fireEvent.change(field(), { target: { value } });
        });
    const openDialog = async (mounted: ReturnType<typeof mountMentions>) => {
        act(() => {
            mounted.handle.execute('mention.search.open');
        });
        await flush();
    };

    it('announces the active option with its place and type after each answer and each arrow, Retry and Load more included', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        await openDialog(mounted);
        const written = statusWrites();
        type('a');
        await advance(200);
        pending.at(-1)?.resolve(page([ADA, GRACE], 'page-2'));
        await flush();
        press('ArrowDown');
        press('ArrowDown');
        type('ab');
        await advance(200);
        pending.at(-1)?.reject(new Error('offline'));
        await flush();

        expect(written).toEqual([
            'Results: 2. Ada Lovelace, user, 1 of 2',
            'Grace Hopper, user, 2 of 2',
            'Load more, 3 of 3',
            'Search failed. Retry, 1 of 1',
        ]);
    });

    it('announces the active option the arrows land on while a refined query loads', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        await openDialog(mounted);
        const written = statusWrites();
        type('a');
        await advance(200);
        pending.at(-1)?.resolve(page([ADA, GRACE]));
        await flush();

        type('ab');
        press('ArrowDown');

        expect(written).toEqual(['Results: 2. Ada Lovelace, user, 1 of 2', 'Grace Hopper, user, 2 of 2']);
    });

    it('names and inserts the same person after Load more answers with an empty last page', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        await openDialog(mounted);
        const written = statusWrites();
        type('a');
        await advance(200);
        pending.at(-1)?.resolve(page([ADA], 'page-2'));
        await flush();
        press('ArrowDown');
        press('Enter');
        pending.at(-1)?.resolve(page([]));
        await flush();

        expect(written.at(-1)).toBe('Results: 1. Ada Lovelace, user, 1 of 1');
        press('Enter');
        await flush();

        expect(screen.queryByRole('dialog')).toBeNull();
        expect(mounted.inline().find((node) => node.type === 'mention')?.attrs?.labelSnapshot).toBe('Ada Lovelace');
    });

    it('announces a repeated status again after each completed search', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        await openDialog(mounted);
        const written = statusWrites();
        type('zz');
        await advance(200);
        pending.at(-1)?.resolve(page([]));
        await flush();
        type('zzz');
        await advance(200);
        pending.at(-1)?.resolve(page([]));
        await flush();

        expect(written.map((value) => value.trim())).toEqual(['No results', 'No results']);
        expect(written[0]).not.toBe(written[1]);
    });

    it('consumes the Enter that confirms a composition while no option shows, so the next Enter chooses', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        await openDialog(mounted);
        type('ad');
        act(() => {
            fireEvent.compositionEnd(field());
        });
        press('Enter');
        await advance(200);
        pending.at(-1)?.resolve(page([ADA]));
        await flush();

        press('Enter');
        await flush();

        expect(screen.queryByRole('dialog')).toBeNull();
        expect(mounted.inline().some((node) => node.type === 'mention')).toBe(true);
    });
});
