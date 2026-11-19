/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { ThemeProvider } from '@frontify/fondue-components';
import { deCH as componentsOnlyDeCH } from '@frontify/fondue-components/locales/de-CH';
import { act, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { deCH } from '#/locales/de-CH';

import { useEditorStrings } from './useEditorStrings';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const ENGLISH_EDITOR_NAME = 'Rich text editor';

const teardown: (() => void)[] = [];

afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
});

const Shown = (): ReactNode => {
    const { lang, strings } = useEditorStrings();

    return `${lang} ${strings.RichTextEditor_editor}`;
};

const mount = (element: ReactNode): HTMLElement => {
    const container = window.document.createElement('div');
    const root = createRoot(container);
    act(() => {
        root.render(element);
    });
    teardown.push(() => act(() => root.unmount()));

    return container;
};

describe('useEditorStrings', () => {
    it('shows English, quietly, with no ThemeProvider locale', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        teardown.push(() => warn.mockRestore());

        expect(mount(<Shown />).textContent).toBe(`en-US ${ENGLISH_EDITOR_NAME}`);
        expect(warn).not.toHaveBeenCalled();
    });

    it("takes the language and the strings from the ThemeProvider's locale", () => {
        const container = mount(
            <ThemeProvider locale={deCH}>
                <Shown />
            </ThemeProvider>,
        );

        expect(container.textContent).toBe(`de-CH ${deCH.translationStrings.RichTextEditor_editor}`);
    });

    it('shows English, and warns, for a locale that holds only the components strings', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        teardown.push(() => warn.mockRestore());

        const container = mount(
            <ThemeProvider locale={componentsOnlyDeCH}>
                <Shown />
            </ThemeProvider>,
        );

        expect(container.textContent).toBe(`en-US ${ENGLISH_EDITOR_NAME}`);
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('de-CH'));
    });
});
