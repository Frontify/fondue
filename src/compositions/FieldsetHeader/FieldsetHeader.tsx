/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconAddSimple from "@elements/Icon/Generated/IconAddSimple";
import IconCaretDown from "@elements/Icon/Generated/IconCaretDown";
import IconMinus from "@elements/Icon/Generated/IconMinus";
import { IconSize } from "@elements/Icon/IconSize";
import { Switch, SwitchSize } from "@elements/Switch/Switch";
import { useMemoizedId } from "@hooks/useMemoizedId";
import { merge } from "@utilities/merge";
import React, { cloneElement, FC, isValidElement, ReactNode } from "react";

export enum FieldsetHeaderSize {
    Small = "Small",
    Large = "Large",
}

export enum FieldsetHeaderType {
    Default = "Default",
    Switch = "Switch",
    Accordion = "Accordion",
    AddRemove = "AddRemove",
}

export type FieldsetHeaderProps = {
    size?: FieldsetHeaderSize;
    active?: boolean;
    decorator?: ReactNode;
    type?: FieldsetHeaderType;
    disabled?: boolean;
    bold?: boolean;
    children: string;
    onClick?: () => void;
    as?: keyof JSX.IntrinsicElements;
    tabIndex?: number;
};

const renderType = (
    type: FieldsetHeaderType,
    id: string,
    size: FieldsetHeaderSize,
    active: boolean,
    disabled: boolean,
) => {
    const props = {
        "aria-labelledby": id,
        size: size === FieldsetHeaderSize.Large ? IconSize.Size20 : IconSize.Size12,
    };

    switch (type) {
        case FieldsetHeaderType.Switch:
            return (
                <Switch
                    {...props}
                    size={size === FieldsetHeaderSize.Large ? SwitchSize.Large : SwitchSize.Small}
                    on={active}
                    disabled={disabled}
                />
            );
        case FieldsetHeaderType.Accordion:
            return (
                <div
                    className={merge([
                        "tw-transition-transform",
                        active && "tw-rotate-180 tw-duration-300",
                        disabled && !active && "tw-text-black-40",
                        !disabled && active && "tw-text-black",
                        !disabled && !active && "tw-text-black-80",
                    ])}
                >
                    <IconCaretDown {...props} />
                </div>
            );
        case FieldsetHeaderType.AddRemove:
            return (
                <div
                    className={merge([
                        active && disabled && "tw-text-black-40",
                        active && !disabled && "tw-text-black",
                        !active && !disabled && "tw-text-black-80",
                    ])}
                >
                    {active ? <IconMinus {...props} /> : <IconAddSimple {...props} />}
                </div>
            );
    }

    return null;
};

export const FieldsetHeader: FC<FieldsetHeaderProps> = ({
    size = FieldsetHeaderSize.Large,
    active = true,
    decorator,
    type = FieldsetHeaderType.Default,
    disabled = false,
    bold = true,
    children,
    onClick,
    as: Heading = "label",
    tabIndex = -1,
}) => {
    const id = useMemoizedId();
    const clickOnNotDisabled = () => !disabled && onClick && onClick();

    return (
        <header
            data-test-id="fieldset-header"
            role={onClick ? "button" : undefined}
            onClick={clickOnNotDisabled}
            onKeyPress={clickOnNotDisabled}
            className={merge([
                "tw-flex tw-items-center tw-gap-x-1.5 tw-w-full tw-flex-row",
                disabled ? "tw-text-black-40" : "tw-text-black dark:tw-text-white",
                !disabled && onClick ? "hover:tw-cursor-pointer" : "tw-pointer-events-none",
            ])}
            tabIndex={tabIndex}
        >
            {isValidElement(decorator) && (
                <span className="tw-flex-shrink-0">
                    {cloneElement(decorator, {
                        size: size === FieldsetHeaderSize.Large ? IconSize.Size20 : IconSize.Size16,
                    })}
                </span>
            )}
            <Heading
                id={id}
                className={merge([
                    "tw-text-left",
                    size === FieldsetHeaderSize.Large ? "tw-text-l" : "tw-text-m",
                    bold ? "tw-font-bold" : "tw-font-normal",
                    onClick && "hover:tw-cursor-pointer",
                ])}
            >
                {children}
            </Heading>
            {type !== FieldsetHeaderType.Default && (
                <span className="tw-ml-auto tw-flex-shrink-0">{renderType(type, id, size, active, disabled)}</span>
            )}
        </header>
    );
};
