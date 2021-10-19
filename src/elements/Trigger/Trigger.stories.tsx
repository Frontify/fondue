/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemContent } from "@components/Menu/MenuItem/MenuItemContent";
import IconAudio from "@elements/Icon/Generated/IconAudio";
import { useFocusRing } from "@react-aria/focus";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import { merge } from "@utilities/merge";
import React, { useState } from "react";
import { Trigger as TriggerComponent, TriggerProps } from "./Trigger";

export default {
    title: "Components/Trigger",
    component: TriggerComponent,
    args: {
        disabled: false,
        clearable: false,
        onClear: action("onClear"),
    },
    argTypes: {
        onClear: { action: "onClear" },
    },
} as Meta<TriggerProps>;

export const Trigger: Story<TriggerProps> = (args) => {
    const [open, setOpen] = useState(false);
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <TriggerComponent {...args} isOpen={open} isFocusVisible={isFocusVisible}>
            <button
                {...focusProps}
                className={merge([
                    "tw-overflow-hidden tw-flex-auto tw-h-full tw-rounded tw-text-left tw-outline-none tw-py-1 tw-px-3",
                    args.disabled && "tw-text-black-40",
                ])}
                onClick={() => setOpen(!open)}
            >
                <MenuItemContent title={"Item title"} decorator={<IconAudio />} />
            </button>
        </TriggerComponent>
    );
};
