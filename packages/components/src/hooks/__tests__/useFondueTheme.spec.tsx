/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { type ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import { ThemeProvider, useFondueTheme } from '../../components/ThemeProvider/ThemeProvider';

// Test component that uses the theme hook
const TestComponent = () => {
    const { theme, dir, translations } = useFondueTheme();
    return (
        <div>
            <div data-test-id="theme">{theme}</div>
            <div data-test-id="dir">{dir}</div>
            <div data-test-id="translations">{translations.Dialog_close}</div>
        </div>
    );
};

describe('useFondueTheme', () => {
    describe('without ThemeProvider', () => {
        it('returns default values including ltr direction', () => {
            const { getByTestId } = render(<TestComponent />);

            expect(getByTestId('theme')).toHaveTextContent('light');
            expect(getByTestId('dir')).toHaveTextContent('ltr');
            expect(getByTestId('translations')).toHaveTextContent('Close');
        });

        it('ensures dir is always defined and defaults to ltr', () => {
            const { getByTestId } = render(<TestComponent />);
            const dirElement = getByTestId('dir');

            expect(dirElement.textContent).toBe('ltr');
            expect(dirElement.textContent).not.toBe('');
            expect(dirElement.textContent).not.toBe('undefined');
        });
    });

    describe('with ThemeProvider', () => {
        it('returns ltr when explicitly set', () => {
            const { getByTestId } = render(
                <ThemeProvider dir="ltr">
                    <TestComponent />
                </ThemeProvider>,
            );

            expect(getByTestId('dir')).toHaveTextContent('ltr');
        });

        it('returns rtl when explicitly set', () => {
            const { getByTestId } = render(
                <ThemeProvider dir="rtl">
                    <TestComponent />
                </ThemeProvider>,
            );

            expect(getByTestId('dir')).toHaveTextContent('rtl');
        });

        it('returns ltr by default when dir is not specified', () => {
            const { getByTestId } = render(
                <ThemeProvider>
                    <TestComponent />
                </ThemeProvider>,
            );

            expect(getByTestId('dir')).toHaveTextContent('ltr');
        });
    });

    describe('nested ThemeProvider', () => {
        it('uses the closest provider value', () => {
            const { getByTestId } = render(
                <ThemeProvider dir="ltr">
                    <ThemeProvider dir="rtl">
                        <TestComponent />
                    </ThemeProvider>
                </ThemeProvider>,
            );

            expect(getByTestId('dir')).toHaveTextContent('rtl');
        });

        it('preserves parent ltr when child does not specify', () => {
            const { getByTestId } = render(
                <ThemeProvider dir="ltr" theme="dark">
                    <ThemeProvider theme="light">
                        <TestComponent />
                    </ThemeProvider>
                </ThemeProvider>,
            );

            expect(getByTestId('dir')).toHaveTextContent('ltr');
            expect(getByTestId('theme')).toHaveTextContent('light');
        });
    });

    describe('edge cases', () => {
        it('always returns a string for dir, never undefined or null', () => {
            const Wrapper = ({ children }: { children: ReactNode }) => <div>{children}</div>;
            const { getByTestId } = render(<TestComponent />, { wrapper: Wrapper });
            const dirValue = getByTestId('dir').textContent;

            expect(typeof dirValue).toBe('string');
            expect(dirValue).not.toBeNull();
            expect(dirValue).not.toBeUndefined();
            expect(['ltr', 'rtl']).toContain(dirValue);
        });
    });
});
