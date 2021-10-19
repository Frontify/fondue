/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { SelectListDropdown as SelectListDropdownComponent, SelectListDropdownProps } from "./SelectListDropdown";

export default {
    title: "Components/Select List Dropdown",
    component: SelectListDropdownComponent,
    args: {
        activeItemKeys: ["Short tag", "Tag 74"],
        items: [
            {
                name: "Checkbox label 1",
            },
            {
                name: "Short tag",
            },
            {
                name: "Checkbox label 2",
            },
            {
                name: "Checkbox label 3",
            },
            {
                name: "Tag 74",
            },
            {
                name: "This is a long tag",
            },
        ],
    },
} as Meta;

export const SelectListDropdown: Story<SelectListDropdownProps> = (args) => {
    const [activeItemKeys, setActiveItemKeys] = useState(args.activeItemKeys);
    return (
        <SelectListDropdownComponent
            {...args}
            activeItemKeys={activeItemKeys}
            onSelectionChange={(keys) => setActiveItemKeys(keys)}
        />
    );
};
