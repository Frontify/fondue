/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defineReactPresentation } from '#/entries/authoring';
import { unitsOf, type UnitCommands } from '#/features/__tests__/fixtures/units';
import { links } from '#/features/links/feature';
import {
    defineEditor,
    type EditorHandle,
    type PresentationStyle,
    type ReferenceService,
    RichTextEditor,
} from '#/index';
import { type ContentNodeJSON } from '#/model';
import { liveRegionFaults } from '#/react/__tests__/fixtures/live-region';
import { para, storedIn, text, textFeatures, textModel } from '#/react/__tests__/fixtures/text';
import { type ReferenceValue } from '#/runtime/types';
import { setSelection, typeText } from '#/testing';

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
    const ref = createRef<EditorHandle<UnitCommands>>();
    const rendered = render(
        <RichTextEditor
            aria-label="Notes"
            definition={defineEditor({ id: 'test.links', model, plugins: unitsOf(model) })}
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

        const error = document.getElementById(destination().getAttribute('aria-describedby') ?? '');
        expect(error?.textContent).toBe('Enter a valid link, such as https://example.com.');
        expect(destination().getAttribute('aria-errormessage')).toBe(error?.id);
        expect(destination().getAttribute('aria-invalid')).toBe('true');
        expect(document.activeElement).toBe(destination());
        expect(liveRegionFaults(document.body)).toEqual([]);
        expect(screen.getByRole('dialog', { name: 'Link' })).toBeTruthy();
        expect(blockOf(handle)).toEqual([text('word')]);
    });

    it.each([
        ['the field that has focus', true, 'Enter a valid link, such as https://example.com.'],
        ['Apply, which moves focus to the field', false, ''],
    ])('says a refused URL once in the polite region when Apply runs from %s', (_case, fromField, spoken) => {
        const { handle } = mount({ blocks: [para(text('word'))] });
        setSelection(handle, { text: 'word' });
        open(handle);
        type(destination(), 'javascript:alert(1)');
        if (!fromField) {
            act(() => screen.getByRole('button', { name: 'Apply' }).focus());
        }
        act(() => {
            fireEvent.submit(destination().closest('form') as HTMLFormElement);
        });

        expect(document.activeElement).toBe(destination());
        expect(screen.getByTestId('fondue-rich-text-editor-announcer').textContent).toBe(spoken);
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

    it('offers None and the link styles in a menu inside the editor, prefilled from the link, and stores the chosen style', () => {
        const { handle, container } = mount({
            blocks: [para(linked('start', 'https://frontify.com', { styleId: 'brand.secondary' }))],
            styles: BUTTON_STYLES,
        });
        setSelection(handle, { text: 'start', from: 2, to: 2 });
        open(handle);
        const trigger = screen.getByRole('button', { name: 'Style Button secondary' });
        act(() => {
            fireEvent.keyDown(trigger, { key: 'Enter' });
        });
        const menu = screen.getByRole('menu');
        const rows = screen.getAllByRole('menuitemradio');

        expect(container.contains(menu)).toBe(true);
        expect(rows.map((row) => row.textContent)).toEqual([
            'None',
            'Button primary',
            'Button secondary',
            'Button tertiary',
        ]);
        expect(rows.map((row) => row.getAttribute('aria-checked'))).toEqual(['false', 'false', 'true', 'false']);
        act(() => {
            fireEvent.click(screen.getByRole('menuitemradio', { name: 'Button tertiary' }));
        });
        apply();

        expect(blockOf(handle)).toEqual([linked('start', 'https://frontify.com', { styleId: 'brand.tertiary' })]);
    });

    it('puts Apply in the popover footer as the submit button of its form', () => {
        const { handle } = mount({ blocks: [para(text('word'))] });
        setSelection(handle, { text: 'word' });
        const dialog = open(handle);
        const button = screen.getByRole('button', { name: 'Apply' });

        expect(button.closest('[data-test-id="fondue-flyout-footer"]')).not.toBeNull();
        expect(button.closest('form')).toBeNull();
        expect(button.getAttribute('form')).toBe(dialog.querySelector('form')?.id);
        type(destination(), 'frontify.com');
        apply();
        expect(blockOf(handle)).toEqual([linked('word', 'https://frontify.com')]);
    });

    it.each([
        [{ allowedSchemes: ['https'] }, 'mailto:a@b.co', 'Use a link that starts with https:.'],
        [
            { allowedHosts: ['*.frontify.com', 'frontify.com'] },
            'https://example.com',
            'Use a link to *.frontify.com or frontify.com.',
        ],
    ] as const)('names the schemes or hosts the policy %o allows when it refuses %s', (options, typed, message) => {
        const { handle } = mount({ blocks: [para(text('word'))], options });
        setSelection(handle, { text: 'word' });
        open(handle);
        type(destination(), typed);
        apply();

        expect(destination()).toHaveAccessibleDescription(message);
        expect(destination().getAttribute('aria-invalid')).toBe('true');
        expect(liveRegionFaults(document.body)).toEqual([]);
    });

    it('keeps the field valid and says the link could not be applied when Apply is refused for another reason', () => {
        const { handle } = mount({ blocks: [para(text('word'))] });
        setSelection(handle, { text: 'word' });
        open(handle);
        type(destination(), 'https://frontify.com');
        act(() => handle.setMode('readonly'));
        apply();

        expect(screen.getByText('The link could not be applied.', { selector: 'p' })).toBeVisible();
        expect(screen.getByTestId('fondue-rich-text-editor-announcer').textContent).toBe(
            'The link could not be applied.',
        );
        expect(destination().getAttribute('aria-invalid')).toBe('false');
        expect(destination().hasAttribute('aria-describedby')).toBe(false);
        expect(liveRegionFaults(document.body)).toEqual([]);
    });

    it.each([
        ['typing inside the link', false],
        ['typing inside the link and undoing it', true],
    ])('applies to the whole link after %s while the popover is open', (_case, undone) => {
        const { handle } = mount({
            blocks: [para(text('Read '), linked('guide', 'https://frontify.com/a'), text(' now'))],
        });
        setSelection(handle, { text: 'guide', from: 2, to: 2 });
        open(handle);
        type(destination(), 'https://frontify.com/b');
        act(() => {
            setSelection(handle, { text: 'guide', from: 3, to: 3 });
            typeText(handle, 'X');
            if (undone) {
                handle.execute('history.undo');
            }
        });
        apply();

        expect(screen.queryByText('The link could not be applied.')).toBeNull();
        expect(screen.queryByText('The linked text was removed.')).toBeNull();
        expect(blockOf(handle)).toEqual([
            text('Read '),
            linked(undone ? 'guide' : 'guiXde', 'https://frontify.com/b'),
            text(' now'),
        ]);
    });

    it('lets the next Enter apply after a composition that Chromium confirms with an Enter of its own', () => {
        const { handle } = mount({ blocks: [para(text('word'))] });
        setSelection(handle, { text: 'word' });
        open(handle);
        type(destination(), 'frontify.com');
        act(() => {
            fireEvent.compositionEnd(destination());
        });

        expect(fireEvent.keyDown(destination(), { key: 'Enter', isComposing: true })).toBe(true);
        expect(fireEvent.keyDown(destination(), { key: 'Enter' })).toBe(true);
    });

    it('keeps the confirmed composition candidate in the field on the Enter that confirms it', () => {
        const { handle } = mount({ blocks: [para(text('word'))] });
        setSelection(handle, { text: 'word' });
        open(handle);
        type(destination(), 'ブランド');
        act(() => {
            fireEvent.compositionEnd(destination());
        });

        expect(fireEvent.keyDown(destination(), { key: 'Enter' })).toBe(false);
        expect(fireEvent.keyDown(destination(), { key: 'Enter' })).toBe(true);
    });

    it.each([
        ['a caret at its start', 0],
        ['a caret inside it', 3],
    ])(
        'says the linked text was removed, on the focused field, when it goes while the popover is open at %s',
        (_where, offset) => {
            const { handle } = mount({
                blocks: [para(text('Read '), linked('guide', 'https://frontify.com/a'), text(' now'))],
            });
            setSelection(handle, { text: 'guide', from: offset, to: offset });
            open(handle);
            type(destination(), 'https://frontify.com/b');
            act(() => {
                setSelection(handle, { text: 'guide' });
                handle.execute('text.insert', { text: '' });
            });
            apply();

            const message = screen.getByText('The linked text was removed.', { selector: 'p' });
            expect(document.activeElement).toBe(destination());
            expect(destination().getAttribute('aria-describedby')).toBe(message.id);
            expect(liveRegionFaults(document.body)).toEqual([]);
            expect(message.contains(screen.getByRole('button', { name: 'Insert as new link' }))).toBe(false);
            expect(JSON.stringify(blockOf(handle))).not.toContain('https://frontify.com/b');
        },
    );
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

    it('announces the active destination with its place when the list shows and when the arrows move it', async () => {
        const references = service([page('p-1', 'Brand colors', '/colors'), page('p-2', 'Brand fonts', '/fonts')]);
        const { handle, container } = mount({
            blocks: [para(text('word'))],
            options: { resourceTypes: ['guideline-page'] },
            references,
        });
        const region = () => container.querySelector('[aria-live="polite"]')?.textContent;
        setSelection(handle, { text: 'word' });
        open(handle);
        type(destination(), 'Brand');
        await settle();

        expect(region()).toBe('Brand colors, 1 of 2');
        act(() => {
            fireEvent.keyDown(destination(), { key: 'ArrowDown' });
        });
        expect(region()).toBe('Brand fonts, 2 of 2');
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
    const showBubble = () => {
        const mounted = mount({ blocks: [para(text('Read '), linked('the guide', 'https://frontify.com/a'))] });
        act(() => {
            mounted.handle.focus();
            setSelection(mounted.handle, { text: 'the guide', from: 3, to: 3 });
            vi.advanceTimersToNextFrame();
        });
        return { ...mounted, bubble: screen.getByRole('toolbar', { name: 'Link' }) };
    };

    it('shows the link URL and Open, Edit, Copy and Remove at a caret inside a link, and Remove unlinks it', () => {
        const { handle, bubble } = showBubble();

        expect(bubble.querySelector('bdi')?.textContent).toBe('https://frontify.com/a');
        expect([...bubble.querySelectorAll('button')].map((button) => button.getAttribute('aria-label'))).toEqual([
            'Open link in a new tab',
            'Edit link',
            'Copy link',
            'Remove link',
        ]);
        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Remove link' }));
        });

        expect(blockOf(handle)).toEqual([text('Read the guide')]);
    });

    it('describes every bubble control by the URL, and shows a long URL in a Fondue tooltip, not a title', () => {
        const { bubble } = showBubble();
        const url = bubble.querySelector('bdi')?.parentElement;

        for (const button of bubble.querySelectorAll('button')) {
            const describedBy = document.getElementById(button.getAttribute('aria-describedby') ?? '');
            expect(describedBy?.textContent).toBe('https://frontify.com/a');
        }
        expect(url?.hasAttribute('title')).toBe(false);
        expect(url?.getAttribute('data-state')).toBe('closed');
    });
});
