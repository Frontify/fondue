/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import '@frontify/fondue-tokens/styles';
import '@frontify/fondue-components/styles';
import { beforeMount } from '@playwright/experimental-ct-react/hooks';

declare global {
    interface Window {
        cspViolations?: string[];
    }
}

// Quality AC-032: the page runs under a Content Security Policy, and a suite fails on any violation it records.
window.cspViolations = [];
document.addEventListener('securitypolicyviolation', ({ violatedDirective, blockedURI }) => {
    window.cspViolations?.push(`${violatedDirective} ${blockedURI}`);
});

beforeMount(({ App }) =>
    Promise.resolve(
        <ThemeProvider theme="light">
            <App />
        </ThemeProvider>,
    ),
);
