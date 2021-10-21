/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { MultiSelect as MultiSelectComponent, MultiSelectProps } from "./MultiSelect";

export default {
    title: "Components/Multi Select",
    component: MultiSelectComponent,
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

export const MultiSelect: Story<MultiSelectProps> = (args) => {
    const [activeItemKeys, setActiveItemKeys] = useState<(string | number)[]>(args.activeItemKeys);
    return (
        <MultiSelectComponent
            {...args}
            activeItemKeys={activeItemKeys}
            onSelectionChange={(keys) => setActiveItemKeys(keys)}
        />
    );
};
