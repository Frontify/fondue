/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import Tab from "./Tab/Tab";
import TabsComponent, { TabsProps } from "./Tabs";

const TABS = [
    { label: "Frontify", content: <span>Frontify</span> },
    { label: "Youtube", content: <span>Youtube</span> },
    { label: "Twitter", content: <span>Twitter</span> },
];

export default {
    title: "Components/Tabs",
    component: TabsComponent,
    args: {
        id: "foobar",
        selectedIndex: 0,
    },
} as Meta<TabsProps>;

export const Tabs: Story<TabsProps> = (args) => (
    <TabsComponent id={args.id} selectedIndex={args.selectedIndex}>
        {TABS.map((tab, index) => (
            <Tab key={index} title={tab.label}>
                {tab.content}
            </Tab>
        ))}
    </TabsComponent>
);
