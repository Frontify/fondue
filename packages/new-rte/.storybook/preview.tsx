/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Preview } from '@storybook/react-vite';

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
};

export default preview;
