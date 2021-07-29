/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@elements/Icon/Icon";
import { ReactComponent as AddSimple } from "@elements/Icon/Svg/AddSimple.svg";
import { ReactComponent as CaretDown } from "@elements/Icon/Svg/CaretDown.svg";
import { ReactComponent as CaretUp } from "@elements/Icon/Svg/CaretUp.svg";
import { ReactComponent as Minus } from "@elements/Icon/Svg/Minus.svg";
import Switch from "@elements/Switch/Switch";
import { Size as SwitchSize } from "@utilities/enum";
import generateRandomId from "@utilities/generateRandomId";
import { merge } from "@utilities/merge";
import { cloneElement, isValidElement, ReactElement, ReactNode } from "react";

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
    heading: string;
    onClick?: () => void;
    as?: keyof JSX.IntrinsicElements;
};

const renderType = (type: Type, id: string, size: Size, active: boolean, disabled: boolean) => {
    if (type === Type.Switch) {
        return (
            <Switch
                aria-labelledby={id}
                size={size === Size.Large ? SwitchSize.Large : SwitchSize.Small}
                on={active}
                disabled={disabled}
            />
        );
    }

    if (type === Type.Accordion && active) {
        return <CaretDown aria-labelledby={id} size={size === Size.Large ? IconSize.Size20 : IconSize.Size16} />;
    }

    if (type === Type.Accordion && !active) {
        return <CaretUp aria-labelledby={id} size={size === Size.Large ? IconSize.Size20 : IconSize.Size16} />;
    }

    if (type === Type.AddRemove && active) {
        return <Minus aria-labelledby={id} size={size === Size.Large ? IconSize.Size20 : IconSize.Size16} />;
    }

    if (type === Type.AddRemove && !active) {
        return <AddSimple aria-labelledby={id} size={size === Size.Large ? IconSize.Size20 : IconSize.Size16} />;
    }

    return null;
};

export default function FieldsetHeader({
    size = Size.Large,
    active = true,
    decorator,
    type = Type.Default,
    disabled = false,
    bold = true,
    heading,
    onClick,
    as: Heading = "label",
}: FieldsetHeaderProps): ReactElement<FieldsetHeaderProps> {
    const id = generateRandomId();

    return (
        <header
            role="button"
            onClick={onClick}
            onKeyPress={onClick}
            className={merge([
                "flex items-center gap-x-1.5 w-full flex-row pointer-events-none",
                disabled ? "text-black-40" : "text-black",
            ])}
            tabIndex={0}
        >
            {isValidElement(decorator) &&
                cloneElement(decorator, { size: size === Size.Large ? IconSize.Size20 : IconSize.Size16 })}
            <Heading
                id={id}
                className={merge([size === Size.Large ? "text-l" : "text-m", bold ? "font-bold" : "font-normal"])}
            >
                {heading}
            </Heading>
            <span className="ml-auto">{renderType(type, id, size, active, disabled)}</span>
        </header>
    );
}
