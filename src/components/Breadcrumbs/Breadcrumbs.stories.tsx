/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BadgeStatus, BadgeStyle } from '@components/Badge';
import IconIcon from '@foundation/Icon/Generated/IconIcon';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Breadcrumbs, BreadcrumbsProps } from './Breadcrumbs';

const link = document.referrer;
const ITEMS = [
    { label: 'Item 1', link },
    { label: 'Item 2', link },
    { label: 'Item 3', link },
];

export default {
    title: 'Components/Breadcrumbs',
    component: Breadcrumbs,
    tags: ['autodocs'],
    argTypes: {
        onBlur: { action: 'onBlur' },
    },
} as Meta<BreadcrumbsProps>;

const Template: StoryFn<BreadcrumbsProps> = (args: BreadcrumbsProps) => <Breadcrumbs {...args} />;

export const WithoutLinkOrAction = Template.bind({});

WithoutLinkOrAction.args = {
    items: [...ITEMS, { bold: true, label: 'Active' }],
};

export const WithDecoratorAndAction = Template.bind({});

WithDecoratorAndAction.args = {
    items: [...ITEMS, { onClick: action('click'), bold: true, decorator: <IconIcon />, label: 'Active' }],
};

export const WithDecoratorAndLink = Template.bind({});

WithDecoratorAndLink.args = {
    items: [...ITEMS, { link, bold: true, decorator: <IconIcon />, label: 'Active' }],
};

export const WithBadges = Template.bind({});

WithBadges.args = {
    items: [
        ...ITEMS,
        {
            link,
            bold: true,
            label: 'Active',
            badges: [
                { style: BadgeStyle.Positive, children: 'Badge 1' },
                { status: BadgeStatus.Danger, children: 'Badge 2' },
                { style: BadgeStyle.Danger, icon: <IconIcon />, children: 'Badge 3' },
            ],
        },
    ],
};

export const WithDecoratorAndBadge: StoryFn<BreadcrumbsProps> = (args: BreadcrumbsProps) => <Breadcrumbs {...args} />;

WithDecoratorAndBadge.args = {
    items: [
        ...ITEMS,
        {
            link,
            bold: true,
            decorator: <IconIcon />,
            label: 'Active',
            badges: [{ status: BadgeStatus.Positive, children: 'Badge' }],
        },
    ],
};
