/* (c) Copyright Frontify Ltd., all rights reserved. */

import AxeBuilder from '@axe-core/playwright';
import { type Page } from '@playwright/test';

// Page-level rules about the bare test page (no main landmark, no h1), not about the component.
const PAGE_LEVEL_RULES = ['landmark-one-main', 'page-has-heading-one', 'region'];

// WCAG 2.2 AA, the editor's bar: axe's defaults leave out its rules, `target-size` among them.
const WCAG_22_AA = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

// Fondue's text field draws its placeholder under a transparent input, which axe cannot see through (5.7:1, measured by hand).
const FIELD_PLACEHOLDER = '[data-test-id="fondue-text-input"] div[aria-hidden="true"]';

/** An axe scan with the editor's bar, shared by the component tests that check accessibility. */
export const scan = (page: Page): AxeBuilder =>
    new AxeBuilder({ page }).withTags(WCAG_22_AA).disableRules(PAGE_LEVEL_RULES).exclude(FIELD_PLACEHOLDER);
