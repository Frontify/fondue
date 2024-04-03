/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';

import { POPPER_STORY_ARGS } from '@components/Popper/constantStories';
import { Tooltip, type TooltipProps } from '@components/Tooltip/Tooltip';
import IconIcon24 from '@foundation/Icon/Generated/IconIcon24';

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    args: {
        placement: 'bottom-start',
        offset: [0, 8],
        flip: true,
        content: 'Your text here',
        withArrow: true,
        size: 'spacious',
        openOnMount: false,
        enablePortal: true,
        maxWidth: 200,
        maxHeight: 'auto',
        'data-test-id': 'fondue-tooltip',
        disabled: false,
        enterDelay: 0,
        leaveDelay: 200,
    },
    argTypes: {
        ...POPPER_STORY_ARGS,
        anchor: {
            table: { disable: true },
        },
        size: {
            options: ['spacious', 'compact'],
            control: { type: 'select' },
        },
        withArrow: {
            control: { type: 'boolean' },
        },
        openOnMount: {
            control: { type: 'boolean' },
        },
        disabled: {
            control: { type: 'boolean' },
        },
    },
} as Meta<TooltipProps>;

const Template: StoryFn<TooltipProps> = (args) => (
    <Tooltip {...args}>
        <IconIcon24 />
    </Tooltip>
);

const DoubleTooltipTemplate: StoryFn<TooltipProps> = (args) => (
    <div>
        <Tooltip {...args}>
            <IconIcon24 />
        </Tooltip>

        <Tooltip {...args}>
            <IconIcon24 />
        </Tooltip>
    </div>
);

export const Default = Template.bind({});
Default.args = {
    leaveDelay: 0,
};

export const OpenByDefault = Template.bind({});
OpenByDefault.args = {
    openOnMount: true,
};

export const WithLineBreak = Template.bind({});
WithLineBreak.args = {
    content: 'This is a<br>sample text<br />with line breaks\nin it',
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
};

export const DoubleTooltip = DoubleTooltipTemplate.bind({});
