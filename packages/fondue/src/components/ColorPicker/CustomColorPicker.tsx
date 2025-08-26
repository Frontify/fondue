/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TinyColor } from '@ctrl/tinycolor';
import { type ReactElement, useEffect, useState } from 'react';
import { RgbaColorPicker } from 'react-colorful';

import { Dropdown } from '@components/Dropdown/Dropdown';
import { TextInputType } from '@components/TextInput/TextInput';
import { toLongRgb, toShortRgb } from '@utilities/colors';
import { ColorFormat } from 'src/types/colors';

import { type Color } from '../../types';

import { ColorInput, DecoratorPosition } from './ColorInput';
import { type ColorPickerProps } from './ColorPicker';

const convertToHex = (color: Color) => new TinyColor(toShortRgb(color)).toHex();

/**
 * @deprecated Use the new `Color Picker` component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#color-picker the migration guide}.
 */
export const CustomColorPicker = ({
    currentColor,
    currentFormat,
    setFormat,
    onSelect,
}: Omit<ColorPickerProps, 'palette'>): ReactElement => {
    const formatMenuBlock = [
        {
            id: 'color-picker-format-dropdown-block',
            menuItems: Object.values(ColorFormat).map((id) => ({ id, title: id.toLocaleUpperCase() })),
        },
    ];
    const { red, green, blue, alpha = 1 } = currentColor;
    const [hexInput, setHexInput] = useState(() => convertToHex(currentColor));
    const [alphaValue, setAlphaValue] = useState(alpha);

    const handleHexChange = () => {
        const parsedHex = new TinyColor(hexInput);
        if (parsedHex.isValid) {
            onSelect(toLongRgb(parsedHex.toRgb()));
        }
    };

    useEffect(() => {
        setAlphaValue(alpha);
        setHexInput(convertToHex(currentColor));
    }, [alpha, currentColor]);

    return (
        <div className="tw-flex tw-flex-col tw-gap-4" data-test-id="custom-color-picker" id="custom-color-picker">
            <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-2 tw-max-w-full">
                <div className="tw-min-w-[84px]">
                    <Dropdown
                        menuBlocks={formatMenuBlock}
                        activeItemId={currentFormat}
                        onChange={(id) => id && setFormat && setFormat(id as ColorFormat)}
                    />
                </div>
                {currentFormat === ColorFormat.Hex ? (
                    <div className="tw-flex-1">
                        <ColorInput
                            value={hexInput}
                            decorator="#"
                            size={6}
                            onChange={setHexInput}
                            onEnterPressed={handleHexChange}
                            onBlur={handleHexChange}
                            aria-label="Color HEX Value"
                        />
                    </div>
                ) : (
                    <>
                        <div className="tw-flex-1">
                            <ColorInput
                                min={0}
                                max={255}
                                size={3}
                                type={TextInputType.Number}
                                value={red.toString()}
                                onChange={(value) => onSelect({ ...currentColor, red: parseInt(value || '0') })}
                                aria-label="Color Code Type"
                            />
                        </div>
                        <div className="tw-flex-1">
                            <ColorInput
                                min={0}
                                max={255}
                                size={3}
                                type={TextInputType.Number}
                                value={green.toString()}
                                onChange={(value) => onSelect({ ...currentColor, green: parseInt(value || '0') })}
                                aria-label="Color Value"
                            />
                        </div>
                        <div className="tw-flex-1">
                            <ColorInput
                                min={0}
                                max={255}
                                size={3}
                                type={TextInputType.Number}
                                value={blue.toString()}
                                onChange={(value) => onSelect({ ...currentColor, blue: parseInt(value || '0') })}
                                aria-label="Color Opacity"
                            />
                        </div>
                    </>
                )}
                <ColorInput
                    min={0}
                    max={100}
                    size={3}
                    type={TextInputType.Number}
                    value={Math.trunc(alphaValue * 100).toString()}
                    decorator="%"
                    decoratorPosition={DecoratorPosition.Right}
                    onChange={(value) => {
                        const a = parseInt(value || '0') / 100;
                        setAlphaValue(a);
                        onSelect({ ...currentColor, alpha: a });
                    }}
                />
            </div>
            <div className="tw-flex tw-gap-2 tw-w-full tw-h-[200px]">
                <div className="tw-relative tw-grow tw-rounded">
                    <RgbaColorPicker
                        color={{ r: red, g: green, b: blue, a: alpha }}
                        onChange={(color) =>
                            onSelect({
                                red: color.r,
                                green: color.g,
                                blue: color.b,
                                alpha: color.a,
                            })
                        }
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
        </div>
    );
};
CustomColorPicker.displayName = 'FondueCustomColorPicker';
