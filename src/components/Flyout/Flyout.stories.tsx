/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slider } from "@components/Slider/Slider";
import { FormControl } from "@compositions/FormControl/FormControl";
import { BadgeStatus, BadgeStyle } from "@elements/Badge/Badge";
import { Divider } from "@elements/Divider/Divider";
import IconActions from "@elements/Icon/Generated/IconActions";
import IconIcons from "@elements/Icon/Generated/IconIcons";
import { Textarea } from "@elements/Textarea/Textarea";
import { TextInput } from "@elements/TextInput/TextInput";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { Flyout, FlyoutProps, FLYOUT_DIVIDER_COLOR, FLYOUT_DIVIDER_HEIGHT } from "./Flyout";

export default {
    title: "Components/Flyout",
    component: Flyout,
    argTypes: {
        onClose: { action: "onClose", table: { disable: true } },
    },
    args: {
        trigger: (
            <span className="tw-flex tw-h-full tw-items-center tw-p-1 tw-rounded tw-bg-black-20 hover:tw-bg-black-30 dark:tw-bg-black-80 dark:hover:tw-bg-black-70">
                <IconActions />
            </span>
        ),
    },
} as Meta<FlyoutProps>;

const FlyoutTemplate: Story<FlyoutProps> = (args) => {
    const [activeItemId, setActiveItemId] = useState("a");
    const [input, setInput] = useState("");

    return (
        <div className="dark:tw-text-white">
            <div className="tw-flex tw-items-center">
                Some text
                <Flyout {...args}>
                    <div className="tw-flex tw-flex-col tw-gap-y-8 tw-p-8">
                        <FormControl
                            label={{
                                children: "Input Label",
                                htmlFor: "input-id",
                                tooltip: { content: "Input tooltip" },
                            }}
                            extra="Extra Text"
                        >
                            <TextInput value={input} onChange={setInput} />
                        </FormControl>
                        <Divider color={FLYOUT_DIVIDER_COLOR} height={FLYOUT_DIVIDER_HEIGHT} />
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
                                    { id: "a", value: "abc" },
                                    { id: "b", value: "def" },
                                    { id: "c", value: "ghi" },
                                ]}
                            />
                        </FormControl>
                    </div>

                    <div className="tw-p-8">
                        <FormControl
                            label={{
                                children: "Textarea Label",
                                htmlFor: "textarea-id",
                            }}
                        >
                            <Textarea placeholder="This is a placeholder" />
                        </FormControl>
                    </div>
                </Flyout>
            </div>
            <div>
                Deserunt voluptate deserunt laborum dolor excepteur. Reprehenderit amet cillum ad ut. Magna labore
                consequat enim tempor amet in qui. In esse proident officia aliquip ea in in nulla aliqua in laborum
                anim ipsum est.
            </div>
        </div>
    );
};

export const WithoutHeader = FlyoutTemplate.bind({});

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
