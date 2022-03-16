/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconAddSimple from "@foundation/Icon/Generated/IconAddSimple";
import IconCaretDown from "@foundation/Icon/Generated/IconCaretDown";
import IconMinus from "@foundation/Icon/Generated/IconMinus";
import { IconSize } from "@foundation/Icon/IconSize";
import { Switch, SwitchSize } from "@components/Switch/Switch";
import { merge } from "@utilities/merge";
import React, { cloneElement, FC, isValidElement } from "react";
import { FieldsetHeaderType } from "..";
import { AccordionHeaderIconProps, AccordionHeaderProps } from "./types";
import { AccordionHeaderIconSize } from ".";

const sizeMap: Record<AccordionHeaderIconSize, { icon: IconSize; switch: SwitchSize }> = {
    [AccordionHeaderIconSize.Small]: {
        icon: IconSize.Size12,
        switch: SwitchSize.Small,
    },
    [AccordionHeaderIconSize.Medium]: {
        icon: IconSize.Size16,
        switch: SwitchSize.Medium,
    },
    [AccordionHeaderIconSize.Large]: {
        icon: IconSize.Size20,
        switch: SwitchSize.Large,
    },
};

const renderAccordionHeaderIconType = (
    type: FieldsetHeaderType,
    size: AccordionHeaderIconSize,
    isOpen: boolean,
    disabled?: boolean,
) => {
    switch (type) {
        case FieldsetHeaderType.Switch:
            return <Switch size={sizeMap[size].switch} on={isOpen} disabled={disabled} />;
        case FieldsetHeaderType.Accordion:
            return (
                <div
                    className={merge([
                        "tw-transition-transform",
                        isOpen && "tw-rotate-180 tw-duration-300",
                        disabled && !isOpen && "tw-text-black-40",
                        !disabled && isOpen && "tw-text-black",
                        !disabled && !isOpen && "tw-text-black-80",
                    ])}
                >
                    <IconCaretDown size={sizeMap[size].icon} />
                </div>
            );
        case FieldsetHeaderType.AddRemove:
            return (
                <div
                    className={merge([
                        isOpen && disabled && "tw-text-black-40",
                        isOpen && !disabled && "tw-text-black",
                        !isOpen && !disabled && "tw-text-black-80",
                    ])}
                >
                    {isOpen ? <IconMinus size={sizeMap[size].icon} /> : <IconAddSimple size={sizeMap[size].icon} />}
                </div>
            );
        case FieldsetHeaderType.Default:
        default:
            return null;
    }
};

export const AccordionHeaderIcon: FC<AccordionHeaderIconProps> = ({
    size = AccordionHeaderIconSize.Medium,
    isOpen,
    disabled,
    type = FieldsetHeaderType.Accordion,
}) => renderAccordionHeaderIconType(type, size, isOpen, disabled);

export const AccordionHeader: FC<AccordionHeaderProps> = ({
    isOpen = false,
    decorator,
    disabled = false,
    children,
    bold = true,
    type,
    as: Heading = "div",
}) => {
    const icon = (
        <AccordionHeaderIcon isOpen={isOpen} disabled={disabled} size={AccordionHeaderIconSize.Medium} type={type} />
    );
    return (
        <div className="tw-px-8 tw-py-6">
            <header
                data-test-id="fieldset-header"
                className={merge([
                    "tw-flex tw-items-center tw-gap-x-1.5 tw-w-full tw-flex-row",
                    disabled ? "tw-text-black-40" : "dark:tw-text-white",
                    !disabled && isOpen ? "tw-text-black" : "tw-text-black-80",
                ])}
            >
                {isValidElement(decorator) && (
                    <span className="tw-shrink-0">
                        {cloneElement(decorator, {
                            size: IconSize.Size16,
                        })}
                    </span>
                )}
                <Heading className={merge(["tw-text-left tw-text-m", , bold ? "tw-font-bold" : "tw-font-normal"])}>
                    {children}
                </Heading>
                {icon && <span className="tw-ml-auto tw-shrink-0">{icon}</span>}
            </header>
        </div>
    );
};
