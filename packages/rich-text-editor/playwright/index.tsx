/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { beforeMount } from '@playwright/experimental-ct-react/hooks';
import '@frontify/fondue-tokens/styles';
import '@frontify/fondue-components/styles';

beforeMount(({ App }) =>
    Promise.resolve(
        <ThemeProvider>
            <App />
        </ThemeProvider>,
    ),
);
