/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement, type ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import { ThemeProvider } from '../../components/ThemeProvider/ThemeProvider';
import { type Translations } from '../../locales';
import { de } from '../../locales/de';
import { en } from '../../locales/en';
import { useTranslation } from '../useTranslation';

// Test component that uses the translation hook
const TestComponent = ({
    translationKey,
    variables,
}: {
    translationKey: string;
    variables?: Record<string, string>;
}) => {
    const { t } = useTranslation();
    return <div data-test-id="translated-text">{t(translationKey, variables)}</div>;
};

// Wrapper component for tests with default English translations
const DefaultWrapper = ({ children }: { children: ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;

// Custom render function that allows passing custom translations
const renderWithTranslations = (
    ui: ReactElement,
    translations?: Translations,
    options?: Omit<RenderOptions, 'wrapper'>,
) => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
        <ThemeProvider translations={translations}>{children}</ThemeProvider>
    );
    return render(ui, { wrapper: Wrapper, ...options });
};

describe('useTranslation', () => {
    describe('default English translations', () => {
        it('translates a simple key', () => {
            const { getByTestId } = render(<TestComponent translationKey="colorPicker.selectColor" />, {
                wrapper: DefaultWrapper,
            });

            expect(getByTestId('translated-text')).toHaveTextContent('Select Color');
        });

        it('translates nested keys', () => {
            const { getByTestId } = render(<TestComponent translationKey="dialog.close" />, {
                wrapper: DefaultWrapper,
            });

            expect(getByTestId('translated-text')).toHaveTextContent('Close');
        });

        it('handles variable interpolation', () => {
            const { getByTestId } = render(
                <TestComponent translationKey="table.sortByAscending" variables={{ column: 'Name' }} />,
                { wrapper: DefaultWrapper },
            );

            expect(getByTestId('translated-text')).toHaveTextContent('Sort by Name ascending');
        });

        it('handles multiple variable interpolation', () => {
            const { getByTestId } = render(
                <TestComponent translationKey="badge.dismiss" variables={{ label: 'Warning' }} />,
                { wrapper: DefaultWrapper },
            );

            expect(getByTestId('translated-text')).toHaveTextContent('Dismiss Warning');
        });

        it('returns the key as fallback when translation is not found', () => {
            const { getByTestId } = render(<TestComponent translationKey="nonexistent.key" />, {
                wrapper: DefaultWrapper,
            });

            expect(getByTestId('translated-text')).toHaveTextContent('nonexistent.key');
        });
    });

    describe('custom translations', () => {
        it('uses provided German translations', () => {
            const { getByTestId } = renderWithTranslations(
                <TestComponent translationKey="colorPicker.selectColor" />,
                de,
            );

            expect(getByTestId('translated-text')).toHaveTextContent('Farbe auswählen');
        });

        it('uses provided German translations with variables', () => {
            const { getByTestId } = renderWithTranslations(
                <TestComponent translationKey="table.sortByDescending" variables={{ column: 'Name' }} />,
                de,
            );

            expect(getByTestId('translated-text')).toHaveTextContent('Nach Name absteigend sortieren');
        });
    });

    describe('edge cases', () => {
        it('handles empty string variables', () => {
            const { getByTestId } = render(<TestComponent translationKey="badge.dismiss" variables={{ label: '' }} />, {
                wrapper: DefaultWrapper,
            });

            expect(getByTestId('translated-text')).toHaveTextContent('Dismiss');
        });

        it('handles missing variables in template strings', () => {
            const { getByTestId } = render(<TestComponent translationKey="table.sortByAscending" />, {
                wrapper: DefaultWrapper,
            });

            // Without variables, the ${column} placeholder remains in the string
            expect(getByTestId('translated-text')).toHaveTextContent('Sort by ${column} ascending');
        });

        it('handles special characters in translation values', () => {
            const { getByTestId } = render(<TestComponent translationKey="select.clear" />, {
                wrapper: DefaultWrapper,
            });

            expect(getByTestId('translated-text')).toHaveTextContent('clear input');
        });
    });

    describe('dynamic translation keys', () => {
        it('translates all keys defined in the English locale', () => {
            // Dynamically collect all translation keys from the en object
            const keys: string[] = [];
            const collectKeys = (obj: Record<string, unknown>, prefix = '') => {
                for (const [key, value] of Object.entries(obj)) {
                    const fullKey = prefix ? `${prefix}.${key}` : key;
                    if (typeof value === 'string') {
                        keys.push(fullKey);
                    } else if (typeof value === 'object' && value !== null) {
                        collectKeys(value as Record<string, unknown>, fullKey);
                    }
                }
            };
            collectKeys(en);

            // Test that all keys can be translated
            for (const key of keys) {
                const { getByTestId, unmount } = render(<TestComponent translationKey={key} />, {
                    wrapper: DefaultWrapper,
                });

                const element = getByTestId('translated-text');
                expect(element).toBeInTheDocument();
                expect(element.textContent).toBeTruthy();
                expect(element.textContent).not.toBe(key); // Should be translated, not return the key

                unmount();
            }
        });
    });
});
