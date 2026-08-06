/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { deDE, enUS, frFR } from '../../../locales';
import { ThemeProvider, useFondueTheme } from '../ThemeProvider';

const ContextProbe = ({ id }: { id: string }) => {
    const { theme, dir, locale, lang, className } = useFondueTheme();
    return (
        <div
            data-test-id={id}
            data-theme={theme}
            data-dir={dir}
            data-locale={locale.translationStrings.Dialog_close}
            data-lang={lang}
            data-scope={className}
        />
    );
};

describe('ThemeProvider context inheritance', () => {
    it('exposes default context values when no props are provided', () => {
        render(
            <ThemeProvider>
                <ContextProbe id="probe" />
            </ThemeProvider>,
        );

        const probe = screen.getByTestId('probe');
        expect(probe.dataset.theme).toBe('light');
        expect(probe.dataset.dir).toBe('ltr');
        expect(probe.dataset.locale).toBe(enUS.translationStrings.Dialog_close);
        expect(probe.dataset.scope).toBe('');
    });

    it('applies all explicitly provided props', () => {
        render(
            <ThemeProvider theme="dark" dir="rtl" locale={deDE} className="my-scope">
                <ContextProbe id="probe" />
            </ThemeProvider>,
        );

        const probe = screen.getByTestId('probe');
        expect(probe.dataset.theme).toBe('dark');
        expect(probe.dataset.dir).toBe('rtl');
        expect(probe.dataset.locale).toBe(deDE.translationStrings.Dialog_close);
        expect(probe.dataset.scope).toBe('my-scope');
    });

    it('inherits all values from the parent provider when no props are provided', () => {
        render(
            <ThemeProvider theme="dark" dir="rtl" locale={deDE} className="parent-scope">
                <ThemeProvider>
                    <ContextProbe id="probe" />
                </ThemeProvider>
            </ThemeProvider>,
        );

        const probe = screen.getByTestId('probe');
        expect(probe.dataset.theme).toBe('dark');
        expect(probe.dataset.dir).toBe('rtl');
        expect(probe.dataset.locale).toBe(deDE.translationStrings.Dialog_close);
        expect(probe.dataset.scope).toBe('parent-scope');
    });

    it('only overrides values explicitly set on the nested provider', () => {
        render(
            <ThemeProvider theme="dark" dir="rtl" locale={deDE} className="parent-scope">
                <ThemeProvider theme="light">
                    <ContextProbe id="probe" />
                </ThemeProvider>
            </ThemeProvider>,
        );

        const probe = screen.getByTestId('probe');
        expect(probe.dataset.theme).toBe('light');
        expect(probe.dataset.dir).toBe('rtl');
        expect(probe.dataset.locale).toBe(deDE.translationStrings.Dialog_close);
        expect(probe.dataset.scope).toBe('parent-scope');
    });

    it('merges overrides across multiple levels of nesting', () => {
        render(
            <ThemeProvider theme="dark" dir="rtl" locale={deDE} className="outer-scope">
                <ThemeProvider locale={frFR}>
                    <ThemeProvider dir="ltr">
                        <ContextProbe id="probe" />
                    </ThemeProvider>
                </ThemeProvider>
            </ThemeProvider>,
        );

        const probe = screen.getByTestId('probe');
        expect(probe.dataset.theme).toBe('dark');
        expect(probe.dataset.dir).toBe('ltr');
        expect(probe.dataset.locale).toBe(frFR.translationStrings.Dialog_close);
        expect(probe.dataset.scope).toBe('outer-scope');
    });

    it('falls back to deprecated translations prop when locale is not provided', () => {
        render(
            <ThemeProvider locale={deDE}>
                <ContextProbe id="probe" />
            </ThemeProvider>,
        );

        const probe = screen.getByTestId('probe');
        expect(probe.dataset.locale).toBe(deDE.translationStrings.Dialog_close);
    });

    it('prefers locale over the deprecated translations prop', () => {
        render(
            <ThemeProvider locale={frFR}>
                <ContextProbe id="probe" />
            </ThemeProvider>,
        );

        const probe = screen.getByTestId('probe');
        expect(probe.dataset.locale).toBe(frFR.translationStrings.Dialog_close);
    });

    it('renders the parent className alongside the inherited scope on a nested provider', () => {
        const { container } = render(
            <ThemeProvider theme="dark" className="parent-scope">
                <ThemeProvider>
                    <span data-test-id="child" />
                </ThemeProvider>
            </ThemeProvider>,
        );

        const providers = container.querySelectorAll('.fondue-theme-provider');
        expect(providers).toHaveLength(2);
        // The nested provider should re-apply the inherited scope class on its DOM node
        expect(providers[1]?.className).toContain('parent-scope');
    });
});

describe('ThemeProvider language', () => {
    it('does not set a lang attribute when no locale or lang is provided', () => {
        const { container } = render(
            <ThemeProvider>
                <ContextProbe id="probe" />
            </ThemeProvider>,
        );

        expect(container.querySelector('.fondue-theme-provider')?.hasAttribute('lang')).toBe(false);
        expect(screen.getByTestId('probe').dataset.lang).toBeUndefined();
    });

    it('derives the lang attribute from the provided locale', () => {
        const { container } = render(
            <ThemeProvider locale={deDE}>
                <ContextProbe id="probe" />
            </ThemeProvider>,
        );

        expect(container.querySelector('.fondue-theme-provider')?.getAttribute('lang')).toBe('de-DE');
        expect(screen.getByTestId('probe').dataset.lang).toBe('de-DE');
    });

    it('prefers an explicit lang over the locale', () => {
        const { container } = render(
            <ThemeProvider locale={deDE} lang="de-CH">
                <ContextProbe id="probe" />
            </ThemeProvider>,
        );

        expect(container.querySelector('.fondue-theme-provider')?.getAttribute('lang')).toBe('de-CH');
        expect(screen.getByTestId('probe').dataset.lang).toBe('de-CH');
    });

    it('inherits the lang on nested providers, as used by portaled content', () => {
        const { container } = render(
            <ThemeProvider locale={frFR}>
                <ThemeProvider>
                    <ContextProbe id="probe" />
                </ThemeProvider>
            </ThemeProvider>,
        );

        const providers = container.querySelectorAll('.fondue-theme-provider');
        expect(providers[1]?.getAttribute('lang')).toBe('fr-FR');
        expect(screen.getByTestId('probe').dataset.lang).toBe('fr-FR');
    });
});
