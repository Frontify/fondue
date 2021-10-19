/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { SelectList as SelectListComponent, SelectListProps } from "./SelectListDropdown";

export default {
    title: "Components/Select List",
    component: SelectListComponent,
} as Meta;

export const SelectList: Story<SelectListProps> = (args) => {
    const [activeItemKeys, setActiveItemKeys] = useState(args.activeItemKeys);
    return (
        <SelectListComponent
            {...args}
            activeItemKeys={activeItemKeys}
            onSelectionChange={(keys) => setActiveItemKeys(keys)}
        />
    );
};

SelectList.args = {
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
};
