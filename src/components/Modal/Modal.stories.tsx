/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Modal } from "./Modal";
import { ModalBody } from "./ModalBody";
import { Button } from "@components/Button";
import { ModalHeader } from "./ModalHeader";
import { IconIcons } from "@foundation/Icon";
import { Story, Meta } from "@storybook/react";
import { ModalHeaderVariant, ModalProps } from "./types";
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
            header={
                <ModalHeader
                    title="Modal header"
                    leadText="The Home for Brand Management"
                    decorator={<IconIcons />}
                    variant={ModalHeaderVariant.Informative}
                />
            }
            body={<ModalBody />}
        >
            <Button>Button</Button>
        </Modal>
    );
};
