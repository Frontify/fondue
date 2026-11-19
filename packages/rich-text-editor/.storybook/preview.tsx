/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { type Decorator, type Preview, type StoryContext } from '@storybook/react-vite';
import { type ComponentType } from 'react';
// The app owns the stylesheets of the libraries it brings: the editor's own
// SCSS modules ship as `@frontify/fondue-rich-text-editor/styles`, while the
// tokens and the component library are imported by the host — here, Storybook.
import '@frontify/fondue-tokens/styles';
import '@frontify/fondue-components/styles';

import * as locales from '../src/locales';

import './styles.css';

type Globals = {
    theme?: 'light' | 'dark';
    lang?: string;
};

const ENGLISH = 'en-US';

/** The shipped locales, by language tag, each holding the components' strings and the editor's. */
const LOCALES = new Map(Object.values(locales).map((locale) => [locale.lang ?? ENGLISH, locale]));

const ThemeProviderWrapper: Decorator = (Story: ComponentType, context: StoryContext) => {
    // Storybook types globals as a loose record, and `globalTypes` below declares `theme` with only these values.
    const { theme = 'light', lang = ENGLISH } = context.globals as Globals;
    return (
        <ThemeProvider theme={theme} locale={LOCALES.get(lang) ?? locales.enUS}>
            {/* The theme's colours exist only inside the provider, so the canvas is painted here, not on the body. */}
            <div className="tw-min-h-screen tw-bg-surface tw-text-primary">
                <Story />
            </div>
        </ThemeProvider>
    );
};

const preview: Preview = {
    globalTypes: {
        theme: {
            description: 'Theme of the editor and the canvas',
            toolbar: {
                title: 'Theme',
                icon: 'paintbrush',
                items: [
                    { value: 'light', title: 'Light theme', icon: 'sun' },
                    { value: 'dark', title: 'Dark theme', icon: 'moon' },
                ],
                dynamicTitle: true,
            },
        },
        lang: {
            description: "Language of the components and the editor, as a host's ThemeProvider locale sets it",
            toolbar: {
                title: 'Language',
                icon: 'globe',
                items: [...LOCALES.keys()],
                dynamicTitle: true,
            },
        },
    },
    initialGlobals: {
        theme: 'light',
        lang: ENGLISH,
    },
    parameters: {
        layout: 'fullscreen',
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [ThemeProviderWrapper],
};

export default preview;
