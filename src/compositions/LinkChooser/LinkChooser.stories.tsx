/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Key, useCallback, useState } from "react";
import { Story, Meta } from "@storybook/react";
import { IconLabel, LinkChooser } from "./LinkChooser";
import { SelectionIndicatorIcon } from "@components/Menu/MenuItem/MenuItem";
import { MenuItemContentSize } from "@components/Menu/MenuItem/MenuItemContent";
import { MenuBlock, MenuItemType } from "@components/Menu/SelectMenu";
import { CheckboxState } from "@elements/Checkbox/Checkbox";
import { TemplateMenuBlock } from "./LinkChooser";

export default {
    title: "Components/Link Chooser",
    component: LinkChooser,
    args: {
        placeholder: "https://example.com",
        disabled: false,
        clearable: false,
    },
} as Meta<LinkChooserProps>;

export enum OpenWindowType {
    None = "None",
    Guidelines = "Guidelines",
    Projects = "Projects",
    Templates = "Templates",
}

export type LinkChooserProps = {
    selectMenuBlocks: MenuBlock[];
    actionMenuBlocks?: MenuBlock[];
    templateMenuBlocks?: TemplateMenuBlock[];
    ariaLabel?: string;
    label?: string;
    placeholder?: string;
};

export type SelectedOption = { title: string; id: Key; link: string; icon: string };

export type OpenWindow = OpenWindowType;

const LinkChooserTemplate: Story<LinkChooserProps> = ({
    selectMenuBlocks,
    actionMenuBlocks,
    templateMenuBlocks,
}: LinkChooserProps) => {
    const [selectedOption, setSelectedOption] = useState<SelectedOption>({
        title: "",
        id: "",
        link: "",
        icon: IconLabel.Link,
    });
    const [newTab, setNewTab] = useState<CheckboxState>(CheckboxState.Unchecked);
    const [openWindow, setOpenWindow] = useState<OpenWindow>(OpenWindowType.None);

    const formattedActionBlocks = actionMenuBlocks?.map((block) => ({
        ...block,
        menuItems: block.menuItems.map((item) => ({
            ...item,
            onClick: () => handleWindowChange(item.title as OpenWindowType),
        })),
    }));

    const handleOptionChange = useCallback(
        (item: MenuItemType | undefined) => {
            setSelectedOption({
                title: item?.title || "",
                link: item?.link || "",
                id: item?.id || "",
                icon: item?.iconLabel || IconLabel.Link,
            });
        },
        [selectMenuBlocks],
    );

    const handleWindowChange = (window: OpenWindowType) => setOpenWindow(window);

    const handleTabChange = (value: boolean) => setNewTab(value ? CheckboxState.Checked : CheckboxState.Unchecked);

    return (
        <LinkChooser
            selectMenuBlocks={selectMenuBlocks}
            actionMenuBlocks={formattedActionBlocks}
            templateMenuBlocks={templateMenuBlocks}
            selectedOption={selectedOption}
            newTab={newTab}
            openWindow={openWindow}
            onOptionChange={handleOptionChange}
            onWindowChange={handleWindowChange}
            onTabChange={handleTabChange}
        />
    );
};

export const Default = LinkChooserTemplate.bind({});

Default.args = {
    selectMenuBlocks: [
        {
            id: "Suggestions",
            menuItems: [
                {
                    id: "1",
                    title: "Brand listening - A Memoir",
                    subtitle: "Guideline XYZ",
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    iconLabel: IconLabel.Document,
                    link: "https://www.frontify.com",
                },
                {
                    id: "2",
                    title: "Document Group",
                    subtitle: "Guide ABC",
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    iconLabel: IconLabel.Library,
                    link: "https://www.frontify.com/en/brand-guidelines/",
                },
                {
                    id: "3",
                    title: "Brand listening - Glossary & Docu.",
                    subtitle: "Guideline XYZ",
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    iconLabel: IconLabel.Document,
                    link: "https://www.frontify.com/en/digital-asset-management/",
                },
                {
                    id: "4",
                    title: '"Bran"',
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    iconLabel: IconLabel.Link,
                    link: "https://www.frontify.com/en/creative-collaboration/",
                },
                {
                    id: "5",
                    title: '"www.website.com"',
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    iconLabel: IconLabel.External,
                    link: "https://www.frontify.com/en/digital-and-print-templates/",
                },
            ],
        },
    ],
    actionMenuBlocks: [
        {
            id: "Actions",
            menuItems: [
                {
                    id: "6",
                    title: "Guidelines",
                    size: MenuItemContentSize.Small,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                },
                {
                    id: "7",
                    title: "Templates",
                    size: MenuItemContentSize.Small,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                },
            ],
        },
    ],
    templateMenuBlocks: [
        {
            id: "Templates",
            menuItems: [
                {
                    id: "8",
                    preview:
                        "https://images.frontify.test/s3/frontify-dev-files/eyJwYXRoIjoibXNpcmljXC9hY2NvdW50c1wvYzRcLzFcL3Byb2plY3RzXC8yXC9hc3NldHNcLzhmXC83XC85MWU4MzdjZDk2YWQzN2EwYWY4OTZhYzA5OWRlNzIyNi0xNjM0MzAxNDUxLmpwZyJ9:msiric:Li3v_e6ogrxBoH-kli3whbqekW1K4ar5Dshif80q2o0?width=2400&height={height}",
                    title: "Aerial City View",
                    subtitle: "Corporate Library",
                    link: "",
                },
                {
                    id: "9",
                    preview:
                        "https://images.frontify.test/s3/frontify-dev-files/eyJwYXRoIjoibXNpcmljXC9hY2NvdW50c1wvYzRcLzFcL3Byb2plY3RzXC8yXC9hc3NldHNcL2M5XC84XC9lYjI2YWQzZWIwMGMxYWE4MDQ3MGQ4Y2U4YjVhZjcwNS0xNjM0MzAxNDUxLmpwZyJ9:msiric:GjhRABJhT0SYjJr9ANQ5QpwdrPCRiEcImzRZXOC_XHo?width=2400&height={height}",
                    title: "Brooklyn",
                    subtitle: "Template Library Old Brand",
                    link: "",
                },
                {
                    id: "10",
                    preview:
                        "https://images.frontify.test/s3/frontify-dev-files/eyJwYXRoIjoibXNpcmljXC9hY2NvdW50c1wvYzRcLzFcL3Byb2plY3RzXC8yXC9hc3NldHNcL2QzXC8xMFwvOTY1ZjU0YzFiYzcxMzJjYTZlNzgwYTBhNWU2ZTgyYTctMTYzNDMwMTQ1MS5qcGcifQ:msiric:_Vs4FXozFK81i3I6J69aAG8FOq_8ld1fV8oWsWYSF2Y?width=2400&height={height}",
                    title: "City",
                    subtitle: "SRF Kultur On Screen",
                    link: "",
                },
            ],
        },
    ],
};
