import { Story, Meta } from "@storybook/react";
import Label, { LabelProps } from "./Label";

export default {
    title: "Form/Label",
    component: Label,
} as Meta;

const LabelTemplate: Story<LabelProps> = (args) => <Label {...args} />;

export const Default = LabelTemplate.bind({});

Default.args = {
    children: "Label",
};

Default.argTypes = {
    tooltip: { type: "string" },
};
