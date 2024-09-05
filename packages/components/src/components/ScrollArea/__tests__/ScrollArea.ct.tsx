/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { ScrollArea } from '../ScrollArea';

test.describe('ScrollArea Component', () => {
    test('renders with default props', async ({ mount }) => {
        const component = await mount(
            <ScrollArea>
                <div style={{ height: '1000px', width: '1000px' }}>Scrollable content</div>
            </ScrollArea>,
        );

        await expect(component).toBeVisible();
        await expect(component).toHaveCSS('max-width', '100%');

        const viewport = component.getByTestId('fondue-scroll-area-viewport');

        await expect(viewport).toBeVisible();
        await expect(viewport).toHaveCSS('max-height', '100%');
    });

    test('renders with custom maxHeight and maxWidth', async ({ mount }) => {
        const component = await mount(
            <ScrollArea maxHeight="500px" maxWidth="800px">
                <div style={{ height: '1000px', width: '1000px' }}>Scrollable content</div>
            </ScrollArea>,
        );

        await expect(component).toBeVisible();
        await expect(component).toHaveCSS('max-width', '800px');

        const viewport = component.locator('data-test-id=fondue-scroll-area-viewport');

        await expect(viewport).toBeVisible();
        await expect(viewport).toHaveCSS('max-height', '500px');
    });

    test('renders scrollbars on hover', async ({ mount }) => {
        const component = await mount(
            <ScrollArea maxHeight="300px" maxWidth="300px">
                <div style={{ height: '1000px', width: '1000px' }}>Scrollable content</div>
            </ScrollArea>,
        );

        const verticalScrollbar = component.getByTestId('fondue-scroll-area-vertical-scrollbar');
        const horizontalScrollbar = component.getByTestId('fondue-scroll-area-horizontal-scrollbar');

        await expect(verticalScrollbar).not.toBeVisible();
        await expect(horizontalScrollbar).not.toBeVisible();

        await component.hover();

        await expect(verticalScrollbar).toBeVisible();
        await expect(horizontalScrollbar).toBeVisible();
    });

    test('renders scrollbars always', async ({ mount }) => {
        const component = await mount(<ScrollArea type="always">Scrollable content</ScrollArea>);

        const verticalScrollbar = component.getByTestId('fondue-scroll-area-vertical-scrollbar');
        const horizontalScrollbar = component.getByTestId('fondue-scroll-area-horizontal-scrollbar');

        await expect(verticalScrollbar).toBeVisible();
        await expect(horizontalScrollbar).toBeVisible();
    });

    test('renders scrollbars only when content overflows (and it does not)', async ({ mount }) => {
        const component = await mount(
            <ScrollArea type="auto" maxHeight="300px" maxWidth="300px">
                Scrollable content
            </ScrollArea>,
        );

        const verticalScrollbar = component.getByTestId('fondue-scroll-area-vertical-scrollbar');
        const horizontalScrollbar = component.getByTestId('fondue-scroll-area-horizontal-scrollbar');

        await expect(verticalScrollbar).not.toBeVisible();
        await expect(horizontalScrollbar).not.toBeVisible();
    });

    test('renders scrollbars only when content overflows (and it does)', async ({ mount }) => {
        const component = await mount(
            <ScrollArea type="auto" maxHeight="300px" maxWidth="300px">
                <div style={{ height: '1000px', width: '1000px' }}>Scrollable content</div>
            </ScrollArea>,
        );

        const verticalScrollbar = component.getByTestId('fondue-scroll-area-vertical-scrollbar');
        const horizontalScrollbar = component.getByTestId('fondue-scroll-area-horizontal-scrollbar');

        await expect(verticalScrollbar).toBeVisible();
        await expect(horizontalScrollbar).toBeVisible();
    });

    test('renders scrollbars only when scrolling', async ({ mount }) => {
        const component = await mount(
            <ScrollArea type="scroll" maxHeight="300px" maxWidth="300px">
                <div style={{ height: '1000px', width: '1000px' }}>Scrollable content</div>
            </ScrollArea>,
        );

        const verticalScrollbar = component.getByTestId('fondue-scroll-area-vertical-scrollbar');
        const horizontalScrollbar = component.getByTestId('fondue-scroll-area-horizontal-scrollbar');

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
        const component = await mount(
            <ScrollArea maxHeight="300px" maxWidth="300px">
                <div style={{ height: '1000px', width: '100%' }}>
                    {Array.from({ length: 20 }, (_, i) => (
                        <p key={i} data-test-id={`paragraph-${i}`}>
                            Paragraph {i + 1}
                        </p>
                    ))}
                </div>
            </ScrollArea>,
        );

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
        const component = await mount(
            <ScrollArea maxHeight="300px" maxWidth="300px">
                <div style={{ height: '100%', width: '1000px' }}>
                    <p style={{ whiteSpace: 'nowrap' }} data-test-id="long-text">
                        {Array.from({ length: 50 }, (_, i) => `Word${i} `).join('')}
                    </p>
                </div>
            </ScrollArea>,
        );

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
        const component = await mount(
            <ScrollArea maxHeight="300px" maxWidth="300px">
                <div style={{ height: '1000px', width: '1000px' }}>Scrollable content</div>
            </ScrollArea>,
        );

        await component.hover();

        const corner = component.getByTestId('fondue-scroll-area-corner');

        await expect(corner).toBeVisible();
    });
});
