/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, screen } from '@testing-library/react';
import { GapCursor } from 'prosemirror-gapcursor';
import { NodeSelection } from 'prosemirror-state';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { image, layoutModel, mountLayout, press } from '#/features/__tests__/fixtures/layout';
import { compiledModel } from '#/model/compile';
import { para, text } from '#/react/__tests__/fixtures/text';
import { typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

// The second figure starts at 3, after the first figure's open, image and close; each image sits right inside its figure.
const FIRST_IMAGE = 1;
const SECOND_IMAGE = 4;

/** Two images at the document start, then a paragraph, with the image at `selected` selected. */
const imagesFirst = (selected = SECOND_IMAGE) => {
    const mounted = mountLayout({ blocks: [image('asset-1'), image('asset-2'), para(text('Text'))] });
    const { state } = mounted.view;
    mounted.view.dispatch(state.tr.setSelection(NodeSelection.create(state.doc, selected)));
    return mounted;
};

describe('gap cursor', () => {
    it('installs the gap cursor of prosemirror-gapcursor in the structure phase, before the base keys', () => {
        const ids = compiledModel(layoutModel()).plugins.map(({ id }) => id);
        const gap = compiledModel(layoutModel()).plugins.find(({ id }) => id === 'gap-cursor');

        expect(gap?.phase).toBe('structure');
        expect(ids.indexOf('gap-cursor')).toBeLessThan(ids.indexOf('base-keys'));
    });

    it('shows a gap cursor between two images at the document start when an arrow key moves toward them', () => {
        const mounted = imagesFirst();

        const prevented = press(mounted, 'ArrowLeft');
        const { selection } = mounted.view.state;

        expect(prevented).toBe(true);
        expect(selection).toBeInstanceOf(GapCursor);
        expect(selection.from).toBe(SECOND_IMAGE - 1);
        expect(mounted.handle.getSummary().selection.kind).toBe('gap');
        expect(mounted.view.dom.querySelector('.ProseMirror-gapcursor')).not.toBeNull();
    });

    it('announces the gap cursor in the live region when the selection becomes one, and not on a move between gaps', () => {
        const mounted = imagesFirst();
        const region = screen.getByTestId('fondue-rich-text-editor-announcer');

        press(mounted, 'ArrowLeft');
        const entered = region.textContent;
        region.textContent = '';
        act(() => {
            const { state } = mounted.view;
            mounted.view.dispatch(state.tr.setSelection(new GapCursor(state.doc.resolve(0))));
        });
        const moved = region.textContent;

        expect(entered).toBe('Between blocks. Type to add a paragraph.');
        expect(moved).toBe('');
    });

    it('lets text be typed at the gap cursor between two images, as a new paragraph', () => {
        const mounted = imagesFirst();

        press(mounted, 'ArrowLeft');
        typeText(mounted.handle, 'Caption');

        expect(mounted.blocks()).toEqual([
            image('asset-1'),
            para(text('Caption')),
            image('asset-2'),
            para(text('Text')),
        ]);
    });

    it('shows a gap cursor before the first image at the document start, where text can be typed', () => {
        const mounted = imagesFirst(FIRST_IMAGE);

        press(mounted, 'ArrowUp');
        const at = mounted.view.state.selection;
        typeText(mounted.handle, 'Title');

        expect(at).toBeInstanceOf(GapCursor);
        expect(at.from).toBe(0);
        expect(mounted.blocks()).toEqual([para(text('Title')), image('asset-1'), image('asset-2'), para(text('Text'))]);
    });
});
