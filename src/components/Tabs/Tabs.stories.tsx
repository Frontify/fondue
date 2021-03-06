/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { TabSize, Tabs, TabsPaddingX, TabsProps } from './Tabs';
import { Button } from '@components/Button';
import { Text } from '../../typography/Text';
import { Divider } from '@components/Divider';
import { TabItem, TabItemProps } from '@components/Tabs/TabItem';
import { IconIcon, IconSize } from '@foundation/Icon';
import { BadgeStyle } from '@components/Badge';

const data: TabItemProps[] = [
    {
        id: 'tab-1',
        label: 'A tab',
        children: (
            <Text>
                Bacon ipsum dolor amet spare ribs swine meatloaf, pastrami cupim tail leberkas frankfurter jowl chislic
                shoulder. Frankfurter drumstick t-bone bacon ground round. Cupim pork loin shank kielbasa. Short loin
                shank meatloaf tongue. Chicken sirloin swine ball tip. Turkey pork kevin burgdoggen meatball t-bone.
            </Text>
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
    argTypes: {
        paddingX: {
            options: Object.values(TabsPaddingX),
            control: { type: 'select' },
            defaultValue: TabsPaddingX.Small,
        },
        size: {
            options: Object.values(TabSize),
            control: { type: 'select' },
            defaultValue: TabSize.Small,
        },
    },
} as Meta<TabsProps>;

const TabTemplate: Story<TabsProps> = (args) => {
    const [activeItemId, setActiveItemId] = useState(data[0].id);
    return (
        <Tabs {...args} activeItemId={activeItemId} onChange={(value) => setActiveItemId(value)}>
            {data.map((item) => (
                <TabItem id={item.id} key={item.id} label={item.label} disabled={item.disabled ?? false}>
                    <div className="tw-p-3">{item.children}</div>
                </TabItem>
            ))}
        </Tabs>
    );
};
export const Default = TabTemplate.bind({});
Default.storyName = 'Label Only';

const dataWithIcon = data.map((item) => Object.assign({}, item, { decorator: <IconIcon size={IconSize.Size16} /> }));
const TabWithIconTemplate: Story<TabsProps> = (args) => {
    const [activeItemId, setActiveItemId] = useState(data[0].id);
    return (
        <Tabs {...args} activeItemId={activeItemId} onChange={(value) => setActiveItemId(value)}>
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
        </Tabs>
    );
};
export const withIcon = TabWithIconTemplate.bind({});
withIcon.storyName = 'Icon and Label';

const dataWithBadge = data.map((item) =>
    Object.assign({}, item, {
        badge: {
            style: BadgeStyle.Positive,
            children: 'Badge',
        },
    }),
);
const TabWithBadgeTemplate: Story<TabsProps> = (args) => {
    const [activeItemId, setActiveItemId] = useState(data[0].id);
    return (
        <Tabs {...args} activeItemId={activeItemId} onChange={(value) => setActiveItemId(value)}>
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
        </Tabs>
    );
};
export const withBadge = TabWithBadgeTemplate.bind({});
withBadge.storyName = 'Label and Badge';

const dataWithBadgeAndIcon = dataWithBadge.map((item) =>
    Object.assign({}, item, { decorator: <IconIcon size={IconSize.Size16} /> }),
);
const TabWithBadgeAndIconTemplate: Story<TabsProps> = (args) => {
    const [activeItemId, setActiveItemId] = useState(data[0].id);
    return (
        <Tabs {...args} activeItemId={activeItemId} onChange={(value) => setActiveItemId(value)}>
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
        </Tabs>
    );
};
export const withBadgeAndIcon = TabWithBadgeAndIconTemplate.bind({});
withBadgeAndIcon.storyName = 'Label, Badge and Icon';
