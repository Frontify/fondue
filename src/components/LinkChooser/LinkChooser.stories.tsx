/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from "@components/Checkbox/Checkbox";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { SearchResult } from "src";
import { LinkChooser, LinkChooserProps } from "./LinkChooser";
import { data } from "./mock/data";
import { templates } from "./mock/templates";

export default {
    title: "Components/Link Chooser",
    component: LinkChooser,
    args: {
        placeholder: "https://example.com",
        disabled: false,
        clearable: false,
    },
} as Meta<LinkChooserProps>;

const LinkChooserTemplate: Story<LinkChooserProps> = () => {
    const [newTab, setNewTab] = useState<CheckboxState>(CheckboxState.Unchecked);

    const handleTabChange = (value: boolean) => setNewTab(value ? CheckboxState.Checked : CheckboxState.Unchecked);

    const doesContainSubstring = (source: string, target: string) =>
        source.toLowerCase().includes(target.toLowerCase());

    const getGlobalByQuery = (query: string): Promise<SearchResult[]> => {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve(data.filter((item) => doesContainSubstring(item.title, query)));
            }, 2000),
        );
    };

    /* const getGuidelinesByQuery = (query: string): Promise<SearchResult[]> => {}; */

    const getTemplatesByQueryMock = (query: string): Promise<SearchResult[]> => {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve(templates.filter((template) => doesContainSubstring(template.title, query)));
            }, 2000),
        );
    };

    return (
        <LinkChooser
            getGlobalByQuery={getGlobalByQuery}
            /*  getGuidelinesByQuery={getGuidelinesByQuery} */
            getTemplatesByQuery={getTemplatesByQueryMock}
            onLinkChange={(value: SearchResult) => console.log(value)}
            newTab={newTab}
            onOpenInNewTabChange={handleTabChange}
        />
    );
};

export const Default = LinkChooserTemplate.bind({});
