/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon, IconPen } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';
import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { Switch } from '../Switch/Switch';
import { TextInput } from '../TextInput/TextInput';

import { Tooltip, TooltipContent, TooltipRoot, TooltipTrigger } from './Tooltip';
import { Dialog } from '../Dialog/Dialog';
import { Flyout } from '../Flyout/Flyout';

type Story = StoryObj<typeof TooltipRoot>;
const meta: Meta<typeof TooltipRoot> = {
    component: TooltipRoot,
    title: 'Components/Tooltip',
    subcomponents: {
        // @ts-expect-error - Storybook has the wrong type for TooltipContent
        'Tooltip.Content': TooltipContent,
        // @ts-expect-error - Storybook has the wrong type for TooltipContent
        'Tooltip.Trigger': TooltipTrigger,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    render: ({ ...args }) => {
        return (
            <Tooltip.Root {...args}>
                <Tooltip.Trigger>
                    <Button>Hover over me!</Button>
                </Tooltip.Trigger>
                <Tooltip.Content>I am a tooltip!</Tooltip.Content>
            </Tooltip.Root>
        );
    },
};
export default meta;

export const Default: Story = {
    args: {},
};

export const NoDelay: Story = {
    args: {
        enterDelay: 0,
    },
};

export const LongDelay: Story = {
    args: {
        enterDelay: 2000,
    },
};

export const ControlledComponent: Story = {
    decorators: [
        (Story) => {
            return (
                <div className="tw-flex tw-gap-4">
                    <Story />
                </div>
            );
        },
    ],
    render: () => {
        const [isTooltipOpen, setIsTooltipOpen] = useState(false);
        return (
            <>
                <Tooltip.Root open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
                    <Tooltip.Trigger>
                        <Button>Hover over me!</Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                </Tooltip.Root>
                <Button onPress={() => setIsTooltipOpen(true)}>Open Tooltip</Button>
                <Button onPress={() => setIsTooltipOpen(false)}>Close Tooltip</Button>
            </>
        );
    },
};

export const WithInteractiveElements: Story = {
    decorators: [
        (Story) => {
            return (
                <Flex direction="column" gap="16px" align="flex-start">
                    <Story />
                </Flex>
            );
        },
    ],
    render: () => {
        return (
            <>
                <Flex direction="column" gap="4px" align="flex-start">
                    <Label htmlFor="switch">Switch with tooltip</Label>
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <Switch id="switch" aria-label="Hover me!" />
                        </Tooltip.Trigger>
                        <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                    </Tooltip.Root>
                </Flex>

                <Flex direction="column" gap="4px" align="flex-start">
                    <Label htmlFor="noop">Input with tooltips</Label>
                    <TextInput.Root>
                        <TextInput.Slot name="left">
                            <Tooltip.Root>
                                <Tooltip.Trigger>
                                    <IconPen size={16} />
                                </Tooltip.Trigger>
                                <Tooltip.Content>I have a pen</Tooltip.Content>
                            </Tooltip.Root>
                        </TextInput.Slot>
                        <TextInput.Slot name="right">
                            <Tooltip.Root>
                                <Tooltip.Trigger>
                                    <IconIcon size={16} />
                                </Tooltip.Trigger>
                                <Tooltip.Content>I am an icon with a tooltip</Tooltip.Content>
                            </Tooltip.Root>
                        </TextInput.Slot>
                    </TextInput.Root>
                </Flex>

                <Flex direction="column" gap="4px" align="flex-start">
                    <Label htmlFor="noop">Button with tooltip</Label>
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <Button>Hover me!</Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                    </Tooltip.Root>
                </Flex>

                <Flex direction="column" gap="4px" align="flex-start">
                    <Label htmlFor="noop">Dropdown trigger with tooltip</Label>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Tooltip.Root>
                                <Tooltip.Trigger>
                                    <Button>Hover me!</Button>
                                </Tooltip.Trigger>
                                <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                            </Tooltip.Root>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </Flex>

                <Flex direction="column" gap="4px" align="flex-start">
                    <Label htmlFor="noop">Flyout trigger with tooltip</Label>
                    <Flyout.Root>
                        <Flyout.Trigger>
                            <Tooltip.Root>
                                <Tooltip.Trigger>
                                    <Button>Hover me!</Button>
                                </Tooltip.Trigger>
                                <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                            </Tooltip.Root>
                        </Flyout.Trigger>
                        <Flyout.Content>
                            <Flyout.Header>Header</Flyout.Header>
                            <Flyout.Body>I am a flyout</Flyout.Body>
                        </Flyout.Content>
                    </Flyout.Root>
                </Flex>

                <Flex direction="column" gap="4px" align="flex-start">
                    <Label htmlFor="noop">Dialog trigger with tooltip</Label>
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Tooltip.Root>
                                <Tooltip.Trigger>
                                    <Button>Hover me!</Button>
                                </Tooltip.Trigger>
                                <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                            </Tooltip.Root>
                        </Dialog.Trigger>

                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Header</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body />
                            <Dialog.Footer>
                                <Button emphasis="default">Cancel</Button>
                                <Button>Submit</Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Root>
                </Flex>
            </>
        );
    },
};
