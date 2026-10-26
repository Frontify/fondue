/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { Node } from 'prosemirror-model';
import { NodeSelection } from 'prosemirror-state';
import { createElement } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defineReactPresentation } from '#/entries/authoring';
import { RichTextReader } from '#/entries/reader';
import { REPLACED_ASSET } from '#/model';
import { SLICE_TYPE } from '#/runtime/clipboard/slice';
import { nodeStateOf } from '#/runtime/nodeState';

import { mayAnimate } from '../animation';
import { drawStill } from '../image';

import {
    deferredPicker,
    figure,
    flush,
    imageModel,
    mountImages,
    PALETTE,
    para,
    resolving,
    storedIn,
    text,
} from './fixtures/mount';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

const announced = () => screen.getByTestId('fondue-rich-text-editor-announcer').textContent;

const press = async (element: Element) => {
    act(() => {
        fireEvent.click(element);
    });
    await flush();
};

const reducedMotion = () =>
    vi.stubGlobal(
        'matchMedia',
        vi.fn((query: string) => ({ matches: query === '(prefers-reduced-motion: reduce)', media: query })),
    );

describe('the animation check', () => {
    it('reads the file with no credentials, and counts a file that declares more than the probe reads as animated', async () => {
        const cancel = vi.fn(() => Promise.resolve());
        const fetching = vi.fn(() =>
            Promise.resolve({
                ok: true,
                headers: new Headers({ 'content-type': 'image/gif', 'content-length': String(64 * 1024 * 1024) }),
                body: { cancel },
            }),
        );
        const decoder = vi.fn();
        vi.stubGlobal('fetch', fetching);
        vi.stubGlobal('ImageDecoder', Object.assign(decoder, { isTypeSupported: () => Promise.resolve(true) }));

        const may = await mayAnimate('https://cdn.frontify.test/big.gif', 'image/gif', new AbortController().signal);

        expect(may).toBe(true);
        expect(fetching).toHaveBeenCalledWith(
            'https://cdn.frontify.test/big.gif',
            expect.objectContaining({ credentials: 'omit' }),
        );
        expect(decoder).not.toHaveBeenCalled();
        expect(cancel).toHaveBeenCalled();
    });

    it('draws a paused still at the size the image shows, at most 4096 device pixels on a side', () => {
        const image = document.createElement('img');
        Object.defineProperty(image, 'complete', { value: true });
        Object.defineProperty(image, 'naturalWidth', { value: 30_000 });
        Object.defineProperty(image, 'naturalHeight', { value: 30_000 });
        vi.spyOn(image, 'getBoundingClientRect').mockReturnValue({ width: 400, height: 9000 } as DOMRect);
        const canvas = document.createElement('canvas');

        drawStill(image, canvas);

        expect([canvas.width, canvas.height]).toEqual([400, 4096]);
    });
});

describe('the image chrome', () => {
    it('selects the image on a press, keeping the browser from moving the caret into a list item beside it', async () => {
        const mounted = await mountImages();
        const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true, button: 0 });

        act(() => {
            mounted.view.dom.querySelector('figure img')?.dispatchEvent(event);
        });

        expect(event.defaultPrevented).toBe(true);
        expect(mounted.handle.getSummary().selection.selectedNodeId).toBe('image-1');
        mounted.unmount();
    });

    it('walks the document as often on an edit with ten images as with one', async () => {
        const walksOfAnEdit = async (images: number) => {
            const figures = Array.from({ length: images }, (_, index) => figure(`image-${index + 1}`));
            const mounted = await mountImages({ blocks: [para(text('Before')), ...figures] });
            const walk = vi.spyOn(Node.prototype, 'descendants');

            act(() => {
                mounted.view.dispatch(mounted.view.state.tr.insertText('x', 2));
            });

            const walks = walk.mock.contexts.filter((node) => (node as Node).type.name === 'doc').length;
            walk.mockRestore();
            mounted.unmount();

            return walks;
        };

        expect(await walksOfAnEdit(10)).toBe(await walksOfAnEdit(1));
    });

    it.each([
        ['a meaningful image by its alternative text', {}, 'Image: Frontify logo'],
        ['a decorative image as decorative', { altIntent: 'decorative', altText: '' }, 'Decorative image'],
        ['an image with no alternative text', { altIntent: 'missing', altText: '' }, 'Image with no alternative text'],
        ['an image with no URL by its label', { assetId: 'asset-gone' }, 'Image unavailable logo.png'],
    ])('announces %s as it becomes selected', async (_name, image, spoken) => {
        const mounted = await mountImages({
            blocks: [para(text('Before')), figure('image-1', image)],
            presentation: defineReactPresentation({
                toolbar: [],
                resolveAssetUrl: (assetId, options) => (assetId === 'asset-gone' ? null : resolving(assetId, options)),
            }),
        });

        mounted.selectImage('image-1');
        await flush();

        expect(announced()).toBe(spoken);
        mounted.unmount();
    });

    it('shows Pause and Replace as Fondue icons with their names, and the alternative text action in words', async () => {
        const mounted = await mountImages();
        await flush();

        const pause = screen.getByRole('button', { name: 'Pause animation' });
        const replace = screen.getByRole('button', { name: 'Replace image' });
        const alt = screen.getByRole('button', { name: 'Alternative text' });

        expect(pause.querySelector('svg')).not.toBeNull();
        expect(replace.querySelector('svg')).not.toBeNull();
        expect(pause.textContent).toBe('');
        expect(alt).toHaveTextContent('Alternative text');
        mounted.unmount();
    });

    it('toggles the size menu on the release of a touch over its button, never on the press that may become a scroll', async () => {
        const mounted = await mountImages();
        const trigger = screen.getByRole('button', { name: 'Size: Original size' });
        vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
            left: 0,
            right: 80,
            top: 0,
            bottom: 32,
        } as DOMRect);

        act(() => {
            fireEvent.pointerDown(trigger, {
                button: 0,
                ctrlKey: false,
                pointerType: 'touch',
                clientX: 10,
                clientY: 10,
            });
        });
        const pressed = screen.queryByRole('menu');
        act(() => {
            fireEvent.pointerUp(trigger, { pointerType: 'touch', clientX: 10, clientY: 10 });
        });

        expect(pressed).toBeNull();
        expect(screen.getByRole('menu')).toBeInTheDocument();
        act(() => {
            fireEvent.pointerDown(trigger, {
                button: 0,
                ctrlKey: false,
                pointerType: 'touch',
                clientX: 10,
                clientY: 10,
            });
            fireEvent.pointerUp(trigger, { pointerType: 'touch', clientX: 10, clientY: 10 });
        });
        await flush();

        expect(screen.queryByRole('menu')).toBeNull();
        mounted.unmount();
    });

    it('keeps focus in the width field once Custom width closes the size menu', async () => {
        const mounted = await mountImages();
        act(() => {
            fireEvent.pointerDown(screen.getByRole('button', { name: 'Size: Original size' }), {
                button: 0,
                ctrlKey: false,
                pointerType: 'mouse',
            });
        });

        await press(screen.getByRole('menuitem', { name: 'Custom width…' }));
        await act(async () => {
            await vi.advanceTimersByTimeAsync(100);
        });

        expect(screen.getByRole('spinbutton', { name: 'Width in percent of the content width' })).toHaveFocus();
        mounted.unmount();
    });

    it('starts no resize on a vertical drag of the handle, which scrolls, nor within the slop', async () => {
        const mounted = await mountImages();
        mounted.selectImage('image-1');
        await flush();
        const handle = mounted.view.dom.querySelector('[data-rte-drag]') as HTMLElement;
        vi.spyOn(mounted.view.dom.querySelector('figure') as HTMLElement, 'clientWidth', 'get').mockReturnValue(400);
        vi.spyOn(handle.parentElement as HTMLElement, 'getBoundingClientRect').mockReturnValue({
            width: 40,
        } as DOMRect);

        act(() => {
            fireEvent.pointerDown(handle, { pointerId: 1, pointerType: 'touch', clientX: 100, clientY: 100 });
            fireEvent.pointerMove(handle, { pointerId: 1, clientX: 105, clientY: 100 });
        });
        const withinSlop = (handle.parentElement as HTMLElement).style.inlineSize;
        act(() => {
            fireEvent.pointerMove(handle, { pointerId: 1, clientX: 106, clientY: 160 });
            fireEvent.pointerMove(handle, { pointerId: 1, clientX: 200, clientY: 160 });
            fireEvent.pointerUp(handle, { pointerId: 1, clientX: 200, clientY: 160 });
        });

        expect(withinSlop).toBe('');
        expect(mounted.changes).toEqual([]);
        mounted.unmount();
    });

    it('drops a resize drag that a document replacement interrupted, with no change to the new document', async () => {
        const mounted = await mountImages();
        mounted.selectImage('image-1');
        await flush();
        const handle = mounted.view.dom.querySelector('[data-rte-drag]') as HTMLElement;
        vi.spyOn(mounted.view.dom.querySelector('figure') as HTMLElement, 'clientWidth', 'get').mockReturnValue(400);
        vi.spyOn(handle.parentElement as HTMLElement, 'getBoundingClientRect').mockReturnValue({
            width: 40,
        } as DOMRect);
        act(() => {
            fireEvent.pointerDown(handle, { pointerId: 1, pointerType: 'mouse', button: 0, clientX: 100, clientY: 10 });
            fireEvent.pointerMove(handle, { pointerId: 1, clientX: 160, clientY: 10 });
        });
        const { stamp, document } = mounted.handle.getSnapshot();

        let replaced: unknown;
        await act(async () => {
            replaced = await mounted.handle.replaceDocument({
                expected: stamp,
                next: { documentId: 'document-1', revision: 'revision-2', document },
                unsaved: { action: 'discard', confirmed: true },
                selection: 'start',
                history: 'reset',
            });
        });
        const changed = mounted.changes.length;
        act(() => {
            fireEvent.pointerUp(handle, { pointerId: 1, clientX: 160, clientY: 10 });
        });

        expect(replaced).toMatchObject({ status: 'replaced' });
        expect(mounted.handle.getSnapshot().stamp.generation).toBe(stamp.generation + 1);
        expect(mounted.changes).toHaveLength(changed);
        expect(mounted.imageOf('image-1')?.displayWidth).toBeNull();
        mounted.unmount();
    });
});

describe('motion', () => {
    it('shows the still under reduced motion while the animation check has not answered', async () => {
        reducedMotion();
        vi.stubGlobal(
            'fetch',
            vi.fn(() => new Promise(() => undefined)),
        );
        vi.stubGlobal('ImageDecoder', Object.assign(vi.fn(), { isTypeSupported: () => Promise.resolve(true) }));
        const mounted = await mountImages();

        expect(mounted.view.dom.querySelector('figure canvas[aria-hidden="true"]')).not.toBeNull();
        mounted.unmount();
    });

    it('starts a replaced image paused under reduced motion, after the author played the one before', async () => {
        reducedMotion();
        const picker = deferredPicker();
        const mounted = await mountImages({ services: { assets: picker.service } });
        await flush();
        await press(screen.getByRole('button', { name: 'Play animation' }));
        expect(screen.getByRole('button', { name: 'Pause animation' })).toBeInTheDocument();

        await press(screen.getByRole('button', { name: 'Replace image' }));
        picker.pending[0]?.resolve({ ...PALETTE, mediaType: 'image/gif' });
        await flush();

        expect(screen.getByRole('button', { name: 'Play animation' })).toBeInTheDocument();
        mounted.unmount();
    });
});

describe('a replaced image', () => {
    it('keeps the review in the plugin state and moves focus to its action, which the prompt describes, announcing nothing more', async () => {
        const picker = deferredPicker();
        const mounted = await mountImages({ services: { assets: picker.service } });

        await press(screen.getByRole('button', { name: 'Replace image' }));
        picker.pending[0]?.resolve(PALETTE);
        await flush();

        expect(nodeStateOf(mounted.runtime.state, 'image-1', REPLACED_ASSET)).toMatchObject({
            assetId: PALETTE.assetId,
        });
        const review = screen.getByRole('button', { name: 'Review alternative text' });
        expect(review).toHaveFocus();
        expect(review).toHaveAccessibleDescription(
            'The image changed. Check that its alternative text still describes it.',
        );
        expect(announced()).not.toContain('The image changed.');
        mounted.unmount();
    });

    it('copies a node-selected image with its figure, so a paste keeps its asset, width and side', async () => {
        const mounted = await mountImages({
            blocks: [para(text('Before')), figure('image-1', { displayWidth: 50 }, 'right')],
        });
        mounted.selectImage('image-1');
        expect(mounted.view.state.selection).toBeInstanceOf(NodeSelection);
        const clipboardData = new DataTransfer();

        act(() => {
            mounted.view.dom.dispatchEvent(
                new ClipboardEvent('copy', { clipboardData, bubbles: true, cancelable: true }),
            );
        });
        const slice = JSON.parse(clipboardData.getData(SLICE_TYPE) || '{}') as {
            content?: readonly { type: string; attrs?: Record<string, unknown> }[];
        };

        expect(clipboardData.getData('text/html')).toContain('<figure dir="auto" style="text-align:right"><img');
        expect(slice.content?.[0]).toMatchObject({ type: 'figure', attrs: { align: 'right' } });
        expect(JSON.stringify(slice)).toContain('"displayWidth":50');
        mounted.unmount();
    });
});

describe('the alternative text dialog', () => {
    const dialog = () => screen.getByRole('dialog', { name: 'Alternative text' });

    it('offers its choices as a Fondue RadioList, 400 px wide, with the hints that describe them', async () => {
        const mounted = await mountImages();

        await press(screen.getByRole('button', { name: 'Alternative text' }));
        const radios = within(dialog()).getAllByRole('radio');

        expect(radios.map((radio) => radio.tagName)).toEqual(['BUTTON', 'BUTTON']);
        expect(radios[0]).toHaveAccessibleDescription(
            'It carries information. Describe it for people who cannot see it.',
        );
        expect(radios[0]).toHaveAttribute('aria-checked', 'true');
        expect(dialog().style.getPropertyValue('--dialog-max-width')).toBe('400px');
        mounted.unmount();
    });

    it('styles its error with the error colour and type tokens of the link popover', async () => {
        const mounted = await mountImages({ blocks: [figure('image-1', { altIntent: 'missing', altText: '' })] });
        await press(screen.getByRole('button', { name: 'Add alternative text' }));

        await press(within(dialog()).getByRole('button', { name: 'Save' }));

        expect(within(dialog()).getByText('Enter alternative text, or choose Decorative.').className).toMatch(/error/);
        mounted.unmount();
    });
});

describe('the image policy', () => {
    it('refuses image.insert with not-allowed and never opens the picker when the policy lets no image be created', async () => {
        const picker = deferredPicker();
        const allow = { create: false, edit: true, remove: true, paste: true };
        const mounted = await mountImages({
            services: { assets: picker.service },
            policy: { features: { 'media.image': allow } },
        });

        const state = mounted.handle.query('image.insert');
        act(() => {
            mounted.handle.execute('image.insert');
        });

        expect(state).toMatchObject({ enabled: false, disabledReason: 'not-allowed' });
        expect(picker.pick).not.toHaveBeenCalled();
        mounted.unmount();
    });

    it('refuses image.replace with not-allowed and never opens the picker when the policy lets no image be edited', async () => {
        const picker = deferredPicker();
        const allow = { create: true, edit: false, remove: true, paste: true };
        const mounted = await mountImages({
            services: { assets: picker.service },
            policy: { features: { 'media.image': allow } },
        });

        const state = mounted.handle.query('image.replace', { nodeId: 'image-1' });
        await press(screen.getByRole('button', { name: 'Replace image' }));

        expect(state).toMatchObject({ enabled: false, disabledReason: 'not-allowed' });
        expect(picker.pick).not.toHaveBeenCalled();
        mounted.unmount();
    });
});

describe('the reader image', () => {
    it('shows the placeholder in place of an image that fails to load, which it rendered hidden beside it', () => {
        const model = imageModel();
        const { container } = render(
            createElement(RichTextReader, {
                document: storedIn(model, [figure('image-1')]),
                model,
                presentation: { styles: [], colorTokens: [], resolveAssetUrl: resolving },
            }),
        );
        const placeholder = container.querySelector('[data-rte-image-unavailable]');
        expect(placeholder).toHaveAttribute('hidden');

        fireEvent.error(container.querySelector('img') as Element);

        expect(container.querySelector('figure')).toHaveAttribute('data-rte-image-failed');
        expect(within(container.querySelector('figure') as HTMLElement).getByText('logo.png')).toBe(
            placeholder?.querySelector('bdi'),
        );
    });

    it('reserves no box for a stored size whose sides differ beyond the aspect cap', () => {
        const model = imageModel();
        const document = storedIn(model, [figure('image-1', { width: 1, height: 65_535 })]);

        const { container } = render(
            createElement(RichTextReader, {
                document,
                model,
                presentation: { styles: [], colorTokens: [], resolveAssetUrl: resolving },
            }),
        );
        const image = container.querySelector('img');

        expect(image?.hasAttribute('width')).toBe(false);
        expect(image?.hasAttribute('height')).toBe(false);
    });
});

describe('the image styles', () => {
    // A path, not a `URL`: happy-dom replaces the global `URL`, which rejects a `file:` URL.
    const here = dirname(fileURLToPath(import.meta.url));
    const scss = readFileSync(join(here, '..', 'styles', 'image.module.scss'), 'utf8');
    const content = readFileSync(join(here, '..', '..', '..', 'styles', 'content.css'), 'utf8');

    it('sizes the resize handle with spacing tokens and a computed half offset, with 44 px only for a coarse pointer', () => {
        const found = /\.handle \{([\s\S]*?)\n\}/.exec(scss)?.[1];
        const handle = found ?? '';

        expect(handle).toContain('calc(var(--rte-image-handle-size) / -2)');
        expect(handle.replaceAll('44px', '').match(/-?\d+px/g)).toBeNull();
        expect(handle).toContain('touch-action: pan-y');
    });

    it('caps the block size of every image the editor and the reader show at the viewport', () => {
        expect(/\.picture \{[^}]*max-block-size: 100vh/.test(scss)).toBe(true);
        expect(/figure img\) \{[^}]*max-block-size: 100vh/.test(content)).toBe(true);
    });

    it('places a left or right figure on that physical side in the editor, whatever the direction', () => {
        expect(scss).toContain('text-align: var(--rte-image-side, center)');
        expect(scss).not.toMatch(/flex-start|flex-end/);
    });

    it('hides only node chrome toolbars in print, so chrome that renders content, such as a mention, prints', () => {
        const found = /@media print \{([\s\S]*?)\n {4}\}/.exec(content)?.[1];
        const print = found ?? '';

        expect(print).toContain('[data-rte-node-chrome]');
        expect(print).not.toContain(':has(');
        expect(print).not.toMatch(/\[data-rte-chrome\]\)/);
    });
});

describe('an image after a rerender, a drag or a failure', () => {
    it('clears the reader failure flag once the image shows another URL, and once an image loads', () => {
        const model = imageModel();
        const reader = (resolve: typeof resolving) =>
            createElement(RichTextReader, {
                document: storedIn(model, [figure('image-1')]),
                model,
                presentation: { styles: [], colorTokens: [], resolveAssetUrl: resolve },
            });
        const rendered = render(reader(resolving));
        const figureOf = () => rendered.container.querySelector('figure');
        fireEvent.error(rendered.container.querySelector('img') as Element);
        expect(figureOf()).toHaveAttribute('data-rte-image-failed');

        rendered.rerender(reader((assetId) => `https://cdn2.frontify.test/${assetId}.png`));
        const moved = figureOf()?.hasAttribute('data-rte-image-failed');
        fireEvent.error(rendered.container.querySelector('img') as Element);
        const failedAgain = figureOf()?.hasAttribute('data-rte-image-failed');
        fireEvent.load(rendered.container.querySelector('img') as Element);

        expect([moved, failedAgain, figureOf()?.hasAttribute('data-rte-image-failed')]).toEqual([false, true, false]);
    });

    it('lets a press on a selected image start its drag, which carries the whole figure', async () => {
        const mounted = await mountImages({
            blocks: [para(text('Before')), figure('image-1', { displayWidth: 50 }, 'right')],
        });
        mounted.selectImage('image-1');
        await flush();
        const press = new MouseEvent('mousedown', { bubbles: true, cancelable: true, button: 0 });
        act(() => {
            mounted.view.dom.querySelector('figure img')?.dispatchEvent(press);
        });
        const dataTransfer = new DataTransfer();
        const drag = new DragEvent('dragstart', { bubbles: true, cancelable: true });
        // happy-dom's DragEvent ignores the `dataTransfer` init.
        Object.defineProperty(drag, 'dataTransfer', { value: dataTransfer });

        act(() => {
            mounted.view.dom.querySelector('figure')?.dispatchEvent(drag);
        });

        expect(press.defaultPrevented).toBe(false);
        const dragged = mounted.view.dragging?.slice.content.firstChild;
        expect(dragged?.type.name).toBe('figure');
        expect(dataTransfer.getData('text/html')).toContain('<figure dir="auto" style="text-align:right">');
        mounted.unmount();
    });

    it('names each alternative text choice by its label alone, with its hint as the description only', async () => {
        const mounted = await mountImages();

        await press(screen.getByRole('button', { name: 'Alternative text' }));
        const dialog = screen.getByRole('dialog', { name: 'Alternative text' });

        expect(within(dialog).getByRole('radio', { name: 'Meaningful' })).toHaveAccessibleDescription(
            'It carries information. Describe it for people who cannot see it.',
        );
        expect(within(dialog).getByRole('radio', { name: 'Decorative' })).toHaveAccessibleDescription(
            'It adds no information, so screen readers skip it.',
        );
        mounted.unmount();
    });

    it('announces a selected image again when it fails to load', async () => {
        const mounted = await mountImages();
        mounted.selectImage('image-1');
        await flush();
        expect(announced()).toBe('Image: Frontify logo');

        act(() => {
            fireEvent.error(mounted.view.dom.querySelector('figure img') as Element);
        });
        await flush();

        expect(announced()).toBe('Image unavailable logo.png');
        mounted.unmount();
    });
});
