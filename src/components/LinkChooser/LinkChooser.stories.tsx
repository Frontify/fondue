/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SelectionIndicatorIcon } from "@components/MenuItem/MenuItem";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { Validation } from "@components/TextInput";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { LinkChooser } from "./LinkChooser";
import { data } from "./mock/data";
import { templates } from "./mock/templates";
import { LinkChooserProps, SearchResult } from "./types";
import { doesContainSubstring } from "./utils/helpers";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Link Chooser",
    component: LinkChooser,
    args: {
        placeholder: "https://example.com",
        disabled: false,
        clearable: false,
        required: true,
        validation: Validation.Default,
    },
    argTypes: {
        onLinkChange: { action: "onClick" },
        validation: {
            options: Object.values(Validation),
            control: { type: "select" },
        },
    },
} as Meta<LinkChooserProps>;

const getGlobalByQueryMock = (query: string): Promise<SearchResult[]> => {
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
                        selectionIndicator: SelectionIndicatorIcon.None,
                    })),
            );
        }, Math.floor(Math.random() * 2000)),
    );
};

const getGuidelinesByQueryMock = (query: string): Promise<SearchResult[]> => {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(
                templates
                    .filter((template) => doesContainSubstring(template.title, query))
                    .map((item) => ({
                        ...item,
                        size: MenuItemContentSize.Large,
                        selectionIndicator: SelectionIndicatorIcon.None,
                    })),
            );
        }, Math.floor(Math.random() * 2000)),
    );
};

const LinkChooserTemplate: Story<LinkChooserProps> = (args: LinkChooserProps) => {
    const [openInNewTab, setOpenInNewTab] = useState<boolean>(false);

    return (
        <LinkChooser
            {...args}
            getGlobalByQuery={getGlobalByQueryMock}
            getTemplatesByQuery={getTemplatesByQueryMock}
            getGuidelinesByQuery={getGuidelinesByQueryMock}
            openInNewTab={openInNewTab}
            label="URL"
            onOpenInNewTabChange={setOpenInNewTab}
        />
    );
};

export const Default = LinkChooserTemplate.bind({});
