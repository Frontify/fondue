/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defineReactPresentation } from '#/entries/authoring';
import { mountProfile } from '#/react/__tests__/fixtures/profiles';
import { activeSuggestion } from '#/runtime/capabilities/suggestions/plugin';
import { pressKey, typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

type Mounted = Awaited<ReturnType<typeof mountProfile>>;

const mount = async (...given: Parameters<typeof mountProfile>) => {
    const mounted = await mountProfile(...given);
    act(() => {
        vi.advanceTimersToNextFrame();
    });

    return mounted;
};

/** The list once its search has answered, as `group: label` lines. */
const listed = async ({ view }: Mounted) => {
    await vi.waitFor(() => {
        expect(activeSuggestion(view.state)?.status).toBe('ready');
    });

    return (activeSuggestion(view.state)?.items ?? []).map((item) => `${item.group}: ${item.label}`);
};

const settled = async ({ view }: Mounted) => {
    await vi.waitFor(() => {
        expect(activeSuggestion(view.state)?.status).toBe('ready');
    });
};

// Normal text is missing because the paragraph already is one, so its command applies to nothing.
const TURN_INTO = [
    'Turn into: Heading 1',
    'Turn into: Heading 2',
    'Turn into: Heading 3',
    'Turn into: Heading 4',
    'Turn into: Heading 5',
    'Turn into: Heading 6',
    'Turn into: Quote',
    'Turn into: Code block',
    'Turn into: Bulleted list',
    'Turn into: Numbered list',
    'Turn into: Task list',
];

describe('the slash menu', () => {
    it('lists Turn into and Insert for the installed features in the Document profile', async () => {
        const mounted = await mount('document');
        typeText(mounted.handle, '/');

        expect(await listed(mounted)).toEqual([...TURN_INTO, 'Insert: Divider', 'Insert: Image']);
    });

    it('adds the column break in the Brand document profile', async () => {
        const mounted = await mount('brand-document', {
            presentation: defineReactPresentation({ toolbar: [], columns: 2 }),
        });
        typeText(mounted.handle, '/');

        expect(await listed(mounted)).toEqual([
            ...TURN_INTO,
            'Insert: Divider',
            'Insert: Image',
            'Insert: Column break',
        ]);
    });

    it.each(['inline', 'comment'] as const)('opens no list in the %s profile', async (profile) => {
        const mounted = await mount(profile);
        typeText(mounted.handle, '/');
        await act(async () => {
            await vi.advanceTimersByTimeAsync(500);
        });

        expect(activeSuggestion(mounted.view.state)).toBeNull();
    });

    it('opens only at the start of an empty paragraph', async () => {
        const mid = await mount('document');
        typeText(mid.handle, 'a/');
        const after = await mount('document');
        typeText(after.handle, 'a /');
        await act(async () => {
            await vi.advanceTimersByTimeAsync(500);
        });

        expect(activeSuggestion(mid.view.state)).toBeNull();
        expect(activeSuggestion(after.view.state)).toBeNull();
    });

    it('narrows by label as the author types, and keeps the group headings of what is left', async () => {
        const mounted = await mount('document');
        typeText(mounted.handle, '/head');

        expect(await listed(mounted)).toEqual(TURN_INTO.slice(0, 6));

        typeText(mounted.handle, 'ing 2');
        await vi.waitFor(() => {
            expect(activeSuggestion(mounted.view.state)?.items.map((item) => item.label)).toEqual(['Heading 2']);
        });
    });

    it('matches the group of Insert by its entries', async () => {
        const mounted = await mount('document');
        typeText(mounted.handle, '/div');

        expect(await listed(mounted)).toEqual(['Insert: Divider']);
    });

    it('offers only the heading levels the policy offers, and no feature the policy forbids creating', async () => {
        const mounted = await mount('document');
        act(() => {
            mounted.handle.updatePolicy({
                creatableHeadingLevels: [1, 2],
                features: { 'blocks.rule': { create: false, edit: true, remove: true, paste: false } },
                enterBehavior: 'paragraph',
            });
        });
        typeText(mounted.handle, '/');

        expect(await listed(mounted)).toEqual([
            'Turn into: Heading 1',
            'Turn into: Heading 2',
            'Turn into: Quote',
            'Turn into: Code block',
            'Turn into: Bulleted list',
            'Turn into: Numbered list',
            'Turn into: Task list',
            'Insert: Image',
        ]);
    });

    it('turns the paragraph into the chosen heading on Enter, removing /head, as one undo step', async () => {
        const mounted = await mount('document');
        typeText(mounted.handle, '/head');
        await settled(mounted);
        pressKey(mounted.handle, 'ArrowDown');

        pressKey(mounted.handle, 'Enter');

        expect(activeSuggestion(mounted.view.state)).toBeNull();
        expect(JSON.stringify(mounted.content())).toContain('"type":"heading"');
        expect(JSON.stringify(mounted.content())).toContain('"level":2');
        expect(JSON.stringify(mounted.content())).not.toContain('/head');

        pressKey(mounted.handle, 'Mod-z');

        expect(JSON.stringify(mounted.content())).toContain('/head');
        expect(JSON.stringify(mounted.content())).not.toContain('"type":"heading"');
    });

    it('runs the chosen Insert entry on Tab, removing /div', async () => {
        const mounted = await mount('document');
        typeText(mounted.handle, '/div');
        await settled(mounted);

        pressKey(mounted.handle, 'Tab');

        const json = JSON.stringify(mounted.content());
        expect(json.match(/horizontal_rule/gu)).toHaveLength(1);
        expect(json).not.toContain('/div');
    });

    it('closes on Escape and keeps the text', async () => {
        const mounted = await mount('document');
        typeText(mounted.handle, '/head');
        await settled(mounted);

        pressKey(mounted.handle, 'Escape');

        expect(activeSuggestion(mounted.view.state)).toBeNull();
        expect(JSON.stringify(mounted.content())).toContain('/head');
    });

    it('closes on a space with no match, keeping the text, and stays open on a space with a match', async () => {
        const matching = await mount('document');
        typeText(matching.handle, '/heading ');
        await settled(matching);
        const none = await mount('document');
        typeText(none.handle, '/zzz');
        await settled(none);
        typeText(none.handle, ' ');
        await vi.waitFor(() => {
            expect(activeSuggestion(none.view.state)).toBeNull();
        });

        expect(activeSuggestion(matching.view.state)?.items.length).toBeGreaterThan(0);
        expect(JSON.stringify(none.content())).toContain('/zzz ');
    });

    it('announces the result count', async () => {
        const mounted = await mount('document');
        typeText(mounted.handle, '/div');
        await settled(mounted);

        await vi.waitFor(() => {
            expect(mounted.announced()).toContain('Results: 1');
        });
    });
});
