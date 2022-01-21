/* (c) Copyright Frontify Ltd., all rights reserved. */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// Since there are no correct typings atm we need to ignore these imports

import { Dropdown } from "@components/Dropdown/Dropdown";
import { TextInputType } from "@components/TextInput/TextInput";
import { debounce } from "@utilities/debounce";
import { merge } from "@utilities/merge";
import React, { FC, useEffect, useState } from "react";
// @ts-ignore
import { Alpha, Hue, Saturation } from "react-color/lib/components/common";
import tinycolor from "tinycolor2";
import { Color, ColorFormat } from "../../types/colors";
import { ColorInput } from "./ColorInput";
import { ColorPickerProps } from "./ColorPicker";

const ColorPointer: FC<{ offset?: boolean }> = ({ offset = true }) => (
    <div
        className={merge([
            "tw-w-4 tw-h-4 tw-rounded-full tw-border-2 tw-border-white tw--translate-y-2",
            offset && "tw--translate-x-2",
        ])}
    />
);

export const CustomColorPicker: FC<Omit<ColorPickerProps, "palette">> = ({
    currentColor,
    currentFormat,
    setFormat,
    onSelect,
}) => {
    const colorFormats = Object.values(ColorFormat).map((id) => ({ id, title: id.toLocaleUpperCase() }));
    const [color, setColor] = useState<Color>(currentColor);
    const parsedColor = tinycolor(color);
    const rgb = parsedColor.toRgb();
    const hsl = parsedColor.toHsl();
    const hsv = parsedColor.toHsv();
    const { r, g, b, a } = rgb;
    const [hexInput, setHexInput] = useState(parsedColor.toHex());

    useEffect(() => {
        setColor(currentColor);
        setHexInput(parsedColor.toHex());
    }, [currentColor]);

    const handleHexChange = () => {
        const parsedHex = tinycolor(hexInput);
        if (parsedHex.isValid()) {
            onSelect(parsedHex.toRgb());
        }
    };

    return (
        <div className="tw-flex tw-flex-col tw-gap-5" data-test-id="custom-color-picker">
            <div className="tw-flex tw-gap-2 tw-w-full tw-h-[200px]">
                <div className="tw-relative tw-flex-grow tw-overflow-hidden tw-rounded">
                    <Saturation
                        rgb={rgb}
                        hsl={hsl}
                        hsv={hsv}
                        pointer={() => <ColorPointer />}
                        onChange={debounce((color) => onSelect(tinycolor(color).toRgb()))}
                    />
                </div>
                <div className="tw-relative tw-w-6 tw-overflow-hidden tw-rounded">
                    <Hue
                        pointer={() => (
                            <div className="tw-w-6 tw-flex tw-justify-center">
                                <ColorPointer offset={false} />
                            </div>
                        )}
                        rgb={rgb}
                        hsl={hsl}
                        hsv={hsv}
                        direction="vertical"
                        onChange={debounce((color) => onSelect(tinycolor(color).toRgb()))}
                    />
                </div>
                <div className="tw-relative tw-w-6 tw-overflow-hidden tw-rounded">
                    <Alpha
                        rgb={rgb}
                        hsl={hsl}
                        hsv={hsv}
                        direction="vertical"
                        pointer={() => (
                            <div className="tw-w-[18px] tw-flex tw-justify-center">
                                <ColorPointer offset={false} />
                            </div>
                        )}
                        style={{ pointer: { top: `${a * 100}%` } }}
                        onChange={debounce((color) => onSelect(tinycolor(color).toRgb()))}
                    />
                </div>
            </div>
            <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-2 tw-max-w-full">
                <div className="tw-min-w-[100px]">
                    <Dropdown
                        menuBlocks={[{ id: "color-picker-format-dropdown-block", menuItems: colorFormats }]}
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
                            onChange={(input) => {
                                setHexInput(input);
                            }}
                            onEnterPressed={handleHexChange}
                            onBlur={handleHexChange}
                        />
                    </div>
                ) : (
                    <>
                        <ColorInput
                            min={0}
                            max={255}
                            size={3}
                            type={TextInputType.Number}
                            value={r.toString()}
                            decorator="R"
                            onChange={(r) => onSelect({ ...color, r: parseInt(r) })}
                        />
                        <ColorInput
                            min={0}
                            max={255}
                            size={3}
                            type={TextInputType.Number}
                            value={g.toString()}
                            decorator="G"
                            onChange={(g) => onSelect({ ...color, g: parseInt(g) })}
                        />
                        <ColorInput
                            min={0}
                            max={255}
                            size={3}
                            type={TextInputType.Number}
                            value={b.toString()}
                            decorator="B"
                            onChange={(b) => onSelect({ ...color, b: parseInt(b) })}
                        />
                    </>
                )}
                <ColorInput
                    min={0}
                    max={100}
                    size={3}
                    type={TextInputType.Number}
                    value={Math.trunc(a * 100).toString()}
                    decorator="%"
                    onChange={(value) => {
                        const a = parseInt(value || "0", 10) / 100;
                        onSelect({ ...color, a });
                    }}
                />
            </div>
        </div>
    );
};
