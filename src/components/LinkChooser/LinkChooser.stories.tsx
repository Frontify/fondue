/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from "@components/Checkbox/Checkbox";
import { SelectionIndicatorIcon } from "@components/MenuItem/MenuItem";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { IconLabel, LinkChooser } from "./LinkChooser";
import { data } from "./mock/data";
import { templates } from "./mock/templates";
import { LinkChooserProps, SearchResult } from "./types";

export default {
    title: "Components/Link Chooser",
    component: LinkChooser,
    args: {
        placeholder: "https://example.com",
        disabled: false,
        clearable: false,
    },
    argTypes: {
        onLinkChange: { action: "onClick" },
    },
} as Meta<LinkChooserProps>;

const LinkChooserTemplate: Story<LinkChooserProps> = (args: LinkChooserProps) => {
    const [newTab, setNewTab] = useState<CheckboxState>(CheckboxState.Unchecked);

    const handleTabChange = (value: boolean) => setNewTab(value ? CheckboxState.Checked : CheckboxState.Unchecked);

    const doesContainSubstring = (source: string, target: string) =>
        source.toLowerCase().includes(target.toLowerCase());

    const getGlobalByQuery = (query: string): Promise<SearchResult[]> => {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve(
                    data
                        .filter((item) => doesContainSubstring(item.title, query))
                        .map((item) => ({
                            ...item,
                            size: MenuItemContentSize.Large,
                            selectionIndicator: SelectionIndicatorIcon.None,
                        })),
                );
            }, Math.floor(Math.random() * 2000)),
        );
    };

    /* const getGuidelinesByQuery = (query: string): Promise<SearchResult[]> => {}; */

    /* const getProjectsByQuery = (query: string): Promise<SearchResult[]> => {}; */

    const getTemplatesByQueryMock = (query: string): Promise<SearchResult[]> => {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve(
                    templates
                        .filter((template) => doesContainSubstring(template.title, query))
                        .map((item) => ({
                            ...item,
                            size: MenuItemContentSize.Large,
                            icon: IconLabel.Template,
                            selectionIndicator: SelectionIndicatorIcon.None,
                        })),
                );
            }, Math.floor(Math.random() * 2000)),
        );
    };

    return (
        <LinkChooser
            {...args}
            getGlobalByQuery={getGlobalByQuery}
            getTemplatesByQuery={getTemplatesByQueryMock}
            openInNewTab={newTab}
            onOpenInNewTabChange={handleTabChange}
        />
    );
};

export const Default = LinkChooserTemplate.bind({});
