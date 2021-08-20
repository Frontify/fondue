/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slider } from "@components/Slider/Slider";
import { FormControl } from "@compositions/FormControl/FormControl";
import { BadgeStatus, BadgeStyle } from "@elements/Badge/Badge";
import { Divider, DividerHeight } from "@elements/Divider/Divider";
import IconIcons from "@elements/Icon/Generated/IconIcons";
import { Textarea } from "@elements/Textarea/Textarea";
import { TextInput } from "@elements/TextInput/TextInput";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { Flyout, FlyoutProps, FLYOUT_DIVIDER_COLOR } from "./Flyout";

export default {
    title: "Components/Flyout",
    component: Flyout,
    argTypes: {
        onClose: { action: "onClose" },
    },
    args: {
        onClose: action("close"),
    },
} as Meta<FlyoutProps>;

const FlyoutTemplate: Story<FlyoutProps> = (args) => {
    const [activeItemId, setActiveItemId] = useState("a");

    return (
        <Flyout {...args}>
            <div className="tw-flex tw-flex-col tw-gap-y-8">
                <FormControl
                    label={{ children: "Input Label", htmlFor: "input-id", tooltip: "Input Tooltip" }}
                    extra="Extra Text"
                >
                    <TextInput />
                </FormControl>
                <Divider color={FLYOUT_DIVIDER_COLOR} height={DividerHeight.Height10} />
                <FormControl
                    label={{
                        children: "Slider Label",
                        htmlFor: "slider-id",
                    }}
                >
                    <Slider
                        activeItemId={activeItemId}
                        onChange={setActiveItemId}
                        items={[
                            { id: "a", name: "abc" },
                            { id: "b", name: "def" },
                            { id: "c", name: "ghi" },
                        ]}
                    />
                </FormControl>
            </div>

            <FormControl
                label={{
                    children: "Textarea Label",
                    htmlFor: "textarea-id",
                }}
            >
                <Textarea placeholder="This is a placeholder" />
            </FormControl>
        </Flyout>
    );
};

export const WithoutHeader = FlyoutTemplate.bind({});

WithoutHeader.args = {
    onClose: action("close"),
};

export const WithOnclick = FlyoutTemplate.bind({});

WithOnclick.argTypes = {
    onClick: { action: "onClick" },
};

WithOnclick.args = {
    title: "Header title",
    decorator: <IconIcons />,
    onClick: action("click"),
};

export const WithBadges = FlyoutTemplate.bind({});

WithBadges.args = {
    title: "Header title",
    decorator: <IconIcons />,
    badges: [
        { style: BadgeStyle.Positive, children: "Badge 1" },
        { status: BadgeStatus.Danger, children: "Badge 2" },
        { style: BadgeStyle.Danger, icon: <IconIcons />, children: "Badge 3" },
    ],
};
