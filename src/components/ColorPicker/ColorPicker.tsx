/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from "@components/Dropdown/Dropdown";
import { Slider } from "@components/Slider/Slider";
import IconCheck from "@elements/Icon/Generated/IconCheck";
import IconImageGrid2 from "@elements/Icon/Generated/IconImageGrid2";
import IconSearch from "@elements/Icon/Generated/IconSearch";
import IconUnorderedList from "@elements/Icon/Generated/IconUnorderedList";
import { IconSize } from "@elements/Icon/IconSize";
import { TextInput, TextInputType } from "@elements/TextInput/TextInput";
import { merge } from "@utilities/merge";
import React, { FC, useEffect, useState } from "react";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// Since there are no correct typings atm we need to ignore these imports
// @ts-ignore
import { HuePicker } from "react-color";
// @ts-ignore
import { Alpha, Saturation } from "react-color/lib/components/common";
// @ts-ignore
import { isValidHex, toState } from "react-color/lib/helpers/color";
/* eslint-enable @typescript-eslint/ban-ts-comment */

const find = (haystack?: string, needle = "") =>
    haystack?.toLocaleLowerCase().includes(needle.toLocaleLowerCase().trim());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = (func: (...args: any[]) => void, timeout = 10) => {
    let timer: number;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = window.setTimeout(() => func.apply(this, args), timeout);
    };
};

type Color = {
    value?: string;
    rgba?: { r: number; g: number; b: number; a: number };
    hex: string;
    alpha?: number;
    name?: string;
};

type Palette = {
    title: string;
    colors: Color[];
};

export type ColorPickerProps = {
    palettes?: Palette[];
    currentColor: Color;
    onSelect: (color: Color) => void;
};

const tranfsormColor = (color: Color) => toState({ ...toState(color).rgb, a: color.alpha });

const getValidRgbColorValue = (input: string): number => {
    const value = parseInt(input || "0", 10);

    return value > 255 ? 255 : value < 0 ? 0 : value;
};

type DiffColor = {
    hex?: string;
    rgba?: { r?: number | string; g?: number | string; b?: number | string; a?: number };
    name?: string;
};

const toColor = (current: Color, { name, ...diff }: DiffColor): Color => {
    const a = diff.rgba?.a || current.rgba?.a || current.alpha || 0;
    const alpha = a > 1 ? 1 : a;
    const rgb = { ...current.rgba, ...toState({ hex: diff.hex || current.hex }).rgb, ...diff.rgba };
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(getValidRgbColorValue);
    const rgba = { r, g, b, a: alpha };
    const hex = toState(rgba).hex;
    const value = alpha === 1 ? hex : `rgba(${Object.values(rgba).join(", ")})`;

    return { name, rgba, alpha, hex, value };
};

const ColorPointer: FC = () => <div className="tw-w-4 tw-h-4 tw-rounded-full tw-border-2 tw-border-white" />;

enum ColorFormat {
    Hex = "Hex",
    Rgba = "Rgba",
}

const CustomColorPicker: FC<Omit<ColorPickerProps, "palette">> = ({ currentColor, onSelect }) => {
    const colorFormats = Object.values(ColorFormat).map((id) => ({ id, title: id.toLocaleUpperCase() }));
    const [colorFormat, setColorFormat] = useState(ColorFormat.Hex);
    const [{ hsl, hsv, rgb, hex }, setColor] = useState(tranfsormColor(currentColor));
    useEffect(() => {
        setColor(tranfsormColor(currentColor));
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
                                <ColorPointer />
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
                                <ColorPointer />
                            </div>
                        )}
                        style={{ pointer: { top: `${rgb.a * 100}%` } }}
                        onChange={debounce(({ a }) => onSelect(toColor(currentColor, { rgba: { a } })))}
                    />
                </div>
            </div>
            <div className="tw-flex tw-gap-2 tw-max-w-full">
                <div>
                    <Dropdown
                        menuBlocks={[{ id: "1", menuItems: colorFormats }]}
                        activeItemId={colorFormat}
                        onChange={(id) => id && setColorFormat(id as ColorFormat)}
                    />
                </div>
                <div className="tw-flex-1 tw-flex tw-gap-2">
                    <div
                        className={merge([
                            "tw-flex-1 tw-grid tw-gap-2 tw-justify-items-stretch",
                            colorFormat === ColorFormat.Hex ? "tw-grid-flow-col" : "tw-grid-flow-row",
                        ])}
                    >
                        {colorFormat === ColorFormat.Hex ? (
                            <TextInput
                                defaultValue={hex.substring(1)}
                                decorator="#"
                                onInput={(hex) => isValidHex(hex) && onSelect(toColor(currentColor, { hex }))}
                            />
                        ) : (
                            <>
                                <TextInput
                                    min={0}
                                    max={255}
                                    type={TextInputType.Number}
                                    defaultValue={`${rgb.r}`}
                                    decorator="R"
                                    onInput={(r) => onSelect(toColor(currentColor, { rgba: { r } }))}
                                />
                                <TextInput
                                    min={0}
                                    max={255}
                                    type={TextInputType.Number}
                                    defaultValue={`${rgb.g}`}
                                    decorator="G"
                                    onInput={(g) => onSelect(toColor(currentColor, { rgba: { g } }))}
                                />
                                <TextInput
                                    min={0}
                                    max={255}
                                    type={TextInputType.Number}
                                    defaultValue={`${rgb.b}`}
                                    decorator="B"
                                    onInput={(b) => onSelect(toColor(currentColor, { rgba: { b } }))}
                                />
                            </>
                        )}
                    </div>
                    <div className="tw-w-24">
                        <TextInput
                            min={0}
                            max={100}
                            type={TextInputType.Number}
                            defaultValue={`${rgb.a * 100}`}
                            decorator="%"
                            onInput={(a) =>
                                onSelect(toColor(currentColor, { rgba: { a: parseInt(a || "0", 10) / 100 } }))
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

enum BrandColorView {
    List = "List",
    Grid = "Grid",
}
const BrandColorPicker: FC<ColorPickerProps> = ({ palettes: defaultPalettes = [], currentColor, onSelect }) => {
    const views = [
        { id: BrandColorView.List, icon: <IconUnorderedList />, ariaLabel: "List" },
        { id: BrandColorView.Grid, icon: <IconImageGrid2 />, ariaLabel: "Grid" },
    ];
    const [view, setView] = useState(views[0].id);
    const [query, setQuery] = useState("");
    const [palettes, setPalettes] = useState(defaultPalettes);
    useEffect(() => {
        setPalettes(
            defaultPalettes
                .filter(({ title, colors }) => find(title, query) || colors.some(({ name }) => find(name, query)))
                .map(({ title, colors }) => ({
                    title,
                    colors: colors.some(({ name }) => find(name, query))
                        ? colors.filter(({ name }) => find(name, query))
                        : colors,
                })),
        );
    }, [query]);

    return (
        <div className="tw-flex tw-flex-col tw-gap-5">
            <div className="tw-flex tw-gap-3">
                <div className="tw-flex-1">
                    <TextInput
                        decorator={<IconSearch />}
                        placeholder="Search"
                        onInput={debounce((value) => setQuery(value), 200)}
                    />
                </div>
                <div>
                    <Slider
                        items={views}
                        activeItemId={view}
                        onChange={(colorView) => setView(colorView as BrandColorView)}
                    />
                </div>
            </div>
            <ul className="tw-flex tw-flex-col tw-gap-5">
                {palettes.length
                    ? palettes.map(({ title, colors }) => (
                          <li key={title} className="tw-flex tw-flex-col tw-gap-3">
                              <p className="tw-text-black dark:tw-text-white">{title}</p>
                              <ul
                                  className={merge([
                                      "tw-flex tw-gap-y-2",
                                      view === BrandColorView.List && "tw-flex-col",
                                  ])}
                              >
                                  {colors.map((color) => (
                                      <li key={color.hex}>
                                          <button
                                              className="tw-flex tw-overflow-hidden tw-w-full"
                                              onClick={() => onSelect(toColor(color, color))}
                                          >
                                              <span
                                                  className="tw-h-8 tw-w-8 tw-mr-2 tw-rounded tw-flex tw-items-center tw-justify-center tw-text-white"
                                                  style={{ background: color.hex }}
                                              >
                                                  {color.hex === currentColor.hex && (
                                                      <IconCheck size={IconSize.Size20} />
                                                  )}
                                              </span>
                                              {view === BrandColorView.List && (
                                                  <span className="tw-h-8 tw-flex-grow tw-flex tw-items-center tw-text-left">
                                                      {color.name}
                                                  </span>
                                              )}
                                          </button>
                                      </li>
                                  ))}
                              </ul>
                          </li>
                      ))
                    : "No Colors found"}
            </ul>
        </div>
    );
};

enum ColorType {
    Brand = "Brand",
    Custom = "Custom",
}

export const ColorPicker: FC<ColorPickerProps> = ({ currentColor, palettes, onSelect }) => {
    const colorTypes = [
        { id: ColorType.Brand, name: "Brand Colors" },
        { id: ColorType.Custom, name: "Custom Color" },
    ];
    const [colorType, setColorType] = useState(ColorType.Brand);
    const { hex, value, name } = currentColor;

    return (
        <div data-test-id="color-picker" className="tw-max-w-[400px]">
            <div
                className="tw-flex tw-justify-center tw-p-7 tw-text-white tw-text-m tw-gap-2"
                style={{ background: value || hex }}
            >
                {name && <span className="tw-font-bold">{name}</span>}
                <span className={name ? "" : "tw-font-bold"}>
                    {[hex, value !== hex && value].filter(Boolean).join(" / ")}
                </span>
            </div>
            <div className="tw-p-6 tw-flex tw-flex-col tw-gap-5">
                {palettes && (
                    <Slider
                        items={colorTypes}
                        activeItemId={colorType}
                        onChange={(type) => setColorType(type as ColorType)}
                    />
                )}
                {palettes && colorType === ColorType.Brand ? (
                    <BrandColorPicker currentColor={currentColor} palettes={palettes} onSelect={onSelect} />
                ) : (
                    <CustomColorPicker currentColor={currentColor} onSelect={onSelect} />
                )}
            </div>
        </div>
    );
};
