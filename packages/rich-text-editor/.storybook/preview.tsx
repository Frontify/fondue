/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import '@frontify/fondue-components/styles';
import { ThemeProvider } from '@frontify/fondue-components';
import * as fondueLocales from '@frontify/fondue-components/locales';
import { type Decorator, type Preview } from '@storybook/react-vite';

import { axeViolations, featureTagFaults, globalsFaults, liveRegionFaults } from './checks';
import DocumentationTemplate from './DocumentationTemplate.mdx';

type ThemeName = 'light' | 'dark';
type FondueLocale = NonNullable<Parameters<typeof ThemeProvider>[0]['locale']>;
type Glob = (pattern: string, options: { readonly eager: true }) => Record<string, Record<string, unknown>>;

// Every locale file of the package is a locale of the toolbar, and its Fondue twin of the same name sets the theme locale.
const packageLocales = (import.meta as unknown as { readonly glob: Glob }).glob('../src/locales/??-??.ts', {
    eager: true,
});
const localeIds = Object.keys(packageLocales)
    .map((path) => /([a-z]{2}-[A-Z]{2})\.ts$/.exec(path)?.[1] ?? '')
    .filter((id) => id !== '')
    .sort();
const exportName = (id: string) => id.replace('-', '');
const fondueLocale = (id: string): FondueLocale =>
    (fondueLocales as Record<string, FondueLocale>)[exportName(id)] ?? fondueLocales.enUS;
const packageLocale = (id: string) => {
    const found = Object.entries(packageLocales).find(([path]) => path.endsWith(`/${id}.ts`));
    if (found === undefined) {
        return undefined;
    }
    return found[1][exportName(id)];
};

const ThemeProviderWrapper: Decorator = (Story, context) => {
    const {
        direction = 'ltr',
        theme = 'light',
        locale = 'en-US',
    } = context.globals as Partial<Record<'direction' | 'theme' | 'locale', string>>;
    let themes: readonly ThemeName[] = [theme as ThemeName];
    if (theme === 'both') {
        themes = ['light', 'dark'];
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {themes.map((name) => (
                <ThemeProvider key={name} theme={name} dir={direction as 'ltr' | 'rtl'} locale={fondueLocale(locale)}>
                    <div
                        style={{
                            padding: '2rem',
                            backgroundColor: 'var(--color-surface-default)',
                            color: 'var(--color-primary-default)',
                        }}
                    >
                        <Story args={{ ...context.args, locale: packageLocale(locale) }} />
                    </div>
                </ThemeProvider>
            ))}
        </div>
    );
};

const preview: Preview = {
    // SPEC-rich-text/AC-094: every story is `in progress` until the 1.0 release (SPEC-rich-text/AC-091).
    tags: ['inProgress'],
    globalTypes: {
        theme: {
            description: 'Global theme for the editor',
            toolbar: {
                title: 'Theme',
                icon: 'paintbrush',
                items: [
                    { value: 'light', title: 'Light theme', icon: 'sun' },
                    { value: 'dark', title: 'Dark theme', icon: 'moon' },
                    { value: 'both', title: 'Both themes', icon: 'contrast' },
                ],
                dynamicTitle: true,
            },
        },
        direction: {
            name: 'Direction',
            description: 'Text direction',
            toolbar: {
                icon: 'paragraph',
                items: ['ltr', 'rtl'],
                dynamicTitle: true,
            },
        },
        locale: {
            description: 'Locale for the editor strings',
            toolbar: {
                icon: 'globe',
                items: localeIds.map((id) => ({ value: id, title: id })),
                dynamicTitle: true,
            },
        },
    },
    initialGlobals: {
        theme: 'light',
        locale: 'en-US',
        direction: 'ltr',
    },
    parameters: {
        layout: 'fullscreen',
        docs: {
            page: DocumentationTemplate,
            toc: { title: 'Table of contents', headingSelector: 'h2, h3' },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    // The Storybook test runner runs this after every story, so each story is checked as the reader stories are.
    afterEach: async ({ canvasElement, globals, tags }) => {
        const faults = [
            ...globalsFaults(canvasElement, globals),
            ...featureTagFaults(tags),
            ...liveRegionFaults(canvasElement),
            ...(await axeViolations(canvasElement)),
        ];
        if (faults.length > 0) {
            throw new Error(faults.join('\n'));
        }
    },
    decorators: [ThemeProviderWrapper],
};

export default preview;
