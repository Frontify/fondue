/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorPicker, ColorPickerProps } from "@components/ColorPicker/ColorPicker";
import { Flyout } from "@components/Flyout/Flyout";
import React, { FC, useState } from "react";
import { Color, ColorFormat } from "../../types/colors";
import { ColorInputTrigger } from "./ColorPickerTrigger";
import { ColorPreview } from "@components/ColorPicker";

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
            fixedHeader={<ColorPreview color={currentColor || { hex: "#ffffff" }} format={currentFormat} />}
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
                showPreview={false}
                currentColor={currentColor || { hex: "#ffffff" }}
                onSelect={onSelect}
            />
        </Flyout>
    );
};
