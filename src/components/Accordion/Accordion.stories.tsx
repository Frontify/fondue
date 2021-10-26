/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slider } from "@components/Slider/Slider";
import { FieldsetHeaderType } from "@components/FieldsetHeader/FieldsetHeader";
import { FormControl } from "@components/FormControl/FormControl";
import { Button } from "@components/Button/Button";
import IconIcons from "@foundation/Icon/Generated/IconIcons";
import IconTextAlignCenter from "@foundation/Icon/Generated/IconTextAlignCenter";
import IconTextAlignLeft from "@foundation/Icon/Generated/IconTextAlignLeft";
import IconTextAlignRight from "@foundation/Icon/Generated/IconTextAlignRight";
import { IconSize } from "@foundation/Icon/IconSize";
import { Switch, SwitchSize } from "@components/Switch/Switch";
import { TextInput, TextInputType } from "@components/TextInput/TextInput";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { Accordion as AccordionComponent, AccordionItem, AccordionProps } from "./Accordion";

export default {
    title: "Components/Accordion",
    component: AccordionComponent,
    argTypes: {
        onChange: { table: { disable: true }, action: "onChange" },
    },
} as Meta<AccordionProps>;

export const WithDifferentAccordionItems: Story<AccordionProps> = () => {
    const [showContent, setShowContent] = useState(true);
    const [input, setInput] = useState("");

    return (
        <AccordionComponent>
            <AccordionItem
                header={{
                    children: "Item with decorator, type Accordion and a FormControl child",
                    decorator: <IconIcons />,
                    type: FieldsetHeaderType.Accordion,
                }}
            >
                <FormControl
                    label={{ children: "Width", htmlFor: "width", tooltip: { content: "Width of the future" } }}
                    extra="Some extra text."
                    helper={{ text: "This input should always equal to 42." }}
                >
                    <TextInput value={input} onChange={setInput} />
                </FormControl>
            </AccordionItem>
            <AccordionItem header={{ children: "Item with plain text child", type: FieldsetHeaderType.AddRemove }}>
                bar
            </AccordionItem>
            <AccordionItem
                header={{
                    children: "Empty item with an onClick callback",
                    onClick: action("click"),
                }}
            />
            <AccordionItem header={{ children: "Item with resizable content", type: FieldsetHeaderType.AddRemove }}>
                <div className={!showContent ? "tw-hidden" : ""}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <Button onClick={() => setShowContent(!showContent)}>Toggle Content</Button>
            </AccordionItem>
        </AccordionComponent>
    );
};

export const WithAdvancedFormControls: Story<AccordionProps & { onChange: (id: string) => void }> = (args) => {
    const [spacing, setSpacing] = useState("1");
    const [showAdvancedSpacing, setShowAdvancedSpacing] = useState(false);
    const [alignment, setAlignmnent] = useState("l");

    return (
        <AccordionComponent>
            <AccordionItem header={{ children: "Layout", type: FieldsetHeaderType.Accordion }}>
                <FormControl
                    label={{ children: "Spacing", htmlFor: "spacing" }}
                    extra={
                        <Switch
                            label="advanced"
                            on={showAdvancedSpacing}
                            size={SwitchSize.Small}
                            onChange={() => setShowAdvancedSpacing(!showAdvancedSpacing)}
                        />
                    }
                    helper={{ text: "Defines the spacing between elements." }}
                >
                    <div className="flex items-center h-11 relative">
                        {showAdvancedSpacing ? (
                            <div className="w-full">
                                <TextInput id="spacing" decorator="px" type={TextInputType.Number} />
                            </div>
                        ) : (
                            <Slider
                                id="spacing"
                                onChange={(id) => {
                                    args.onChange(id);
                                    setSpacing(id);
                                }}
                                activeItemId={spacing}
                                items={[
                                    { id: "1", value: "S" },
                                    { id: "2", value: "M" },
                                    { id: "3", value: "L" },
                                ]}
                            />
                        )}
                    </div>
                </FormControl>
            </AccordionItem>
            <AccordionItem header={{ children: "Alignment", type: FieldsetHeaderType.Accordion }}>
                <FormControl label={{ children: "Text", htmlFor: "text-alignment" }}>
                    <Slider
                        onChange={(id) => {
                            args.onChange(id);
                            setAlignmnent(id);
                        }}
                        activeItemId={alignment}
                        items={[
                            {
                                id: "l",
                                icon: <IconTextAlignLeft size={IconSize.Size16} />,
                                ariaLabel: "Text Align Left",
                            },
                            {
                                id: "c",
                                icon: <IconTextAlignCenter size={IconSize.Size16} />,
                                ariaLabel: "Text Align Center",
                            },
                            {
                                id: "r",
                                icon: <IconTextAlignRight size={IconSize.Size16} />,
                                ariaLabel: "Text Align Right",
                            },
                        ]}
                    />
                </FormControl>
            </AccordionItem>
        </AccordionComponent>
    );
};
