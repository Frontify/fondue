/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Popover, PopoverProps } from '@components/Popover/Popover';
import { PopperPlacement } from '@components/Popper/types';
import { Button } from '@components/Button';
import IconExclamationMarkTriangle16 from '@foundation/Icon/Generated/IconExclamationMarkTriangle16';

export default {
    title: 'Components/Popover',
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
    const [open, setOpen] = useState(false);
    return (
        <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Popover open={open} {...args}>
                <Popover.Trigger>
                    <Button onClick={() => setOpen(!open)}>I am the Trigger</Button>
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
    const [open, setOpen] = useState(false);
    return (
        <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Popover open={open} {...args}>
                <Popover.Trigger>
                    <button onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                        <IconExclamationMarkTriangle16 />
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

export const TriggeredOnClick = Template.bind({});
TriggeredOnClick.args = {};
export const TriggeredOnHover = TriggeredOnHoverTemplate.bind({});
TriggeredOnHover.args = {};
