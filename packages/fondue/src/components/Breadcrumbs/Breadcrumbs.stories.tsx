/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { BadgeStatus, BadgeStyle } from '@components/Badge';
import IconIcon from '@foundation/Icon/Generated/IconIcon';

import { BreadcrumbGap, Breadcrumbs, type BreadcrumbsProps } from './Breadcrumbs';

const link = document.referrer;
const ITEMS = [
    { label: 'Item 1', link },
    { label: 'Item 2', link },
    { label: 'Item 3', link },
    { label: 'Item 4', link },
    { label: 'Item 5', link },
];

/**
 ### *Legacy component warning*
 #### This is a unmaintained legacy component. It will be deprecated and replaced with a new component in an upcoming release.
 */
export default {
    title: 'Legacy Components/Breadcrumbs',
    component: Breadcrumbs,
    tags: ['autodocs'],
    args: {
        keepRoot: true,
    },
    argTypes: {
        verticalGap: {
            options: Object.values(BreadcrumbGap),
            control: { type: 'radio' },
        },
        truncate: {
            description: 'If true, truncation will be applied to the trail.',
            defaultValue: false,
            control: { type: 'boolean' },
        },
        keepRoot: {
            description: 'If true, the first item in the list will remain, else it is will truncated.',
            defaultValue: true,
            control: { type: 'boolean' },
        },
        activeInline: {
            description: 'If true, the current item wil be appended to the trail.',
            defaultValue: false,
            control: { type: 'boolean' },
        },
        onBlur: { action: 'onBlur' },
    },
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
} as Meta<BreadcrumbsProps>;

const Template: StoryFn<BreadcrumbsProps> = (args: BreadcrumbsProps) => (
    <Breadcrumbs {...args} key={JSON.stringify(args)} />
);

export const WithoutLinkOrAction = Template.bind({});

WithoutLinkOrAction.args = {
    verticalGap: BreadcrumbGap.Medium,
    items: [...ITEMS, { bold: true, label: 'Active Item' }],
};

export const WithDecoratorAndActionAndRootTruncation = Template.bind({});

WithDecoratorAndActionAndRootTruncation.args = {
    verticalGap: BreadcrumbGap.Medium,
    keepRoot: false,
    truncate: true,
    items: [...ITEMS, { onClick: action('click'), bold: true, decorator: <IconIcon />, label: 'Active' }],
};

export const WithoutAnyLinksOrActions = Template.bind({});

WithoutAnyLinksOrActions.args = {
    verticalGap: BreadcrumbGap.Medium,
    items: ITEMS.map(({ label }) => ({ label })),
};

export const WithDecoratorAndLinkAndCurrentInline = Template.bind({});

WithDecoratorAndLinkAndCurrentInline.args = {
    verticalGap: BreadcrumbGap.Medium,
    activeInline: true,
    truncate: true,
    items: [...ITEMS, { link, bold: true, decorator: <IconIcon />, label: 'Active' }],
};

export const WithBadges = Template.bind({});

WithBadges.args = {
    verticalGap: BreadcrumbGap.Medium,
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
    verticalGap: BreadcrumbGap.Medium,
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
