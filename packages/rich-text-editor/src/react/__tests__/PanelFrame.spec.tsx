/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type EditorPart } from '#/bridge/pluginApi/plugin';
import { type ContentModel, type Feature } from '#/model';
import {
    fixtureFindPanel,
    fixturePickerPanel,
    fixtureSearchPanel,
    fixtureThrowingFindPanel,
    openFind,
} from '#/plugins/__tests__/fixtures/panels';
import { contentChecks } from '#/plugins/ContentChecks/feature';
import { core } from '#/plugins/Core/feature';
import { liveRegionFaults } from '#/react/__tests__/fixtures/liveRegion';
import { mountText, para, text, textModel } from '#/react/__tests__/fixtures/text';
import { typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const modelOf = <const Features extends readonly Feature[]>(features: Features) => textModel(features);

const mountPanels = <Model extends ContentModel>(model: Model, plugins: readonly EditorPart[]) =>
    mountText({ model, plugins, blocks: [para(text('Hello'))] });

describe('editor panels', () => {
    it('closes the open panel when another panel opens, so only one panel is open', () => {
        const model = modelOf([core(), fixtureFindPanel.feature, contentChecks()]);
        const { handle, unmount } = mountPanels(model, [fixtureFindPanel.plugin]);

        act(() => {
            openFind(handle);
        });
        expect(screen.getByRole('search', { name: 'Find' })).toBeInTheDocument();

        act(() => {
            handle.execute('checks.open');
        });

        expect(screen.queryByRole('search', { name: 'Find' })).not.toBeInTheDocument();
        expect(screen.getByRole('region', { name: 'Accessibility checks' })).toBeInTheDocument();
        expect(document.querySelectorAll('[data-rte-panel]')).toHaveLength(1);
        unmount();
    });

    it('moves focus to the first focusable control of a panel that opens', () => {
        const { handle, unmount } = mountPanels(modelOf([core(), fixturePickerPanel.feature]), [
            fixturePickerPanel.plugin,
        ]);

        act(() => {
            openFind(handle);
        });

        expect(screen.getByRole('button', { name: 'Pick an emoji' })).toHaveFocus();
        unmount();
    });

    it('moves focus to the search field of a panel that opens, and closes it on Escape', () => {
        const { handle, view, unmount } = mountPanels(modelOf([core(), fixtureSearchPanel.feature]), [
            fixtureSearchPanel.plugin,
        ]);

        act(() => {
            openFind(handle);
        });
        const field = screen.getByRole('textbox', { name: 'Search' });
        expect(field).toHaveFocus();

        fireEvent.keyDown(field, { key: 'Escape' });
        expect(screen.queryByRole('search', { name: 'Find' })).not.toBeInTheDocument();
        expect(view.dom).toHaveFocus();
        unmount();
    });

    it('replaces a panel that throws with a closeable message and keeps the surface editable', () => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);
        const model = modelOf([core(), fixtureThrowingFindPanel.feature]);
        const { handle, view, unmount } = mountPanels(model, [fixtureThrowingFindPanel.plugin]);

        act(() => {
            openFind(handle);
        });

        expect(screen.getByText('This panel could not be shown.', { selector: 'p' })).toBeVisible();
        expect(screen.getByTestId('fondue-rich-text-editor-announcer')).toHaveTextContent(
            'This panel could not be shown.',
        );
        expect(liveRegionFaults(document.body)).toEqual([]);
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
        expect(
            screen.queryByText('The editor stopped working. Your latest changes are shown below.'),
        ).not.toBeInTheDocument();

        act(() => {
            typeText(handle, 'x');
        });
        expect(view.state.doc.textContent).toBe('xHello');

        fireEvent.click(screen.getByRole('button', { name: 'Close' }));

        expect(screen.queryByText('This panel could not be shown.', { selector: 'p' })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
        expect(view.dom.getAttribute('contenteditable')).toBe('true');
        vi.mocked(console.error).mockRestore();
        unmount();
    });
});
