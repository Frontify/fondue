/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { core, mentions } from '#/features';
import { suggestionOptionId } from '#/runtime/capabilities/suggestions/option-id';
import { pressKey, setSelection, typeText } from '#/testing';

import {
    ADA,
    advance,
    deferredService,
    flush,
    GRACE,
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

const person = (index: number) => ({
    resourceType: 'user',
    resourceId: `user-${index}`,
    labelSnapshot: `Person ${index}`,
});
const people = (from: number, count: number) => Array.from({ length: count }, (_, index) => person(from + index));

describe('mention triggers and queries', () => {
    it.each([
        ['an @ inside the query', 'Ann user@host'],
        ['an email address', 'ada@frontify.com'],
    ])('keeps the list open and its search alive for %s', async (_name, query) => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, `@${query}`);
        await advance(200);

        expect(mounted.active()?.query).toBe(query);
        expect(pending).toHaveLength(1);
        expect(pending[0]?.request.query).toBe(query);
        expect(pending[0]?.context.signal.aborted).toBe(false);
    });

    it('takes a 50-character query after a two-character trigger that follows other text', () => {
        const { service } = deferredService();
        const mounted = mountMentions({
            model: mentionModel([core(), mentions({ trigger: '[[' })]),
            blocks: [para(text('See '))],
            services: { references: service },
        });
        setSelection(mounted.handle, { text: 'See ', from: 4, to: 4 });
        typeText(mounted.handle, `[[${'a'.repeat(50)}`);

        expect(mounted.active()?.query).toHaveLength(50);
        typeText(mounted.handle, 'a');
        expect(mounted.active()).toBeNull();
    });
});

describe('the mention search session', () => {
    it('lets the list and the search dialog search at once without cancelling each other', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@ad');
        await advance(200);
        act(() => {
            mounted.handle.execute('mention.search.open');
        });
        await flush();
        await advance(200);

        expect(pending).toHaveLength(2);
        expect(pending[0]?.context.signal.aborted).toBe(false);
        pending[0]?.resolve(page([ADA]));
        pending[1]?.resolve(page([GRACE]));
        await flush();
        expect(mounted.active()).toMatchObject({ status: 'ready', query: 'ad' });
        expect(mounted.active()?.items.map((item) => item.label)).toEqual(['Ada Lovelace']);
    });

    it.each([
        [
            'a page whose items throw on access',
            () =>
                Object.defineProperty({}, 'items', {
                    get: () => {
                        throw new Error('hostile');
                    },
                }),
        ],
        [
            'a page whose item fields throw on access',
            () =>
                page([
                    Object.defineProperty({ resourceType: 'user' }, 'resourceId', {
                        get: () => {
                            throw new Error('hostile');
                        },
                    }),
                ]),
        ],
    ])('fails the search and offers Retry for %s', async (_name, hostile) => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@ad');
        await advance(200);
        pending[0]?.resolve(hostile());
        await flush();

        expect(mounted.active()?.status).toBe('failed');
        expect(mounted.active()?.items.map((item) => item.action)).toEqual(['retry']);
    });

    it('keeps at most 50 options of a page, and drops a next cursor longer than 1,024 characters', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@');
        await advance(200);
        pending[0]?.resolve(page(people(0, 20_000), 'x'.repeat(1025)));
        await flush();

        expect(mounted.active()?.items).toHaveLength(50);
        expect(mounted.active()?.items.some((item) => item.action === 'more')).toBe(false);
    });

    it('keeps at most 200 options across Load more and offers no further page once full', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@');
        await advance(200);
        for (let index = 0; index < 5; index += 1) {
            pending[index]?.resolve(page(people(index * 50, 50), `page-${index + 1}`));
            await flush();
            const activeItems = mounted.active()?.items;
            const items = activeItems ?? [];
            const more = items.findIndex((item) => item.action === 'more');
            if (more < 0) {
                break;
            }
            const activeIndex = mounted.active()?.index;
            for (let step = activeIndex ?? 0; step < more; step += 1) {
                pressKey(mounted.handle, 'ArrowDown');
            }
            pressKey(mounted.handle, 'Enter');
        }

        expect(mounted.active()?.items).toHaveLength(200);
        expect(mounted.active()?.items.every((item) => item.action === undefined)).toBe(true);
        expect(pending).toHaveLength(4);
    });

    it('strips bidirectional controls from result labels, in the option and in the stored mention', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@');
        await advance(200);
        pending[0]?.resolve(page([{ ...ADA, labelSnapshot: '\u202EAda\u202C Lovelace\u200E' }]));
        await flush();

        expect(mounted.active()?.items.map((item) => item.label)).toEqual(['Ada Lovelace']);
        pressKey(mounted.handle, 'Enter');
        const [mention] = mounted.inline();
        const attrs = mention?.attrs;
        expect(attrs?.labelSnapshot).toBe('Ada Lovelace');
    });

    it('drops results whose resource ID holds a bidirectional or control character, keeping the IDs it stores as given', async () => {
        const { service, pending } = deferredService();
        const mounted = mountMentions({ services: { references: service } });
        typeText(mounted.handle, '@');
        await advance(200);
        pending[0]?.resolve(
            page([
                { ...ADA, resourceId: 'ada\u200E' },
                { ...ADA, resourceId: 'ada\u0007' },
                { ...GRACE, resourceId: 'grace-\u00E9' },
            ]),
        );
        await flush();

        expect(mounted.active()?.items.map((item) => item.payload.resourceId)).toEqual(['grace-\u00E9']);
    });

    it('gives options with different keys different ids', () => {
        const keys = [':a', '3aa', '_3a_a', 'a:user', 'a3auser', 'a', 'user', 'user:a', 'user-a', 'user_a'];
        const ids = keys.map((key) => suggestionOptionId('list', key));

        expect(new Set(ids).size).toBe(keys.length);
        expect(ids.every((id) => /^[\w-]+$/.test(id))).toBe(true);
    });
});
