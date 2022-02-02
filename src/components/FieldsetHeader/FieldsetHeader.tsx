/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconAddSimple from "@foundation/Icon/Generated/IconAddSimple";
import IconCaretDown from "@foundation/Icon/Generated/IconCaretDown";
import IconMinus from "@foundation/Icon/Generated/IconMinus";
import { IconSize } from "@foundation/Icon/IconSize";
import { Switch, SwitchSize } from "@components/Switch/Switch";
import { useMemoizedId } from "@hooks/useMemoizedId";
import { merge } from "@utilities/merge";
import React, { cloneElement, FC, isValidElement, ReactNode } from "react";

export enum FieldsetHeaderSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
}

const sizeMap: Record<FieldsetHeaderSize, { icon: IconSize; text: string; switch: SwitchSize }> = {
    [FieldsetHeaderSize.Small]: {
        icon: IconSize.Size12,
        text: "tw-text-s",
        switch: SwitchSize.Small,
    },
    [FieldsetHeaderSize.Medium]: {
        icon: IconSize.Size16,
        text: "tw-text-m",
        switch: SwitchSize.Medium,
    },
    [FieldsetHeaderSize.Large]: {
        icon: IconSize.Size20,
        text: "tw-text-l",
        switch: SwitchSize.Large,
    },
};

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
        size: sizeMap[size].icon,
    };

    switch (type) {
        case FieldsetHeaderType.Switch:
            return <Switch {...props} size={sizeMap[size].switch} on={active} disabled={disabled} />;
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
                <span className="tw-shrink-0">
                    {cloneElement(decorator, {
                        size: sizeMap[size].icon,
                    })}
                </span>
            )}
            <Heading
                id={id}
                className={merge([
                    "tw-text-left",
                    sizeMap[size].text,
                    bold ? "tw-font-bold" : "tw-font-normal",
                    onClick && "hover:tw-cursor-pointer",
                ])}
            >
                {children}
            </Heading>
            {type !== FieldsetHeaderType.Default && (
                <span className="tw-ml-auto tw-shrink-0">{renderType(type, id, size, active, disabled)}</span>
            )}
        </header>
    );
};
