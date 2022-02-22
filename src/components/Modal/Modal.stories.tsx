/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { Modal, ModalProps } from "./Modal";

export default {
    title: "Components/Modal",
    component: Modal,
} as Meta<ModalProps>;

const Template: Story<ModalProps> = (args) => <Modal {...args} />;

export const Default = Template.bind({});

Default.args = {
    foo: "bar",
};
