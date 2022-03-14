/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { Popover, PopoverAlignment, PopoverPosition, PopoverProps } from "./Popover";
import { Button, ButtonStyle } from "@components/Button";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Popover",
    component: Popover,
    argTypes: {
        position: {
            options: Object.values(PopoverPosition),
            control: { type: "select" },
            defaultValue: PopoverPosition.Bottom,
        },
        alignment: {
            options: Object.values(PopoverAlignment),
            control: { type: "select" },
            defaultValue: PopoverAlignment.Middle,
        },
        point: {
            control: { type: "boolean" },
            defaultValue: false,
        },
        flip: {
            control: { type: "boolean" },
            defaultValue: true,
        },
        maxHeight: {
            control: { type: "number" },
        },
        maxWidth: {
            control: { type: "number" },
        },
    },
} as Meta<PopoverProps>;

const PopoverTemplate: Story<PopoverProps> = (args: PopoverProps) => {
    const trigger = <Button style={ButtonStyle.Secondary}>Reference Element</Button>;
    return (
        <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <Popover {...args} point={true} transactional={false} trigger={trigger}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi architecto cupiditate
                dolorem saepe sapiente sint suscipit voluptas!
                <Button style={ButtonStyle.Danger}>Some action</Button>
            </Popover>
        </div>
    );
};

export const Default = PopoverTemplate.bind({});
Default.storyName = "Popover as Tooltip";

/*const MenuTemplate: Story<PopoverProps> = (args: PopoverProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);

    return (
        <div className="tw-w-1/2">
            <Trigger size={TriggerSize.Small} isOpen={isOpen}>
                <button
                    className="tw-overflow-hidden tw-flex-auto tw-h-full tw-w-full tw-rounded tw-text-left tw-outline-none tw-py-2 tw-pl-3"
                    onClick={() => setIsOpen(!isOpen)}
                    ref={setReferenceElement}
                >
                    <MenuItemContent title="Reference Menu" size={MenuItemContentSize.Large} />
                </button>
            </Trigger>
            {isOpen && (
                <Popover {...args} maxWidth="Viewport" referenceElement={referenceElement}>
                    <MenuItem title="One menu item" />
                    <MenuItem title="a second menu item" />
                    <MenuItem title="Another menu item" />
                    <MenuItem title="One menu item" />
                </Popover>
            )}
        </div>
    );
};

export const MenuPopover = MenuTemplate.bind({});
MenuPopover.storyName = "Popover as Menu";*/
