/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from "@components/Checkbox/Checkbox";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { LinkChooser, LinkChooserProps } from "./LinkChooser";

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

    // const formattedActionBlocks = actionMenuBlocks?.map((block) => ({
    //     ...block,
    //     menuItems: block.menuItems.map((item) => ({
    //         ...item,
    //         onClick: () => handleWindowChange(item.title as OpenWindowType),
    //     })),
    // }));

    // const handleOptionChange = useCallback(
    //     (item: MenuItemType | undefined) => {
    //         setSelectedOption({
    //             title: item?.title || "",
    //             link: item?.link || "",
    //             id: item?.id || "",
    //             icon: item?.iconLabel || IconLabel.Link,
    //         });
    //     },
    //     [selectMenuBlocks],
    // );

    // const handleWindowChange = (window: OpenWindowType) => setOpenWindow(window);

    const handleTabChange = (value: boolean) => setNewTab(value ? CheckboxState.Checked : CheckboxState.Unchecked);

    return <LinkChooser newTab={newTab} onOpenInNewTabChange={handleTabChange} />;
};

export const Default = LinkChooserTemplate.bind({});
