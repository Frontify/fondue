/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';

import IconIcon from '@foundation/Icon/Generated/IconIcon';

import { Badge } from './Badge';
import { BadgeEmphasis, type BadgeProps, BadgeStatus, BadgeStyle } from './types';

export default {
    title: 'Components/Badge',
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
        style: {
            options: Object.values(BadgeStyle),
            control: { type: 'select' },
        },
        emphasis: {
            options: Object.values(BadgeEmphasis),
            control: { type: 'select' },
        },
        size: {
            options: ['small', 'medium'],
            control: { type: 'select' },
        },
        withTitleAttribute: { control: { type: 'boolean' } },
        onClick: { table: { disable: false } },
        onDismiss: { table: { disable: false } },
    },
    args: {
        style: BadgeStyle.Primary,
        children: 'Text',
        size: 'medium',
        emphasis: BadgeEmphasis.Strong,
        disabled: false,
        withTitleAttribute: true,
    },
} as Meta<BadgeProps>;

const BadgeTemplate: StoryFn<BadgeProps> = (args: BadgeProps) => <Badge {...args} />;

export const LabelOnly = BadgeTemplate.bind({});

export const WithOnClick = BadgeTemplate.bind({});

WithOnClick.argTypes = {
    onClick: { action: 'Click' },
};

export const WithDismiss = BadgeTemplate.bind({});

WithDismiss.argTypes = {
    onDismiss: { action: 'Dismiss' },
};

export const WithOnClickAndDismiss = BadgeTemplate.bind({});

WithOnClickAndDismiss.argTypes = {
    onDismiss: { action: 'Dismiss' },
    onClick: { action: 'Click' },
};

export const WithStatus = BadgeTemplate.bind({});

WithStatus.argTypes = {
    status: {
        options: Object.values(BadgeStatus),
        control: { type: 'select' },
    },
};

WithStatus.args = {
    status: BadgeStatus.Positive,
};

export const WithCustomStatusColor = BadgeTemplate.bind({});

WithCustomStatusColor.args = {
    status: { red: 40, green: 200, blue: 100, alpha: 1 },
};

export const WithCustomStatusString = BadgeTemplate.bind({});

WithCustomStatusString.args = {
    status: '#f14394',
};

export const WithIcon = BadgeTemplate.bind({});

WithIcon.argTypes = {
    icon: { table: { disable: true } },
};

WithIcon.args = {
    icon: <IconIcon />,
};

export const WithOnClickAndIcon = BadgeTemplate.bind({});

WithOnClickAndIcon.argTypes = {
    onClick: { action: 'Click' },
    icon: { table: { disable: true } },
};

WithOnClickAndIcon.args = {
    icon: <IconIcon />,
};

export const WithStatusAndIcon = BadgeTemplate.bind({});

WithStatusAndIcon.argTypes = {
    status: {
        options: Object.values(BadgeStatus),
        control: { type: 'select' },
    },
    icon: { table: { disable: true } },
};

WithStatusAndIcon.args = {
    status: BadgeStatus.Positive,
    icon: <IconIcon />,
};

export const StatusOnly = BadgeTemplate.bind({});

StatusOnly.argTypes = {
    status: {
        options: Object.values(BadgeStatus),
        control: { type: 'select' },
    },
    children: { table: { disable: true } },
};

StatusOnly.args = {
    status: BadgeStatus.Positive,
    children: '',
};

export const IconOnly = BadgeTemplate.bind({});

IconOnly.argTypes = {
    icon: { table: { disable: true } },
    children: { table: { disable: true } },
};

IconOnly.args = {
    icon: <IconIcon />,
    children: '',
};

export const BetweenElements: StoryFn<BadgeProps> = (args: BadgeProps) => (
    <div className="tw-flex tw-items-center tw-gap-1">
        <span>before </span>
        <Badge {...args} />
        <span> after</span>
    </div>
);

BetweenElements.argTypes = {
    status: {
        options: Object.values(BadgeStatus),
        control: { type: 'select' },
    },
    icon: { table: { disable: true } },
};

BetweenElements.args = {
    status: BadgeStatus.Positive,
    icon: <IconIcon />,
};

export const MultipleBadgesInRow: StoryFn<BadgeProps> = (args: BadgeProps) => (
    <div className="tw-flex tw-flex-nowrap tw-border tw-border-line tw-rounded tw-p-2 tw-gap-2">
        <Badge {...args} />
        <Badge {...args} />
        <Badge {...args} />
        <Badge {...args} />
        <Badge {...args} />
    </div>
);

MultipleBadgesInRow.args = {
    status: BadgeStatus.Positive,
    icon: <IconIcon />,
    children: 'A long string of text',
};
