/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Modal } from "./Modal";
import { ModalProps } from "./types";
import { Button } from "@components/Button";
import { Story, Meta } from "@storybook/react";
import { PatternDesign, PatternScale, PatternTheme } from "@foundation/Pattern";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Modal",
    component: Modal,
} as Meta<ModalProps>;

export const Default: Story<ModalProps> = () => {
    return (
        <Modal
            visual={{
                pattern: PatternDesign.Typography,
                foregroundColor: PatternTheme.Violet,
                scale: PatternScale.LG,
            }}
        >
            <Button>Button</Button>
        </Modal>
    );
};
