/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator } from '@playwright/test';

import { resolveToken } from '#/testutils/resolveToken';

import { Dropdown } from '../../Dropdown/Dropdown';
import { RouterProvider } from '../../RouterProvider/RouterProvider';
import { Card } from '../Card';

const CARD_TEST_ID = 'test-card';

// 1x1 transparent gif, so the image element lays out without a network request.
const TRANSPARENT_GIF = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

const readBorder = async (card: Locator) => ({
    boxShadow: await card.evaluate((element: Element) => getComputedStyle(element, '::after').boxShadow),
    expectedColor: await resolveToken(card, '--color-line-strong'),
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

const readCheckboxGeometry = (checkbox: Locator) =>
    checkbox.evaluate((element: Element) => {
        const box = element.getBoundingClientRect();
        const icon = element.querySelector('svg')?.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
            box: { x: box.x, y: box.y, width: box.width, height: box.height },
            icon: icon ? { x: icon.x, y: icon.y } : null,
            borderWidths: [
                style.borderTopWidth,
                style.borderRightWidth,
                style.borderBottomWidth,
                style.borderLeftWidth,
            ],
        };
    });

const selectableCard = (selected: boolean) => (
    <RouterProvider navigate={() => {}} useHref={(path) => path}>
        <Card.Root data-test-id={CARD_TEST_ID} href="/page" onSelect={() => {}} selected={selected} aria-label="Card">
            <Card.Banner>
                <Card.BannerImage src={TRANSPARENT_GIF} />
            </Card.Banner>
            <Card.Title>Card title</Card.Title>
        </Card.Root>
    </RouterProvider>
);

test('should keep the checkbox and its check mark in place when the card gets selected', async ({ mount, page }) => {
    const component = await mount(selectableCard(false));
    const card = page.getByTestId(CARD_TEST_ID);
    const checkbox = card.getByRole('button', { name: 'Select' });
    const expectedBorderWidth = await resolveToken(card, '--border-width-default', 'width');
    await card.hover();

    const unselected = await readCheckboxGeometry(checkbox);

    await component.update(selectableCard(true));
    await expect(card).toHaveAttribute('data-selected', 'true');
    const selected = await readCheckboxGeometry(card.getByRole('button', { name: 'Deselect' }));

    expect(unselected.borderWidths).toEqual(Array(4).fill(expectedBorderWidth));
    expect(selected).toEqual(unselected);
});

test('should colour the selected checkbox border like its fill', async ({ mount, page }) => {
    await mount(selectableCard(true));
    const checkbox = page.getByTestId(CARD_TEST_ID).getByRole('button', { name: 'Deselect' });
    const expectedColor = await resolveToken(checkbox, '--color-primary-default');

    await expect(checkbox).toHaveCSS('background-color', expectedColor);
    await expect(checkbox).toHaveCSS('border-top-color', expectedColor);
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
    const expectedPadding = await resolveToken(image, '--spacing-large', 'width');
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

    const expectedBackground = await resolveToken(banner, '--color-primary-default');
    const expectedIconColor = await resolveToken(icon, '--color-primary-on-primary');

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
    const expectedDim = await resolveToken(banner, '--color-surface-dim');

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
    const expectedHover = await resolveToken(banner, '--color-surface-hover');

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
    const expectedHover = await resolveToken(card, '--color-surface-hover');
    const expectedDefault = await resolveToken(card, '--color-surface-default');
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
    const expectedActive = await resolveToken(card, '--color-surface-active');

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

    const spacingSmall = Number.parseFloat(await resolveToken(wrapper, '--spacing-small', 'width'));
    const spacingMedium = Number.parseFloat(await resolveToken(wrapper, '--spacing-medium', 'width'));
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
    const lineColor = await resolveToken(description, '--color-line-subtle');
    const boxShadow = await description.evaluate((element) => getComputedStyle(element).boxShadow);

    expect(boxShadow).toBe(`${lineColor} 0px -1px 0px 0px inset`);
});

const LONG_TITLE = 'A very long asset title that needs every pixel of the card footer to show';

const actionsCard = (actionsVisibility: 'always' | 'hover', selected = false) => (
    <RouterProvider navigate={() => {}} useHref={(path) => path}>
        <div style={{ width: 280 }}>
            <Card.Root
                data-test-id={CARD_TEST_ID}
                href="/page"
                onSelect={() => {}}
                selected={selected}
                aria-label="Card"
                actionsVisibility={actionsVisibility}
            >
                <Card.Title>{LONG_TITLE}</Card.Title>
                <Card.Action>
                    <Card.ActionButton aria-label="Settings">
                        <svg width="16" height="16" />
                    </Card.ActionButton>
                </Card.Action>
                <Card.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Card.ActionButton aria-label="More actions">
                                <svg width="16" height="16" />
                            </Card.ActionButton>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item onSelect={() => {}}>Edit</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </Card.Action>
            </Card.Root>
        </div>
    </RouterProvider>
);

const ACTIONS_TEST_ID = 'fondue-card-actions';

const readWidths = (card: Locator) =>
    card.evaluate((element) => {
        const actions = element.querySelector('[data-test-id="fondue-card-actions"]') as HTMLElement;
        const title = element.querySelector('[data-test-id="fondue-card-title"]') as HTMLElement;
        return { actions: actions.getBoundingClientRect().width, title: title.getBoundingClientRect().width };
    });

test('should show the actions without hover by default', async ({ mount, page }) => {
    await mount(actionsCard('always'));
    const actions = page.getByTestId(ACTIONS_TEST_ID);

    await expect(actions).toHaveCSS('opacity', '1');
    await expect(actions).not.toHaveCSS('width', '0px');
});

test('should hide hover-only actions without taking space and give the title the width', async ({ mount, page }) => {
    const component = await mount(actionsCard('always'));
    const card = page.getByTestId(CARD_TEST_ID);
    const actions = page.getByTestId(ACTIONS_TEST_ID);
    const always = await readWidths(card);

    await component.update(actionsCard('hover'));

    await expect(actions).toHaveCSS('width', '0px');
    await expect(actions).toHaveCSS('opacity', '0');
    const hidden = await readWidths(card);
    expect(hidden.title).toBe(always.title + always.actions);
});

test('should keep hover-only actions hidden on a selected card', async ({ mount, page }) => {
    await mount(actionsCard('hover', true));
    const actions = page.getByTestId(ACTIONS_TEST_ID);
    await expect(page.getByTestId(CARD_TEST_ID)).toHaveAttribute('data-selected', 'true');

    await expect(actions).toHaveCSS('width', '0px');
    await expect(actions).toHaveCSS('opacity', '0');
});

test('should reveal hover-only actions on hover and hide them on leave', async ({ mount, page }) => {
    await mount(actionsCard('hover', true));
    const actions = page.getByTestId(ACTIONS_TEST_ID);

    await page.getByTestId(CARD_TEST_ID).hover();
    await expect(actions).toHaveCSS('opacity', '1');
    await expect(actions).not.toHaveCSS('width', '0px');

    await page.mouse.move(0, 0);
    await expect(actions).toHaveCSS('width', '0px');
    await expect(actions).toHaveCSS('opacity', '0');
});

test('should reveal hover-only actions when they get keyboard focus', async ({ mount, page }) => {
    await mount(
        <Card.Root data-test-id={CARD_TEST_ID} actionsVisibility="hover">
            <Card.Title>{LONG_TITLE}</Card.Title>
            <Card.Action>
                <Card.ActionButton aria-label="Settings">
                    <svg width="16" height="16" />
                </Card.ActionButton>
            </Card.Action>
        </Card.Root>,
    );
    const actions = page.getByTestId(ACTIONS_TEST_ID);
    await expect(actions).toHaveCSS('width', '0px');

    await page.keyboard.press('Tab');

    await expect(actions.getByRole('button', { name: 'Settings' })).toBeFocused();
    await expect(actions).toHaveCSS('opacity', '1');
    await expect(actions).not.toHaveCSS('width', '0px');
});

test('should keep hover-only actions visible while their menu is open', async ({ mount, page }) => {
    await mount(actionsCard('hover'));
    const actions = page.getByTestId(ACTIONS_TEST_ID);

    await page.getByTestId(CARD_TEST_ID).hover();
    await actions.getByRole('button', { name: 'More actions' }).click();
    await expect(page.getByRole('menu')).toBeVisible();
    await page.mouse.move(0, 0);

    await expect(actions).toHaveCSS('opacity', '1');
    await expect(actions).not.toHaveCSS('width', '0px');
});

const bannerCard = (
    <RouterProvider navigate={() => {}} useHref={(path) => path}>
        <Card.Root data-test-id={CARD_TEST_ID} href="/page" aria-label="Card">
            <Card.Banner>
                <Card.BannerImage src={TRANSPARENT_GIF} />
            </Card.Banner>
            <Card.Title>Card title</Card.Title>
        </Card.Root>
    </RouterProvider>
);

const readTransitionTiming = (card: Locator) =>
    card.evaluate((root) => {
        const timingOf = (style: CSSStyleDeclaration, property: string) => {
            const properties = style.transitionProperty.split(', ');
            const index = properties.indexOf(property);
            if (index === -1) {
                return null;
            }
            const durations = style.transitionDuration.split(', ');
            const easings = style.transitionTimingFunction.split(/, (?![^(]*\))/);
            return {
                duration: durations[index % durations.length],
                easing: easings[index % easings.length],
            };
        };
        const banner = root.querySelector('[data-test-id="fondue-card-banner"]') as Element;
        return {
            hoverTint: timingOf(getComputedStyle(root, '::before'), 'opacity'),
            bannerRadius: timingOf(getComputedStyle(banner), 'border-radius'),
            bannerBorder: timingOf(getComputedStyle(banner, '::after'), 'box-shadow'),
        };
    });

// WebKit can dispatch transitionrun after a 150ms transition has ended; a long one is still running when frozen.
const STRETCHED_TRANSITION_MS = 1_000_000;

type BannerMidpoint = { radius: string; overlayRadius: string };

type BannerMidpointWindow = { bannerMidpoint?: Promise<BannerMidpoint> };

const freezeAtBannerRadiusMidpoint = (card: Locator) =>
    card.evaluate((root: HTMLElement, durationMs: number) => {
        const state = window as unknown as BannerMidpointWindow;
        delete state.bannerMidpoint;
        const banner = root.querySelector('[data-test-id="fondue-card-banner"]') as HTMLElement;
        banner.style.transitionDuration = `${durationMs}ms`;
        const onRun = (event: TransitionEvent) => {
            if (event.target !== banner || event.pseudoElement || event.propertyName !== 'border-bottom-left-radius') {
                return;
            }
            root.removeEventListener('transitionrun', onRun);
            const transition = banner
                .getAnimations()
                .find(
                    (animation): animation is CSSTransition =>
                        animation instanceof CSSTransition &&
                        animation.transitionProperty === 'border-bottom-left-radius',
                );
            if (!transition) {
                throw new Error('The banner has no border-bottom-left-radius transition to freeze');
            }

            transition.pause();
            transition.currentTime = durationMs / 2;

            state.bannerMidpoint = transition.ready.then(() => ({
                radius: getComputedStyle(banner).borderBottomLeftRadius,
                overlayRadius: getComputedStyle(banner, '::after').borderBottomLeftRadius,
            }));
        };
        root.addEventListener('transitionrun', onRun);
    }, STRETCHED_TRANSITION_MS);

const readBannerMidpoint = (card: Locator) =>
    card.evaluate(() => (window as unknown as BannerMidpointWindow).bannerMidpoint);

test('should ease the banner corners and border with the hover tint', async ({ mount, page }) => {
    await mount(bannerCard);
    const card = page.getByTestId(CARD_TEST_ID);

    const { hoverTint, bannerRadius, bannerBorder } = await readTransitionTiming(card);

    expect(hoverTint).toEqual({ duration: '0.15s', easing: 'cubic-bezier(0.4, 0, 0.2, 1)' });
    expect(bannerRadius).toEqual(hoverTint);
    expect(bannerBorder).toEqual(hoverTint);
});

test('should round the banner corners partway through the hover transition in both directions', async ({
    mount,
    page,
}) => {
    await mount(bannerCard);
    const card = page.getByTestId(CARD_TEST_ID);
    const banner = card.getByTestId('fondue-card-banner');
    const roundedRadius = await resolveToken(card, '--border-radius-large', 'width');
    const rounded = Number.parseFloat(roundedRadius);
    await expect(banner).toHaveCSS('border-bottom-left-radius', roundedRadius);

    await freezeAtBannerRadiusMidpoint(card);
    await card.hover();
    await expect.poll(() => readBannerMidpoint(card)).toBeDefined();
    const hoverIn = await readBannerMidpoint(card);

    await card.evaluate((root) => {
        for (const animation of root.getAnimations({ subtree: true })) {
            animation.finish();
        }
    });
    await expect(banner).toHaveCSS('border-bottom-left-radius', '0px');

    await freezeAtBannerRadiusMidpoint(card);
    await page.mouse.move(0, 0);
    await expect.poll(() => readBannerMidpoint(card)).toBeDefined();
    const hoverOut = await readBannerMidpoint(card);

    for (const midpoint of [hoverIn, hoverOut]) {
        const radius = Number.parseFloat(midpoint?.radius ?? '');
        expect(radius).toBeGreaterThan(0);
        expect(radius).toBeLessThan(rounded);
        expect(midpoint?.overlayRadius).toBe(midpoint?.radius);
    }
});

test('should square the banner corners without a transition when reduced motion is preferred', async ({
    mount,
    page,
}) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await mount(bannerCard);
    const card = page.getByTestId(CARD_TEST_ID);

    const { bannerRadius } = await readTransitionTiming(card);
    expect(bannerRadius?.duration).toBe('0s');

    await card.hover();
    await expect(card.getByTestId('fondue-card-banner')).toHaveCSS('border-bottom-left-radius', '0px');
});
