/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import './tailwind.css';
import '../../packages/charts/src/index.scss';
import { availableLocales } from '@frontify/fondue-components';
import { type Preview } from '@storybook/react-vite';

import { ThemeProviderWrapper } from './components/StoryWithTheme';
import DocumentationTemplate from './DocumentationTemplate.mdx';

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
        locale: {
            description: 'Locale for components',
            toolbar: {
                icon: 'globe',
                items: availableLocales.map((locale) => ({ value: locale, title: locale })),
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
        options: {
            storySort: {
                order: [
                    'Documentation',
                    [
                        'Getting started',
                        'Usage',
                        ['Components', 'Styling'],
                        'SDK',
                        ['Usage', 'Concepts', 'Examples', 'Reference'],
                        'Development',
                        ['Contributing', 'Upgrading'],
                    ],
                    'Tokens',
                    ['Colors', 'Semantic Tokens', 'Utilities', ['Typography', 'Custom']],
                    'Icons',
                    'Components',
                    'Typography',
                    'Layout',
                    'Providers',
                    'Charts',
                ],
                method: 'alphabetical',
            },
        },
        docs: {
            page: DocumentationTemplate,
            toc: {
                title: 'Table of contents',
                headingSelector: 'h2, h3',
            },
            codePanel: true,
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        // No default `type`: only stories that declare a status get a badge, docs pages get none.
        status: {
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
