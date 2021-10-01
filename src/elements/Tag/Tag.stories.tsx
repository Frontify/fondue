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
            options: [TagType.Suggested, TagType.Selected, TagType.PreviouslySelected],
            mappings: [...Object.values(TagType)],
            defaultValue: TagType.Suggested,
            control: { type: "select" },
        },
    },
} as Meta<TagProps>;

const TagTemplate: Story<TagProps> = (args) => <Tag {...args} />;

export const Default = TagTemplate.bind({});
Default.args = {
    type: TagType.Suggested,
};

export const Suggested = TagTemplate.bind({});
Suggested.args = {
    type: TagType.Suggested,
};

export const Selected = TagTemplate.bind({});
Selected.args = {
    type: TagType.Selected,
};

export const PreviouslySelected = TagTemplate.bind({});
PreviouslySelected.args = {
    type: TagType.PreviouslySelected,
};
