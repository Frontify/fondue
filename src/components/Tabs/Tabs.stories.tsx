/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Tabs, TabsProps } from './Tabs';
import { Button } from '@components/Button';
import { Text } from '@typography/Text';
import { Divider } from '@components/Divider';
import { TabItem, TabItemProps } from '@components/Tabs/TabItem';
import { IconSize } from '@foundation/Icon/IconSize';
import { IconIcon } from '@foundation/Icon/Generated';
import { BadgeStyle } from '@components/Badge';
import { Checkbox as CheckboxComponent, CheckboxProps, CheckboxState } from '@components/Checkbox/Checkbox';

const TABS_PADDING_X_TYPES = ['small', 'medium', 'large'];

const TABS_SIZE_TYPES = ['Small', 'Large'];

const checkboxArgs = {
    state: CheckboxState.Unchecked,
    disabled: false,
    required: false,
    value: "whatever-you'd-like",
    label: 'Checkbox label',
    note: 'Note about this input',
    tooltip: {
        content: 'Lorem ipsum dolor sit amet.',
    },
} as Meta<CheckboxProps>;

const CustomCheckbox = () => {
    const [checked, setChecked] = useState<CheckboxState>(CheckboxState.Unchecked);

    return (
        <CheckboxComponent
            {...checkboxArgs}
            state={checked}
            onChange={(isChecked) => {
                setChecked(isChecked ? CheckboxState.Checked : CheckboxState.Unchecked);
            }}
        />
    );
};

const TextParagraph = () => {
    return (
        <Text>
            <p>
                Bacon ipsum dolor amet spare ribs swine meatloaf, pastrami cupim tail leberkas frankfurter jowl chislic
                shoulder. Frankfurter drumstick t-bone bacon ground round. Cupim pork loin shank kielbasa. Short loin
                shank meatloaf tongue. Chicken sirloin swine ball tip. Turkey pork kevin burgdoggen meatball t-bone.
            </p>
        </Text>
    );
};

const data: TabItemProps[] = [
    {
        id: 'tab-1',
        label: 'A tab',
        children: (
            <>
                <CustomCheckbox />
                <br />
                <TextParagraph />
                <br />
                <TextParagraph />
                <br />
                <TextParagraph />
                <br />
                <TextParagraph />
            </>
        ),
    },
    {
        id: 'tab-2',
        label: 'Disabled',
        disabled: true,
        children: 'Rib-eye',
    },
    {
        id: 'tab-3',
        label: 'A long tab name',
        children: (
            <Text>
                Sirloin prosciutto cow short loin, andouille bresaola doner fatback pork loin. Tongue ribeye kielbasa
                pastrami. Meatball tail hamburger beef ribs beef ball tip pork chop buffalo short loin boudin chicken
                pastrami ribeye picanha flank. Shoulder chicken pancetta shankle biltong rump hamburger kielbasa tri-tip
                ham hock frankfurter.
            </Text>
        ),
    },
    {
        id: 'tab-4',
        label: 'An even longer tab name',
        children: (
            <div>
                <Text>
                    Porchetta burgdoggen kielbasa tenderloin boudin, ham cow pork loin salami. Pork chop swine meatloaf,
                    sausage ground round tenderloin beef pork chislic chicken short loin landjaeger. Pig pork chop
                    meatball picanha short ribs. Meatloaf buffalo shoulder, tail beef ribs corned beef short ribs ground
                    round andouille pork belly landjaeger swine hamburger meatball. Ham hock turducken tri-tip picanha,
                    buffalo leberkas pork loin chuck ground round.
                    <Divider />
                    <Button>Some button</Button>
                </Text>
            </div>
        ),
    },
    {
        id: 'tab-5',
        label: 'Disabled',
        disabled: true,
        children: <Button>Sirloin</Button>,
    },
    {
        id: 'tab-6',
        label: 'Last tab',
        children: <Text>Meat.</Text>,
    },
];

export default {
    title: 'Components/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    argTypes: {
        paddingX: {
            options: TABS_PADDING_X_TYPES,
            control: { type: 'select' },
            defaultValue: '8',
        },
        size: {
            options: TABS_SIZE_TYPES,
            control: { type: 'select' },
            defaultValue: 'Small',
        },
        maxHeight: {
            type: 'string',
            defaultValue: '100px',
        },
        minHeight: {
            type: 'string',
            defaultValue: '50px',
        },
        scrollShadows: {
            control: { type: 'boolean' },
            default: true,
        },
    },
} as Meta<TabsProps>;

const TabsComponent = (args: TabsProps) => {
    const [activeItemId, setActiveItemId] = useState(data[0].id);
    const defaultChildren = data.map((item) => (
        <TabItem
            id={item.id}
            key={item.id}
            label={item.label}
            disabled={item.disabled ?? false}
            decorator={item.decorator}
        >
            <div className="tw-p-3">{item.children}</div>
        </TabItem>
    ));

    return (
        <Tabs {...args} activeItemId={activeItemId} onChange={(value) => setActiveItemId(value)}>
            {args.children && args.children}
            {!args.children && defaultChildren}
        </Tabs>
    );
};

const TabTemplate: StoryFn<TabsProps> = (args) => {
    return <TabsComponent {...args} />;
};
export const Default = TabTemplate.bind({});
Default.storyName = 'Label Only';

const TabWithMaxHeight: StoryFn<TabsProps> = (args) => {
    return <TabsComponent {...args} />;
};
export const WithMaxHeight = TabWithMaxHeight.bind({});
WithMaxHeight.args = {
    maxHeight: '100px',
};

const TabWithMinHeight: StoryFn<TabsProps> = (args) => {
    return <TabsComponent {...args} />;
};
export const WithMinHeight = TabWithMinHeight.bind({});
WithMinHeight.args = {
    minHeight: '50px',
};

const TabWithoutScrollShadows: StoryFn<TabsProps> = (args) => {
    return <TabsComponent {...args} />;
};
export const WithoutScrollShadows = TabWithoutScrollShadows.bind({});
WithoutScrollShadows.args = {
    scrollShadows: false,
    maxHeight: '100px',
};

const dataWithIcon = data.map((item) => Object.assign({}, item, { decorator: <IconIcon size={IconSize.Size16} /> }));
const TabWithIconTemplate: StoryFn<TabsProps> = (args) => {
    return (
        <TabsComponent {...args}>
            {dataWithIcon.map((item) => (
                <TabItem
                    id={item.id}
                    key={item.id}
                    label={item.label}
                    disabled={item.disabled ?? false}
                    decorator={item.decorator}
                >
                    <div className="tw-p-3">{item.children}</div>
                </TabItem>
            ))}
        </TabsComponent>
    );
};
export const WithIcon = TabWithIconTemplate.bind({});
WithIcon.storyName = 'Icon and Label';

const dataWithBadge = data.map((item) =>
    Object.assign({}, item, {
        badge: {
            style: BadgeStyle.Positive,
            children: 'Badge',
        },
    }),
);
const TabWithBadgeTemplate: StoryFn<TabsProps> = (args) => {
    return (
        <TabsComponent {...args}>
            {dataWithBadge.map((item) => (
                <TabItem
                    id={item.id}
                    key={item.id}
                    label={item.label}
                    disabled={item.disabled ?? false}
                    badge={item.badge}
                >
                    <div className="tw-p-3">{item.children}</div>
                </TabItem>
            ))}
        </TabsComponent>
    );
};
export const WithBadge = TabWithBadgeTemplate.bind({});
WithBadge.storyName = 'Label and Badge';

const dataWithBadgeAndIcon = dataWithBadge.map((item) =>
    Object.assign({}, item, { decorator: <IconIcon size={IconSize.Size16} /> }),
);
const TabWithBadgeAndIconTemplate: StoryFn<TabsProps> = (args) => {
    return (
        <TabsComponent {...args}>
            {dataWithBadgeAndIcon.map((item) => (
                <TabItem
                    id={item.id}
                    key={item.id}
                    label={item.label}
                    disabled={item.disabled ?? false}
                    badge={item.badge}
                    decorator={item.decorator}
                >
                    <div className="tw-p-3">{item.children}</div>
                </TabItem>
            ))}
        </TabsComponent>
    );
};
export const WithBadgeAndIcon = TabWithBadgeAndIconTemplate.bind({});
WithBadgeAndIcon.storyName = 'Label, Badge and Icon';
