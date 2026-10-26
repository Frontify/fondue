/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { checkHref, compileContentModel, type ContentNodeJSON, DefinitionError } from '#/model';
import urls from '#/model/__tests__/fixtures/urls.json';
import { links } from '#/plugins/Link/feature';
import { mountText, para, text, textFeatures, textModel } from '#/react/__tests__/fixtures/text';
import { runtimeOf } from '#/runtime/runtime';
import { pressKey, setSelection, typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
});

const model = (options?: Parameters<typeof links>[0]) => textModel([...textFeatures(), links(options)]);

const link = (href: string, extra: Readonly<Record<string, unknown>> = {}) => ({
    type: 'link',
    attrs: { href, openInNewWindow: false, styleId: null, ...extra },
});
const linked = (value: string, href: string, ...marks: readonly object[]): ContentNodeJSON =>
    ({ type: 'text', text: value, marks: [link(href), ...marks] }) as ContentNodeJSON;

type Handle = ReturnType<typeof mountText<ReturnType<typeof model>>>['handle'];
const blockOf = (handle: Handle, index = 0) => handle.getSnapshot().document.content.content?.[index]?.content;
const value = (href: string, extra: Readonly<Record<string, unknown>> = {}) => ({
    href,
    openInNewWindow: false,
    styleId: null,
    ...extra,
});
const undo = (handle: Handle) =>
    act(() => {
        handle.execute('history.undo');
    });
/** The position inside the last block of the document. */
const lastBlockStart = (handle: Handle) => {
    const doc = runtimeOf(handle)?.state.doc;

    return doc === undefined ? 0 : doc.content.size - 1;
};

type UrlFixture = {
    input: string;
    ok: boolean;
    href?: string;
};
const URLS = urls as readonly UrlFixture[];

describe('typing at links', () => {
    it('leaves text typed at the end of a link or of inline code without that mark', () => {
        const { handle } = mountText({
            model: textModel([...textFeatures(), links()]),
            blocks: [para(linked('go', 'https://frontify.com'), text(' and ')), para(text('x', 'code'))],
        });
        setSelection(handle, { text: 'go', from: 2, to: 2 });
        typeText(handle, 'ne');
        setSelection(handle, { text: 'x', from: 1, to: 1 });
        typeText(handle, 'y');

        expect(blockOf(handle)).toEqual([linked('go', 'https://frontify.com'), text('ne and ')]);
        expect(blockOf(handle, 1)).toEqual([text('x', 'code'), text('y')]);
    });

    it('keeps the link on text typed in the middle of it', () => {
        const { handle } = mountText({ model: model(), blocks: [para(linked('gone', 'https://frontify.com'))] });
        setSelection(handle, { text: 'gone', from: 2, to: 2 });
        typeText(handle, 'XY');

        expect(blockOf(handle)).toEqual([linked('goXYne', 'https://frontify.com')]);
    });

    it('keeps bold and the link when inline code is applied over them', () => {
        const { handle } = mountText({
            model: textModel([...textFeatures(), links()]),
            blocks: [para(linked('both', 'https://frontify.com', { type: 'bold' }))],
        });
        setSelection(handle, { text: 'both' });

        expect(handle.execute('mark.code.toggle').status).toBe('applied');
        const first = blockOf(handle)?.[0];
        const stored = first?.marks;
        const marks = stored?.map(({ type }) => type);
        expect(marks?.sort()).toEqual(['bold', 'code', 'link']);
    });
});

describe('link.set and link.remove', () => {
    it('edits the whole link from a caret in its middle and from a selection inside it', () => {
        const { handle } = mountText({
            model: model(),
            blocks: [para(text('Read '), linked('the guide', 'https://frontify.com/a'), text(' now'))],
        });
        setSelection(handle, { text: 'the guide', from: 4, to: 4 });

        expect(handle.execute('link.set', value('https://frontify.com/b')).status).toBe('applied');
        expect(blockOf(handle)).toEqual([text('Read '), linked('the guide', 'https://frontify.com/b'), text(' now')]);

        setSelection(handle, { text: 'the guide', from: 1, to: 3 });
        expect(handle.execute('link.set', value('https://frontify.com/c', { openInNewWindow: true })).status).toBe(
            'applied',
        );
        expect(blockOf(handle)).toEqual([
            text('Read '),
            { type: 'text', text: 'the guide', marks: [link('https://frontify.com/c', { openInNewWindow: true })] },
            text(' now'),
        ]);
    });

    it('inserts the visible text, or the URL when it is empty, as a linked run at a caret outside a link', () => {
        const { handle } = mountText({ model: model(), blocks: [para(text('ab'))] });
        setSelection(handle, { text: 'ab', from: 1, to: 1 });

        expect(handle.execute('link.set', value('https://frontify.com', { text: 'Frontify' })).status).toBe('applied');
        expect(blockOf(handle)).toEqual([text('a'), linked('Frontify', 'https://frontify.com'), text('b')]);

        setSelection(handle, { text: 'b', from: 1, to: 1 });
        expect(handle.execute('link.set', value('mailto:a@b.co', { text: '' })).status).toBe('applied');
        expect(blockOf(handle)?.at(-1)).toEqual(linked('mailto:a@b.co', 'mailto:a@b.co'));
    });

    it('removes the whole link from a caret inside it and keeps its text and other marks', () => {
        const { handle } = mountText({
            model: model(),
            blocks: [
                para(linked('one ', 'https://frontify.com'), linked('two', 'https://frontify.com', { type: 'bold' })),
            ],
        });
        setSelection(handle, { text: 'one', from: 1, to: 1 });

        expect(handle.execute('link.remove').status).toBe('applied');
        expect(blockOf(handle)).toEqual([text('one '), text('two', 'bold')]);
    });

    it('leaves one link per run when a link is set across part of another, with no nested anchors', () => {
        const { handle, view } = mountText({
            model: model(),
            blocks: [para(text('pre '), linked('linked', 'https://frontify.com/a'))],
        });
        act(() => {
            setSelection(handle, { text: 'pre link' });
        });

        expect(handle.execute('link.set', value('https://frontify.com/b')).status).toBe('applied');
        expect(blockOf(handle)).toEqual([
            linked('pre link', 'https://frontify.com/b'),
            linked('ed', 'https://frontify.com/a'),
        ]);
        expect(view.dom.querySelectorAll('a a')).toHaveLength(0);
        expect([...view.dom.querySelectorAll('a')].map((anchor) => anchor.getAttribute('href'))).toEqual([
            'https://frontify.com/b',
            'https://frontify.com/a',
        ]);
    });

    it('keeps inner marks when only the destination changes, and gives edited text the marks of the whole old text', () => {
        const mixed = mountText({
            model: model(),
            blocks: [
                para(
                    linked('a ', 'https://a.example'),
                    linked('b', 'https://a.example', { type: 'bold' }),
                    linked(' c', 'https://a.example'),
                ),
            ],
        });
        setSelection(mixed.handle, { text: 'a b c', from: 1, to: 1 });
        mixed.handle.execute('link.set', value('https://b.example', { text: 'a b c' }));

        expect(blockOf(mixed.handle)).toEqual([
            linked('a ', 'https://b.example'),
            linked('b', 'https://b.example', { type: 'bold' }),
            linked(' c', 'https://b.example'),
        ]);

        setSelection(mixed.handle, { text: 'a b c', from: 1, to: 1 });
        mixed.handle.execute('link.set', value('https://b.example', { text: 'new' }));
        expect(blockOf(mixed.handle)).toEqual([linked('new', 'https://b.example')]);
        mixed.unmount();

        const bold = mountText({
            model: model(),
            blocks: [para(linked('abc', 'https://a.example', { type: 'bold' }))],
        });
        setSelection(bold.handle, { text: 'abc', from: 1, to: 1 });
        bold.handle.execute('link.set', value('https://a.example', { text: 'xyz' }));

        expect(blockOf(bold.handle)).toEqual([linked('xyz', 'https://a.example', { type: 'bold' })]);
    });

    it('edits and removes the link whose trailing edge holds the caret', () => {
        const { handle } = mountText({
            model: model(),
            blocks: [para(text('Read '), linked('guide', 'https://frontify.com/a'), text(' now'))],
        });
        setSelection(handle, { text: 'guide', from: 5, to: 5 });

        expect(handle.execute('link.set', value('https://frontify.com/b')).status).toBe('applied');
        expect(blockOf(handle)).toEqual([text('Read '), linked('guide', 'https://frontify.com/b'), text(' now')]);

        setSelection(handle, { text: 'guide', from: 5, to: 5 });
        expect(handle.execute('link.remove').status).toBe('applied');
        expect(blockOf(handle)).toEqual([text('Read guide now')]);
    });

    it('replaces the text of a selection over runs with different marks, keeping only the marks over all of it', () => {
        const { handle } = mountText({
            model: model(),
            blocks: [para(text('a ', 'italic'), text('b', 'italic', 'bold'), text(' c', 'italic'))],
        });
        setSelection(handle, { text: 'a b c' });

        expect(handle.execute('link.set', value('https://frontify.com', { text: 'new' })).status).toBe('applied');
        expect(blockOf(handle)).toEqual([
            { type: 'text', text: 'new', marks: [link('https://frontify.com'), { type: 'italic' }] },
        ]);
    });

    it('keeps the text, its marks and a hard break when the visible text equals the selection text without the break', () => {
        const breakNode = { type: 'hard_break' } as ContentNodeJSON;
        const { handle } = mountText({ model: model(), blocks: [para(text('ab', 'bold'), breakNode, text('cd'))] });
        setSelection(handle, { text: 'ab\uFFFCcd' });

        expect(handle.execute('link.set', value('https://frontify.com', { text: 'abcd' })).status).toBe('applied');
        expect(blockOf(handle)).toEqual([
            linked('ab', 'https://frontify.com', { type: 'bold' }),
            { ...breakNode, marks: [link('https://frontify.com')] },
            linked('cd', 'https://frontify.com'),
        ]);
    });

    it('writes rel noopener on a link in the editor surface', () => {
        const { view } = mountText({ model: model(), blocks: [para(linked('guide', 'https://frontify.com'))] });

        expect(view.dom.querySelector('a')?.getAttribute('rel')).toBe('noopener');
    });

    it.each(URLS)('gives link.set the URL check verdict for $input', ({ input, ok, href }) => {
        const { handle } = mountText({ model: model(), blocks: [para(text('word'))] });
        setSelection(handle, { text: 'word' });
        const result = handle.execute('link.set', value(input));

        if (ok) {
            expect(result.status).toBe('applied');
            expect(blockOf(handle)).toEqual([linked('word', href ?? '')]);
        } else {
            expect(result).toMatchObject({ status: 'rejected', code: 'invalid-payload' });
            expect(blockOf(handle)).toEqual([text('word')]);
        }
    });
});

describe('link policy', () => {
    const MAILTO = 'mailto:a@b.co';
    const TEL = 'tel:+41445000000';

    it('narrows the URL check and never widens it', () => {
        expect(checkHref('javascript:alert(1)', { allowedSchemes: ['https'] })).toEqual({
            ok: false,
            code: 'unsafe-scheme',
        });
        const hosts = { allowedHosts: ['*.frontify.com'] };
        expect(checkHref('https://example.com', hosts)).toEqual({ ok: false, code: 'host-not-allowed' });
        for (const input of ['https://brand.frontify.com', '/guides', MAILTO, TEL]) {
            expect(checkHref(input, hosts)).toEqual({ ok: true, href: input });
        }

        for (const input of [MAILTO, TEL]) {
            expect(checkHref(input, { allowedSchemes: ['https'] })).toEqual({ ok: false, code: 'unsafe-scheme' });
        }
    });

    it('rejects allowedSchemes that list a scheme the default check refuses', () => {
        const unsafe = { allowedSchemes: ['javascript'] } as unknown as Parameters<typeof links>[0];

        expect(() => compileContentModel([...textFeatures(), links(unsafe)], { id: 'test', version: 1 })).toThrow(
            DefinitionError,
        );
    });

    it('keeps a stored link the policy refuses when the surface re-reads text typed inside it', async () => {
        const { handle, view } = mountText({
            model: model({ allowedHosts: ['*.frontify.com'] }),
            blocks: [para(text('Read '), linked('guide', 'https://example.com'))],
        });
        const anchor = view.dom.querySelector('a');
        const before = anchor?.previousSibling;
        if (anchor === null || before === null || before === undefined) {
            throw new Error('The link has no text before it in the surface.');
        }

        // Text typed on both sides of the link's start, which the view re-reads by parsing the link's element.
        before.textContent = 'Read X ';
        anchor.textContent = 'guiXde';
        // The view reads typed DOM through its observer, which the browser would run on the mutation.
        const observed = view as unknown as { domObserver: { flush(): void } };
        await act(async () => {
            observed.domObserver.flush();
            await Promise.resolve();
        });

        expect(blockOf(handle)).toEqual([text('Read X '), linked('guiXde', 'https://example.com')]);
    });

    it('applies allowedSchemes and allowedHosts to link.set and the autolink rule', () => {
        const { handle } = mountText({
            model: model({ allowedSchemes: ['https'], allowedHosts: ['*.frontify.com'] }),
            blocks: [para(text('word'))],
        });
        setSelection(handle, { text: 'word' });

        for (const input of ['https://example.com', MAILTO, 'javascript:alert(1)']) {
            expect(handle.execute('link.set', value(input))).toMatchObject({
                status: 'rejected',
                code: 'invalid-payload',
            });
        }

        expect(handle.execute('link.set', value('https://brand.frontify.com')).status).toBe('applied');

        setSelection(handle, { text: 'word', from: 4, to: 4 });
        typeText(handle, ' https://example.com ');
        expect(blockOf(handle)?.at(-1)).toEqual(text(' https://example.com '));
    });
});

describe('link.autolink', () => {
    it('links an absolute URL followed by a space, keeping the space outside the link', () => {
        const { handle } = mountText({ model: model(), blocks: [para()] });
        typeText(handle, 'See https://frontify.com ');

        expect(blockOf(handle)).toEqual([
            text('See '),
            linked('https://frontify.com', 'https://frontify.com'),
            text(' '),
        ]);
    });

    it('links a URL that Enter ends, through its own undo step before the split', () => {
        const { handle } = mountText({ model: model(), blocks: [para()] });
        typeText(handle, 'mailto:a@b.co');
        act(() => pressKey(handle, 'Enter'));

        expect(handle.getSnapshot().document.content.content).toHaveLength(2);
        expect(blockOf(handle)).toEqual([linked('mailto:a@b.co', 'mailto:a@b.co')]);

        undo(handle);
        expect(handle.getSnapshot().document.content.content).toHaveLength(1);
        expect(blockOf(handle)).toEqual([linked('mailto:a@b.co', 'mailto:a@b.co')]);
        undo(handle);
        expect(blockOf(handle)).toEqual([text('mailto:a@b.co')]);
    });

    it('never links inside inline code, a relative reference or text already linked', () => {
        const { handle } = mountText({
            model: model(),
            blocks: [para(text('xy', 'code')), para(linked('see', 'https://a.example')), para()],
        });
        setSelection(handle, { text: 'xy', from: 1, to: 1 });
        typeText(handle, 'https://frontify.com ');
        setSelection(handle, { text: 'see', from: 1, to: 1 });
        typeText(handle, 'https://frontify.com ');
        act(() => runtimeOf(handle)?.select({ anchor: lastBlockStart(handle), head: lastBlockStart(handle) }));
        typeText(handle, '/guides ');

        expect(blockOf(handle, 0)).toEqual([text('xhttps://frontify.com y', 'code')]);
        expect(blockOf(handle, 1)).toEqual([linked('shttps://frontify.com ee', 'https://a.example')]);
        expect(blockOf(handle, 2)).toEqual([text('/guides ')]);
    });

    it('removes the link and keeps the typed text and the space when Backspace follows the rule', () => {
        const { handle } = mountText({ model: model(), blocks: [para()] });
        typeText(handle, 'https://frontify.com ');
        act(() => pressKey(handle, 'Backspace'));

        expect(blockOf(handle)).toEqual([text('https://frontify.com ')]);
    });

    it('takes two undo steps after the rule: the link, then the typed text, and a character typed after it is its own step', () => {
        const { handle } = mountText({ model: model(), blocks: [para()] });
        typeText(handle, 'https://frontify.com ');
        typeText(handle, 'x');

        undo(handle);
        expect(blockOf(handle)).toEqual([linked('https://frontify.com', 'https://frontify.com'), text(' ')]);
        undo(handle);
        expect(blockOf(handle)).toEqual([text('https://frontify.com ')]);
        undo(handle);
        expect(blockOf(handle)).toBeUndefined();
    });

    it.each([
        ['on', undefined, undefined, true],
        ['excluded through inputRules', { exclude: ['link.autolink'] }, undefined, false],
        [
            'forbidden by the policy',
            undefined,
            { features: { links: { create: false, edit: true, remove: true, paste: true } } },
            false,
        ],
    ] as const)('fires only when the rule is %s', (_name, rules, policy, fires) => {
        const options = { model: model(), blocks: [para()] };
        if (rules !== undefined) {
            Object.assign(options, { inputRules: rules });
        }

        if (policy !== undefined) {
            Object.assign(options, { policy });
        }

        const { handle } = mountText(options);
        typeText(handle, 'https://frontify.com ');

        expect(JSON.stringify(blockOf(handle))).toBe(
            JSON.stringify(
                fires
                    ? [linked('https://frontify.com', 'https://frontify.com'), text(' ')]
                    : [text('https://frontify.com ')],
            ),
        );
    });

    it('keeps the typed URL when the model has no links feature', () => {
        const { handle } = mountText({ model: textModel(), blocks: [para()] });
        typeText(handle, 'https://frontify.com ');

        expect(blockOf(handle)).toEqual([text('https://frontify.com ')]);
    });
});

describe('link.edit key', () => {
    it.each([
        ['an Apple platform', 'MacIntel', { metaKey: true }, { ctrlKey: true }],
        ['another platform', 'Win32', { ctrlKey: true }, { metaKey: true }],
    ] as const)(
        'opens the link popover with its own Mod+K on %s, and not with the other platform keys',
        (_name, platform, own, other) => {
            vi.stubGlobal('navigator', Object.create(navigator, { platform: { value: platform } }));
            const { view } = mountText({ model: model(), blocks: [para(text('ab'))] });
            const press = (modifiers: object) =>
                act(() => {
                    view.dom.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'k', bubbles: true, cancelable: true, ...modifiers }),
                    );
                    vi.advanceTimersToNextFrame();
                });

            press(other);
            expect(document.querySelector('[data-test-id$="-link-popover"]')).toBeNull();
            press(own);
            expect(document.querySelector('[data-test-id$="-link-popover"]')).not.toBeNull();
        },
    );
});
