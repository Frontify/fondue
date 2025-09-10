/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';

import { Tag } from '../Tag';

const TAG_TEXT = 'Frontify';

test('should render basic tag with text', async ({ mount }) => {
    const component = await mount(<Tag>{TAG_TEXT}</Tag>);
    await expect(component).toContainText(TAG_TEXT);
});

test('should render as button when clickable', async ({ mount }) => {
    const component = await mount(<Tag onClick={() => {}}>{TAG_TEXT}</Tag>);
    await expect(component.locator('button').first()).toBeVisible();
    await expect(component.locator('button').first()).toHaveClass(/mainContent/);
});

test('should render dismiss button when dismissable', async ({ mount }) => {
    const component = await mount(<Tag onDismiss={() => {}}>{TAG_TEXT}</Tag>);
    await expect(component.locator('button[aria-label^="Dismiss"]')).toBeVisible();
});

test('should apply variant styles', async ({ mount }) => {
    const component = await mount(<Tag variant="highlight">{TAG_TEXT}</Tag>);
    await expect(component).toHaveAttribute('data-variant', 'highlight');
});

test('should apply size styles', async ({ mount }) => {
    const component = await mount(<Tag size="small">{TAG_TEXT}</Tag>);
    await expect(component).toHaveAttribute('data-size', 'small');
});

test('should apply emphasis styles', async ({ mount }) => {
    const component = await mount(<Tag emphasis="weak">{TAG_TEXT}</Tag>);
    await expect(component).toHaveAttribute('data-emphasis', 'weak');
});

test('should handle disabled state', async ({ mount }) => {
    const component = await mount(<Tag disabled>{TAG_TEXT}</Tag>);
    await expect(component).toHaveAttribute('data-disabled', 'true');
});

test('should render icon with text', async ({ mount }) => {
    const component = await mount(
        <Tag>
            <IconIcon />
            {TAG_TEXT}
        </Tag>,
    );
    await expect(component.locator('svg')).toBeVisible();
    await expect(component).toContainText(TAG_TEXT);
});

test('should trigger onDismiss when close clicked', async ({ mount }) => {
    let dismissed = false;
    const component = await mount(
        <Tag
            onDismiss={() => {
                dismissed = true;
            }}
        >
            {TAG_TEXT}
        </Tag>,
    );
    await component.locator('button[aria-label^="Dismiss"]').click();
    expect(dismissed).toBe(true);
});

test('should render correct cross icon size', async ({ mount }) => {
    const component = await mount(<Tag onDismiss={() => {}}>{TAG_TEXT}</Tag>);
    const icon = await component.locator('svg').getAttribute('width');
    expect(icon).toBe('16');
});
