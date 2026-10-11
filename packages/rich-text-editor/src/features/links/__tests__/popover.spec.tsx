/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { links } from '#/features/links/feature';
import {
    defineEditor,
    defineReactPresentation,
    type EditorHandle,
    type PresentationStyle,
    type ReferenceService,
    RichTextEditor,
} from '#/index';
import { type ContentNodeJSON } from '#/model';
import { para, storedIn, text, textFeatures, textModel } from '#/react/__tests__/fixtures/text';
import { type ReferenceValue } from '#/runtime/types';
import { setSelection } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const link = (href: string, extra: Readonly<Record<string, unknown>> = {}) => ({
    type: 'link',
    attrs: { href, openInNewWindow: false, styleId: null, ...extra },
});
const linked = (value: string, href: string, extra: Readonly<Record<string, unknown>> = {}): ContentNodeJSON =>
    ({ type: 'text', text: value, marks: [link(href, extra)] }) as ContentNodeJSON;

const BUTTON_STYLES = ['primary', 'secondary', 'tertiary'].map(
    (name): PresentationStyle => ({
        id: `brand.${name}`,
        label: `Button ${name}`,
        appliesTo: ['link'],
        deprecated: false,
        recipe: { fontWeight: '600' },
    }),
);

interface Mount {
    readonly blocks: readonly ContentNodeJSON[];
    readonly options?: Parameters<typeof links>[0];
    readonly styles?: readonly PresentationStyle[];
    readonly references?: ReferenceService;
}

const mount = ({ blocks, options, styles = [], references }: Mount) => {
    const model = textModel([...textFeatures(), links(options)]);
    const ref = createRef<EditorHandle>();
    const rendered = render(
        <RichTextEditor
            aria-label="Notes"
            definition={defineEditor({ id: 'test.links', model })}
            presentation={defineReactPresentation({ styles: [...styles] })}
            defaultValue={{ documentId: 'document-1', revision: null, document: storedIn(model, blocks) }}
            {...(references === undefined ? {} : { services: { references } })}
            ref={ref}
        />,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const handle = ref.current;
    if (handle === null) {
        throw new Error('The editor did not mount.');
    }
    return { ...rendered, handle };
};
type Handle = ReturnType<typeof mount>['handle'];

const open = (handle: Handle) => {
    act(() => {
        handle.execute('link.edit');
        vi.advanceTimersToNextFrame();
    });
    return screen.getByRole('dialog', { name: 'Link' });
};
const destination = () =>
    screen.queryByRole('combobox', { name: 'URL' }) ?? screen.getByRole('textbox', { name: 'URL' });
const apply = () =>
    act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Apply' }));
    });
const type = (field: HTMLElement, value: string) =>
    act(() => {
        fireEvent.change(field, { target: { value } });
    });
const blockOf = (handle: Handle) => handle.getSnapshot().document.content.content?.[0]?.content;

describe('link popover', () => {
    it('offers the destination, the visible text and Open in new window, prefilled from the link at the caret', () => {
        const { handle } = mount({
            blocks: [para(text('Read '), linked('the guide', 'https://frontify.com/a', { openInNewWindow: true }))],
        });
        setSelection(handle, { text: 'the guide', from: 3, to: 3 });
        open(handle);

        expect(destination()).toHaveProperty('value', 'https://frontify.com/a');
        expect(screen.getByRole('textbox', { name: 'Text' })).toHaveProperty('value', 'the guide');
        expect(screen.getByRole('checkbox', { name: 'Open in new window' }).getAttribute('aria-checked')).toBe('true');
        expect(document.activeElement).toBe(destination());
    });

    it('focuses the visible text at a caret outside a link, and inserts the URL when the text stays empty', () => {
        const { handle } = mount({ blocks: [para(text('ab'))] });
        setSelection(handle, { text: 'ab', from: 1, to: 1 });
        open(handle);

        expect(document.activeElement).toBe(screen.getByRole('textbox', { name: 'Text' }));
        type(destination(), 'frontify.com');
        apply();

        expect(blockOf(handle)).toEqual([text('a'), linked('https://frontify.com', 'https://frontify.com'), text('b')]);
        expect(screen.queryByRole('dialog', { name: 'Link' })).toBeNull();
    });

    it.each([
        ['frontify.com/brand', 'https://frontify.com/brand'],
        ['www.frontify.com', 'https://www.frontify.com'],
        ['guide.html', 'https://guide.html'],
        ['/docs/v1.2', '/docs/v1.2'],
        ['./a.pdf', './a.pdf'],
        ['#top', '#top'],
        ['?q=a.b', '?q=a.b'],
    ])('stores the typed destination %s as %s', (typed, stored) => {
        const { handle } = mount({ blocks: [para(text('word'))] });
        setSelection(handle, { text: 'word' });
        open(handle);
        type(destination(), typed);
        apply();

        expect(blockOf(handle)).toEqual([linked('word', stored)]);
    });

    it('stays open with a described error on the invalid field when the URL fails the check', () => {
        const { handle } = mount({ blocks: [para(text('word'))] });
        setSelection(handle, { text: 'word' });
        open(handle);
        type(destination(), 'javascript:alert(1)');
        apply();

        const error = screen.getByRole('alert');
        expect(error.textContent).toBe('Enter a valid link, such as https://example.com.');
        expect(destination().getAttribute('aria-describedby')).toBe(error.id);
        expect(destination().getAttribute('aria-invalid')).toBe('true');
        expect(screen.getByRole('dialog', { name: 'Link' })).toBeTruthy();
        expect(blockOf(handle)).toEqual([text('word')]);
    });

    it('rejects a destination the feature policy narrows out', () => {
        const { handle } = mount({ blocks: [para(text('word'))], options: { allowedHosts: ['*.frontify.com'] } });
        setSelection(handle, { text: 'word' });
        open(handle);
        type(destination(), 'https://example.com');
        apply();

        expect(destination().getAttribute('aria-invalid')).toBe('true');
        expect(blockOf(handle)).toEqual([text('word')]);
    });

    it('offers None and the link styles, prefilled from the link, and stores the chosen style', () => {
        const { handle } = mount({
            blocks: [para(linked('start', 'https://frontify.com', { styleId: 'brand.secondary' }))],
            styles: BUTTON_STYLES,
        });
        setSelection(handle, { text: 'start', from: 2, to: 2 });
        open(handle);
        const style = screen.getByRole('combobox', { name: 'Style' });

        expect(style).toHaveProperty('value', 'brand.secondary');
        expect([...style.querySelectorAll('option')].map((option) => option.textContent)).toEqual([
            'None',
            'Button primary',
            'Button secondary',
            'Button tertiary',
        ]);
        act(() => {
            fireEvent.change(style, { target: { value: 'brand.tertiary' } });
        });
        apply();

        expect(blockOf(handle)).toEqual([linked('start', 'https://frontify.com', { styleId: 'brand.tertiary' })]);
    });
});

describe('link destination search', () => {
    const service = (items: readonly ReferenceValue[]) => {
        const search = vi.fn<ReferenceService['search']>(() => Promise.resolve({ items, nextCursor: null }));
        return { search };
    };
    const page = (id: string, label: string, href?: string): ReferenceValue => ({
        resourceType: 'guideline-page',
        resourceId: id,
        labelSnapshot: label,
        ...(href === undefined ? {} : { href }),
    });
    const settle = async () => {
        await act(async () => {
            vi.advanceTimersByTime(200);
            await Promise.resolve();
            await Promise.resolve();
        });
    };

    it('searches once 200 ms after the last change and links the chosen page by its href', async () => {
        const references = service([page('p-1', 'Brand colors', 'https://brand.frontify.com/colors')]);
        const { handle } = mount({
            blocks: [para(text('colors'))],
            options: { resourceTypes: ['guideline-page'] },
            references,
        });
        setSelection(handle, { text: 'colors' });
        open(handle);
        for (const typed of ['B', 'Br', 'Bra', 'Bran', 'Brand']) {
            type(destination(), typed);
            act(() => {
                vi.advanceTimersByTime(50);
            });
        }
        expect(references.search).not.toHaveBeenCalled();
        await settle();

        expect(references.search).toHaveBeenCalledTimes(1);
        expect(references.search.mock.calls[0]?.[0]).toEqual({
            query: 'Brand',
            resourceTypes: ['guideline-page'],
            cursor: null,
        });
        const option = screen.getByRole('option', { name: 'Brand colors' });
        expect(destination().getAttribute('aria-activedescendant')).toBe(option.id);
        act(() => {
            fireEvent.keyDown(destination(), { key: 'Enter' });
        });

        expect(blockOf(handle)).toEqual([linked('colors', 'https://brand.frontify.com/colors')]);
    });

    it('lists no result without an href or with one that fails the check', async () => {
        const references = service([
            page('p-1', 'No address'),
            page('p-2', 'Script', 'javascript:x'),
            page('p-3', 'Colors', '/colors'),
        ]);
        const { handle } = mount({
            blocks: [para(text('word'))],
            options: { resourceTypes: ['guideline-page'] },
            references,
        });
        setSelection(handle, { text: 'word' });
        open(handle);
        type(destination(), 'o');
        await settle();

        expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual(['Colors']);
    });
});

describe('link bubble', () => {
    it('shows the link URL and Open, Edit, Copy and Remove at a caret inside a link, and Remove unlinks it', () => {
        const { handle } = mount({ blocks: [para(text('Read '), linked('the guide', 'https://frontify.com/a'))] });
        act(() => {
            handle.focus();
            setSelection(handle, { text: 'the guide', from: 3, to: 3 });
            vi.advanceTimersToNextFrame();
        });
        const bubble = screen.getByRole('toolbar', { name: 'Link' });

        expect(bubble.querySelector('bdi')?.textContent).toBe('https://frontify.com/a');
        expect([...bubble.querySelectorAll('button')].map((button) => button.getAttribute('aria-label'))).toEqual([
            'Open link',
            'Edit link',
            'Copy link',
            'Remove link',
        ]);
        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Remove link' }));
        });

        expect(blockOf(handle)).toEqual([text('Read the guide')]);
    });
});
