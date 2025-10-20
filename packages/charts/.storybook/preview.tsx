/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/legacy/tokens';
import '@frontify/fondue-tokens/styles';
import { Decorator, StoryContext, type Preview } from '@storybook/react-vite';
import { ComponentType } from 'react';
import '../src/index.css';
import { withTheme } from './components/StoryWithTheme';
import DocumentationTemplate from './DocumentationTemplate.mdx';

const ThemeProviderWrapper: Decorator = (Story: ComponentType, context: StoryContext) => {
    const { direction = 'ltr', theme = 'light' } = context.globals;

    if (theme === 'both') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
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
        direction: {
            name: 'Direction',
            description: 'Text direction',
            defaultValue: 'ltr',
            toolbar: {
                icon: 'paragraph',
                items: ['ltr', 'rtl'],
                dynamicTitle: true,
            },
        },
    },
    initialGlobals: {
        theme: 'light',
    },
    parameters: {
        docs: {
            page: DocumentationTemplate,
            toc: {
                title: 'Table of contents',
                headingSelector: 'h2, h3',
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        layout: 'fullscreen',
        status: {
            type: 'legacy',
            statuses: {
                released: {
                    background: 'rgb(50, 210, 182)',
                    color: '#ffffff',
                    description: 'This component is stable and released',
                },
                in_progress: {
                    background: 'rgb(154, 126, 254)',
                    color: '#ffffff',
                    description: 'This component is in progress',
                },
                planned: {
                    background: 'rgb(254, 194, 50)',
                    color: '#ffffff',
                    description: 'This component is planned to be revamped',
                },
                legacy: {
                    background: 'rgb(129, 132, 132)',
                    color: '#ffffff',
                    description: 'This is a legacy component',
                },
                deprecated: {
                    background: 'rgb(153, 33, 54)',
                    color: '#ffffff',
                    description: 'This is a legacy component',
                },
            },
        },
    },
    decorators: [ThemeProviderWrapper],
};

export default preview;
