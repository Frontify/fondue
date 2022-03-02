/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { ModalProps } from "./types";
import { Button } from "@components/Button";
import { Story, Meta } from "@storybook/react";
import { Modal } from "./Modal";
import { PatternDesign, patternDesignsSvg, PatternScale, PatternTheme } from "@foundation/Pattern";
import { ModalVisual } from "./ModalVisual";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Modal",
    component: Modal,
    args: {
        title: "Modal title",
    },
    argTypes: {
        visual: {
            options: ["None", ...Object.values(PatternDesign)],
            mapping: {
                None: undefined,
                ...Object.values(PatternDesign),
            },
            control: { type: "select" },
        },
        foregroundColor: {
            options: ["None", ...Object.values(PatternTheme)],
            mapping: {
                None: undefined,
                ...Object.values(PatternTheme),
            },
            control: { type: "select" },
        },
        scale: {
            options: ["None", ...Object.values(PatternScale)],
            mapping: {
                None: undefined,
                ...Object.values(PatternScale),
            },
            control: { type: "select" },
        },
    },
} as Meta<ModalProps>;

const ModalTemplate: Story<ModalProps> = (args, argTypes) => (
    <Modal {...args} {...argTypes}>
        <Button>Button</Button>
    </Modal>
);

export const Default = ModalTemplate.bind({});

export const WithVisual = ModalTemplate.bind({});
WithVisual.args = {
    visual: PatternDesign.DigitalAssets,
    foregroundColor: PatternTheme.Violet,
    scale: PatternScale.XXL,
};

export const ConcreteImplementation: Story<ModalProps> = () => (
    <Modal>
        <ModalVisual pattern={PatternDesign.Imagery} scale={PatternScale.XL} foregroundColor={PatternTheme.Violet} />
        <Button>Button</Button>
    </Modal>
);
