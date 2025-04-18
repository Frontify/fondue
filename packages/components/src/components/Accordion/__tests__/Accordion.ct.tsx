/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { TextInput } from '#/components/TextInput/TextInput';

import { Accordion } from '../Accordion';

const ACCORDION_ITEM_CONTENT_ID = '[data-test-id="inner-collapsible-wrap"]';
const ACCORDION_ITEM_ID = '[data-test-id=fondue-accordion-item]';
const ACCORDION_ITEM_TRIGGER_ID = '[data-test-id="fondue-accordion-trigger"]';

test.describe('Accordion Component', () => {
    test('should render 3 items', async ({ mount }) => {
        const component = await mount(
            <Accordion.Root>
                <Accordion.Item value="1">
                    <Accordion.Header>1</Accordion.Header>
                    <Accordion.Content>1</Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="2">
                    <Accordion.Header>2</Accordion.Header>
                    <Accordion.Content>2</Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="3">
                    <Accordion.Header>3</Accordion.Header>
                    <Accordion.Content>3</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>,
        );

        await expect(component.locator(ACCORDION_ITEM_ID)).toHaveCount(3);
    });

    test('should open item 2', async ({ mount }) => {
        const component = await mount(
            <Accordion.Root>
                <Accordion.Item value="1">
                    <Accordion.Header>
                        <Accordion.Trigger>1</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>1</Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="2">
                    <Accordion.Header>
                        <Accordion.Trigger>2</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>2</Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="3">
                    <Accordion.Header>
                        <Accordion.Trigger>3</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>3</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>,
        );

        await expect(component.locator(ACCORDION_ITEM_CONTENT_ID)).not.toBeVisible();
        await component.getByRole('heading', { name: '2' }).click();
        await expect(component.locator(ACCORDION_ITEM_CONTENT_ID)).toBeVisible();
    });

    test('should call header action', async ({ mount }) => {
        let isClicked = false;

        const onClick = () => (isClicked = true);

        const component = await mount(
            <Accordion.Root>
                <Accordion.Item value="1">
                    <Accordion.Header>
                        <Accordion.Trigger>1</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>1</Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="2">
                    <Accordion.Header>
                        <Accordion.Trigger>2</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>2</Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="3">
                    <Accordion.Header onClick={onClick}>
                        <Accordion.Trigger>3</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>3</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>,
        );

        expect(isClicked).toBe(false);
        await component.locator(ACCORDION_ITEM_ID).nth(2).click();
        expect(isClicked).toBe(true);
    });

    test('should not have any open section by default', async ({ mount }) => {
        const component = await mount(
            <Accordion.Root>
                <Accordion.Item value="1">
                    <Accordion.Header>
                        <Accordion.Trigger>1</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>1</Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="2">
                    <Accordion.Header>
                        <Accordion.Trigger>2</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>2</Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="3">
                    <Accordion.Header>
                        <Accordion.Trigger>3</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>3</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>,
        );

        await expect(component.locator(ACCORDION_ITEM_ID)).toHaveCount(3);
        await expect(component.locator(ACCORDION_ITEM_CONTENT_ID)).toHaveCount(0);
    });

    test('allows multiple sections to be open by default', async ({ mount }) => {
        const component = await mount(
            <Accordion.Root value={['2', '3']}>
                <Accordion.Item value="1">
                    <Accordion.Header>
                        <Accordion.Trigger>1</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>1</Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="2">
                    <Accordion.Header>
                        <Accordion.Trigger>2</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>2</Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="3">
                    <Accordion.Header>
                        <Accordion.Trigger>3</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>3</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>,
        );

        await expect(component.locator(ACCORDION_ITEM_ID)).toHaveCount(3);
        await expect(component.locator(ACCORDION_ITEM_CONTENT_ID)).toHaveCount(2);
        await expect(component.locator(ACCORDION_ITEM_ID).nth(0).locator(ACCORDION_ITEM_CONTENT_ID)).not.toBeVisible();
        await expect(component.locator(ACCORDION_ITEM_ID).nth(1).locator(ACCORDION_ITEM_CONTENT_ID)).toBeVisible();
        await expect(component.locator(ACCORDION_ITEM_ID).nth(2).locator(ACCORDION_ITEM_CONTENT_ID)).toBeVisible();
    });

    test('shows dividers when divider prop is set to true', async ({ mount }) => {
        const component = await mount(
            <Accordion.Root value={['1']}>
                <Accordion.Item value="1">
                    <Accordion.Header>
                        <Accordion.Trigger>1</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content divider>1</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>,
        );

        await expect(component.locator(ACCORDION_ITEM_CONTENT_ID)).toHaveCSS(
            'border-top',
            '1px solid rgba(8, 8, 8, 0.1)',
        );
    });

    test('does not show dividers between items when divider prop is set to false', async ({ mount }) => {
        const component = await mount(
            <Accordion.Root value={['1']}>
                <Accordion.Item value="1">
                    <Accordion.Header>
                        <Accordion.Trigger>1</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content divider={false}>1</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>,
        );

        await expect(component.locator(ACCORDION_ITEM_CONTENT_ID)).not.toHaveCSS(
            'border-top',
            '1px solid rgba(8, 8, 8, 0.1)',
        );
    });

    test('shows borders when border prop is set to true', async ({ mount }) => {
        const component = await mount(
            <Accordion.Root value={['1']} border>
                <Accordion.Item value="1">
                    <Accordion.Header>
                        <Accordion.Trigger>1</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>1</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>,
        );

        await expect(component).toHaveCSS('border-top', '1px solid rgba(8, 8, 8, 0.1)');
        await expect(component).toHaveCSS('border-bottom', '1px solid rgba(8, 8, 8, 0.1)');
    });

    test('does not show borders when border prop is set to false', async ({ mount }) => {
        const component = await mount(
            <Accordion.Root value={['1']} border>
                <Accordion.Item value="1">
                    <Accordion.Header>
                        <Accordion.Trigger>1</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>1</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>,
        );

        await expect(component).toHaveCSS('border-top', '1px solid rgba(8, 8, 8, 0.1)');
        await expect(component).toHaveCSS('border-bottom', '1px solid rgba(8, 8, 8, 0.1)');
    });

    test('should correctly navigate with keyboard', async ({ mount, page }) => {
        const TEXT_INPUT_1 = 'text-input-1';
        const TEXT_INPUT_2 = 'text-input-2';
        const TEXT_INPUT_3 = 'text-input-3';

        const component = await mount(
            <Accordion.Root>
                <Accordion.Item value="1">
                    <Accordion.Header>
                        <Accordion.Trigger>1</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content data-test-id="content-item-1">
                        <TextInput data-test-id={TEXT_INPUT_1} />
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="2">
                    <Accordion.Header>
                        <Accordion.Trigger>2</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content data-test-id="content-item-2">
                        <TextInput data-test-id={TEXT_INPUT_2} />
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="3">
                    <Accordion.Header>
                        <Accordion.Trigger>3</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content data-test-id="content-item-3">
                        <TextInput data-test-id={TEXT_INPUT_3} />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>,
        );

        await page.focus('body');
        await page.keyboard.press('Tab');
        await expect(component.locator(ACCORDION_ITEM_TRIGGER_ID).first()).toBeFocused();
        await expect(component.getByTestId(TEXT_INPUT_1)).not.toBeVisible();
        await component.locator(ACCORDION_ITEM_ID).first().press('Enter');
        await expect(component.getByTestId(TEXT_INPUT_1)).not.toBeFocused();
        await component.locator(ACCORDION_ITEM_ID).first().press('Tab');
        await expect(component.getByRole('textbox')).toBeFocused();
        await component.getByTestId(TEXT_INPUT_1).press('Tab');
        await expect(component.getByTestId(TEXT_INPUT_1)).not.toBeFocused();
        await expect(component.locator(ACCORDION_ITEM_TRIGGER_ID).nth(1)).toBeFocused();

        await component.locator(ACCORDION_ITEM_ID).nth(1).press('Enter');
        await component.locator(ACCORDION_ITEM_ID).nth(1).press('Tab');
        await expect(component.getByRole('textbox').nth(1)).toBeFocused();
        await component.getByRole('textbox').nth(1).press('ArrowDown');
        await expect(component.getByRole('textbox').nth(1)).toBeFocused();
        await component.getByRole('textbox').nth(1).press('Tab');
        await expect(component.getByRole('textbox').nth(1)).not.toBeFocused();
    });

    test('should render with custom data test ids', async ({ mount }) => {
        const component = await mount(
            <div>
                <Accordion.Root data-test-id="accordion-custom-test-id">
                    <Accordion.Item value="1" data-test-id="accordion-item-custom-test-id-1">
                        <Accordion.Header>
                            <Accordion.Trigger>1</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content data-test-id="content-item-1">1</Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value="2" data-test-id="accordion-item-custom-test-id-2">
                        <Accordion.Header>
                            <Accordion.Trigger>2</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content data-test-id="content-item-2">2</Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value="3" data-test-id="accordion-item-custom-test-id-3">
                        <Accordion.Header>
                            <Accordion.Trigger>3</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content data-test-id="content-item-3">3</Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            </div>,
        );

        await expect(component.locator('[data-test-id="accordion-custom-test-id"]')).toHaveCount(1);
        await expect(component.locator('[data-test-id="accordion-item-custom-test-id-1"]')).toHaveCount(1);
        await expect(component.locator('[data-test-id="accordion-item-custom-test-id-2"]')).toHaveCount(1);
        await expect(component.locator('[data-test-id="accordion-item-custom-test-id-3"]')).toHaveCount(1);
    });
});
