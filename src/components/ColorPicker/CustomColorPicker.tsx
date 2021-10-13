/* (c) Copyright Frontify Ltd., all rights reserved. */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// Since there are no correct typings atm we need to ignore these imports

import { Dropdown } from "@components/Dropdown/Dropdown";
import { TextInputType } from "@elements/TextInput/TextInput";
import { toColor, transformColor } from "@utilities/colors";
import { debounce } from "@utilities/debounce";
import { merge } from "@utilities/merge";
import React, { FC, useEffect, useState } from "react";
// @ts-ignore
import { Alpha, Saturation, Hue } from "react-color/lib/components/common";
// @ts-ignore
import { isValidHex, toState } from "react-color/lib/helpers/color";
import { ColorInput } from "./ColorInput";
import { ColorFormat, ColorPickerProps } from "./ColorPicker";

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
    const [{ hsl, hsv, rgb, hex }, setColor] = useState(transformColor(currentColor));

    useEffect(() => {
        setColor(transformColor(currentColor));
    }, [currentColor]);

    const [hexInput, setHexInput] = useState(hex.substring(1));

    useEffect(() => {
        setHexInput(hex.substring(1));
    }, [hex]);

    return (
        <div className="tw-flex tw-flex-col tw-gap-5">
            <div className="tw-flex tw-gap-2 tw-w-full tw-h-[200px]">
                <div className="tw-relative tw-flex-grow tw-overflow-hidden tw-rounded">
                    <Saturation
                        hsl={hsl}
                        hsv={hsv}
                        pointer={() => <ColorPointer />}
                        onChange={debounce((color) => onSelect(toColor(currentColor, { hex: toState(color).hex })))}
                    />
                </div>
                <div className="tw-relative tw-w-6 tw-overflow-hidden tw-rounded">
                    <Hue
                        pointer={() => (
                            <div className="tw-w-6 tw-flex tw-justify-center">
                                <ColorPointer offset={false} />
                            </div>
                        )}
                        hsl={hsl}
                        direction="vertical"
                        onChange={debounce((color) => onSelect(toColor(currentColor, { hex: toState(color).hex })))}
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
                        style={{ pointer: { top: `${rgb.a * 100}%` } }}
                        onChange={debounce(({ a }) => onSelect(toColor(currentColor, { rgba: { a } })))}
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
                            onChange={(hex) => {
                                setHexInput(hex);
                            }}
                            onBlur={() => {
                                if (isValidHex(hexInput)) {
                                    onSelect(toColor(currentColor, { hex: hexInput }));
                                }
                            }}
                        />
                    </div>
                ) : (
                    <>
                        <ColorInput
                            min={0}
                            max={255}
                            size={3}
                            type={TextInputType.Number}
                            value={rgb.r.toString()}
                            decorator="R"
                            onChange={(r) => onSelect(toColor(currentColor, { rgba: { r } }))}
                        />
                        <ColorInput
                            min={0}
                            max={255}
                            size={3}
                            type={TextInputType.Number}
                            value={rgb.g.toString()}
                            decorator="G"
                            onChange={(g) => onSelect(toColor(currentColor, { rgba: { g } }))}
                        />
                        <ColorInput
                            min={0}
                            max={255}
                            size={3}
                            type={TextInputType.Number}
                            value={rgb.b.toString()}
                            decorator="B"
                            onChange={(b) => onSelect(toColor(currentColor, { rgba: { b } }))}
                        />
                    </>
                )}
                <ColorInput
                    min={0}
                    max={100}
                    size={3}
                    type={TextInputType.Number}
                    value={`${Math.round(rgb.a * 100)}`}
                    decorator="%"
                    onChange={(value) => {
                        const a = parseInt(value || "0", 10) / 100;
                        onSelect(toColor(currentColor, { rgba: { a } }));
                    }}
                />
            </div>
        </div>
    );
};
