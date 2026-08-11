/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { type Decorator, type Preview } from '@storybook/react-vite';
import { type ComponentType } from 'react';
// The app owns the stylesheets of the libraries it brings: the editor's own
// SCSS modules ship as `@frontify/fondue-rich-text-editor/styles`, while the
// tokens and the component library are imported by the host — here, Storybook.
import '@frontify/fondue-tokens/styles';
import '@frontify/fondue-components/styles';

import './styles.css';

const ThemeProviderWrapper: Decorator = (Story: ComponentType) => {
    return (
        <ThemeProvider>
            <Story />
        </ThemeProvider>
    );
};

const preview: Preview = {
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
