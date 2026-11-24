/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { Tabs } from '../Tabs';

type ControlledTabsProps = {
    onActiveTabChange: (value: string) => void;
    ignoreChanges?: boolean;
};

export const ControlledTabs = ({ onActiveTabChange, ignoreChanges = false }: ControlledTabsProps) => {
    const [activeTab, setActiveTab] = useState('first');

    return (
        <Tabs.Root
            activeTab={activeTab}
            onActiveTabChange={(value) => {
                onActiveTabChange(value);
                if (!ignoreChanges) {
                    setActiveTab(value);
                }
            }}
        >
            <Tabs.Tab value="first">
                <Tabs.Trigger data-test-id="test-first-tab-trigger">First</Tabs.Trigger>
                <Tabs.Content>First content</Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="second">
                <Tabs.Trigger data-test-id="test-second-tab-trigger">Second</Tabs.Trigger>
                <Tabs.Content>Second content</Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="third">
                <Tabs.Trigger data-test-id="test-third-tab-trigger">Third</Tabs.Trigger>
                <Tabs.Content>Third content</Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>
    );
};
