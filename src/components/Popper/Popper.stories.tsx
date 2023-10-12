/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Popper } from './Popper';
import { Button } from '@components/Button';
import { POPPER_STORY_ARGS, PopperProps } from '@components/Popper/types';
import { Box } from '@components/Box';

export default {
    title: 'Utilities/Popper',
    component: Popper,
    tags: ['autodocs'],
    args: {
        placement: 'bottom-start',
        offset: [0, 8],
        flip: true,
        strategy: 'absolute',
    },
    argTypes: {
        ...POPPER_STORY_ARGS,
        strategy: {
            options: ['absolute', 'fixed'],
            control: { type: 'radio' },
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
                strategy={args.strategy}
            >
                <Popper.Trigger>
                    <Button onClick={() => setOpen(!open)}>Hello</Button>
                </Popper.Trigger>
                <Popper.Content>
                    <Box className="tw-bg-base tw-border tw-border-black tw-w-[400px]">
                        <p>Some content</p>
                    </Box>
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
