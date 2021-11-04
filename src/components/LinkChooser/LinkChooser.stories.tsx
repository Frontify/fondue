/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useCallback, useState } from "react";
import { Story, Meta } from "@storybook/react";
import { IconLabel, LinkChooser } from "./LinkChooser";
import { SelectionIndicatorIcon } from "@components/MenuItem/MenuItem";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { MenuBlock, MenuItemType } from "@components/Menu/SelectMenu";
import { CheckboxState } from "@components/Checkbox/Checkbox";
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
    templateMenuBlocks: TemplateMenuBlock[];
    ariaLabel?: string;
    label?: string;
    placeholder?: string;
};

export type SelectedOption = Omit<MenuItemType, "decorator" | "link"> & { link: string; icon: string };

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
                    title: '"www.website.com"',
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    iconLabel: IconLabel.External,
                    link: "https://www.frontify.com/en/digital-and-print-templates/",
                },
                {
                    id: "7",
                    title: "Aerial City View",
                    subtitle: "Corporate Library",
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    iconLabel: IconLabel.Template,
                    link: "",
                },
                {
                    id: "8",
                    title: "Brooklyn",
                    subtitle: "Template Library Old Brand",
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    iconLabel: IconLabel.Template,
                    link: "",
                },
                {
                    id: "9",
                    title: "City",
                    subtitle: "SRF Kultur On Screen",
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    iconLabel: IconLabel.Template,
                    link: "",
                },
                {
                    id: "10",
                    title: "Malaya Poster",
                    subtitle: "UNICEF Social Campaign",
                    link: "",
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    iconLabel: IconLabel.Template,
                },
                {
                    id: "11",
                    title: "Brand Business Card",
                    subtitle: "Corporate Library",
                    link: "",
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    iconLabel: IconLabel.Template,
                },
            ],
        },
    ],
    templateMenuBlocks: [
        {
            id: "Templates",
            menuItems: [
                {
                    id: "7",
                    preview:
                        "https://images.frontify.test/s3/frontify-dev-files/eyJwYXRoIjoibXNpcmljXC9hY2NvdW50c1wvYzRcLzFcL3Byb2plY3RzXC8yXC9hc3NldHNcLzhmXC83XC85MWU4MzdjZDk2YWQzN2EwYWY4OTZhYzA5OWRlNzIyNi0xNjM0MzAxNDUxLmpwZyJ9:msiric:Li3v_e6ogrxBoH-kli3whbqekW1K4ar5Dshif80q2o0?width=2400&height={height}",
                    title: "Aerial City View",
                    subtitle: "Corporate Library",
                    link: "",
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    iconLabel: IconLabel.Template,
                },
                {
                    id: "8",
                    preview:
                        "https://images.frontify.test/s3/frontify-dev-files/eyJwYXRoIjoibXNpcmljXC9hY2NvdW50c1wvYzRcLzFcL3Byb2plY3RzXC8yXC9hc3NldHNcL2M5XC84XC9lYjI2YWQzZWIwMGMxYWE4MDQ3MGQ4Y2U4YjVhZjcwNS0xNjM0MzAxNDUxLmpwZyJ9:msiric:GjhRABJhT0SYjJr9ANQ5QpwdrPCRiEcImzRZXOC_XHo?width=2400&height={height}",
                    title: "Brooklyn",
                    subtitle: "Template Library Old Brand",
                    link: "",
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    iconLabel: IconLabel.Template,
                },
                {
                    id: "9",
                    preview:
                        "https://images.frontify.test/s3/frontify-dev-files/eyJwYXRoIjoibXNpcmljXC9hY2NvdW50c1wvYzRcLzFcL3Byb2plY3RzXC8yXC9hc3NldHNcL2QzXC8xMFwvOTY1ZjU0YzFiYzcxMzJjYTZlNzgwYTBhNWU2ZTgyYTctMTYzNDMwMTQ1MS5qcGcifQ:msiric:_Vs4FXozFK81i3I6J69aAG8FOq_8ld1fV8oWsWYSF2Y?width=2400&height={height}",
                    title: "City",
                    subtitle: "SRF Kultur On Screen",
                    link: "",
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    iconLabel: IconLabel.Template,
                },
                {
                    id: "10",
                    preview:
                        "https://images.frontify.test/s3/frontify-dev-files/eyJwYXRoIjoibXNpcmljXC9hY2NvdW50c1wvYzRcLzFcL3Byb2plY3RzXC8yXC9hc3NldHNcLzY1XC8xMVwvYTA0NmQ0YTNiNTk1MGZkODc3NWI3Y2IzYWUwZTVlMDAtMTYzNDMwMTQ1MS5qcGcifQ:msiric:ZBtHCtUwKM6dDiuJALxz5Z6ZfJLk68cEgd6_jNJbuWc?width=2400&height={height}",
                    title: "Malaya Poster",
                    subtitle: "UNICEF Social Campaign",
                    link: "",
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    iconLabel: IconLabel.Template,
                },
                {
                    id: "11",
                    preview:
                        "https://images.frontify.test/s3/frontify-dev-files/eyJwYXRoIjoibXNpcmljXC9hY2NvdW50c1wvYzRcLzFcL3Byb2plY3RzXC8yXC9hc3NldHNcL2MyXC8xMlwvYTFkYzA0YTJkYmQwZTkxMTRlOGM2ODQzMWVmMjU5OTMtMTYzNDMwMTQ1MS5qcGcifQ:msiric:MLRtZYQCaEyWpPqgpGbA6P20PDgvagyoowNOllXgoCk?width=2400&height={height}",
                    title: "Brand Business Card",
                    subtitle: "Corporate Library",
                    link: "",
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    iconLabel: IconLabel.Template,
                },
            ],
        },
    ],
};
