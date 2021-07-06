import { Story, Meta } from "@storybook/react";
import Textarea, { TextareaProps } from "./Textarea";

export default {
    title: "Form/Textarea",
    component: Textarea,
} as Meta;

const TextareaTemplate: Story<TextareaProps> = (args) => <Textarea {...args} />;

export const Default = TextareaTemplate.bind({});

Default.args = {
    children: "",
};

Default.argTypes = {
    decorator: { type: "string" },
    onInput: { action: "onInput" },
    onBlur: { action: "onBlur" },
    onClear: { action: "onClear" },
};
