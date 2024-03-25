import type { Preview } from '@storybook/react';
import DocumentationTemplate from './DocumentationTemplate.mdx';
const preview: Preview = {

    parameters: {
        docs: {
            page: DocumentationTemplate,
            toc: {
                title: "Table of contents",
                headingSelector: 'h2, h3',
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
