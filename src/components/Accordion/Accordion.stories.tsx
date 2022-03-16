/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from "@components/Button/Button";
import { Dropdown } from "@components/Dropdown";
import { FieldsetHeaderType } from "@components/FieldsetHeader/FieldsetHeader";
import { FormControl } from "@components/FormControl/FormControl";
import { Slider } from "@components/Slider/Slider";
import { Switch, SwitchSize } from "@components/Switch/Switch";
import { TextInput, TextInputType } from "@components/TextInput/TextInput";
import IconIcons from "@foundation/Icon/Generated/IconIcons";
import IconTextAlignCenter from "@foundation/Icon/Generated/IconTextAlignCenter";
import IconTextAlignLeft from "@foundation/Icon/Generated/IconTextAlignLeft";
import IconTextAlignRight from "@foundation/Icon/Generated/IconTextAlignRight";
import { IconSize } from "@foundation/Icon/IconSize";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import React, { FC, useState } from "react";
import { AccordionHeaderIconSize } from ".";
import { merge } from "@utilities/merge";
import { Color } from "../../types/colors";
import { ColorPickerFlyout as ColorPickerFlyoutComponent } from "@components/ColorInputFlyout/ColorPickerFlyout";
import { EXAMPLE_PALETTES } from "@components/ColorPicker/example-palettes";
import { Accordion as AccordionComponent, AccordionItem } from "./Accordion";
import { AccordionHeaderIcon } from "./AccordionHeader";
import { AccordionHeaderProps, AccordionProps } from "./types";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Accordion",
    component: AccordionComponent,
} as Meta<AccordionProps>;

export const WithDifferentAccordionItems: Story<AccordionProps> = () => {
    const [showContent, setShowContent] = useState(true);
    const [input, setInput] = useState("");
    const [activeItemId, setActiveItemId] = useState<string | number | undefined>();
    const [temporaryColor, setTemporaryColor] = useState<Color | null>({ r: 0, g: 146, b: 120 });
    const [selectedColor, setSelectedColor] = useState<Color | null>(null);

    return (
        <AccordionComponent>
            <AccordionItem
                header={{
                    children: "Item with decorator, type Accordion and a FormControl child",
                    decorator: <IconIcons />,
                    type: FieldsetHeaderType.Accordion,
                    active: true,
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
            <AccordionItem
                header={{ children: "Item with plain text child", type: FieldsetHeaderType.AddRemove, active: true }}
            >
                bar
            </AccordionItem>
            <AccordionItem header={{ children: "Item with dropdown child", type: FieldsetHeaderType.AddRemove }}>
                <Dropdown
                    onChange={(id) => setActiveItemId(id)}
                    activeItemId={activeItemId}
                    menuBlocks={[
                        {
                            id: "block1",
                            menuItems: [
                                { id: "1", title: "Item 1" },
                                { id: "2", title: "Item 2" },
                                { id: "3", title: "Item 3" },
                                { id: "4", title: "Item 4" },
                                { id: "5", title: "Item 5" },
                            ],
                        },
                    ]}
                />
            </AccordionItem>
            <AccordionItem header={{ children: "Item with color picker flyout", type: FieldsetHeaderType.Accordion }}>
                <ColorPickerFlyoutComponent
                    disabled={false}
                    currentColor={temporaryColor}
                    onClick={() => setSelectedColor(temporaryColor)}
                    onClose={() => setTemporaryColor(selectedColor)}
                    onSelect={(color) => setTemporaryColor(color)}
                    palettes={EXAMPLE_PALETTES}
                />
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
            <AccordionItem
                header={{ children: "Item without padding", type: FieldsetHeaderType.AddRemove }}
                padding={false}
            >
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </AccordionItem>
        </AccordionComponent>
    );
};

const customHeader: FC<AccordionHeaderProps> = ({ isOpen, children }) => (
    <div
        className={merge([
            "tw-px-6 tw-py-4 tw-bg-black-5 tw-flex tw-justify-between tw-font-bold tw-items-center",
            isOpen ? "tw-text-black" : "tw-text-black-60",
        ])}
    >
        {children}
        <AccordionHeaderIcon isOpen={isOpen} type={FieldsetHeaderType.Accordion} size={AccordionHeaderIconSize.Small} />
    </div>
);

const Code: FC = ({ children }) => (
    <code className="tw-bg-black-5 tw-rounded tw-px-2 tw-text-box-negative-strong">{children}</code>
);

export const WithCustomAccordionItem: Story<AccordionProps> = () => {
    return (
        <AccordionComponent>
            <AccordionItem
                header={{
                    children: "Item with a custom headerComponent prop",
                    decorator: <IconIcons />,
                    active: true,
                }}
                divider
                padding={false}
                headerComponent={customHeader}
            >
                <div className="tw-p-5">
                    <p>
                        For maximum flexibility, you can create your own <Code>headerComponent</Code> to pass to
                        the&nbsp;
                        <Code>Accordion Item</Code>.
                    </p>
                    <p>
                        Import the <Code>AccordionHeaderProps</Code> type to assist in building it to be typesafe.
                    </p>
                    <p>
                        The properties that are available in the <Code>headerComponent</Code> are as follows:
                    </p>
                    <table className="tw-table-fixed tw-border tw-border-black-10 tw-my-4">
                        <thead className="tw-bg-black-5">
                            <tr className="tw-p-3 tw-border-b tw-border-b-black-10">
                                <th className="tw-p-3 tw-w-[10%]">Property</th>
                                <th className="tw-p-3 tw-w-[10%]">Type</th>
                                <th className="tw-p-3">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tw-p-3 tw-border-b tw-border-b-black-10">
                                <td className="tw-p-3 tw-font-bold">isOpen</td>
                                <td className="tw-p-3">
                                    <Code>boolean</Code>
                                </td>
                                <td className="tw-p-3">
                                    The state of the <Code>AccordionItem</Code> this <Code>headerComponent</Code>
                                    belongs to.
                                </td>
                            </tr>
                            <tr className="tw-p-3 tw-border-b tw-border-b-black-10">
                                <td className="tw-p-3 tw-font-bold">children</td>
                                <td className="tw-p-3">
                                    <Code>string</Code>
                                </td>
                                <td className="tw-p-3">
                                    The children property that is passed in via the <Code>header</Code> prop to
                                    the&nbsp;
                                    <Code>AccordionItem</Code>.
                                </td>
                            </tr>
                            <tr className="tw-p-3 tw-border-b tw-border-b-black-10">
                                <td className="tw-p-3 tw-font-bold">disabled</td>
                                <td className="tw-p-3">
                                    <Code>boolean</Code>
                                </td>
                                <td className="tw-p-3">
                                    The disabled property that is passed in via the <Code>header</Code> prop to
                                    the&nbsp;
                                    <Code>AccordionItem</Code>.
                                </td>
                            </tr>
                            <tr className="tw-p-3 tw-border-b tw-border-b-black-10">
                                <td className="tw-p-3 tw-font-bold">decorator</td>
                                <td className="tw-p-3">
                                    <Code>ReactNode</Code>
                                </td>
                                <td className="tw-p-3">
                                    The decorator icon property that is passed in via the <Code>header</Code> prop to
                                    the&nbsp;
                                    <Code>AccordionItem</Code>.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p>
                        The <Code>AccordionHeaderIcon</Code> is also available for consumption inside of the
                        <Code>headerComponent</Code>. Avoid using the deprecated <Code>type</Code> property on the&nbsp;
                        <Code>AccordionHeaderIcon</Code>. The default <Code>type</Code> is&nbsp;
                        <Code>FieldsetHeaderType.Accordion</Code>.
                    </p>
                </div>
            </AccordionItem>
        </AccordionComponent>
    );
};

export const WithDividers: Story<
    AccordionProps & {
        "Accordion Divider": boolean;
        "Accordion Border": boolean;
        "Item Divider": boolean;
    }
> = (args) => {
    return (
        <AccordionComponent divider={args["Accordion Divider"]} border={args["Accordion Border"]}>
            <AccordionItem
                header={{ children: "Accordion Divider", type: FieldsetHeaderType.Accordion, active: true }}
                divider={args["Item Divider"]}
            >
                <div className="tw-p-6">
                    Settings the <Code>divider</Code> prop on the <Code>Accordion</Code> will add a divider between the
                    children of the <Code>Accordion</Code>, whereas the <Code>border</Code> prop will add a top and
                    bottom border to the entire <Code>Accordion</Code>.
                </div>
            </AccordionItem>
            <AccordionItem
                header={{ children: "AccordionItem Divider", type: FieldsetHeaderType.Accordion }}
                divider={args["Item Divider"]}
            >
                <div className="tw-p-6">
                    Settings the <Code>divider</Code> prop on the <Code>AccordionItem</Code> will add a divider between
                    the header and content of the <Code>AccordionItem</Code> when it is open.
                    <Code>Accordion</Code>.
                </div>
            </AccordionItem>
            <AccordionItem
                header={{ children: "AccordionItem Divider", type: FieldsetHeaderType.Accordion }}
                divider={args["Item Divider"]}
            >
                <div className="tw-p-6">
                    Play around with the settings below to see the difference between these three properties. The&nbsp;
                    <Code>Accordion</Code> Ccomponent has the <Code>divider</Code> and <Code>border</Code> set to true
                    by default, whereas the&nbsp;
                    <Code>AccordionItem</Code> has the divider set to false by default.
                </div>
            </AccordionItem>
        </AccordionComponent>
    );
};

WithDividers.args = {
    "Accordion Divider": true,
    "Accordion Border": true,
    "Item Divider": false,
};

export const WithAdvancedFormControls: Story<AccordionProps> = () => {
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
                                onChange={setSpacing}
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
                        onChange={setAlignmnent}
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
