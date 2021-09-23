/* (c) Copyright Frontify Ltd., all rights reserved. */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// Since there are no correct typings atm we need to ignore these imports

import { Dropdown } from "@components/Dropdown/Dropdown";
import { TextInput, TextInputType } from "@elements/TextInput/TextInput";
import { toColor, transformColor } from "@utilities/colors";
import { debounce } from "@utilities/debounce";
import { merge } from "@utilities/merge";
import React, { FC, useEffect, useState } from "react";
// @ts-ignore
import { HuePicker } from "react-color";
// @ts-ignore
import { Alpha, Saturation } from "react-color/lib/components/common";
// @ts-ignore
import { isValidHex, toState } from "react-color/lib/helpers/color";
import { ColorFormat, ColorPickerProps } from "./ColorPicker";

const ColorPointer: FC<{ offsetX?: boolean; offsetY?: boolean }> = ({ offsetX = true, offsetY = true }) => (
    <div
        className={merge([
            "tw-w-4 tw-h-4 tw-rounded-full tw-border-2 tw-border-white",
            offsetX && "tw--translate-x-2",
            offsetY && "tw--translate-y-2",
        ])}
    />
);

export const CustomColorPicker: FC<Omit<ColorPickerProps, "palette">> = ({ currentColor, onSelect }) => {
    const colorFormats = Object.values(ColorFormat).map((id) => ({ id, title: id.toLocaleUpperCase() }));
    const [colorFormat, setColorFormat] = useState(ColorFormat.Hex);
    const [{ hsl, hsv, rgb, hex }, setColor] = useState(transformColor(currentColor));
    useEffect(() => {
        setColor(transformColor(currentColor));
    }, [currentColor]);

    return (
        <div className="tw-flex tw-flex-col tw-gap-5">
            <div className="tw-flex tw-gap-2 tw-w-full">
                <div className="tw-relative tw-flex-grow tw-overflow-hidden tw-rounded">
                    <Saturation
                        hsl={hsl}
                        hsv={hsv}
                        pointer={() => <ColorPointer />}
                        onChange={debounce((color) => onSelect(toColor(currentColor, { hex: toState(color).hex })))}
                    />
                </div>
                <div className="tw-relative tw-w-6 tw-overflow-hidden tw-rounded">
                    <HuePicker
                        pointer={() => (
                            <div className="tw-w-6 tw-flex tw-justify-center">
                                <ColorPointer offsetX={false} />
                            </div>
                        )}
                        color={rgb}
                        direction="vertical"
                        width="24px"
                        height="200px"
                        onChange={debounce(({ hex }) => onSelect(toColor(currentColor, { hex })))}
                    />
                </div>
                <div className="tw-relative tw-w-6 tw-overflow-hidden tw-rounded">
                    <Alpha
                        rgb={rgb}
                        hsl={hsl}
                        hsv={hsv}
                        direction="vertical"
                        width="24px"
                        height="200px"
                        pointer={() => (
                            <div className="tw-w-[18px] tw-flex tw-justify-center">
                                <ColorPointer offsetX={false} />
                            </div>
                        )}
                        style={{ pointer: { top: `${rgb.a * 100}%` } }}
                        onChange={debounce(({ a }) => onSelect(toColor(currentColor, { rgba: { a } })))}
                    />
                </div>
            </div>
            <div className="tw-flex tw-flex-col md:tw-grid md:tw-grid-cols-3 md:tw-flex-none tw-gap-2 tw-max-w-full">
                <div>
                    <Dropdown
                        menuBlocks={[{ id: "color-picker-format-dropdown-block", menuItems: colorFormats }]}
                        activeItemId={colorFormat}
                        onChange={(id) => id && setColorFormat(id as ColorFormat)}
                    />
                </div>
                <div className="md:tw-col-span-2 tw-flex tw-flex-col md:tw-flex-row tw-gap-2">
                    <div
                        className={merge([
                            "tw-flex-1 tw-grid tw-gap-2",
                            colorFormat === ColorFormat.Hex ? "tw-grid-flow-col" : "tw-grid-flow-row",
                        ])}
                    >
                        {colorFormat === ColorFormat.Hex ? (
                            <TextInput
                                value={hex.substring(1)}
                                decorator="#"
                                size={6}
                                onChange={(hex) => isValidHex(hex) && onSelect(toColor(currentColor, { hex }))}
                            />
                        ) : (
                            <>
                                <TextInput
                                    min={0}
                                    max={255}
                                    type={TextInputType.Number}
                                    value={rgb.r}
                                    decorator="R"
                                    onChange={(r) => onSelect(toColor(currentColor, { rgba: { r } }))}
                                />
                                <TextInput
                                    min={0}
                                    max={255}
                                    type={TextInputType.Number}
                                    value={rgb.g}
                                    decorator="G"
                                    onChange={(g) => onSelect(toColor(currentColor, { rgba: { g } }))}
                                />
                                <TextInput
                                    min={0}
                                    max={255}
                                    type={TextInputType.Number}
                                    value={rgb.b}
                                    decorator="B"
                                    onChange={(b) => onSelect(toColor(currentColor, { rgba: { b } }))}
                                />
                            </>
                        )}
                    </div>
                    <div className="tw-w-full md:tw-w-24">
                        <TextInput
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
            </div>
        </div>
    );
};
