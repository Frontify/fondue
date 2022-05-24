/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BadgeStatus, BadgeStyle } from '@components/Badge';
import IconIcons from '@foundation/Icon/Generated/IconIcons';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Breadcrumbs, BreadcrumbsProps } from './Breadcrumbs';

const link = document.referrer;
const ITEMS = [
    { label: 'Item 1', link },
    { label: 'Item 2', link },
    { label: 'Item 3', link },
];

// eslint-disable-next-line import/no-default-export
export default {
    title: 'Components/Breadcrumbs',
    component: Breadcrumbs,
    argTypes: {
        onBlur: { action: 'onBlur' },
    },
} as Meta<BreadcrumbsProps>;

const Template: Story<BreadcrumbsProps> = (args: BreadcrumbsProps) => <Breadcrumbs {...args} />;

export const WithoutLinkOrAction = Template.bind({});

WithoutLinkOrAction.args = {
    items: [...ITEMS, { bold: true, label: 'Active' }],
};

export const WithDecoratorAndAction = Template.bind({});

WithDecoratorAndAction.args = {
    items: [...ITEMS, { onClick: action('click'), bold: true, decorator: <IconIcons />, label: 'Active' }],
};

export const WithDecoratorAndLink = Template.bind({});

WithDecoratorAndLink.args = {
    items: [...ITEMS, { link, bold: true, decorator: <IconIcons />, label: 'Active' }],
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
                { style: BadgeStyle.Danger, icon: <IconIcons />, children: 'Badge 3' },
            ],
        },
    ],
};

export const WithDecoratorAndBadge: Story<BreadcrumbsProps> = (args: BreadcrumbsProps) => <Breadcrumbs {...args} />;

WithDecoratorAndBadge.args = {
    items: [
        ...ITEMS,
        {
            link,
            bold: true,
            decorator: <IconIcons />,
            label: 'Active',
            badges: [{ status: BadgeStatus.Positive, children: 'Badge' }],
        },
    ],
};
