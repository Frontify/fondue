/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorPicker, ColorPickerProps } from "@components/ColorPicker/ColorPicker";
import { Flyout } from "@components/Flyout/Flyout";
import React, { FC, useState } from "react";
import { Color, ColorFormat } from "../../types/colors";
import { ColorInputTrigger } from "./ColorPickerTrigger";

export type ColorPickerFlyoutProps = Pick<ColorPickerProps, "palettes" | "onSelect"> & {
    id?: string;
    disabled?: boolean;
    onClick?: () => void;
    onClose?: () => void;
    currentColor: Color | null;
};

export const ColorPickerFlyout: FC<ColorPickerFlyoutProps> = ({
    id,
    onClick,
    onClose,
    onSelect,
    currentColor,
    palettes,
    disabled = false,
}) => {
    const [open, setOpen] = useState(false);
    const [currentFormat, setCurrentFormat] = useState(ColorFormat.Hex);

    return (
        <Flyout
            hug={false}
            onClick={onClick}
            onClose={onClose}
            isOpen={open}
            onOpenChange={(isOpen) => setOpen(isOpen)}
            trigger={
                <ColorInputTrigger
                    isOpen={open}
                    currentColor={currentColor}
                    format={currentFormat}
                    disabled={disabled}
                    id={id}
                />
            }
        >
            <ColorPicker
                currentFormat={currentFormat}
                setFormat={setCurrentFormat}
                palettes={palettes}
                currentColor={currentColor || { r: 255, g: 255, b: 255 }}
                onSelect={onSelect}
            />
        </Flyout>
    );
};
