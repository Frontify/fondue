/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defineEditorPlugin } from '#/bridge/plugin';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { core } from '#/features/core/feature';
import {
    figure,
    flush,
    imageModel,
    mountImages,
    para,
    resolving,
    storedIn,
    text,
} from '#/features/media-image/__tests__/fixtures/mount';
import { mediaImage } from '#/features/media-image/feature';
import { defineEditor, defineReactPresentation, type EditorHandle, RichTextEditor } from '#/index';
import { enUS } from '#/locales/en-US';
import { setSelection } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
});

/** Fires `contextmenu` on `element` and tells whether the editor prevented it. */
const prevents = (element: Element) => {
    let dispatched = true;
    act(() => {
        dispatched = fireEvent.contextMenu(element, { button: 2 });
    });
    return !dispatched;
};

// The More row that switches the toolbar mode, which runs no command.
const MODE_SWITCH = 'Show toolbar on selection only';

/** Each row of the open menu but the mode switch: its accessible name, state and shortcut. */
const rowsOf = (menu: HTMLElement) => {
    const rows: { name: string; disabled: string | null; keys: string | null }[] = [];
    // The name matcher sees every row with its accessible name, in order.
    within(menu).queryAllByRole('menuitem', {
        name: (name, row) => {
            if (name !== MODE_SWITCH && row !== null) {
                rows.push({
                    name,
                    disabled: row.getAttribute('aria-disabled'),
                    keys: row.getAttribute('aria-keyshortcuts'),
                });
            }
            return true;
        },
    });
    return rows;
};

describe('the context menu', () => {
    it('leaves contextmenu on a text selection to the browser, and opens no menu', async () => {
        const mounted = await mountImages();
        act(() => setSelection(mounted.handle, { text: 'Before' }));

        expect(prevents(screen.getByText('Before'))).toBe(false);
        expect(screen.queryByRole('menu')).toBeNull();
        mounted.unmount();
    });

    it('opens on a selected image with the rows the More menu holds below the toolbar items, in its order and states', async () => {
        const mounted = await mountImages();
        mounted.selectImage('image-1');

        expect(prevents(mounted.view.dom.querySelector('figure') as Element)).toBe(true);
        const context = rowsOf(screen.getByRole('menu'));
        act(() => {
            fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
        });
        expect(screen.queryByRole('menu')).toBeNull();
        act(() => {
            fireEvent.keyDown(screen.getByRole('button', { name: 'More' }), { key: 'Enter' });
        });

        // The image chrome's commands follow the rows of the parts before `media.image`, while the image is selected (DR-126).
        expect(context.map(({ name }) => name)).toEqual([
            'Move up',
            'Move down',
            'Alternative text',
            'Image size',
            'Custom width…',
            'Image alignment',
            'Replace image',
            'Mention',
        ]);
        expect(context[7]?.disabled).toBe('true');
        expect(rowsOf(screen.getByRole('menu'))).toEqual(context);
        mounted.unmount();
    });

    it('keeps the browser menu off its own rows, where a key sends contextmenu to the focused row', async () => {
        const mounted = await mountImages();
        mounted.selectImage('image-1');
        prevents(mounted.view.dom.querySelector('figure') as Element);

        expect(prevents(screen.getAllByRole('menuitem')[0] as Element)).toBe(true);
        mounted.unmount();
    });

    it('selects the image whose view a contextmenu targets, and opens on it', async () => {
        const mounted = await mountImages();
        act(() => setSelection(mounted.handle, { text: 'Before' }));

        expect(prevents(mounted.view.dom.querySelector('figure img') as Element)).toBe(true);
        expect(mounted.handle.getSummary().selection.selectedNodeId).toBe('image-1');
        expect(screen.getByRole('menu')).toBeInTheDocument();
        mounted.unmount();
    });

    /** Mounts images with `media.image`, its toolbar showing the moves or only Image, and selects the image. */
    const mountSelected = async ({
        readOnly,
        shippedParts,
    }: {
        readonly readOnly: boolean;
        readonly shippedParts: boolean;
    }) => {
        const model = imageModel([core(), mediaImage()]);
        // A host core part that shows Move up and Move down in the toolbar leaves More no row of its own.
        const toolbarMoves = defineEditorPlugin(core(), {
            toolbar: [
                { id: 'up', kind: 'button', command: 'block.move.up', labelKey: 'RichTextEditor_moveUp', icon: '' },
                {
                    id: 'down',
                    kind: 'button',
                    command: 'block.move.down',
                    labelKey: 'RichTextEditor_moveDown',
                    icon: '',
                },
            ],
        });
        let plugins: readonly (typeof toolbarMoves)[] = [toolbarMoves];
        let toolbar = [['image.insert', 'block.move.up', 'block.move.down']];
        if (shippedParts) {
            plugins = [];
            toolbar = [['image.insert']];
        }
        const ref = createRef<EditorHandle<object>>();
        const view = render(
            <RichTextEditor
                aria-label="Notes"
                definition={defineEditor({ id: 'test.images', model, plugins: unitsOf(model, plugins) })}
                presentation={defineReactPresentation({ toolbar, resolveAssetUrl: resolving })}
                readOnly={readOnly}
                defaultValue={{
                    documentId: 'document-1',
                    revision: null,
                    document: storedIn(model, [para(text('Before')), figure('image-1'), para(text('After'))]),
                }}
                ref={ref}
            />,
        );
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        await flush();
        act(() => setSelection(ref.current as object, { nodeId: 'image-1' }));

        return view;
    };

    it('leaves the browser menu on a selected image with no enabled row, and on text after it', async () => {
        const view = await mountSelected({ readOnly: true, shippedParts: true });

        expect(prevents(view.container.querySelector('figure') as Element)).toBe(false);
        expect(screen.queryByRole('menu')).toBeNull();
        expect(prevents(screen.getByText('Before'))).toBe(false);
        view.unmount();
    });

    it('names a row of a host node entry by its label, in the UI locale of the editor', async () => {
        const model = imageModel([core(), mediaImage()]);
        const hostNote = defineEditorPlugin(mediaImage(), {
            commands: { 'host.note': { run: () => true } },
            toolbar: [
                {
                    id: 'note',
                    kind: 'button',
                    command: 'host.note',
                    node: 'asset_image',
                    label: { 'en-US': 'Host note', de: 'Notiz' },
                    icon: '',
                },
            ],
        });
        const ref = createRef<EditorHandle<object>>();
        const view = render(
            <RichTextEditor
                aria-label="Notes"
                definition={defineEditor({ id: 'test.images', model, plugins: unitsOf(model, [hostNote]) })}
                presentation={defineReactPresentation({ toolbar: [['image.insert']], resolveAssetUrl: resolving })}
                locale={{ ...enUS, lang: 'de-DE' }}
                defaultValue={{
                    documentId: 'document-1',
                    revision: null,
                    document: storedIn(model, [para(text('Before')), figure('image-1')]),
                }}
                ref={ref}
            />,
        );
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        await flush();
        act(() => setSelection(ref.current as object, { nodeId: 'image-1' }));

        expect(prevents(view.container.querySelector('figure') as Element)).toBe(true);
        expect(rowsOf(screen.getByRole('menu')).map(({ name }) => name)).toContain('Notiz');
        view.unmount();
    });

    it('opens on a selected image with only its chrome rows when the toolbar shows the moves (DR-126)', async () => {
        const view = await mountSelected({ readOnly: false, shippedParts: false });

        expect(prevents(view.container.querySelector('figure') as Element)).toBe(true);
        expect(rowsOf(screen.getByRole('menu')).map(({ name }) => name)).toEqual([
            'Alternative text',
            'Image size',
            'Custom width…',
            'Image alignment',
            'Replace image',
        ]);
        view.unmount();
    });
});
