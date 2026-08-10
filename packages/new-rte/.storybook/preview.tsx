/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { type Decorator, type Preview } from '@storybook/react-vite';
import { type ComponentType } from 'react';

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
