/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Decorator, type Preview, type StoryContext } from '@storybook/react-vite';
import { type ComponentType } from 'react';

import '@frontify/fondue-components/styles';
import '@frontify/fondue-tokens/styles';
import styles from '../dist/themes/themes.module.css';
import './styles.css';

import { withTheme } from './components/StoryWithTheme';

const ThemeProviderWrapper: Decorator = (Story: ComponentType, context: StoryContext) => {
    const { direction = 'ltr', theme = 'light' } = context.globals;

    if (theme === 'both') {
        return (
            <div className={`tw-flex tw-flex-col ${styles.base}`}>
                {withTheme(Story, { label: 'Light theme', theme: 'light', direction })}
                {withTheme(Story, { label: 'Dark theme', theme: 'dark', direction })}
            </div>
        );
    }

    return withTheme(Story, { theme, direction });
};

const preview: Preview = {
    globalTypes: {
        theme: {
            description: 'Global theme for components',
            toolbar: {
                title: 'Theme',
                icon: 'paintbrush',
                items: [
                    {
                        value: 'light',
                        title: 'Light theme',
                        icon: 'sun',
                    },
                    {
                        value: 'dark',
                        title: 'Dark theme',
                        icon: 'moon',
                    },
                    {
                        value: 'both',
                        title: 'Both themes',
                        icon: 'contrast',
                    },
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

        options: {
            storySort: {
                order: ['Tokens', 'Utilities', 'Typography', 'Layout', 'Components'],
                method: 'alphabetical',
            },
        },

        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        docs: {
            codePanel: true,
        },
    },
    decorators: [ThemeProviderWrapper],
};

export default preview;
