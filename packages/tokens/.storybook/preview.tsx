/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Decorator, type Preview, type StoryContext } from '@storybook/react';
import { type ComponentType } from 'react';

import '@frontify/fondue-components/styles';
import '@frontify/fondue-tokens/styles';
import styles from '../dist/themes/themes.module.css';
import './styles.css';

import { withTheme } from './components/StoryWithTheme';

const ThemeProviderWrapper: Decorator = (Story: ComponentType, context: StoryContext) => {
    if (context.globals.theme === 'both') {
        return (
            <div className={`tw-flex tw-flex-col ${styles.base}`}>
                {withTheme(Story, 'light', { label: 'Light theme' })}
                {withTheme(Story, 'dark', { label: 'Dark theme' })}
            </div>
        );
    }
    return withTheme(Story, context.globals.theme as 'light' | 'dark');
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
    },
    decorators: [ThemeProviderWrapper],
};

export default preview;
