/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Story, Meta } from "@storybook/react";
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
            mappings: Object.values(TagType),
            defaultValue: TagType.Suggested,
            control: { type: "select" },
        },
        onClick: { action: "onClick" },
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
};

export const SelectedWithFocus = TagTemplate.bind({});
SelectedWithFocus.args = {
    type: TagType.SelectedWithFocus,
};

export const PreviouslySelected = TagTemplate.bind({});
PreviouslySelected.args = {
    type: TagType.PreviouslySelected,
};
