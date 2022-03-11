/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Modal } from "./Modal";
import React, { useState } from "react";
import { ModalBody } from "./ModalBody";
import { ModalHeader } from "./ModalHeader";
import { ModalFooter } from "./ModalFooter";
import { ModalHeaderProps, ModalHeaderVariant, ModalProps, ModalVisualProps } from "./types";
import { Story, Meta } from "@storybook/react";
import { TextInput } from "@components/TextInput";
import { generateRandomId } from "@utilities/generateRandomId";
import { PatternDesign, PatternTheme } from "@foundation/Pattern";
import { IconAcademy, IconAudio, IconIcons } from "@foundation/Icon";
import { ScrollWrapperDirection } from "@components/ScrollWrapper/types";
import { FormControl, FormControlDirection, FormControlStyle } from "@components/FormControl";
import { action } from "@storybook/addon-actions";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Modal",
    component: Modal,
    argTypes: {
        pattern: {
            table: {
                category: "Visual",
            },
            name: "Pattern",
            options: ["None", ...Object.values(PatternDesign)],
            mapping: { None: null, ...Object.values(PatternDesign) },
            defaultValue: PatternDesign.DigitalAssets,
            control: { type: "select" },
        },
        foregroundColor: {
            table: {
                category: "Visual",
            },
            name: "Theme",
            options: ["None", ...Object.values(PatternTheme)],
            mapping: { None: null, ...Object.values(PatternDesign) },
            defaultValue: PatternTheme.Black,
            control: { type: "select" },
        },
        title: {
            table: {
                category: "Header",
            },
            name: "Title",
            defaultValue: "Awesome modal",
            control: { type: "text" },
        },
        leadText: {
            table: {
                category: "Header",
            },
            name: "Lead Text",
            defaultValue: "The Home for Brand Management",
            control: { type: "text" },
        },
        decorator: {
            table: {
                category: "Header",
            },
            name: "Decorator",
            options: ["None", "Icons", "Academy", "Audio"],
            mapping: {
                None: null,
                Icons: <IconIcons key="iconIcons" />,
                Academy: <IconAcademy key="iconAcademy" />,
                Audio: <IconAudio key="iconAudio" />,
            },
            defaultValue: "Icons",
            control: { type: "select" },
        },
        variant: {
            table: {
                category: "Header",
            },
            name: "Variant",
            options: ["None", ...Object.values(ModalHeaderVariant)],
            mapping: { None: null, ...Object.values(ModalHeaderVariant) },
            defaultValue: ModalHeaderVariant.Informative,
            control: { type: "select" },
        },
    },
} as Meta;

export const Default: Story<ModalProps & ModalVisualProps & ModalHeaderProps> = (args) => {
    const [input, setInput] = useState("");

    return (
        <Modal
            visual={{
                pattern: args.pattern,
                foregroundColor: args.foregroundColor,
            }}
            header={
                <ModalHeader
                    title={args.title}
                    leadText={args.leadText}
                    decorator={args.decorator}
                    variant={args.variant}
                />
            }
            footer={
                <ModalFooter
                    buttons={[
                        { label: "Okay", action: () => action("click") },
                        { label: "Cancel", action: () => action("click") },
                    ]}
                />
            }
        >
            <ModalBody direction={ScrollWrapperDirection.Vertical}>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                        itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo,
                        fugiat perferendis consequatur.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                        itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo,
                        fugiat perferendis consequatur.
                    </p>
                    <div className="tw-my-4">
                        <FormControl
                            style={FormControlStyle.Primary}
                            direction={FormControlDirection.Vertical}
                            label={{
                                children: "Input Label",
                                required: false,
                                htmlFor: generateRandomId(),
                                tooltip: { content: "Tooltip Text" },
                            }}
                        >
                            <TextInput value={input} onChange={setInput} />
                        </FormControl>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                        itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo,
                        fugiat perferendis consequatur.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                        itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo,
                        fugiat perferendis consequatur.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                        itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo,
                        fugiat perferendis consequatur.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                        itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo,
                        fugiat perferendis consequatur.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                        itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo,
                        fugiat perferendis consequatur.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                        itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo,
                        fugiat perferendis consequatur.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                        itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo,
                        fugiat perferendis consequatur.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                        itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo,
                        fugiat perferendis consequatur.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                        itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo,
                        fugiat perferendis consequatur.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                        itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo,
                        fugiat perferendis consequatur.
                    </p>
                </div>
            </ModalBody>
        </Modal>
    );
};
