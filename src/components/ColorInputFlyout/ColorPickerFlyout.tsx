/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorPreview } from '@components/ColorPicker';
import { ColorPicker, ColorPickerProps } from '@components/ColorPicker/ColorPicker';
import { Flyout } from '@components/Flyout/Flyout';
import React, { FC, useState } from 'react';
import { Color, ColorFormat } from '../../types/colors';
import { ColorInputTrigger } from './ColorPickerTrigger';

export type ColorPickerFlyoutProps = Pick<ColorPickerProps, 'palettes' | 'onSelect'> & {
    id?: string;
    disabled?: boolean;
    onClick?: () => void;
    onClose?: () => void;
    currentColor: Color | null;
    clearable?: boolean;
    onClear?: () => void;
    onDelete?: () => void;
};

export const ColorPickerFlyout: FC<ColorPickerFlyoutProps> = ({
    id,
    onClick,
    onClose,
    onSelect,
    currentColor,
    palettes,
    disabled = false,
    clearable = false,
    onClear,
    onDelete,
}) => {
    const [open, setOpen] = useState(false);
    const [currentFormat, setCurrentFormat] = useState(ColorFormat.Hex);

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            onClose?.();
        }
        setOpen(isOpen);
    };

    const handleClick = () => {
        setOpen(false);
        onClick?.();
    };

    return (
        <Flyout
            hug={false}
            onConfirm={handleClick}
            isOpen={open}
            onCancel={() => handleOpenChange(false)}
            contentMinHeight={150}
            fixedHeader={<ColorPreview color={currentColor || { red: 255, green: 255, blue: 255 }} />}
            onOpenChange={handleOpenChange}
            isTriggerDisabled={disabled}
            trigger={
                <ColorInputTrigger
                    isOpen={open}
                    currentColor={currentColor}
                    format={currentFormat}
                    disabled={disabled}
                    id={id}
                    clearable={clearable}
                    onClear={() => {
                        setOpen(false);
                        onClear && onClear();
                    }}
                    onDelete={
                        onDelete
                            ? () => {
                                  setOpen(false);
                                  onDelete && onDelete();
                              }
                            : undefined
                    }
                />
            }
        >
            <ColorPicker
                currentFormat={currentFormat}
                setFormat={setCurrentFormat}
                palettes={palettes}
                showPreview={false}
                currentColor={currentColor || { red: 255, green: 255, blue: 255 }}
                onSelect={onSelect}
            />
        </Flyout>
    );
};
ColorPickerFlyout.displayName = 'FondueColorPickerFlyout';
