/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Popover, PopoverProps } from '@components/Popover/Popover';
import { PopperPlacement } from '@components/Popper/types';
import { Button } from '@components/Button';
import IconExclamationMarkTriangle16 from '@foundation/Icon/Generated/IconExclamationMarkTriangle16';
import { useToggleOverlay } from '@hooks/useToggleOverlay';

export default {
    title: 'Experimental/Popover',
    component: Popover,
    tags: ['autodocs'],
    args: {
        offset: [0, 8],
        flip: false,
    },
    argTypes: {
        placement: {
            options: Object.values(PopperPlacement),
            control: { type: 'select' },
        },
        flip: {
            control: { type: 'boolean' },
        },
        enablePortal: {
            control: { type: 'boolean' },
        },
        open: { control: { type: 'boolean' } },
    },
} as Meta<PopoverProps>;

const Template: StoryFn<PopoverProps> = (args) => {
    const [isOpen, setIsOpen] = useToggleOverlay(false);
    return (
        <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Popover open={isOpen} {...args}>
                <Popover.Trigger>
                    <Button onClick={() => setIsOpen(!isOpen)}>I am the Trigger</Button>
                </Popover.Trigger>
                <Popover.Content>
                    <div className="tw-p-2">
                        <p>Some Content</p>
                    </div>
                </Popover.Content>
            </Popover>
        </div>
    );
};

const TriggeredOnHoverTemplate: StoryFn<PopoverProps> = (args) => {
    const [isOpen, setIsOpen] = useToggleOverlay(false);
    return (
        <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Popover open={isOpen} {...args}>
                <Popover.Trigger>
                    <button
                        className="tw-flex tw-items-center"
                        onMouseEnter={() => setIsOpen(true)}
                        onFocus={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                        onBlur={() => setIsOpen(false)}
                    >
                        <span>Information</span> <IconExclamationMarkTriangle16 />
                    </button>
                </Popover.Trigger>
                <Popover.Content>
                    <div className="tw-p-2">
                        <p>Some Content</p>
                    </div>
                </Popover.Content>
            </Popover>
        </div>
    );
};

const WithInteractiveContentTemplate: StoryFn<PopoverProps> = (args) => {
    const [isOpen, setIsOpen] = useToggleOverlay(false);
    return (
        <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Popover open={isOpen} {...args}>
                <Popover.Trigger>
                    <Button onClick={() => setIsOpen(!isOpen)}>I am the Trigger</Button>
                </Popover.Trigger>
                <Popover.Content>
                    <div className="tw-p-2 tw-w-[400px]">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae
                            quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod
                            ullam. Beatae deserunt eum quibusdam ratione.
                        </p>
                        <Button>Confirm</Button>
                    </div>
                </Popover.Content>
            </Popover>
        </div>
    );
};

export const TriggeredOnClick = Template.bind({});
TriggeredOnClick.args = {};
export const TriggeredOnHover = TriggeredOnHoverTemplate.bind({});
TriggeredOnHover.args = {};

export const WithInteractiveContent = WithInteractiveContentTemplate.bind({});
WithInteractiveContent.args = {};
