/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Page } from '@playwright/test';

/** The `securitypolicyviolation` events the page has seen, as the violated directive and the blocked URI. */
export const cspViolationsOf = (page: Page): Promise<readonly string[]> =>
    page.evaluate(() => window.cspViolations ?? []);
