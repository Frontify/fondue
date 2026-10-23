/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Page } from '@playwright/test';

export const toolbarOf = (page: Page) => page.getByRole('toolbar', { name: 'Text formatting' });
