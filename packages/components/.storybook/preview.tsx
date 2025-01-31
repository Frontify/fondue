/* (c) Copyright Frontify Ltd., all rights reserved. */
import React, { ComponentType } from 'react';

import '../src/styles.scss';
import "@frontify/fondue-tokens/themeProvider/styles"
import { ThemeProvider } from '@frontify/fondue-tokens/themeProvider';
import type { Preview, Decorator, StoryContext } from '@storybook/react';

import DocumentationTemplate from './DocumentationTemplate.mdx';


const ThemeProviderWrapper: Decorator = (Story: ComponentType, context: StoryContext) => {
    return (
        <ThemeProvider theme={context.globals.theme || "light"}>
            <Story />
        </ThemeProvider>
    );
};

const preview: Preview = {
    globalTypes: {
        theme: {
            description: 'Global theme for components',
            toolbar: {
              // The label to show for this toolbar item
              title: 'Theme',
              icon: 'paintbrush',
              // Array of plain string values or MenuItem shape (see below)
              items: [
                {
                    left: "🌞",
                    value: 'light',
                    title: 'Light Theme',
                },
                {
                    left: "🌙",
                    value: 'dark',
                    title: 'Dark Theme',
                }
              ],
              // Change title based on selected value
              dynamicTitle: true,
            },
          },
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
