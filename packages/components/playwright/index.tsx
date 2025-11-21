/* (c) Copyright Frontify Ltd., all rights reserved. */

import { beforeMount } from '@playwright/experimental-ct-react/hooks';

import '@frontify/fondue-tokens/styles';
import '../src/styles.scss';

import { ThemeProvider } from '../src/components/ThemeProvider/ThemeProvider';

beforeMount(async ({ App }) => {
    return (
        <ThemeProvider theme="light">
            <App />
        </ThemeProvider>
    );
});
