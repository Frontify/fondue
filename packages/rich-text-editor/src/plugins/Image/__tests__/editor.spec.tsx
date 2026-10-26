/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen, within } from '@testing-library/react';
import { AllSelection } from 'prosemirror-state';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defineReactPresentation } from '#/entries/authoring';
import { RichTextReader } from '#/entries/reader';
import { REPLACED_ASSET } from '#/model';
import { liveRegionFaults } from '#/react/__tests__/fixtures/liveRegion';
import { nodeStateOf } from '#/runtime/statePlugins/nodeState';
import { pressKey, setSelection, typeText } from '#/testing';

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

const announcerOf = () => screen.getByTestId('fondue-rich-text-editor-announcer');
const dialog = () => screen.getByRole('dialog', { name: 'Alternative text' });

/** The `alt` of each image the surface shows, `null` where it has none. */
const editorAlts = (view: HTMLElement) =>
    [...view.querySelectorAll('figure img')].map((image) => image.getAttribute('alt'));

/** Clicks `element`, then lets the node views' chrome render what the click changed. */
const press = async (element: Element) => {
    act(() => {
        fireEvent.click(element);
    });
    await flush();
};

/** Opens a node chrome menu as a pointer press does. */
const openMenu = (name: string) => {
    act(() => {
        fireEvent.pointerDown(screen.getByRole('button', { name }), {
            button: 0,
            ctrlKey: false,
            pointerType: 'mouse',
        });
    });
};

describe('the image in the editor', () => {
    it('gives each image the alt the reader writes for missing, decorative and meaningful alternative text', async () => {
        const blocks = [
            figure('image-1', { altIntent: 'missing', altText: '' }),
            figure('image-2', { altIntent: 'decorative', altText: '' }),
            figure('image-3', { altIntent: 'meaningful', altText: 'Frontify logo' }),
        ];
        const mounted = await mountImages({ blocks });
        const container = document.createElement('div');
        container.innerHTML = renderToStaticMarkup(
            createElement(RichTextReader, {
                document: storedIn(imageModel(), blocks),
                model: imageModel(),
                presentation: { styles: [], colorTokens: [], resolveAssetUrl: resolving },
            }),
        );

        expect(editorAlts(mounted.view.dom)).toEqual([null, '', 'Frontify logo']);
        expect(editorAlts(container)).toEqual(editorAlts(mounted.view.dom));
        mounted.unmount();
    });

    it.each([
        ['returns null', (): string | null => null],
        [
            'throws',
            (): string | null => {
                throw new Error('no asset');
            },
        ],
        ['returns a URL that fails checkHref', (): string | null => 'javascript:alert(1)'],
    ] as const)(
        'shows Image unavailable with the label and keeps the node when resolveAssetUrl %s',
        async (_name, resolve) => {
            const mounted = await mountImages({
                presentation: defineReactPresentation({ toolbar: [], resolveAssetUrl: resolve }),
            });
            const stored = structuredClone(mounted.handle.getSnapshot().document);

            const placeholder = mounted.view.dom.querySelector('[data-rte-image-unavailable]');

            expect(placeholder?.textContent).toBe('Image unavailable logo.png');
            const name = placeholder?.querySelector('bdi');
            expect(name?.textContent).toBe('logo.png');
            expect(mounted.view.dom.querySelector('figure img')).toBeNull();
            expect(mounted.handle.getSnapshot().document).toEqual(stored);
            mounted.unmount();
        },
    );

    it('shows Image unavailable with the label and keeps the node when the image fails to load', async () => {
        const mounted = await mountImages();
        const stored = structuredClone(mounted.handle.getSnapshot().document);
        const image = mounted.view.dom.querySelector('figure img');
        expect(image).not.toBeNull();

        act(() => {
            fireEvent.error(image as Element);
        });

        expect(mounted.view.dom.querySelector('[data-rte-image-unavailable]')?.textContent).toBe(
            'Image unavailable logo.png',
        );
        expect(mounted.changes).toEqual([]);
        expect(mounted.handle.getSnapshot().document).toEqual(stored);
        mounted.unmount();
    });

    it('shows Upload did not finish with Choose file again, which runs image.replace, for an image with no assetId', async () => {
        const picker = deferredPicker();
        const mounted = await mountImages({
            blocks: [para(text('Before')), figure('image-1', { assetId: null })],
            services: { assets: picker.service },
        });

        expect(mounted.view.dom.querySelector('figure')?.textContent).toContain('Upload did not finish');
        await press(screen.getByRole('button', { name: 'Choose file again' }));

        expect(picker.pick).toHaveBeenCalledWith({ purpose: 'image' }, expect.anything());
        mounted.unmount();
    });
});

describe('copying an image', () => {
    it('writes the URL that the session resolves for the image into the copied HTML, and no asset ID', async () => {
        const mounted = await mountImages();
        const { view } = mounted;
        act(() => {
            view.dispatch(view.state.tr.setSelection(new AllSelection(view.state.doc)));
        });
        const clipboardData = new DataTransfer();

        act(() => {
            view.dom.dispatchEvent(new ClipboardEvent('copy', { clipboardData, bubbles: true, cancelable: true }));
        });
        const html = clipboardData.getData('text/html');

        expect(html).toContain(
            '<figure dir="auto" style="text-align:center"><img src="https://cdn.frontify.test/asset-logo.png?w=40" alt="Frontify logo" width="40" height="30"/><span data-rte-image-unavailable="" data-rte-message="image-unavailable" hidden="">Image unavailable <bdi>logo.png</bdi></span></figure>',
        );
        expect(html).not.toContain('asset-logo"');
        mounted.unmount();
    });
});

describe('the alternative text dialog', () => {
    it('opens with Meaningful first and selected and an empty field, never the file name, media type or a generic word', async () => {
        const mounted = await mountImages({
            blocks: [
                figure('image-1', {
                    altIntent: 'missing',
                    altText: '',
                    labelSnapshot: 'IMG_2044.jpg',
                    mediaType: 'image/jpeg',
                }),
            ],
        });

        await press(screen.getByRole('button', { name: 'Add alternative text' }));

        const radios = within(dialog()).getAllByRole('radio');
        expect(radios.map((radio) => radio.getAttribute('value'))).toEqual(['meaningful', 'decorative']);
        expect(radios[0]).toBeChecked();
        expect(radios[0]).toHaveFocus();
        const field = within(dialog()).getByRole('textbox', { name: 'Alternative text' });
        expect(field).toHaveValue('');
        expect(field).toBeRequired();
        mounted.unmount();
    });

    it('opens a decorative image with Decorative selected, still second, and saves it unchanged', async () => {
        const mounted = await mountImages({ blocks: [figure('image-1', { altIntent: 'decorative', altText: '' })] });

        await press(screen.getByRole('button', { name: 'Alternative text' }));
        const radios = within(dialog()).getAllByRole('radio');

        expect(radios.map((radio) => radio.getAttribute('value'))).toEqual(['meaningful', 'decorative']);
        expect(radios[1]).toBeChecked();
        expect(radios[1]).toHaveFocus();
        await press(within(dialog()).getByRole('button', { name: 'Save' }));
        expect(mounted.imageOf('image-1')).toMatchObject({ altIntent: 'decorative', altText: '' });
        mounted.unmount();
    });

    it('sets altIntent and altText together for Meaningful with its text, and for Decorative with none, one undo step each', async () => {
        const mounted = await mountImages({ blocks: [figure('image-1', { altIntent: 'missing', altText: '' })] });

        await press(screen.getByRole('button', { name: 'Add alternative text' }));
        act(() => {
            fireEvent.change(within(dialog()).getByRole('textbox', { name: 'Alternative text' }), {
                target: { value: 'Five swatches' },
            });
        });
        await press(within(dialog()).getByRole('button', { name: 'Save' }));

        expect(mounted.imageOf('image-1')).toMatchObject({ altIntent: 'meaningful', altText: 'Five swatches' });
        await press(screen.getByRole('button', { name: 'Alternative text' }));
        await press(within(dialog()).getByRole('radio', { name: /Decorative/ }));
        await press(within(dialog()).getByRole('button', { name: 'Save' }));

        expect(mounted.imageOf('image-1')).toMatchObject({ altIntent: 'decorative', altText: '' });
        expect(mounted.changes).toHaveLength(2);
        act(() => {
            mounted.handle.execute('history.undo');
        });
        expect(mounted.imageOf('image-1')).toMatchObject({ altIntent: 'meaningful', altText: 'Five swatches' });
        mounted.unmount();
    });

    it('keeps the dialog open with a message and changes nothing when Meaningful is saved with no text', async () => {
        const mounted = await mountImages({ blocks: [figure('image-1', { altIntent: 'missing', altText: '' })] });

        await press(screen.getByRole('button', { name: 'Add alternative text' }));
        await press(within(dialog()).getByRole('button', { name: 'Save' }));

        const field = within(dialog()).getByRole('textbox', { name: 'Alternative text' });
        expect(field).toHaveAccessibleDescription('Enter alternative text, or choose Decorative.');
        expect(field).toHaveAttribute('aria-invalid', 'true');
        expect(document.activeElement).toBe(field);
        expect(liveRegionFaults(document.body)).toEqual([]);
        expect(mounted.changes).toEqual([]);
        mounted.unmount();
    });

    it('fills the field with the alternative text the image already has', async () => {
        const mounted = await mountImages({ blocks: [figure('image-1', { altText: 'Frontify logo' })] });

        await press(screen.getByRole('button', { name: 'Alternative text' }));

        expect(within(dialog()).getByRole('textbox', { name: 'Alternative text' })).toHaveValue('Frontify logo');
        mounted.unmount();
    });

    it('reads the same-asset images without reading the document when it opens', async () => {
        const mounted = await mountImages({
            blocks: [figure('image-1', { altText: 'Frontify logo' }), figure('image-2', { altText: 'Other' })],
        });
        const snapshot = vi.spyOn(mounted.handle, 'getSnapshot');

        const [first] = screen.getAllByRole('button', { name: 'Alternative text' });
        await press(first as Element);

        expect(within(dialog()).getByRole('textbox', { name: 'Alternative text' })).toHaveValue('Frontify logo');
        expect(snapshot).not.toHaveBeenCalled();
        mounted.unmount();
    });

    it('offers the meaningful text of another image of the same asset, which only the author fills in', async () => {
        const mounted = await mountImages({
            blocks: [
                figure('image-1', { altText: 'Frontify logo' }),
                figure('image-2', { altIntent: 'missing', altText: '' }),
            ],
        });

        await press(screen.getByRole('button', { name: 'Add alternative text' }));
        const field = within(dialog()).getByRole('textbox', { name: 'Alternative text' });

        expect(field).toHaveValue('');
        expect(dialog()).toHaveTextContent('Another use of this image is described as Frontify logo');
        await press(within(dialog()).getByRole('button', { name: 'Use this text' }));
        expect(field).toHaveValue('Frontify logo');
        expect(mounted.changes).toEqual([]);
        await press(within(dialog()).getByRole('button', { name: 'Save' }));
        expect(mounted.imageOf('image-2')).toMatchObject({ altIntent: 'meaningful', altText: 'Frontify logo' });
        mounted.unmount();
    });

    it('shows a visible Add alternative text button on an image whose alternative text is missing, which opens the dialog', async () => {
        const mounted = await mountImages({ blocks: [figure('image-1', { altIntent: 'missing', altText: '' })] });
        const button = screen.getByRole('button', { name: 'Add alternative text' });

        expect(button).toHaveTextContent('Add alternative text');
        await press(button);
        expect(dialog()).toBeInTheDocument();
        mounted.unmount();
    });

    it('opens for the selected image through image.alt.edit, as the More menu runs it', async () => {
        const mounted = await mountImages({
            blocks: [figure('image-1'), figure('image-2', { altText: 'Second' })],
        });
        mounted.selectImage('image-2');

        act(() => {
            mounted.handle.execute('image.alt.edit');
        });

        expect(within(dialog()).getByRole('textbox', { name: 'Alternative text' })).toHaveValue('Second');
        mounted.unmount();
    });
});

describe('the asset picker', () => {
    it('inserts the picked image at the caret the picker opened from, as one undo step with no URL stored', async () => {
        const picker = deferredPicker();
        const mounted = await mountImages({ blocks: [para(text('Before'))], services: { assets: picker.service } });
        act(() => setSelection(mounted.handle, { text: 'Before', from: 6, to: 6 }));

        act(() => {
            mounted.handle.execute('image.insert');
        });
        expect(picker.pick).toHaveBeenCalledWith({ purpose: 'image' }, expect.anything());
        picker.pending[0]?.resolve({ ...PALETTE, url: 'https://cdn.frontify.test/palette.jpg?token=t1' } as never);
        await flush();

        const [, inserted] = mounted.blocksOf();
        expect(inserted?.type).toBe('figure');
        const children = inserted?.content;
        const first = children?.[0];
        const attrs = first?.attrs;
        expect(Object.keys(attrs ?? {}).sort()).toEqual(
            [
                'altIntent',
                'altText',
                'assetId',
                'displayWidth',
                'height',
                'labelSnapshot',
                'mediaType',
                'nodeId',
                'width',
            ].sort(),
        );
        expect(attrs).toMatchObject({ ...PALETTE, altIntent: 'missing', width: null, height: null });
        expect(JSON.stringify(mounted.handle.getSnapshot().document)).not.toContain('token');
        expect(mounted.changes.map(({ origin, commandId }) => [origin, commandId])).toEqual([
            ['command', 'image.insert'],
        ]);
        expect(mounted.view.hasFocus()).toBe(true);
        act(() => {
            mounted.handle.execute('history.undo');
        });
        expect(mounted.blocksOf().map(({ type }) => type)).toEqual(['paragraph']);
        mounted.unmount();
    });

    it('changes nothing when the picker answers null', async () => {
        const picker = deferredPicker();
        const mounted = await mountImages({ blocks: [para(text('Before'))], services: { assets: picker.service } });

        act(() => {
            mounted.handle.execute('image.insert');
        });
        picker.pending[0]?.resolve(null);
        await flush();

        expect(mounted.changes).toEqual([]);
        mounted.unmount();
    });

    it('inserts nothing and says the insertion point was removed when the paragraph that held it is gone', async () => {
        const picker = deferredPicker();
        const mounted = await mountImages({
            blocks: [para(text('Keep')), para(text('Gone'))],
            services: { assets: picker.service },
        });
        act(() => setSelection(mounted.handle, { text: 'Gone', from: 2, to: 2 }));
        act(() => {
            mounted.handle.execute('image.insert');
        });
        const { view } = mounted;
        act(() => {
            view.dispatch(view.state.tr.delete(6, view.state.doc.content.size));
        });
        const before = structuredClone(mounted.handle.getSnapshot().document);

        picker.pending[0]?.resolve(PALETTE);
        await flush();

        expect(mounted.handle.getSnapshot().document).toEqual(before);
        expect(announcerOf()).toHaveTextContent('The image was not inserted because the place for it was removed.');
        expect(view.hasFocus()).toBe(true);
        mounted.unmount();
    });

    it('refills the image from Replace image, keeping its nodeId and alternative text, and asks to review the text', async () => {
        const picker = deferredPicker();
        const mounted = await mountImages({ services: { assets: picker.service } });
        const before = mounted.imageOf('image-1');

        await press(screen.getByRole('button', { name: 'Replace image' }));
        picker.pending[0]?.resolve(PALETTE);
        await flush();

        const replaced = { ...PALETTE, width: null, height: null };
        expect(mounted.imageOf('image-1')).toEqual(Object.assign({ ...before }, replaced));
        expect(mounted.view.dom.querySelector('figure')).toHaveTextContent(
            'The image changed. Check that its alternative text still describes it.',
        );
        expect(screen.getByRole('button', { name: 'Review alternative text' })).toBeInTheDocument();
        expect(mounted.changes.map(({ commandId }) => commandId)).toEqual(['image.replace']);
        await press(screen.getByRole('button', { name: 'Keep alternative text' }));
        expect(mounted.view.dom.querySelector('figure')).not.toHaveTextContent('The image changed.');
        act(() => {
            mounted.handle.execute('history.undo');
        });
        expect(mounted.imageOf('image-1')).toEqual(before);
        mounted.unmount();
    });

    it('asks for no review when Replace image refills an image with no alternative text, which keeps asking for it', async () => {
        const picker = deferredPicker();
        const mounted = await mountImages({
            services: { assets: picker.service },
            blocks: [figure('image-1', { altIntent: 'missing', altText: '' })],
        });

        await press(screen.getByRole('button', { name: 'Replace image' }));
        picker.pending[0]?.resolve(PALETTE);
        await flush();

        expect(mounted.imageOf('image-1')).toMatchObject({ ...PALETTE, altIntent: 'missing', altText: '' });
        expect(mounted.view.dom.querySelector('figure')).not.toHaveTextContent('The image changed.');
        expect(screen.queryByRole('button', { name: 'Review alternative text' })).toBeNull();
        expect(screen.getByRole('button', { name: 'Add alternative text' })).toBeInTheDocument();
        mounted.unmount();
    });

    it('asks for no review when alternative text is written after Replace image refilled an image without it', async () => {
        const picker = deferredPicker();
        const mounted = await mountImages({
            services: { assets: picker.service },
            blocks: [figure('image-1', { altIntent: 'missing', altText: '' })],
        });

        await press(screen.getByRole('button', { name: 'Replace image' }));
        picker.pending[0]?.resolve(PALETTE);
        await flush();
        act(() => {
            mounted.runtime.nodeActions('image-1').update({ altIntent: 'meaningful', altText: 'Five swatches' });
        });

        expect(mounted.imageOf('image-1')).toMatchObject({ altIntent: 'meaningful', altText: 'Five swatches' });
        expect(screen.queryByRole('button', { name: 'Review alternative text' })).toBeNull();
        expect(mounted.view.dom.querySelector('figure')).not.toHaveTextContent('The image changed.');
        expect(nodeStateOf(mounted.runtime.state, 'image-1', REPLACED_ASSET)).toBeUndefined();
        mounted.unmount();
    });

    it('drops the review prompt of a replacement that is undone', async () => {
        const picker = deferredPicker();
        const mounted = await mountImages({ services: { assets: picker.service } });
        await press(screen.getByRole('button', { name: 'Replace image' }));
        picker.pending[0]?.resolve(PALETTE);
        await flush();
        expect(mounted.view.dom.querySelector('figure')).toHaveTextContent('The image changed.');

        act(() => {
            mounted.handle.execute('history.undo');
        });
        await flush();

        expect(mounted.view.dom.querySelector('figure')).not.toHaveTextContent('The image changed.');
        expect(screen.queryByRole('button', { name: 'Review alternative text' })).toBeNull();
        mounted.unmount();
    });

    it('leaves the document unchanged and says the image was removed when the image being replaced is gone', async () => {
        const picker = deferredPicker();
        const mounted = await mountImages({ services: { assets: picker.service } });
        await press(screen.getByRole('button', { name: 'Replace image' }));
        const { view } = mounted;
        const start = view.state.doc.child(0).nodeSize;
        act(() => {
            view.dispatch(view.state.tr.delete(start, start + view.state.doc.child(1).nodeSize));
        });
        const before = structuredClone(mounted.handle.getSnapshot().document);

        picker.pending[0]?.resolve(PALETTE);
        await flush();

        expect(mounted.handle.getSnapshot().document).toEqual(before);
        expect(announcerOf()).toHaveTextContent('The image was not replaced because it was removed.');
        expect(view.hasFocus()).toBe(true);
        mounted.unmount();
    });
});

describe('the image size', () => {
    it('sets displayWidth from the size menu by keyboard and by pointer taps, and through the numeric field', async () => {
        const mounted = await mountImages();
        const trigger = screen.getByRole('button', { name: 'Size: Original size' });

        act(() => {
            trigger.focus();
            fireEvent.keyDown(trigger, { key: 'Enter' });
        });
        expect(screen.getAllByRole('menuitemradio').map((item) => item.textContent)).toEqual([
            '25%',
            '50%',
            '75%',
            '100%',
            'Original size',
        ]);
        act(() => {
            fireEvent.keyDown(screen.getByRole('menuitemradio', { name: '50%' }), { key: 'Enter' });
        });
        await flush();
        expect(mounted.imageOf('image-1')?.displayWidth).toBe(50);

        openMenu('Size: 50%');
        await press(screen.getByRole('menuitemradio', { name: '25%' }));
        expect(mounted.imageOf('image-1')?.displayWidth).toBe(25);

        openMenu('Size: 25%');
        await press(screen.getByRole('menuitem', { name: 'Custom width…' }));
        const field = screen.getByRole('spinbutton', { name: 'Width in percent of the content width' });
        act(() => {
            fireEvent.change(field, { target: { value: '5' } });
        });
        await press(screen.getByRole('button', { name: 'Apply' }));
        expect(field).toHaveAccessibleDescription('Enter a whole number from 10 to 100.');
        expect(document.activeElement).toBe(field);
        expect(liveRegionFaults(document.body)).toEqual([]);
        act(() => {
            fireEvent.change(field, { target: { value: '60' } });
        });
        await press(screen.getByRole('button', { name: 'Apply' }));

        expect(mounted.imageOf('image-1')?.displayWidth).toBe(60);
        expect(mounted.changes).toHaveLength(3);
        mounted.unmount();
    });

    it('selects the image on a press on it, which shows the resize handle', async () => {
        const mounted = await mountImages();

        act(() => {
            fireEvent.mouseDown(mounted.view.dom.querySelector('figure img') as Element, { button: 0 });
        });
        await flush();

        expect(mounted.handle.getSummary().selection).toMatchObject({ kind: 'node', selectedNodeId: 'image-1' });
        expect(mounted.view.dom.querySelector('.ProseMirror-selectednode [data-rte-drag]')).not.toBeNull();
        mounted.unmount();
    });

    it('writes one undo step at the end of a resize drag, and none when Escape ends it with the old width', async () => {
        const mounted = await mountImages();
        mounted.selectImage('image-1');
        await flush();
        const handle = mounted.view.dom.querySelector('[data-rte-drag="image.size.set"]');
        const figureElement = mounted.view.dom.querySelector('figure');
        expect(handle).not.toBeNull();
        vi.spyOn(figureElement as HTMLElement, 'clientWidth', 'get').mockReturnValue(400);
        const frame = handle?.parentElement as HTMLElement;
        vi.spyOn(frame, 'getBoundingClientRect').mockReturnValue({ width: 40 } as DOMRect);
        const drag = (steps: number, end: () => void) => {
            act(() => {
                fireEvent.pointerDown(handle as Element, { pointerId: 1, clientX: 100, button: 0 });
            });
            for (let step = 1; step <= steps; step += 1) {
                act(() => {
                    fireEvent.pointerMove(handle as Element, { pointerId: 1, clientX: 100 + step * 10 });
                });
            }

            end();
        };

        drag(10, () => {
            expect(frame.style.inlineSize).toBe('35%');
            act(() => {
                fireEvent.pointerUp(handle as Element, { pointerId: 1, clientX: 200 });
            });
        });

        expect(mounted.imageOf('image-1')?.displayWidth).toBe(35);
        expect(mounted.changes).toHaveLength(1);
        await flush();
        drag(5, () => {
            expect(frame.style.inlineSize).toBe('23%');
            act(() => {
                pressKey(mounted.handle, 'Escape');
            });
            act(() => {
                fireEvent.pointerUp(handle as Element, { pointerId: 1, clientX: 150 });
            });
        });

        expect(frame.style.inlineSize).toBe('35%');
        expect(mounted.imageOf('image-1')?.displayWidth).toBe(35);
        expect(mounted.changes).toHaveLength(1);
        mounted.unmount();
    });

    it('adds at most one document keydown listener, the shared hub, during a resize drag', async () => {
        const mounted = await mountImages();
        mounted.selectImage('image-1');
        await flush();
        const handle = mounted.view.dom.querySelector('[data-rte-drag="image.size.set"]');
        vi.spyOn(mounted.view.dom.querySelector('figure') as HTMLElement, 'clientWidth', 'get').mockReturnValue(400);
        const added = vi.spyOn(document, 'addEventListener');
        act(() => {
            fireEvent.pointerDown(handle as Element, { pointerId: 1, clientX: 100, button: 0 });
        });
        const keydowns = added.mock.calls.filter(([type]) => type === 'keydown');
        act(() => {
            fireEvent.pointerUp(handle as Element, { pointerId: 1, clientX: 100 });
        });
        expect(keydowns.length).toBeLessThanOrEqual(1);
        mounted.unmount();
    });

    it('names image.size.set, which the size menu runs, as the alternative to its resize drag', async () => {
        const mounted = await mountImages();
        mounted.selectImage('image-1');
        await flush();

        const dragged = mounted.view.dom.querySelector('[data-rte-drag]')?.getAttribute('data-rte-drag');

        expect(dragged).toBe('image.size.set');
        expect(mounted.view.dom.querySelector(`button[data-rte-command="${dragged}"]`)).toHaveAccessibleName(
            'Size: Original size',
        );
        mounted.unmount();
    });

    it('opens the size and alignment menus with focus on their checked item', async () => {
        const mounted = await mountImages({ blocks: [figure('image-1', { displayWidth: 75 }, 'right')] });

        openMenu('Size: 75%');
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        expect(screen.getByRole('menuitemradio', { name: '75%' })).toHaveFocus();
        act(() => {
            fireEvent.keyDown(screen.getByRole('menuitemradio', { name: '75%' }), { key: 'Escape' });
        });
        await flush();
        expect(screen.queryByRole('menu')).toBeNull();
        openMenu('Alignment: Right');
        act(() => {
            vi.advanceTimersToNextFrame();
        });

        expect(screen.getByRole('menuitemradio', { name: 'Right' })).toHaveFocus();
        mounted.unmount();
    });

    it('shows the real side of each image without a selection, and one keystroke reads the document for none of them', async () => {
        const sides = ['left', 'right', 'center', 'center', 'center', 'center', 'center', 'center'] as const;
        const mounted = await mountImages({
            blocks: [para(text('Before')), ...sides.map((side, index) => figure(`image-${index}`, {}, side))],
        });
        const snapshot = vi.spyOn(mounted.handle, 'getSnapshot');
        setSelection(mounted.handle, { text: 'Before', from: 1, to: 1 });

        act(() => {
            typeText(mounted.handle, 'x');
        });
        await flush();

        expect(snapshot).not.toHaveBeenCalled();
        expect(screen.getAllByRole('button', { name: 'Alignment: Left' })).toHaveLength(1);
        expect(screen.getAllByRole('button', { name: 'Alignment: Right' })).toHaveLength(1);
        expect(screen.getAllByRole('button', { name: 'Alignment: Center' })).toHaveLength(6);
        mounted.unmount();
    });

    it('sets the figure side from the alignment menu', async () => {
        const mounted = await mountImages();

        openMenu('Alignment: Center');
        await press(screen.getByRole('menuitemradio', { name: 'Right' }));

        expect(mounted.blocksOf()[1]?.attrs).toMatchObject({ align: 'right' });
        expect(mounted.view.dom.querySelector('figure')?.getAttribute('data-align')).toBe('right');
        mounted.unmount();
    });
});

describe('animated images', () => {
    it('offers Pause where ImageDecoder cannot tell whether the image animates, and none for a JPEG', async () => {
        const mounted = await mountImages({
            blocks: [figure('image-1'), figure('image-2', { mediaType: 'image/jpeg' })],
        });
        await flush();

        expect(screen.getAllByRole('button', { name: 'Pause animation' })).toHaveLength(1);
        await press(screen.getByRole('button', { name: 'Pause animation' }));
        expect(screen.getByRole('button', { name: 'Play animation' })).toBeInTheDocument();
        expect(mounted.view.dom.querySelector('canvas[aria-hidden="true"]')).not.toBeNull();
        mounted.unmount();
    });

    it('starts paused under prefers-reduced-motion: reduce', async () => {
        vi.stubGlobal(
            'matchMedia',
            vi.fn((query: string) => ({ matches: query === '(prefers-reduced-motion: reduce)', media: query })),
        );
        const mounted = await mountImages();
        await flush();

        expect(screen.getByRole('button', { name: 'Play animation' })).toBeInTheDocument();
        mounted.unmount();
    });
});
