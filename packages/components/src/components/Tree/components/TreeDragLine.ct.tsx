/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { TreeDragLine } from './TreeDragLine';

/**
 * `TreeDragLine` is a pure presentational component fed by `tree.getDragLineData()`.
 * It either renders nothing (when there is no active drag target) or a full-width
 * indicator line positioned at the given `top`.
 *
 * Mounting it directly here keeps the test independent of headless-tree's drag state
 * machine — drag execution itself is covered by `useTreeController` integration.
 */

test.describe('TreeDragLine', () => {
    test('renders nothing when given null data', async ({ mount }) => {
        const component = await mount(<TreeDragLine data={null} />);
        // The component returns null, so no element with `aria-hidden` (the dragline's
        // only static attribute) exists.
        await expect(component.locator('[aria-hidden="true"]')).toHaveCount(0);
    });

    test('renders a positioned line when given a top offset', async ({ mount }) => {
        const component = await mount(<TreeDragLine data={{ top: 42 }} />);
        const line = component.locator('[aria-hidden="true"]');
        await expect(line).toHaveCount(1);
        await expect(line).toHaveCSS('top', '42px');
        await expect(line).toHaveCSS('left', '0px');
    });
});
