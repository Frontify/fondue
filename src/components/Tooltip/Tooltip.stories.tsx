/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import IconExclamationMarkTriangle16 from '@foundation/Icon/Generated/IconExclamationMarkTriangle16';
import { useToggleOverlay } from '@hooks/useToggleOverlay';
import { Box } from '@components/Box';
import { POPPER_STORY_ARGS } from '@components/Popper/types';
import { Tooltip, TooltipProps } from '@components/Tooltip/Tooltip';

export default {
    title: 'Experimental/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    args: {
        offset: [0, 8],
        flip: true,
    },
    argTypes: {
        ...POPPER_STORY_ARGS,
        'data-test-id': {
            type: 'string',
        },
        role: {
            type: 'string',
        },
        zIndex: { table: { disable: true } },
    },
} as Meta<TooltipProps>;

const Template: StoryFn<TooltipProps> = (args) => {
    const [isOpen, setIsOpen] = useToggleOverlay(false);
    return (
        <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Tooltip {...args} open={isOpen}>
                <Tooltip.Trigger>
                    <button
                        className="tw-flex tw-items-center"
                        onMouseEnter={() => setIsOpen(true)}
                        onFocus={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                        onBlur={() => setIsOpen(false)}
                    >
                        <IconExclamationMarkTriangle16 />
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                    <Box className="tw-p-2 tw-text-text">
                        <p>Some Content</p>
                    </Box>
                </Tooltip.Content>
            </Tooltip>
        </div>
    );
};

export const TooltipComponent = Template.bind({});
TooltipComponent.args = {};
