/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { type Decorator, type Preview, type StoryContext } from '@storybook/react-vite';
import { type ComponentType } from 'react';
// The app owns the stylesheets of the libraries it brings: the editor's own
// SCSS modules ship as `@frontify/fondue-rich-text-editor/styles`, while the
// tokens and the component library are imported by the host — here, Storybook.
import '@frontify/fondue-tokens/styles';
import '@frontify/fondue-components/styles';

import './styles.css';

type Globals = {
    theme?: 'light' | 'dark';
};

const ThemeProviderWrapper: Decorator = (Story: ComponentType, context: StoryContext) => {
    const { theme = 'light' } = context.globals as Globals;
    return (
        <ThemeProvider theme={theme}>
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
    },
    initialGlobals: {
        theme: 'light',
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
