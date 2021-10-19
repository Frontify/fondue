/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorPicker, ColorPickerProps } from "@components/ColorPicker/ColorPicker";
import { Flyout } from "@components/Flyout/Flyout";
import { Color } from "@utilities/colors";
import React, { FC, useState } from "react";
import { ColorInputTrigger } from "./ColorInputTrigger";

export type ColorInputFlyoutProps = Pick<ColorPickerProps, "palettes" | "onSelect"> & {
    id?: string;
    disabled?: boolean;
    onClick?: () => void;
    onClose?: () => void;
    currentColor: Color | null;
};

export const ColorInputFlyout: FC<ColorInputFlyoutProps> = ({
    id,
    onClick,
    onClose,
    onSelect,
    currentColor,
    palettes = [],
    disabled = false,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <Flyout
            hug={false}
            onClick={onClick}
            onClose={onClose}
            isOpen={open}
            onOpenChange={(isOpen) => setOpen(isOpen)}
            trigger={<ColorInputTrigger isOpen={open} currentColor={currentColor} disabled={disabled} id={id} />}
        >
            <ColorPicker
                palettes={palettes}
                currentColor={currentColor || { hex: "#ffffff", alpha: 1 }}
                onSelect={onSelect}
            />
        </Flyout>
    );
};
