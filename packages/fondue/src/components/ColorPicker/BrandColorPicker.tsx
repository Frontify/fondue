/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TinyColor } from '@ctrl/tinycolor';
import { type ReactElement, useEffect, useState } from 'react';

import { SegmentedControls } from '@components/SegmentedControls/SegmentedControls';
import { TextInput } from '@components/TextInput/TextInput';
import IconCheckMark from '@foundation/Icon/Generated/IconCheckMark';
import IconGridRegular from '@foundation/Icon/Generated/IconGridRegular';
import IconMagnifier from '@foundation/Icon/Generated/IconMagnifier';
import IconStackVertical from '@foundation/Icon/Generated/IconStackVertical';
import { IconSize } from '@foundation/Icon/IconSize';
import { isColorLight, toShortRgb } from '@utilities/colors';
import { merge } from '@utilities/merge';

import { type ColorPickerProps } from './ColorPicker';

const find = (haystack?: string, needle = '') =>
    haystack?.toLocaleLowerCase().includes(needle.toLocaleLowerCase().trim());

enum BrandColorView {
    List = 'List',
    Grid = 'Grid',
}

type Props = Omit<ColorPickerProps, 'currentFormat' | 'setFormat'>;

/**
 * @deprecated Use the new `Color Picker` component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#color-picker the migration guide}.
 */
export const BrandColorPicker = ({ palettes: defaultPalettes = [], currentColor, onSelect }: Props): ReactElement => {
    const views = [
        { id: BrandColorView.Grid, icon: <IconGridRegular />, ariaLabel: 'Grid' },
        { id: BrandColorView.List, icon: <IconStackVertical />, ariaLabel: 'List' },
    ];
    const [view, setView] = useState(views[0].id);
    const [query, setQuery] = useState('');
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
    }, [defaultPalettes, query]);

    const palettesWithColors = palettes.filter((palette) => palette.colors.length > 0);

    return (
        <div className="tw-flex tw-flex-col tw-gap-4" data-test-id="brand-color-picker">
            <div className="tw-flex tw-gap-2">
                <div className="tw-flex-1">
                    <TextInput
                        value={query}
                        decorator={<IconMagnifier />}
                        placeholder="Search"
                        onChange={(value) => setQuery(value)}
                        clearable
                    />
                </div>
                <div className="tw-w-[72px]">
                    <SegmentedControls
                        size="small"
                        items={views}
                        activeItemId={view}
                        onChange={(colorView) => setView(colorView as BrandColorView)}
                    />
                </div>
            </div>
            <ul className="tw-flex tw-flex-col tw-gap-4">
                {palettesWithColors.length > 0
                    ? palettesWithColors.map(({ id, title, colors }) => (
                          <li key={id} className="tw-flex tw-flex-col tw-gap-2">
                              <p className="tw-text-black tw-text-xs tw-font-medium dark:tw-text-white">{title}</p>
                              <ul
                                  className={merge([
                                      'tw-flex tw-gap-y-2 tw-flex-wrap',
                                      view === BrandColorView.List && 'tw-flex-col',
                                  ])}
                              >
                                  {colors.map((color) => (
                                      <li key={color.name} data-test-id="brand-color">
                                          <button
                                              className="tw-flex tw-w-full"
                                              onClick={() => onSelect(color)}
                                              type="button"
                                              aria-label={`color value: ${color.name}`}
                                          >
                                              <span
                                                  className={merge([
                                                      'tw-h-6 tw-w-6 tw-mr-2 tw-rounded tw-flex tw-items-center tw-justify-center tw-ring-1 tw-ring-black-10 tw-ring-offset-1',
                                                      isColorLight(color) ? 'tw-text-black' : 'tw-text-white',
                                                  ])}
                                                  style={{ background: new TinyColor(toShortRgb(color)).toRgbString() }}
                                              >
                                                  {color.red === currentColor.red &&
                                                      color.green === currentColor.green &&
                                                      color.blue === currentColor.blue &&
                                                      color.alpha === currentColor.alpha && (
                                                          <IconCheckMark size={IconSize.Size20} />
                                                      )}
                                              </span>
                                              {view === BrandColorView.List && (
                                                  <span className="tw-h-6 tw-grow tw-flex tw-items-center tw-text-sm tw-text-left">
                                                      {color.name}
                                                  </span>
                                              )}
                                          </button>
                                      </li>
                                  ))}
                              </ul>
                          </li>
                      ))
                    : 'No colors found'}
            </ul>
        </div>
    );
};
BrandColorPicker.displayName = 'FondueBrandColorPicker';
