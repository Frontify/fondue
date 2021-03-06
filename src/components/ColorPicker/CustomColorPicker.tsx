/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@components/Dropdown/Dropdown';
import { TextInputType } from '@components/TextInput/TextInput';
import React, { FC, useEffect, useState } from 'react';
import { RgbaColorPicker } from 'react-colorful';
import tinycolor from 'tinycolor2';
import { Color, ColorFormat } from '../../types/colors';
import { ColorInput, DecoratorPosition } from './ColorInput';
import { ColorPickerProps } from './ColorPicker';

const convertToHex = (color: Color) => tinycolor(color).toHex();

export const CustomColorPicker: FC<Omit<ColorPickerProps, 'palette'>> = ({
    currentColor,
    currentFormat,
    setFormat,
    onSelect,
}) => {
    const formatMenuBlock = [
        {
            id: 'color-picker-format-dropdown-block',
            menuItems: Object.values(ColorFormat).map((id) => ({ id, title: id.toLocaleUpperCase() })),
        },
    ];
    const { r, g, b, a = 1 } = currentColor;
    const [hexInput, setHexInput] = useState(convertToHex(currentColor));
    const [alpha, setAlpha] = useState(a);

    const handleHexChange = () => {
        const parsedHex = tinycolor(hexInput);
        if (parsedHex.isValid()) {
            onSelect(parsedHex.toRgb());
        }
    };

    useEffect(() => {
        setAlpha(a);
        setHexInput(convertToHex(currentColor));
    }, [currentColor]);

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
                                value={r.toString()}
                                onChange={(r) => onSelect({ ...currentColor, r: parseInt(r) })}
                            />
                        </div>
                        <div className="tw-flex-1">
                            <ColorInput
                                min={0}
                                max={255}
                                size={3}
                                type={TextInputType.Number}
                                value={g.toString()}
                                onChange={(g) => onSelect({ ...currentColor, g: parseInt(g) })}
                            />
                        </div>
                        <div className="tw-flex-1">
                            <ColorInput
                                min={0}
                                max={255}
                                size={3}
                                type={TextInputType.Number}
                                value={b.toString()}
                                onChange={(b) => onSelect({ ...currentColor, b: parseInt(b) })}
                            />
                        </div>
                    </>
                )}
                <ColorInput
                    min={0}
                    max={100}
                    size={3}
                    type={TextInputType.Number}
                    value={Math.trunc(alpha * 100).toString()}
                    decorator="%"
                    decoratorPosition={DecoratorPosition.Right}
                    onChange={(value) => {
                        const a = parseInt(value || '0', 10) / 100;
                        setAlpha(a);
                        onSelect({ ...currentColor, a });
                    }}
                />
            </div>
            <div className="tw-flex tw-gap-2 tw-w-full tw-h-[200px]">
                <div className="tw-relative tw-grow tw-rounded">
                    <RgbaColorPicker color={{ ...currentColor, a }} onChange={onSelect} style={{ width: '100%' }} />
                </div>
            </div>
        </div>
    );
};
