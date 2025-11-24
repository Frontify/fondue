/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { ScrollArea } from '../ScrollArea';

const SCROLLAREA_ROOT_TEST_ID = 'fondue-scroll-area';
const SCROLLAREA_VIEWPORT_TEST_ID = 'fondue-scroll-area-viewport';
const SCROLLAREA_CONTENT_TEST_ID = 'fondue-scroll-area-content';
const SCROLLAREA_SCROLLBAR_VERTICAL_TEST_ID = 'fondue-scroll-area-vertical-scrollbar';
const SCROLLAREA_SCROLLBAR_HORIZONTAL_TEST_ID = 'fondue-scroll-area-horizontal-scrollbar';

test('renders with default props', async ({ mount }) => {
    const wrapper = await mount(
        <ScrollArea data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            <div style={{ height: '1000px', width: '1000px' }}>Scrollable content</div>
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_ROOT_TEST_ID);

    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('max-width', '100%');

    const viewport = component.getByTestId(SCROLLAREA_VIEWPORT_TEST_ID);

    await expect(viewport).toBeVisible();
    await expect(viewport).toHaveCSS('max-height', '100%');
});

test('renders with custom maxHeight and maxWidth', async ({ mount }) => {
    const wrapper = await mount(
        <ScrollArea maxHeight="500px" maxWidth="800px" data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            <div style={{ height: '1000px', width: '1000px' }}>Scrollable content</div>
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_ROOT_TEST_ID);

    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('max-width', '800px');

    const viewport = component.locator(`data-test-id=${SCROLLAREA_VIEWPORT_TEST_ID}`);

    await expect(viewport).toBeVisible();
    await expect(viewport).toHaveCSS('max-height', '500px');
});

test('renders scrollbars on hover', async ({ mount }) => {
    const wrapper = await mount(
        <ScrollArea maxHeight="300px" maxWidth="300px" data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            <div style={{ height: '1000px', width: '1000px' }}>Scrollable content</div>
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_ROOT_TEST_ID);

    const verticalScrollbar = component.getByTestId(SCROLLAREA_SCROLLBAR_VERTICAL_TEST_ID);
    const horizontalScrollbar = component.getByTestId(SCROLLAREA_SCROLLBAR_HORIZONTAL_TEST_ID);

    await expect(verticalScrollbar).not.toBeVisible();
    await expect(horizontalScrollbar).not.toBeVisible();

    await component.hover();

    await expect(verticalScrollbar).toBeVisible();
    await expect(horizontalScrollbar).toBeVisible();
});

test('renders scrollbars always', async ({ mount }) => {
    const wrapper = await mount(
        <ScrollArea type="always" data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            Scrollable content
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_ROOT_TEST_ID);

    const verticalScrollbar = component.getByTestId(SCROLLAREA_SCROLLBAR_VERTICAL_TEST_ID);
    const horizontalScrollbar = component.getByTestId(SCROLLAREA_SCROLLBAR_HORIZONTAL_TEST_ID);

    await expect(verticalScrollbar).toBeVisible();
    await expect(horizontalScrollbar).toBeVisible();
});

test('renders scrollbars only when content overflows (and it does not)', async ({ mount }) => {
    const wrapper = await mount(
        <ScrollArea type="auto" maxHeight="300px" maxWidth="300px" data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            Scrollable content
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_ROOT_TEST_ID);

    const verticalScrollbar = component.getByTestId(SCROLLAREA_SCROLLBAR_VERTICAL_TEST_ID);
    const horizontalScrollbar = component.getByTestId(SCROLLAREA_SCROLLBAR_HORIZONTAL_TEST_ID);

    await expect(verticalScrollbar).not.toBeVisible();
    await expect(horizontalScrollbar).not.toBeVisible();
});

test('renders scrollbars only when content overflows (and it does)', async ({ mount }) => {
    const wrapper = await mount(
        <ScrollArea type="auto" maxHeight="300px" maxWidth="300px" data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            <div style={{ height: '1000px', width: '1000px' }}>Scrollable content</div>
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_ROOT_TEST_ID);

    const verticalScrollbar = component.getByTestId(SCROLLAREA_SCROLLBAR_VERTICAL_TEST_ID);
    const horizontalScrollbar = component.getByTestId(SCROLLAREA_SCROLLBAR_HORIZONTAL_TEST_ID);

    await expect(verticalScrollbar).toBeVisible();
    await expect(horizontalScrollbar).toBeVisible();
});

test('renders scrollbars only when scrolling', async ({ mount }) => {
    const wrapper = await mount(
        <ScrollArea type="scroll" maxHeight="300px" maxWidth="300px" data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            <div style={{ height: '1000px', width: '1000px' }}>Scrollable content</div>
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_ROOT_TEST_ID);

    const verticalScrollbar = component.getByTestId(SCROLLAREA_SCROLLBAR_VERTICAL_TEST_ID);
    const horizontalScrollbar = component.getByTestId(SCROLLAREA_SCROLLBAR_HORIZONTAL_TEST_ID);

    await expect(verticalScrollbar).not.toBeVisible();
    await expect(horizontalScrollbar).not.toBeVisible();

    await component.hover();
    await component.click();

    await component.press('ArrowDown');
    await expect(verticalScrollbar).toBeVisible();

    await component.press('ArrowRight');
    await expect(horizontalScrollbar).toBeVisible();
});

test('scrolls content vertically by dragging the scrollbar thumb', async ({ mount, page }) => {
    const wrapper = await mount(
        <ScrollArea maxHeight="300px" maxWidth="300px" data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            <div style={{ height: '1000px', width: '100%' }}>
                {Array.from({ length: 20 }, (_, i) => (
                    <p key={i} data-test-id={`paragraph-${i}`}>
                        Paragraph {i + 1}
                    </p>
                ))}
            </div>
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_ROOT_TEST_ID);

    await component.hover();

    const verticalScrollbarThumb = component.getByTestId('fondue-scroll-area-vertical-scrollbar-thumb');

    await expect(verticalScrollbarThumb).toBeVisible();

    const firstParagraph = component.getByTestId('paragraph-0');
    const initialFirstParagraphBox = await firstParagraph.boundingBox();
    const thumbBox = await verticalScrollbarThumb.boundingBox();

    if (!thumbBox) {
        throw new Error("Couldn't get thumb bounding box");
    }

    const thumbXPos = thumbBox.x + thumbBox.width / 2;

    await page.mouse.move(thumbXPos, thumbBox.y + 100);
    await page.mouse.down();
    await page.mouse.move(thumbXPos, thumbBox.y + 100, { steps: 10 });
    await page.mouse.up();

    const newFirstParagraphBox = await firstParagraph.boundingBox();

    expect(newFirstParagraphBox?.y).toBeLessThan(initialFirstParagraphBox?.y || 0);
});

test('scrolls content horizontally by dragging the scrollbar thumb', async ({ mount, page }) => {
    const wrapper = await mount(
        <ScrollArea maxHeight="300px" maxWidth="300px" data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            <div style={{ height: '100%', width: '1000px' }}>
                <p style={{ whiteSpace: 'nowrap' }} data-test-id="long-text">
                    {Array.from({ length: 50 }, (_, i) => `Word${i} `).join('')}
                </p>
            </div>
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_ROOT_TEST_ID);

    await component.hover();

    const horizontalScrollbarThumb = component.getByTestId('fondue-scroll-area-horizontal-scrollbar-thumb');

    await expect(horizontalScrollbarThumb).toBeVisible();

    const longText = component.getByTestId('long-text');
    const initialTextBox = await longText.boundingBox();
    const thumbBox = await horizontalScrollbarThumb.boundingBox();

    if (!thumbBox) {
        throw new Error("Couldn't get thumb bounding box");
    }

    const thumbYPos = thumbBox.y + thumbBox.height / 2;

    await page.mouse.move(thumbBox.x + 100, thumbYPos);
    await page.mouse.down();
    await page.mouse.move(thumbBox.x + 100, thumbYPos, { steps: 10 });
    await page.mouse.up();

    const newTextBox = await longText.boundingBox();
    expect(newTextBox?.x).toBeLessThan(initialTextBox?.x || 0);
});

test('renders corner when both scrollbars are visible', async ({ mount }) => {
    const wrapper = await mount(
        <ScrollArea maxHeight="300px" maxWidth="300px" data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            <div style={{ height: '1000px', width: '1000px' }}>Scrollable content</div>
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_ROOT_TEST_ID);

    await component.hover();

    const corner = component.getByTestId('fondue-scroll-area-corner');

    await expect(corner).toBeVisible();
});
test('should render no padding', async ({ mount, page }) => {
    const wrapper = await mount(
        <ScrollArea data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            <div />
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_VIEWPORT_TEST_ID);

    await expect(component).toHaveCSS('padding', '0px');
});

test('should render tight padding', async ({ mount, page }) => {
    const wrapper = await mount(
        <ScrollArea padding="tight" data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            <div />
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_VIEWPORT_TEST_ID);

    await expect(component).toHaveCSS('padding', '8px');
});

test('should render compact padding', async ({ mount, page }) => {
    const wrapper = await mount(
        <ScrollArea padding="compact" data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            <div />
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_VIEWPORT_TEST_ID);
    await expect(component).toHaveCSS('padding', '8px 16px');
});

test('should render comfortable padding', async ({ mount, page }) => {
    const wrapper = await mount(
        <ScrollArea padding="comfortable" data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            <div />
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_VIEWPORT_TEST_ID);
    await expect(component).toHaveCSS('padding', '16px 24px');
});

test('should render spacious padding', async ({ mount, page }) => {
    const wrapper = await mount(
        <ScrollArea padding="spacious" data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            <div />
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_VIEWPORT_TEST_ID);
    await expect(component).toHaveCSS('padding', '24px 40px');
});

test('renders without gutter', async ({ mount }) => {
    const wrapper = await mount(
        <ScrollArea maxHeight={500} maxWidth={600} data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            <div data-test-id={SCROLLAREA_CONTENT_TEST_ID} style={{ height: '1000px', width: '100%' }}>
                Scrollable content
            </div>
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_ROOT_TEST_ID);

    await expect(component).toBeVisible();
    const componentElement = await component.boundingBox();
    const contentElement = await component.getByTestId(SCROLLAREA_CONTENT_TEST_ID).boundingBox();

    expect(componentElement?.width).toBe(contentElement?.width);
});

test('renders with gutter', async ({ mount }) => {
    const wrapper = await mount(
        <ScrollArea maxHeight={500} maxWidth={600} scrollbarGutter="stable" data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            <div data-test-id={SCROLLAREA_CONTENT_TEST_ID} style={{ height: '1000px', width: '100%' }}>
                Scrollable content
            </div>
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_ROOT_TEST_ID);

    await expect(component).toBeVisible();
    const componentElement = await component.boundingBox();
    const contentElement = await component.getByTestId(SCROLLAREA_CONTENT_TEST_ID).boundingBox();

    expect(componentElement?.width).toBe((contentElement?.width || 0) + 10);
});

test('renders with gutter when type is always', async ({ mount }) => {
    const wrapper = await mount(
        <ScrollArea maxHeight={500} maxWidth={600} type="always" data-test-id={SCROLLAREA_ROOT_TEST_ID}>
            <div data-test-id={SCROLLAREA_CONTENT_TEST_ID} style={{ height: '1000px', width: '100%' }}>
                Scrollable content
            </div>
        </ScrollArea>,
    );
    const component = wrapper.getByTestId(SCROLLAREA_ROOT_TEST_ID);

    await expect(component).toBeVisible();
    const componentElement = await component.boundingBox();
    const contentElement = await component.getByTestId(SCROLLAREA_CONTENT_TEST_ID).boundingBox();

    expect(componentElement?.width).toBe((contentElement?.width || 0) + 10);
});
