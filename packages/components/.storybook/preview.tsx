/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType } from 'react';

import '@frontify/fondue-tokens/legacy/tokens';
import '@frontify/fondue-tokens/styles';
import '../src/styles.scss';

import { type Decorator, type Preview, type StoryContext } from '@storybook/react';
import { Flex } from '../src/components/Flex/Flex';

import DocumentationTemplate from './DocumentationTemplate.mdx';
import { withTheme } from './components/StoryWithTeme';

const ThemeProviderWrapper: Decorator = (Story: ComponentType, context: StoryContext) => {
    if (context.globals.theme === 'both') {
        return (
            <Flex direction="column">
                {withTheme(Story, 'light', { label: 'Light theme' })}
                {withTheme(Story, 'dark', { label: 'Dark theme' })}
            </Flex>
        );
    }
    return withTheme(Story, context.globals.theme);
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
                order: ['Tokens', 'Utilities'],
            },
        },
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
