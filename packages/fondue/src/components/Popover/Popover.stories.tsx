/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';
import { useRef, useState } from 'react';

import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Popover } from '@components/Popover/Popover';
import { POPPER_STORY_ARGS } from '@components/Popper/constantStories';
import IconExclamationMarkTriangle16 from '@foundation/Icon/Generated/IconExclamationMarkTriangle16';
import IconJohanna from '@foundation/Icon/Generated/IconJohanna';

import { type OverlayProps } from '../../types';

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
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
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
                <span className="tw-mr-1">Information</span> <IconExclamationMarkTriangle16 />
            </button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>
    );
};

export const TriggeredOnClick = Template.bind({});
TriggeredOnClick.args = {};
export const TriggeredOnHover = TriggeredOnHoverTemplate.bind({});
TriggeredOnHover.args = {};

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
