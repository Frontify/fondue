/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import '@frontify/fondue-tokens/styles';
import '@frontify/fondue-components/styles';
import { beforeMount } from '@playwright/experimental-ct-react/hooks';

beforeMount(({ App }) =>
    Promise.resolve(
        <ThemeProvider theme="light">
            <App />
        </ThemeProvider>,
    ),
);
