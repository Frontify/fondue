/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator } from '@playwright/test';

import { RouterProvider } from '../../RouterProvider/RouterProvider';
import { Card } from '../Card';

const CARD_TEST_ID = 'test-card';

// 1x1 transparent gif, so the image element lays out without a network request.
const TRANSPARENT_GIF = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

// Resolves a CSS custom property to its computed value (e.g. a token color or
// spacing length) using a throwaway probe element, mirroring readBorder below.
const resolveToken = (locator: Locator, property: 'color' | 'width', cssVariable: string) =>
    locator.evaluate(
        (_element, { property, cssVariable }) => {
            const probe = document.createElement('span');
            probe.style.setProperty(property, `var(${cssVariable})`);
            document.body.append(probe);
            const value = getComputedStyle(probe).getPropertyValue(property);
            probe.remove();
            return value;
        },
        { property, cssVariable },
    );

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

test('should apply inner padding to a padded banner image', async ({ mount }) => {
    const wrapper = await mount(
        <Card.Root data-test-id={CARD_TEST_ID}>
            <Card.Banner>
                <Card.BannerImage data-test-id="banner-image" src={TRANSPARENT_GIF} alt="" fit="contain" padding="medium" />
            </Card.Banner>
        </Card.Root>,
    );
    const image = wrapper.getByTestId('banner-image');

    // `medium` maps to --spacing-large (24px) by value, not the same-named token.
    const expectedPadding = await resolveToken(image, 'width', '--spacing-large');
    expect(await image.evaluate((element) => getComputedStyle(element).paddingTop)).toBe(expectedPadding);
    expect(await image.evaluate((element) => getComputedStyle(element).objectFit)).toBe('contain');
});

test('should render the inverted banner tone with a dark background and light icon', async ({ mount }) => {
    const wrapper = await mount(
        <Card.Root data-test-id={CARD_TEST_ID}>
            <Card.Banner data-test-id="banner" tone="inverted">
                <Card.BannerIcon data-test-id="banner-icon">
                    <svg />
                </Card.BannerIcon>
            </Card.Banner>
        </Card.Root>,
    );
    const banner = wrapper.getByTestId('banner');
    const icon = wrapper.getByTestId('banner-icon');

    const expectedBackground = await resolveToken(banner, 'color', '--color-primary-default');
    const expectedIconColor = await resolveToken(icon, 'color', '--color-primary-on-primary');

    expect(await banner.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe(expectedBackground);
    expect(await icon.evaluate((element) => getComputedStyle(element).color)).toBe(expectedIconColor);
});

test('should keep the dim banner tone on hover instead of the implicit shift', async ({ mount }) => {
    const wrapper = await mount(
        <RouterProvider navigate={() => {}} useHref={(path) => path}>
            <Card.Root data-test-id={CARD_TEST_ID} href="/page" aria-label="Card">
                <Card.Banner data-test-id="banner" tone="dim">
                    <Card.BannerIcon>
                        <svg />
                    </Card.BannerIcon>
                </Card.Banner>
            </Card.Root>
        </RouterProvider>,
    );
    const banner = wrapper.getByTestId('banner');
    const expectedDim = await resolveToken(banner, 'color', '--color-surface-dim');

    await wrapper.getByTestId(CARD_TEST_ID).hover();

    // Pinned tone opts out of the surface-hover shift that a tone-less banner gets.
    // Poll past the banner's color transition before asserting the settled value.
    await expect
        .poll(() => banner.evaluate((element) => getComputedStyle(element).backgroundColor))
        .toBe(expectedDim);
});

test('should still shift an un-toned banner background on hover', async ({ mount }) => {
    const wrapper = await mount(
        <RouterProvider navigate={() => {}} useHref={(path) => path}>
            <Card.Root data-test-id={CARD_TEST_ID} href="/page" aria-label="Card">
                <Card.Banner data-test-id="banner">
                    <Card.BannerIcon>
                        <svg />
                    </Card.BannerIcon>
                </Card.Banner>
            </Card.Root>
        </RouterProvider>,
    );
    const banner = wrapper.getByTestId('banner');
    const expectedHover = await resolveToken(banner, 'color', '--color-surface-hover');

    await wrapper.getByTestId(CARD_TEST_ID).hover();

    // Backward-compatibility guard: without `tone`, the legacy hover shift remains.
    // Poll past the banner's color transition before asserting the settled value.
    await expect
        .poll(() => banner.evaluate((element) => getComputedStyle(element).backgroundColor))
        .toBe(expectedHover);
});
