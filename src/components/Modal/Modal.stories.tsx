/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { ModalProps } from "./types";
import { Button } from "@components/Button";
import { Story, Meta } from "@storybook/react";
import { Modal as ModalComponent } from "./Modal";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Modal",
    component: ModalComponent,
} as Meta<ModalProps>;

export const Modal: Story<ModalProps> = (args: ModalProps) => (
    <ModalComponent {...args}>
        <Button>Button</Button>
    </ModalComponent>
);
