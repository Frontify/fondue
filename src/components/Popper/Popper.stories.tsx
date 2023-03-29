/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Popper } from './Popper';
import { Button } from '@components/Button';
import { PopperPlacement, PopperProps } from '@components/Popper/types';

export default {
    title: 'Utilities/Popper',
    component: Popper,
    tags: ['autodocs'],
    args: {
        placement: 'bottom-start',
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
} as Meta<PopperProps>;

const Template: StoryFn<PopperProps> = (args) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="tw-flex tw-justify-center">
            <Popper
                open={open}
                placement={args.placement}
                offset={args.offset}
                flip={args.flip}
                enablePortal={args.enablePortal}
            >
                <Popper.Reference>
                    <Button onClick={() => setOpen(!open)}>Hello</Button>
                </Popper.Reference>
                <Popper.Content>
                    <div className="tw-border tw-border-black tw-w-[400px]">
                        <p>Some content</p>
                    </div>
                </Popper.Content>
            </Popper>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    enablePortal: false,
};
export const WithPortal = Template.bind({});
WithPortal.args = {
    enablePortal: true,
};
