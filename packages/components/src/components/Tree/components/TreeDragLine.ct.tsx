/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { TreeDragLine } from './TreeDragLine';

/**
 * `TreeDragLine` is a pure presentational component fed by `tree.getDragLineData()`.
 * It either renders nothing (when there is no active drag target) or an indicator line
 * positioned at the given `top`, starting under the chevron of the folder being dropped
 * into (`left` carries the drop level × 16px; the stylesheet adds the fixed row prefix)
 * and stretching to the tree's right edge.
 *
 * Mounting it directly here keeps the test independent of headless-tree's drag state
 * machine — drag execution itself is covered by `useTreeController` integration.
 */

test.describe('TreeDragLine', () => {
    test('renders nothing when given null data', async ({ mount }) => {
        const component = await mount(<TreeDragLine data={null} multiSelect={false} />);
        // The component returns null, so no element with `aria-hidden` (the dragline's
        // only static attribute) exists.
        await expect(component.locator('[aria-hidden="true"]')).toHaveCount(0);
    });

    test('renders a positioned line when given top and left offsets', async ({ mount }) => {
        const component = await mount(<TreeDragLine data={{ top: 42, left: 0 }} multiSelect={false} />);
        const line = component.locator('[aria-hidden="true"]');
        await expect(line).toHaveCount(1);
        await expect(line).toHaveCSS('top', '42px');
        // Root-level drop (left 0): no target folder to align with — no indent at all.
        await expect(line).toHaveCSS('left', '0px');
    });

    test('keeps root-level drops full-width in multi-select mode', async ({ mount }) => {
        const component = await mount(<TreeDragLine data={{ top: 42, left: 0 }} multiSelect={true} />);
        const line = component.locator('[aria-hidden="true"]');
        await expect(line).toHaveCSS('left', '0px');
    });

    test('aligns the line with the chevron of the target folder', async ({ mount }) => {
        // headless-tree's `left` is drop level × INDENT_STEP_PX (16px) — e.g. a drop two
        // levels deep yields 32px. The stylesheet adds 20px so the line starts under the
        // target folder's chevron (at 36px + folder level × 16px).
        const component = await mount(<TreeDragLine data={{ top: 42, left: 32 }} multiSelect={false} />);
        const line = component.locator('[aria-hidden="true"]');
        await expect(line).toHaveCSS('left', '52px');
        // The line still stretches to the tree's right edge.
        await expect(line).toHaveCSS('right', '0px');
    });

    test('shifts the line by the checkbox column in multi-select mode', async ({ mount }) => {
        // multiSelect renders a 16px checkbox + 4px gap before the indent, moving the
        // chevron column — and with it the line — 20px further right.
        const component = await mount(<TreeDragLine data={{ top: 42, left: 32 }} multiSelect={true} />);
        const line = component.locator('[aria-hidden="true"]');
        await expect(line).toHaveCSS('left', '72px');
    });
});
