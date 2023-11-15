/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { Popover } from '@components/Popover/Popover';
import { Button } from '@components/Button';
import IconExclamationMarkTriangle16 from '@foundation/Icon/Generated/IconExclamationMarkTriangle16';
import { Box } from '@components/Box';
import { Container } from '@components/Container';
import { POPPER_STORY_ARGS } from '@components/Popper/types';
import { OverlayProps } from '../../types';
import { useRef, useState } from 'react';

export default {
    title: 'Experimental/Popover',
    component: Popover,
    tags: ['autodocs'],
    args: {
        offset: [0, 8],
        flip: true,
        placement: 'bottom-start',
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
        theme: {
            options: ['light', 'dark'],
            control: { type: 'select' },
            defaultValue: 'light',
        },
        withArrow: { control: { type: 'boolean' }, defaultValue: false },
    },
} as Meta<OverlayProps>;

const Template: StoryFn<OverlayProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    return (
        <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                I am the Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>
    );
};

const TriggeredOnHoverTemplate: StoryFn<OverlayProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <button
                ref={triggerRef}
                className="tw-flex tw-items-center"
                onMouseEnter={() => setIsOpen(true)}
                onFocus={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onBlur={() => setIsOpen(false)}
            >
                <span>Information</span> <IconExclamationMarkTriangle16 />
            </button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>
    );
};

const WithInteractiveContentTemplate: StoryFn<OverlayProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                I am the Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Box className="tw-p-2 tw-w-[400px]">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem
                        reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae
                        deserunt eum quibusdam ratione.
                    </p>
                    <Button>Confirm</Button>
                </Box>
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

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    theme: 'dark',
};

export const WithArrowAndDarkTheme = Template.bind({});
WithArrowAndDarkTheme.args = {
    theme: 'dark',
    withArrow: true,
    offset: [0, 12],
};
