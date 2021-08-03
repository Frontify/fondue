/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconSize from "@elements/Icon/IconSize";
import IconAddSimple from "@elements/Icon/Generated/IconAddSimple";
import IconCaretDown from "@elements/Icon/Generated/IconCaretDown";
import IconCaretUp from "@elements/Icon/Generated/IconCaretUp";
import IconMinus from "@elements/Icon/Generated/IconMinus";
import { Switch } from "@elements/Switch/Switch";
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
    children: string;
    onClick?: () => void;
    as?: keyof JSX.IntrinsicElements;
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

export const FieldsetHeader = ({
    size = Size.Large,
    active = true,
    decorator,
    type = Type.Default,
    disabled = false,
    bold = true,
    children,
    onClick,
    as: Heading = "label",
}: FieldsetHeaderProps): ReactElement<FieldsetHeaderProps> => {
    const id = generateRandomId();

    return (
        <header
            data-test-id="fieldset-header"
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
                {children}
            </Heading>
            {type !== Type.Default && <span className="ml-auto">{renderType(type, id, size, active, disabled)}</span>}
        </header>
    );
};
