/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slider } from "@components/Slider/Slider";
import { FormControl } from "@components/FormControl/FormControl";
import { BadgeStatus, BadgeStyle } from "@components/Badge/Badge";
import { Button, ButtonStyle } from "@components/Button/Button";
import { Divider } from "@components/Divider/Divider";
import IconActions from "@foundation/Icon/Generated/IconActions";
import IconIcons from "@foundation/Icon/Generated/IconIcons";
import { Textarea } from "@components/Textarea/Textarea";
import { TextInput } from "@components/TextInput/TextInput";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import React, { MutableRefObject, useState } from "react";
import { Flyout, FLYOUT_DIVIDER_COLOR, FLYOUT_DIVIDER_HEIGHT, FlyoutProps } from "./Flyout";
import { FlyoutFooter } from "./FlyoutFooter";
import { chain } from "@react-aria/utils";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Flyout",
    component: Flyout,
    argTypes: {
        onCancel: { action: "onCancel", table: { disable: true } },
        onOpenChange: { action: "onOpenChange", table: { disable: true } },
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
    const [open, setOpen] = useState(false);

    return (
        <div className="dark:tw-text-white">
            <div className="tw-flex tw-items-center">
                Some text
                <Flyout
                    {...args}
                    isOpen={open}
                    onOpenChange={chain(args.onOpenChange, setOpen)}
                    onCancel={chain(args.onCancel, () => setOpen(false))}
                    onConfirm={args.onConfirm && chain(args.onConfirm, setOpen)}
                >
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
    onConfirm: { action: "onConfirm" },
};

WithOnclick.args = {
    title: "Header title",
    decorator: <IconIcons />,
    onConfirm: action("onConfirm"),
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

const WithButtonFlyoutTemplate: Story<FlyoutProps> = (args) => {
    const [open, setOpen] = useState(false);

    return (
        <Flyout
            {...args}
            trigger={({ "aria-label": ariaLabel }, ref: MutableRefObject<HTMLButtonElement>) => (
                <Button onClick={() => setOpen((open) => !open)} ref={ref} aria-label={ariaLabel}>
                    Button
                </Button>
            )}
            isOpen={open}
            onOpenChange={chain(args.onOpenChange, setOpen)}
            onCancel={chain(args.onCancel, () => setOpen(false))}
        >
            <p className="tw-text-center tw-py-8">Fun with Flyouts and Buttons!</p>
        </Flyout>
    );
};
export const WithButtonTrigger = WithButtonFlyoutTemplate.bind({});

WithButtonTrigger.args = {
    title: "Header title",
    decorator: <IconIcons />,
};

WithButtonTrigger.argTypes = {
    trigger: { table: { disable: true } },
    decorator: { table: { disable: true } },
};

const WithCustomFooterFlyoutTemplate: Story<FlyoutProps> = (args) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="dark:tw-text-white">
            <div className="tw-flex tw-items-center">
                Some text
                <Flyout
                    {...args}
                    isOpen={open}
                    onOpenChange={(isOpen) => setOpen(isOpen)}
                    fixedFooter={
                        <FlyoutFooter
                            buttons={[
                                {
                                    children: "Cancel",
                                    style: ButtonStyle.Secondary,
                                    onClick: chain(action("onCancel"), () => setOpen(false)),
                                },
                                {
                                    children: "Add",
                                    style: ButtonStyle.Primary,
                                    onClick: chain(action("onConfirm"), () => setOpen(false)),
                                },
                            ]}
                        />
                    }
                >
                    <p className="tw-text-center tw-py-8">Your flyout content with custom footer buttons!</p>
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
export const WithCustomFooter = WithCustomFooterFlyoutTemplate.bind({});

WithCustomFooter.args = {
    title: "Header title",
    decorator: <IconIcons />,
    trigger: (
        <span className="tw-flex tw-h-full tw-items-center tw-p-1 tw-rounded tw-bg-black-20 hover:tw-bg-black-30 dark:tw-bg-black-80 dark:hover:tw-bg-black-70">
            <IconActions />
        </span>
    ),
    legacyFooter: false,
};

WithCustomFooter.argTypes = {
    trigger: { table: { disable: true } },
    decorator: { table: { disable: true } },
};

const WithRenderFunctionTriggerTemplate: Story<FlyoutProps> = (args) => {
    const [open, setOpen] = useState(false);

    return (
        <Flyout
            {...args}
            trigger={(props, ref: MutableRefObject<HTMLDivElement>, state) => (
                <div
                    {...props}
                    ref={ref}
                    className={merge([
                        "tw-border tw-rounded tw-w-[200px] tw-p-2 tw-text-s tw-text-center tw-h-[60px] tw-outline-none tw-items-center tw-flex tw-justify-center",
                        state.isFocusVisible && FOCUS_STYLE,
                        state.isPressed && "tw-bg-black-10",
                    ])}
                >
                    {state.isPressed ? "I'm Pressed!" : " Custom trigger with no wrapping components"}
                </div>
            )}
            isOpen={open}
            onOpenChange={chain(args.onOpenChange, setOpen)}
            onCancel={chain(args.onCancel, () => setOpen(false))}
        >
            <p className="tw-text-center tw-py-8">Fun with Flyouts and Buttons!</p>
        </Flyout>
    );
};
export const WithRenderFunctionTrigger = WithRenderFunctionTriggerTemplate.bind({});

WithRenderFunctionTrigger.args = {
    title: "Header title",
    decorator: <IconIcons />,
};

WithRenderFunctionTrigger.argTypes = {
    trigger: { table: { disable: true } },
    decorator: { table: { disable: true } },
};
