/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from "@components/Dropdown/Dropdown";
import { MenuItemContentSize } from "@components/Dropdown/MenuItemContent/MenuItemContent";
import { Slider } from "@components/Slider/Slider";
import { TextInput } from "@elements/TextInput/TextInput";
import { Meta, Story } from "@storybook/react";
import generateRandomId from "@utilities/generateRandomId";
import React, { useState } from "react";
import { FormControl, FormControlDirection, FormControlProps, HelperPosition, HelperTextStyle } from "./FormControl";

export default {
    title: "Compositions/Form Control",
    component: FormControl,
    args: {
        disabled: false,
        direction: FormControlDirection.Vertical,
        label: {
            children: "Input Label",
            required: false,
            htmlFor: generateRandomId(),
            tooltip: "Tooltip Text",
        },
        extra: "Extra Text or Element",
        helper: {
            text: "Helper Text (before/after) and variant (Primary/Success/Danger)",
            position: HelperPosition.After,
            style: HelperTextStyle.Primary,
        },
        children: "",
    },
    argTypes: {
        orientation: {
            options: Object.values(FormControlDirection),
            control: "select",
        },
        children: {
            tw-table: { disable: true },
        },
    },
} as Meta<FormControlProps>;

const Template: Story<FormControlProps> = (args) => <FormControl {...args} />;

export const WithTextInput = Template.bind({});

WithTextInput.args = {
    children: <TextInput />,
};

export const WithSlider: Story<FormControlProps> = (args) => {
    const [activeItemId, setActiveItemId] = useState<string>("a");
    return (
        <FormControl {...args}>
            <Slider
                items={[
                    { id: "1", name: "abc" },
                    { id: "2", name: "def" },
                    { id: "3", name: "ghi" },
                ]}
                activeItemId={activeItemId}
                onChange={setActiveItemId}
            />
        </FormControl>
    );
};

export const WithDropdown: Story<FormControlProps> = (args) => {
    const [activeItemId, setActiveItemId] = useState<string | undefined>();
    return (
        <FormControl {...args}>
            <Dropdown
                onChange={(id) => setActiveItemId(id)}
                activeItemId={activeItemId}
                size={MenuItemContentSize.Small}
                menuBlocks={[
                    {
                        id: "tw-block1",
                        menuItems: [
                            { id: "1", title: "Small 1", size: MenuItemContentSize.Small },
                            { id: "2", title: "Small 2", size: MenuItemContentSize.Small },
                            { id: "3", title: "Small 3", size: MenuItemContentSize.Small },
                        ],
                    },
                ]}
            />
        </FormControl>
    );
};
