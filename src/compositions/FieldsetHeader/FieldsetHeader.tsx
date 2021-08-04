/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconAddSimple from "@elements/Icon/Generated/IconAddSimple";
import IconCaretDown from "@elements/Icon/Generated/IconCaretDown";
import IconCaretUp from "@elements/Icon/Generated/IconCaretUp";
import IconMinus from "@elements/Icon/Generated/IconMinus";
import { IconSize } from "@elements/Icon/IconSize";
import { Switch } from "@elements/Switch/Switch";
import { Size as SwitchSize } from "@utilities/enum";
import generateRandomId from "@utilities/generateRandomId";
import { merge } from "@utilities/merge";
import { cloneElement, FC, isValidElement, ReactNode } from "react";

export enum Size {
    Small = "Small",
    Large = "Large",
}

export enum Type {
    Default = "Default",
    Switch = "Switch",
    Accordion = "Accordion",
    AddRemove = "AddRemove",
}

export type FieldsetHeaderProps = {
    size?: Size;
    active?: boolean;
    decorator?: ReactNode;
    type?: Type;
    disabled?: boolean;
    bold?: boolean;
    children: string;
    onClick?: () => void;
    as?: keyof JSX.IntrinsicElements;
    tabIndex?: number;
};

const renderType = (type: Type, id: string, size: Size, active: boolean, disabled: boolean) => {
    const props = {
        "aria-labelledby": id,
        size: size === Size.Large ? IconSize.Size20 : IconSize.Size12,
    };

    switch (type) {
        case Type.Switch:
            return (
                <Switch
                    {...props}
                    size={size === Size.Large ? SwitchSize.Large : SwitchSize.Small}
                    on={active}
                    disabled={disabled}
                />
            );
        case Type.Accordion:
            return active ? <IconCaretDown {...props} /> : <IconCaretUp {...props} />;
        case Type.AddRemove:
            return active ? <IconMinus {...props} /> : <IconAddSimple {...props} />;
    }

    return null;
};

export const FieldsetHeader: FC<FieldsetHeaderProps> = ({
    size = Size.Large,
    active = true,
    decorator,
    type = Type.Default,
    disabled = false,
    bold = true,
    children,
    onClick,
    as: Heading = "label",
    tabIndex = -1,
}) => {
    const id = generateRandomId();

    return (
        <header
            data-test-id="fieldset-header"
            role={onClick ? "button" : undefined}
            onClick={onClick}
            onKeyPress={onClick}
            className={merge([
                "flex items-center gap-x-1.5 w-full flex-row",
                disabled ? "text-black-40" : "text-black dark:text-white",
                onClick ? "hover:cursor-pointer" : "pointer-events-none",
            ])}
            tabIndex={tabIndex}
        >
            {isValidElement(decorator) &&
                cloneElement(decorator, { size: size === Size.Large ? IconSize.Size20 : IconSize.Size16 })}
            <Heading
                id={id}
                className={merge([
                    size === Size.Large ? "text-l" : "text-m",
                    bold ? "font-bold" : "font-normal",
                    onClick && "hover:cursor-pointer",
                ])}
            >
                {children}
            </Heading>
            {type !== Type.Default && <span className="ml-auto">{renderType(type, id, size, active, disabled)}</span>}
        </header>
    );
};
