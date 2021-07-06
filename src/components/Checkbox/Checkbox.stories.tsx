import { Story, Meta } from "@storybook/react";
import Checkbox, { CheckboxProps } from "./Checkbox";

export default {
    title: "Checkbox",
    component: Checkbox,
} as Meta;

const CheckboxTemplate: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Default = CheckboxTemplate.bind({});

Default.args = {};

Default.argTypes = {
    tooltip: { type: "string" },
    onChange: { action: "onChange" },
};
