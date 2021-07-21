import { Meta, Story } from "@storybook/react";
import TextareaComponent, { TextareaProps } from "./Textarea";

export default {
    title: "Elements/Textarea",
    component: TextareaComponent,
    argTypes: {
        decorator: { type: "string" },
        onInput: { action: "onInput" },
        onBlur: { action: "onBlur" },
        onClear: { action: "onClear" },
    },
} as Meta;

export const Textarea: Story<TextareaProps> = (args) => <TextareaComponent {...args} />;
