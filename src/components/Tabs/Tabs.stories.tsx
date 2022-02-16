/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { Tabs, TabSize, TabsPaddingX, TabsProps } from "./Tabs";
import { Button } from "@components/Button";
import { IconIcons, IconSize } from "@foundation/Icon";
import { BadgeStyle } from "@components/Badge";
import { Text } from "../../typography/Text";
import { Divider } from "@components/Divider";

const data = [
    {
        label: "A tab",
        content: (
            <Text>
                Bacon ipsum dolor amet spare ribs swine meatloaf, pastrami cupim tail leberkas frankfurter jowl chislic
                shoulder. Frankfurter drumstick t-bone bacon ground round. Cupim pork loin shank kielbasa. Short loin
                shank meatloaf tongue. Chicken sirloin swine ball tip. Turkey pork kevin burgdoggen meatball t-bone.
            </Text>
        ),
    },
    {
        label: "Disabled",
        content: "Rib-eye",
        disabled: true,
    },
    {
        label: "A long tab name",
        content: (
            <Text>
                Sirloin prosciutto cow short loin, andouille bresaola doner fatback pork loin. Tongue ribeye kielbasa
                pastrami. Meatball tail hamburger beef ribs beef ball tip pork chop buffalo short loin boudin chicken
                pastrami ribeye picanha flank. Shoulder chicken pancetta shankle biltong rump hamburger kielbasa tri-tip
                ham hock frankfurter.
            </Text>
        ),
    },
    {
        label: "An even longer tab name",
        content: (
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
        label: "Disabled",
        content: <Button>Sirloin</Button>,
        disabled: true,
    },
    {
        label: "Last tab",
        content: <Text>Meat.</Text>,
    },
];

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Tabs",
    component: Tabs,
    argTypes: {
        paddingX: {
            options: Object.values(TabsPaddingX),
            control: { type: "select" },
        },
        size: {
            options: Object.values(TabSize),
            control: { type: "select" },
        },
    },
    args: {
        paddingX: TabsPaddingX.Small,
        size: TabSize.Small,
    },
} as Meta<TabsProps>;

const TabTemplate: Story<TabsProps> = (args) => <Tabs {...args} content={data} />;
export const Default = TabTemplate.bind({});
Default.storyName = "Label Only";

const dataWithIcon = data.map((item) => Object.assign({}, item, { decorator: <IconIcons size={IconSize.Size16} /> }));
const TabWithIconTemplate: Story<TabsProps> = (args) => <Tabs {...args} content={dataWithIcon} />;
export const withIcon = TabWithIconTemplate.bind({});
withIcon.storyName = "Icon and Label";

const dataWithBadge = data.map((item) =>
    Object.assign({}, item, { badge: { style: BadgeStyle.Positive, children: "Badge" } }),
);
const TabWithBadgeTemplate: Story<TabsProps> = (args) => <Tabs {...args} content={dataWithBadge} />;
export const withBadge = TabWithBadgeTemplate.bind({});
withBadge.storyName = "Label and Badge";

const dataWithBadgeAndIcon = dataWithBadge.map((item) =>
    Object.assign({}, item, { decorator: <IconIcons size={IconSize.Size16} /> }),
);
const TabWithBadgeAndIconTemplate: Story<TabsProps> = (args) => <Tabs {...args} content={dataWithBadgeAndIcon} />;
export const withBadgeAndIcon = TabWithBadgeAndIconTemplate.bind({});
withBadgeAndIcon.storyName = "Label, Badge and Icon";
