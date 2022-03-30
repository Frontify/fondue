/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slider } from "@components/Slider/Slider";
import { TextInput } from "@components/TextInput/TextInput";
import IconCheck from "@foundation/Icon/Generated/IconCheck";
import IconImageGrid2 from "@foundation/Icon/Generated/IconImageGrid2";
import IconListBullets from "@foundation/Icon/Generated/IconListBullets";
import IconSearch from "@foundation/Icon/Generated/IconSearch";
import { IconSize } from "@foundation/Icon/IconSize";
import { isColorLight } from "@utilities/colors";
import { merge } from "@utilities/merge";
import React, { FC, useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import { ColorPickerProps } from "./ColorPicker";

const find = (haystack?: string, needle = "") =>
    haystack?.toLocaleLowerCase().includes(needle.toLocaleLowerCase().trim());

enum BrandColorView {
    List = "List",
    Grid = "Grid",
}

type Props = Omit<ColorPickerProps, "currentFormat" | "setFormat">;

export const BrandColorPicker: FC<Props> = ({ palettes: defaultPalettes = [], currentColor, onSelect }) => {
    const views = [
        { id: BrandColorView.Grid, icon: <IconImageGrid2 />, ariaLabel: "Grid" },
        { id: BrandColorView.List, icon: <IconListBullets />, ariaLabel: "List" },
    ];
    const [view, setView] = useState(views[0].id);
    const [query, setQuery] = useState("");
    const [palettes, setPalettes] = useState(defaultPalettes);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPalettes(
                defaultPalettes
                    .filter(({ title, colors }) => find(title, query) || colors.some(({ name }) => find(name, query)))
                    .map(({ id, title, colors }) => ({
                        id,
                        title,
                        colors: colors.some(({ name }) => find(name, query))
                            ? colors.filter(({ name }) => find(name, query))
                            : colors,
                    })),
            );
        }, 200);

        return () => clearTimeout(timer);
    }, [query]);

    const palettesWithColors = palettes.filter((palette) => !!palette.colors.length);

    return (
        <div className="tw-flex tw-flex-col tw-gap-5" data-test-id="brand-color-picker">
            <div className="tw-flex tw-gap-3">
                <div className="tw-flex-1">
                    <TextInput
                        value={query}
                        decorator={<IconSearch />}
                        placeholder="Search"
                        onChange={(value) => setQuery(value)}
                        clearable
                    />
                </div>
                <div className="tw-w-[72px]">
                    <Slider
                        items={views}
                        activeItemId={view}
                        onChange={(colorView) => setView(colorView as BrandColorView)}
                    />
                </div>
            </div>
            <ul className="tw-flex tw-flex-col tw-gap-5">
                {palettesWithColors.length
                    ? palettesWithColors.map(({ id, title, colors }) => (
                          <li key={id} className="tw-flex tw-flex-col tw-gap-3">
                              <p className="tw-text-black dark:tw-text-white">{title}</p>
                              <ul
                                  className={merge([
                                      "tw-flex tw-gap-y-2 tw-flex-wrap",
                                      view === BrandColorView.List && "tw-flex-col",
                                  ])}
                              >
                                  {colors.map((color) => (
                                      <li key={color.name} data-test-id="brand-color">
                                          <button className="tw-flex tw-w-full" onClick={() => onSelect(color)}>
                                              <span
                                                  className={merge([
                                                      "tw-h-8 tw-w-8 tw-mr-2 tw-rounded tw-flex tw-items-center tw-justify-center tw-ring-1 tw-ring-black-10 tw-ring-offset-1",
                                                      isColorLight(color) ? "tw-text-black" : "tw-text-white",
                                                  ])}
                                                  style={{ background: tinycolor(color).toRgbString() }}
                                              >
                                                  {color.r === currentColor.r &&
                                                      color.g === currentColor.g &&
                                                      color.b === currentColor.b &&
                                                      color.a === currentColor.a && (
                                                          <IconCheck size={IconSize.Size20} />
                                                      )}
                                              </span>
                                              {view === BrandColorView.List && (
                                                  <span className="tw-h-8 tw-grow tw-flex tw-items-center tw-text-left">
                                                      {color.name}
                                                  </span>
                                              )}
                                          </button>
                                      </li>
                                  ))}
                              </ul>
                          </li>
                      ))
                    : "No colors found"}
            </ul>
        </div>
    );
};
