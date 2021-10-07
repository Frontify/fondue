import { Meta, Story } from "@storybook/react";
import React from "react";
import { SelectList as SelectListComponent, SelectListProps } from "./SelectList";

export default {
    title: "Components/SelectList",
    component: SelectListComponent,
} as Meta;

export const SelectList: Story<SelectListProps> = (args) => <SelectListComponent {...args} />;

SelectList.args = {
    activeItemNames: ["Tag"],
    items: [
        {
            name: "Tag",
        },
        {
            name: "Another Tag",
        },
    ],
};
