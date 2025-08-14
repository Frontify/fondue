/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement, useState } from 'react';

import { ColorPreview } from '@components/ColorPicker';
import { ColorPicker, type ColorPickerProps } from '@components/ColorPicker/ColorPicker';
import { Flyout } from '@components/Flyout/Flyout';

import { type Color, ColorFormat } from '../../types/colors';

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

/**
 * @deprecated Use the `Flyout` together with the new `Color Picker` component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#color-picker the migration guide}.
 */
export const ColorPickerFlyout = ({
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
}: ColorPickerFlyoutProps): ReactElement => {
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
                        if (onClear) {
                            onClear();
                        }
                    }}
                    onDelete={
                        onDelete
                            ? () => {
                                  setOpen(false);
                                  if (onDelete) {
                                      onDelete();
                                  }
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
