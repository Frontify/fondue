/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';
import { useRef, useState } from 'react';

import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { POPPER_STORY_ARGS } from '@components/Popper/constantStories';
import { ARROW_LIGHT_THEME } from '@utilities/overlayStyle';

import { Popper } from './Popper';
import { type PopperProps } from './types';

export default {
    title: 'Utilities/Popper',
    component: Popper,
    tags: ['autodocs'],
    args: {
        placement: 'bottom-start',
        offset: [0, 8],
        flip: true,
        strategy: 'absolute',
        withArrow: false,
        arrowCustomColors: ARROW_LIGHT_THEME,
    },
    argTypes: {
        ...POPPER_STORY_ARGS,
        withArrow: {
            control: { type: 'boolean' },
        },
        arrowCustomColors: {
            description:
                'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',
            control: { type: 'string' },
        },
        isDetached: {
            description: 'if true, the popper container will detach from the Trigger position and act as a Dialog',
            control: { type: 'boolean' },
        },
        verticalAlignment: {
            description:
                'if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.',
            options: ['top', 'centered'],
            control: { type: 'radio' },
        },
    },
} as Meta<PopperProps>;

const Template: StoryFn<PopperProps> = (args) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div className="tw-flex tw-justify-center">
            <Button ref={anchorRef} onClick={() => setOpen(!open)}>
                Hello
            </Button>
            <Popper {...args} anchor={anchorRef} open={open}>
                <Box className="tw-bg-base tw-border tw-border-black tw-w-[400px]">
                    <p>Some content</p>
                </Box>
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
