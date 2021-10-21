/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import React from "react";
import { Tag, TagProps, TagType } from "./Tag";

export default {
    title: "Elements/Tag",
    component: Tag,
    args: {
        label: "Label",
    },
    argTypes: {
        type: {
            options: Object.keys(TagType),
            control: { type: "select" },
        },
    },
} as Meta<TagProps>;

const TagTemplate: Story<TagProps> = (args) => <Tag {...args} />;

export const Suggested = TagTemplate.bind({});
Suggested.args = {
    type: TagType.Suggested,
};

export const Selected = TagTemplate.bind({});
Selected.args = {
    type: TagType.Selected,
    onClick: action("onClick"),
};

export const SelectedWithFocus = TagTemplate.bind({});
SelectedWithFocus.args = {
    type: TagType.SelectedWithFocus,
    onClick: action("onClick"),
};

export const PreviouslySelected = TagTemplate.bind({});
PreviouslySelected.args = {
    type: TagType.PreviouslySelected,
};
