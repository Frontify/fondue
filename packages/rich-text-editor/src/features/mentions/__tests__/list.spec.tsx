/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { pressKey, typeText } from '#/testing';

import { ADA, advance, deferredService, DESIGN, flush, GRACE, mountMentions, page } from './fixtures/mount';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
});

/** Every text the editor's live region is given from now on, in order, without the clears before each message. */
const announcements = () => {
    const region = screen.getByTestId('fondue-rich-text-editor-announcer');
    const spoken: string[] = [];
    const append = region.append.bind(region);
    region.append = (...nodes) => {
        for (const node of nodes) {
            if (typeof node === 'string') {
                spoken.push(node);
            } else {
                spoken.push(node.textContent ?? '');
            }
        }
        append(...nodes);
    };
    return spoken;
};

const listbox = () => screen.queryByRole('listbox', { name: 'Mention suggestions' });
const rowOf = (name: string) => document.querySelector(`[data-row="${name}"]`);

describe('mention suggestion list', () => {
    it('shows and announces loading, results, a refinement, no results and a failure as the Mention states table lists', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        const spoken = announcements();

        typeText(mounted.handle, '@');
        await advance(299);
        expect(rowOf('loading')).toBeNull();
        await advance(1);
        expect(rowOf('loading')?.textContent).toBe('Searching…');
        expect(spoken).toEqual([]);

        pending[0]?.resolve(page([ADA, GRACE, DESIGN]));
        await flush();
        expect(within(listbox() as HTMLElement).getAllByRole('option')).toHaveLength(3);
        expect(spoken).toEqual(['Results: 3. Ada Lovelace, user, 1 of 3']);

        typeText(mounted.handle, 'a');
        await advance(200);
        expect(spoken).toHaveLength(1);
        pending[1]?.resolve(page([ADA]));
        await flush();
        expect(within(listbox() as HTMLElement).getAllByRole('option')).toHaveLength(1);

        typeText(mounted.handle, 'z');
        await advance(200);
        pending[2]?.resolve(page([]));
        await flush();
        expect(rowOf('empty')?.textContent).toBe('No results');
        expect(listbox()).toBeNull();

        typeText(mounted.handle, 'q');
        await advance(200);
        pending[3]?.reject(new Error('offline'));
        await flush();
        expect(rowOf('failed')?.textContent).toBe('Search failed');
        expect(within(listbox() as HTMLElement).getByRole('option', { name: 'Retry' })).toBeDefined();

        expect(spoken).toEqual([
            'Results: 3. Ada Lovelace, user, 1 of 3',
            'Results: 1. Ada Lovelace, user, 1 of 1',
            'No results',
            'Search failed. Retry, 1 of 1',
        ]);
    });

    it('announces the active option with its place and type whenever it changes, after the status of each answer', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        const spoken = announcements();
        typeText(mounted.handle, '@');
        await advance(200);
        pending[0]?.resolve(page([{ ...DESIGN, resourceType: 'user', kind: 'user' }, DESIGN], 'page-2'));
        await flush();

        pressKey(mounted.handle, 'ArrowDown');
        await flush();
        pressKey(mounted.handle, 'ArrowDown');
        await flush();
        pressKey(mounted.handle, 'Enter');
        pending[1]?.resolve(page([GRACE]));
        await flush();

        expect(spoken).toEqual([
            'Results: 2. Design team, user, 1 of 2',
            'Design team, group, 2 of 2',
            'Load more, 3 of 3',
            'Results: 3. Grace Hopper, user, 3 of 3',
        ]);
    });

    it('announces the active option the arrows land on while a refined query loads, and not the start of the load', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        const spoken = announcements();
        typeText(mounted.handle, '@');
        await advance(200);
        pending[0]?.resolve(page([ADA, GRACE, DESIGN]));
        await flush();

        typeText(mounted.handle, 'e');
        await flush();
        expect(mounted.active()?.status).toBe('loading');
        pressKey(mounted.handle, 'ArrowDown');
        await flush();

        expect(spoken).toEqual(['Results: 3. Ada Lovelace, user, 1 of 3', 'Grace Hopper, user, 2 of 3']);
    });

    it('shows only an absolute https avatar, without sending a referrer, and the icon for a relative or http one', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@');
        await advance(200);
        pending[0]?.resolve(
            page([
                { ...ADA, imageUrl: 'https://cdn.example.com/ada.png' },
                { ...GRACE, imageUrl: '/api/export' },
                { ...DESIGN, imageUrl: 'http://cdn.example.com/team.png' },
            ]),
        );
        await flush();
        const options = within(listbox() as HTMLElement).getAllByRole('option');

        expect(options.map((option) => option.querySelector('img')?.getAttribute('src') ?? null)).toEqual([
            'https://cdn.example.com/ada.png',
            null,
            null,
        ]);
        const firstImage = options[0]?.querySelector('img');
        expect(firstImage?.getAttribute('referrerpolicy')).toBe('no-referrer');
        expect(mounted.active()?.items.map((item) => item.imageUrl)).toEqual([
            'https://cdn.example.com/ada.png',
            undefined,
            undefined,
        ]);
    });

    it('shows a safe avatar, the group icon without one, drops a javascript: image, and stores neither on the mention', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@');
        await advance(200);
        pending[0]?.resolve(
            page([
                { ...ADA, imageUrl: 'https://cdn.example.com/ada.png', kind: 'user' },
                DESIGN,
                { ...GRACE, imageUrl: 'javascript:alert(1)', kind: 'everyone' },
            ]),
        );
        await flush();
        const [ada, design, grace] = within(listbox() as HTMLElement).getAllByRole('option');

        const adaImage = ada?.querySelector('img');
        const designKind = design?.querySelector('[data-kind]');
        const graceKind = grace?.querySelector('[data-kind]');
        expect(adaImage?.getAttribute('src')).toBe('https://cdn.example.com/ada.png');
        expect(design?.querySelector('img')).toBeNull();
        expect(designKind?.getAttribute('data-kind')).toBe('group');
        expect(grace?.querySelector('img')).toBeNull();
        expect(graceKind?.getAttribute('data-kind')).toBe('everyone');
        expect(document.body.innerHTML).not.toContain('javascript:');

        pressKey(mounted.handle, 'Enter');
        const inserted = mounted.inline().find((node) => node.type === 'mention');
        expect(inserted?.attrs).not.toHaveProperty('imageUrl');
        expect(inserted?.attrs).not.toHaveProperty('kind');
    });

    it('wraps each option label in exactly one bdi, a Hebrew name among English ones', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@');
        await advance(200);
        const hebrew = { resourceType: 'user', resourceId: 'user-3', labelSnapshot: 'דנה לוי' };
        pending[0]?.resolve(page([ADA, hebrew, GRACE]));
        await flush();
        const options = within(listbox() as HTMLElement).getAllByRole('option');

        for (const [index, label] of ['Ada Lovelace', 'דנה לוי', 'Grace Hopper'].entries()) {
            const bdis = options[index]?.querySelectorAll('bdi');
            const isolated = [...(bdis ?? [])].filter((element) => element.textContent === label);
            expect(isolated).toHaveLength(1);
            expect(isolated[0]?.querySelector('bdi')).toBeNull();
        }
        expect(mounted.active()?.items).toHaveLength(3);
    });

    it('isolates a Hebrew option label in one bdi of the English announcement', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@');
        await advance(200);
        const hebrew = { resourceType: 'user', resourceId: 'user-3', labelSnapshot: 'דנה לוי' };
        pending[0]?.resolve(page([hebrew, ADA]));
        await flush();
        const region = screen.getByTestId('fondue-rich-text-editor-announcer');

        expect(region.textContent).toBe('Results: 2. דנה לוי, user, 1 of 2');
        expect([...region.querySelectorAll('bdi')].map((element) => element.textContent)).toEqual(['דנה לוי']);
    });

    it('ends the list with a Load more option, which a click answers with the next page', async () => {
        const { service, search, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@');
        await advance(200);
        pending[0]?.resolve(page([ADA], 'page-2'));
        await flush();
        const more = within(listbox() as HTMLElement)
            .getAllByRole('option')
            .at(-1) as HTMLElement;

        expect(more.textContent).toBe('Load more');
        act(() => {
            fireEvent.click(more);
        });
        expect(search.mock.calls[1]?.[0]).toMatchObject({ cursor: 'page-2' });
        pending[1]?.resolve(page([GRACE]));
        await flush();

        expect(
            within(listbox() as HTMLElement)
                .getAllByRole('option')
                .map((option) => option.textContent),
        ).toEqual(['Ada Lovelaceuser', 'Grace Hopperuser']);
    });

    it('keeps the mention list open across ten minutes with no close reported', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@');
        await advance(200);
        pending[0]?.resolve(page([ADA]));
        await flush();

        act(() => {
            vi.advanceTimersByTime(10 * 60 * 1000);
        });

        expect(listbox()).not.toBeNull();
        expect(mounted.active()?.items).toHaveLength(1);
    });
});
