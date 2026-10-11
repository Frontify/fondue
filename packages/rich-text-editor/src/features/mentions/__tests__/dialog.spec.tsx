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
});
