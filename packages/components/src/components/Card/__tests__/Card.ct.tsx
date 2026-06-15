/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, type Locator, test } from '@playwright/experimental-ct-react';

import { RouterProvider } from '../../RouterProvider/RouterProvider';
import { Card } from '../Card';

const CARD_TEST_ID = 'test-card';

const readBorder = (card: Locator) =>
    card.evaluate((element: Element) => {
        const probe = document.createElement('span');
        probe.style.color = 'var(--color-line-strong)';
        document.body.append(probe);
        const expectedColor = getComputedStyle(probe).color;
        probe.remove();

        return {
            boxShadow: getComputedStyle(element, '::after').boxShadow,
            expectedColor,
        };
    });

test('should render the border on the selected state', async ({ mount }) => {
    const wrapper = await mount(
        <RouterProvider navigate={() => {}} useHref={(path) => path}>
            <Card.Root data-test-id={CARD_TEST_ID} href="/page" onSelect={() => {}} selected aria-label="Card">
                <Card.Title>Card title</Card.Title>
            </Card.Root>
        </RouterProvider>,
    );
    const card = wrapper.getByTestId(CARD_TEST_ID);
    await expect(card).toHaveAttribute('data-selected', 'true');

    const { boxShadow, expectedColor } = await readBorder(card);

    expect(boxShadow).not.toBe('none');
    expect(boxShadow).toContain(expectedColor);
});

test('should keep the border on the selected state while hovered', async ({ mount }) => {
    const wrapper = await mount(
        <RouterProvider navigate={() => {}} useHref={(path) => path}>
            <Card.Root data-test-id={CARD_TEST_ID} href="/page" onSelect={() => {}} selected aria-label="Card">
                <Card.Title>Card title</Card.Title>
            </Card.Root>
        </RouterProvider>,
    );
    const card = wrapper.getByTestId(CARD_TEST_ID);
    await card.hover();

    const { boxShadow, expectedColor } = await readBorder(card);

    expect(boxShadow).not.toBe('none');
    expect(boxShadow).toContain(expectedColor);
});

test('should not render the card border when not selected', async ({ mount }) => {
    const wrapper = await mount(
        <RouterProvider navigate={() => {}} useHref={(path) => path}>
            <Card.Root data-test-id={CARD_TEST_ID} href="/page" onSelect={() => {}} selected={false} aria-label="Card">
                <Card.Title>Card title</Card.Title>
            </Card.Root>
        </RouterProvider>,
    );
    const card = wrapper.getByTestId(CARD_TEST_ID);
    await expect(card).toHaveAttribute('data-selected', 'false');

    const { boxShadow } = await readBorder(card);

    expect(boxShadow).toBe('none');
});
