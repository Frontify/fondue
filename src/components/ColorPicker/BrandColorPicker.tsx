import { Slider } from "@components/Slider/Slider";
import IconCheck from "@elements/Icon/Generated/IconCheck";
import IconImageGrid2 from "@elements/Icon/Generated/IconImageGrid2";
import IconSearch from "@elements/Icon/Generated/IconSearch";
import IconUnorderedList from "@elements/Icon/Generated/IconUnorderedList";
import { IconSize } from "@elements/Icon/IconSize";
import { TextInput } from "@elements/TextInput/TextInput";
import { toColor } from "@utilities/colors";
import { debounce } from "@utilities/debounce";
import { merge } from "@utilities/merge";
import React, { FC, useEffect, useState } from "react";
import { ColorPickerProps } from "./ColorPicker";

const find = (haystack?: string, needle = "") =>
    haystack?.toLocaleLowerCase().includes(needle.toLocaleLowerCase().trim());

enum BrandColorView {
    List = "List",
    Grid = "Grid",
}

export const BrandColorPicker: FC<ColorPickerProps> = ({ palettes: defaultPalettes = [], currentColor, onSelect }) => {
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
                        value=""
                        decorator={<IconSearch />}
                        placeholder="Search"
                        onChange={debounce((value) => setQuery(value), 200)}
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
