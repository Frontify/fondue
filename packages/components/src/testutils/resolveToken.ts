/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Locator, type Page } from '@playwright/test';

/**
 * Resolves a CSS custom property (a token) to the computed value the browser reports,
 * so component tests can assert against the token instead of a hardcoded value.
 * Use `color` for color tokens and `width` for lengths (spacing, radius, border width).
 *
 * @example
 * await expect(item).toHaveCSS('background-color', await resolveToken(page, '--color-surface-hover'));
 */
export const resolveToken = (
    target: Page | Locator,
    cssVariable: `--${string}`,
    property: 'color' | 'width' = 'color',
) => {
    const page = 'mainFrame' in target ? target : target.page();
    return page.evaluate(
        ({ cssVariable, property }) => {
            const probe = document.createElement('span');
            probe.style.setProperty(property, `var(${cssVariable})`);
            document.body.append(probe);
            const value = getComputedStyle(probe).getPropertyValue(property);
            probe.remove();
            return value;
        },
        { cssVariable, property },
    );
};
