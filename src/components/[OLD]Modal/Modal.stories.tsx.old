import { Meta, Story } from "@storybook/react";
import ModalComponent, { ModalPatternColor, ModalProps } from "./Modal";

export default {
    title: "Components/Modal",
    component: ModalComponent,
    args: {
        title: "Title",
        content: "Content (ReactNode)",
        actions: "Actions (ReactNode)",
    } as ModalProps,
    argTypes: {
        pattern: {
            options: Object.values(ModalPatternColor),
            control: "select",
        },
        onClickedOutside: {
            table: { disable: true },
            action: "onClickedOutside",
        },
    },
} as Meta;

export const Modal: Story<ModalProps> = (args) => <ModalComponent {...args} />;
