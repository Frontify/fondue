/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';

import { BreadcrumbItem } from '@components/Breadcrumbs';

import { OverflowMenu, type OverflowMenuProps } from './OverflowMenu';

const link = document.referrer;
const ITEMS = [
    { label: 'Item 1', link },
    { label: 'Item 2', link },
    { label: 'Item 3', link },
];

const BUTTON_ITEMS = [
    { label: 'Button Item 1', onClick: () => {} },
    { label: 'Button Item 2', onClick: () => {} },
    { label: 'Button Item 3', onClick: () => {} },
];

const SPAN_ITEMS = [{ label: 'Span Item 1' }, { label: 'Span Item 2' }, { label: 'Span Item 3' }];

const MIXED_ITEMS = [
    { label: 'Item 1', link },
    { label: 'Button Item 1', onClick: () => {} },
    { label: 'Span Item 1' },
];

export default {
    title: 'Components/OverflowMenu',
    component: OverflowMenu,
    tags: ['autodocs'],
    decorators: [
        (StoryElement) => (
            <div className="tw-h-48">
                <StoryElement />
            </div>
        ),
    ],
} as Meta<OverflowMenuProps>;

const Template: StoryFn<OverflowMenuProps> = (args: OverflowMenuProps) => <OverflowMenu {...args} />;

export const WithLinkItems = Template.bind({});
WithLinkItems.args = { items: [...ITEMS] };

export const WithButtonItems = Template.bind({});
WithButtonItems.args = { items: [...BUTTON_ITEMS] };

export const WithDisabledButtonInItemsList = Template.bind({});
WithDisabledButtonInItemsList.args = {
    items: BUTTON_ITEMS.map((item, index) => ({
        ...item,
        disabled: index === 1,
    })),
};

export const WithSpanItems = Template.bind({});
WithSpanItems.args = { items: [...SPAN_ITEMS] };

export const WithMixedItems = Template.bind({});
WithMixedItems.args = { items: [...MIXED_ITEMS] };

export const WithBoxAutoPositioning = Template.bind({});
WithBoxAutoPositioning.args = { items: [...BUTTON_ITEMS] };
WithBoxAutoPositioning.decorators = [
    (StoryElement) => (
        <div className="tw-flex tw-justify-end">
            <StoryElement />
        </div>
    ),
];

const Separator = () => (
    <svg
        aria-hidden="true"
        width="13"
        height="17"
        viewBox="0 0 13 17"
        fill="none"
        className="tw-stroke-current tw-text-black-20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <line x1="3.52447" y1="16.0623" x2="8.46874" y2="0.845385" />
    </svg>
);

export const BeforeBreadcrumbItems = Template.bind({});
BeforeBreadcrumbItems.args = { items: [...BUTTON_ITEMS] };
BeforeBreadcrumbItems.decorators = [
    (StoryElement) => (
        <div>
            <ol className="tw-flex">
                <li className="tw-flex tw-items-center">
                    <StoryElement />
                    <Separator />
                </li>
                <BreadcrumbItem label="Breadcrumb item 4" showSeparator={false} />
            </ol>
            <small>
                The separator should be handled by the <strong>Breadcrumbs</strong> component
            </small>
        </div>
    ),
];

export const BetweenBreadcrumbItems = Template.bind({});
BetweenBreadcrumbItems.args = { items: [...BUTTON_ITEMS] };
BetweenBreadcrumbItems.decorators = [
    (StoryElement) => (
        <div>
            <ol className="tw-flex">
                <BreadcrumbItem label="Breadcrumb item 1" showSeparator={true} />
                <li className="tw-flex tw-items-center">
                    <StoryElement />
                    <Separator />
                </li>
                <BreadcrumbItem label="Breadcrumb item 5" showSeparator={false} />
            </ol>
            <small>
                The separator should be handled by the <strong>Breadcrumbs</strong> component
            </small>
        </div>
    ),
];
