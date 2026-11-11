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
                <Card.BannerImage
                    data-test-id="banner-image"
                    src={TRANSPARENT_GIF}
                    alt=""
                    fit="contain"
                    padding="medium"
                />
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
    await expect.poll(() => banner.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe(expectedDim);
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

const readHoverLayer = (card: Locator) =>
    card.evaluate((element) => {
        const layer = getComputedStyle(element, '::before');
        return { opacity: layer.opacity, backgroundColor: layer.backgroundColor };
    });

const readHoverOpacity = (card: Locator) => card.evaluate((element) => getComputedStyle(element, '::before').opacity);

test('should not transition the root background color', async ({ mount }) => {
    const wrapper = await mount(
        <RouterProvider navigate={() => {}} useHref={(path) => path}>
            <Card.Root data-test-id={CARD_TEST_ID} href="/page" aria-label="Card">
                <Card.Title>Card title</Card.Title>
            </Card.Root>
        </RouterProvider>,
    );

    // Chrome runs background-color transitions on the compositor and can paint the
    // start color for one frame when it hands back to the main thread, which reads
    // as a flicker on hover. The hover tint fades via the ::before layer's opacity.
    const transitionDuration = await wrapper
        .getByTestId(CARD_TEST_ID)
        .evaluate((element) => getComputedStyle(element).transitionDuration);
    expect(transitionDuration).toBe('0s');
});

test('should fade the hover tint in on hover and out on leave', async ({ mount, page }) => {
    const wrapper = await mount(
        <RouterProvider navigate={() => {}} useHref={(path) => path}>
            <Card.Root data-test-id={CARD_TEST_ID} href="/page" aria-label="Card">
                <Card.Banner>
                    <Card.BannerImage src={TRANSPARENT_GIF} />
                </Card.Banner>
                <Card.Title>Card title</Card.Title>
            </Card.Root>
        </RouterProvider>,
    );
    const card = wrapper.getByTestId(CARD_TEST_ID);
    const expectedHover = await resolveToken(card, 'color', '--color-surface-hover');
    const expectedDefault = await resolveToken(card, 'color', '--color-surface-default');
    expect(await readHoverOpacity(card)).toBe('0');

    await card.hover();
    await expect.poll(() => readHoverLayer(card)).toEqual({ opacity: '1', backgroundColor: expectedHover });
    expect(await card.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe(expectedDefault);

    await page.mouse.move(0, 0);
    await expect.poll(() => readHoverOpacity(card)).toBe('0');
});

test('should show the pressed tint while the card is pressed', async ({ mount, page }) => {
    const wrapper = await mount(
        <RouterProvider navigate={() => {}} useHref={(path) => path}>
            <Card.Root data-test-id={CARD_TEST_ID} href="/page" aria-label="Card">
                <Card.Title>Card title</Card.Title>
            </Card.Root>
        </RouterProvider>,
    );
    const card = wrapper.getByTestId(CARD_TEST_ID);
    const expectedActive = await resolveToken(card, 'color', '--color-surface-active');

    await card.hover();
    await page.mouse.down();

    await expect.poll(() => readHoverLayer(card)).toEqual({ opacity: '1', backgroundColor: expectedActive });
    await page.mouse.up();
});

test('should not show the hover tint on a non-interactive card', async ({ mount }) => {
    const wrapper = await mount(
        <Card.Root data-test-id={CARD_TEST_ID}>
            <Card.Title>Card title</Card.Title>
        </Card.Root>,
    );
    const card = wrapper.getByTestId(CARD_TEST_ID);

    await card.hover();

    expect(await readHoverOpacity(card)).toBe('0');
});

test('should render lang on the card root', async ({ mount }) => {
    const wrapper = await mount(
        <Card.Root data-test-id={CARD_TEST_ID} lang="fr-CH">
            <Card.Title>Card title</Card.Title>
        </Card.Root>,
    );
    await expect(wrapper.getByTestId(CARD_TEST_ID)).toHaveAttribute('lang', 'fr-CH');
});

const LONG_DESCRIPTION = Array.from({ length: 12 }, () => 'Central home for all campaign creative.').join(' ');

const readOpacity = (locator: Locator) => locator.evaluate((element) => getComputedStyle(element).opacity);

test('should fade the banner description in on hover and out on leave', async ({ mount, page }) => {
    const wrapper = await mount(
        <RouterProvider navigate={() => {}} useHref={(path) => path}>
            <div style={{ width: 280 }}>
                <Card.Root data-test-id={CARD_TEST_ID} href="/page" aria-label="Card">
                    <Card.Banner>
                        <Card.BannerDescription data-test-id="banner-description">Description</Card.BannerDescription>
                    </Card.Banner>
                    <Card.Title>Card title</Card.Title>
                </Card.Root>
            </div>
        </RouterProvider>,
    );
    const description = wrapper.getByTestId('banner-description');
    expect(await readOpacity(description)).toBe('0');

    await wrapper.getByTestId(CARD_TEST_ID).hover();
    await expect.poll(() => readOpacity(description)).toBe('1');

    await page.mouse.move(0, 0);
    await expect.poll(() => readOpacity(description)).toBe('0');
});

test('should transition the banner description with a 100ms ease-out', async ({ mount }) => {
    const wrapper = await mount(
        <Card.Root>
            <Card.Banner>
                <Card.BannerDescription data-test-id="banner-description">Description</Card.BannerDescription>
            </Card.Banner>
        </Card.Root>,
    );
    const transition = await wrapper.getByTestId('banner-description').evaluate((element) => {
        const style = getComputedStyle(element);
        return {
            property: style.transitionProperty,
            duration: style.transitionDuration,
            timing: style.transitionTimingFunction,
        };
    });
    expect(transition).toEqual({ property: 'opacity', duration: '0.1s', timing: 'ease-out' });
});

test('should reveal the banner description while the card has keyboard focus', async ({ mount, page }) => {
    const wrapper = await mount(
        <Card.Root>
            <Card.Banner>
                <Card.BannerDescription data-test-id="banner-description">Description</Card.BannerDescription>
            </Card.Banner>
            <Card.Action>
                <Card.ActionButton aria-label="Settings">
                    <svg />
                </Card.ActionButton>
            </Card.Action>
        </Card.Root>,
    );
    const description = wrapper.getByTestId('banner-description');
    expect(await readOpacity(description)).toBe('0');

    await page.keyboard.press('Tab');
    await expect(wrapper.getByRole('button', { name: 'Settings' })).toBeFocused();
    await expect.poll(() => readOpacity(description)).toBe('1');
});

test('should clamp a long banner description to the lines that fit the banner', async ({ mount }) => {
    const wrapper = await mount(
        <div style={{ width: 280 }}>
            <Card.Root>
                <Card.Banner data-test-id="banner">
                    <Card.BannerDescription data-test-id="banner-description">
                        {LONG_DESCRIPTION}
                    </Card.BannerDescription>
                </Card.Banner>
            </Card.Root>
        </div>,
    );
    const banner = wrapper.getByTestId('banner');
    const text = wrapper.getByTestId('banner-description').locator('p');

    await expect
        .poll(() => text.evaluate((element) => element.style.getPropertyValue('--card-banner-description-lines')))
        .not.toBe('');

    const { lines, lineHeight } = await text.evaluate((element) => ({
        lines: Number(element.style.getPropertyValue('--card-banner-description-lines')),
        lineHeight: Number.parseFloat(getComputedStyle(element).lineHeight),
    }));
    const bannerBox = await banner.boundingBox();
    const textBox = await text.boundingBox();
    expect(bannerBox).not.toBeNull();
    expect(textBox).not.toBeNull();
    expect(lines).toBeGreaterThanOrEqual(1);
    expect(textBox!.height).toBeLessThanOrEqual(lines * lineHeight + 1);
    expect(textBox!.y).toBeGreaterThanOrEqual(bannerBox!.y);
    expect(textBox!.y + textBox!.height).toBeLessThanOrEqual(bannerBox!.y + bannerBox!.height);
});

test('should center the banner description in the banner when the card is not selectable', async ({ mount }) => {
    const wrapper = await mount(
        <div style={{ width: 280 }}>
            <Card.Root>
                <Card.Banner data-test-id="banner">
                    <Card.BannerDescription data-test-id="banner-description">Description</Card.BannerDescription>
                </Card.Banner>
            </Card.Root>
        </div>,
    );
    const bannerBox = await wrapper.getByTestId('banner').boundingBox();
    const textBox = await wrapper.getByTestId('banner-description').locator('p').boundingBox();
    expect(bannerBox).not.toBeNull();
    expect(textBox).not.toBeNull();

    const bannerCenter = bannerBox!.y + bannerBox!.height / 2;
    const textCenter = textBox!.y + textBox!.height / 2;
    expect(Math.abs(textCenter - bannerCenter)).toBeLessThanOrEqual(1);
});

test('should center the banner description below the checkbox when the card is selectable', async ({ mount }) => {
    const wrapper = await mount(
        <RouterProvider navigate={() => {}} useHref={(path) => path}>
            <div style={{ width: 280 }}>
                <Card.Root href="/page" onSelect={() => {}} selected={false} aria-label="Card">
                    <Card.Banner data-test-id="banner">
                        <Card.BannerDescription data-test-id="banner-description">Description</Card.BannerDescription>
                    </Card.Banner>
                </Card.Root>
            </div>
        </RouterProvider>,
    );
    const checkboxBox = await wrapper.getByRole('button', { name: 'Select' }).boundingBox();
    const bannerBox = await wrapper.getByTestId('banner').boundingBox();
    const textBox = await wrapper.getByTestId('banner-description').locator('p').boundingBox();
    expect(checkboxBox).not.toBeNull();
    expect(bannerBox).not.toBeNull();
    expect(textBox).not.toBeNull();

    const spacingSmall = Number.parseFloat(await resolveToken(wrapper, 'width', '--spacing-small'));
    const spacingMedium = Number.parseFloat(await resolveToken(wrapper, 'width', '--spacing-medium'));
    const areaTop = checkboxBox!.y + checkboxBox!.height + spacingSmall;
    const areaBottom = bannerBox!.y + bannerBox!.height - spacingMedium;
    const textCenter = textBox!.y + textBox!.height / 2;
    expect(textBox!.y).toBeGreaterThanOrEqual(areaTop);
    expect(Math.abs(textCenter - (areaTop + areaBottom) / 2)).toBeLessThanOrEqual(1);
});

test('should draw a bottom border under the banner description', async ({ mount }) => {
    const wrapper = await mount(
        <Card.Root>
            <Card.Banner>
                <Card.BannerDescription data-test-id="banner-description">Description</Card.BannerDescription>
            </Card.Banner>
        </Card.Root>,
    );
    const description = wrapper.getByTestId('banner-description');
    const lineColor = await resolveToken(description, 'color', '--color-line-subtle');
    const boxShadow = await description.evaluate((element) => getComputedStyle(element).boxShadow);

    expect(boxShadow).toBe(`${lineColor} 0px -1px 0px 0px inset`);
});
