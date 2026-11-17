/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { ThemeProvider } from '@frontify/fondue-components';
import { act, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { frCH } from '#/locales/fr-CH';
import { type RichTextLocale } from '#/locales/types';

import { useEditorLocale } from './useEditorLocale';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// A locale whose chunk fails to load, as a broken deploy would.
vi.mock('#/locales/nl-NL', () => {
    throw new Error('the chunk could not be fetched');
});

const teardown: (() => void)[] = [];

afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
});

type ShownLangProps = {
    locale?: RichTextLocale;
    onError?: (error: Error) => void;
};

const ShownLang = ({ locale, onError }: ShownLangProps): ReactNode => useEditorLocale(locale, onError).lang;

const mount = (element: ReactNode): HTMLElement => {
    const container = window.document.createElement('div');
    const root = createRoot(container);
    act(() => {
        root.render(element);
    });
    teardown.push(() => act(() => root.unmount()));
    return container;
};

describe('useEditorLocale', () => {
    it('shows English with no locale and no ThemeProvider language', () => {
        const container = mount(<ShownLang />);

        expect(container.textContent).toBe('en-US');
    });

    it("loads the locale for the ThemeProvider's lang", async () => {
        const container = mount(
            <ThemeProvider lang="de-CH">
                <ShownLang />
            </ThemeProvider>,
        );

        await vi.waitFor(() => expect(container.textContent).toBe('de-CH'));
    });

    it("prefers the locale prop to the ThemeProvider's lang", () => {
        const container = mount(
            <ThemeProvider lang="de-CH">
                <ShownLang locale={frCH} />
            </ThemeProvider>,
        );

        expect(container.textContent).toBe('fr-CH');
    });

    it('shows English for a language it ships no locale for', () => {
        const container = mount(
            <ThemeProvider lang="sv-SE">
                <ShownLang />
            </ThemeProvider>,
        );

        expect(container.textContent).toBe('en-US');
    });

    it('keeps the language it shows and reports a locale that fails to load', async () => {
        const onError = vi.fn<(error: Error) => void>();
        const container = mount(
            <ThemeProvider lang="nl-NL">
                <ShownLang onError={onError} />
            </ThemeProvider>,
        );

        await vi.waitFor(() => expect(onError).toHaveBeenCalledOnce());
        expect(onError.mock.calls[0]?.[0]).toBeInstanceOf(Error);
        expect(container.textContent).toBe('en-US');
    });
});
