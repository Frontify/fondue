/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/legacy/tokens';
import '@frontify/fondue-tokens/styles';
import '@frontify/fondue-tokens/themes/theme.dark.css';
import { type Preview } from '@storybook/react-vite';
import DocumentationTemplate from './DocumentationTemplate.mdx';

const preview: Preview = {
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
};

export default preview;
