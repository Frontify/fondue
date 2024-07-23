/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconGridRegular, IconMagnifier, IconStackVertical } from '@frontify/fondue-icons';
import { useEffect, useState } from 'react';

import { SegmentedControl } from '../SegmentedControl/SegmentedControl';
import { TextInput } from '../TextInput/TextInput';

import styles from './styles/brandColorPicker.module.scss';
import { type BrandColorPickerProps } from './types';
import { areColorsEqual, colorToCss, isColorLight } from './utils';

type BrandColorView = 'grid' | 'list';

export const BrandColorPicker = ({
    currentColor,
    palettes = [],
    onColorSelected = () => {
        console.log('default');
    },
    ...props
}: BrandColorPickerProps) => {
    const [view, setView] = useState<BrandColorView>('grid');
    const [query, setQuery] = useState('');
    const [filteredPalettes, setFilteredPalettes] = useState(palettes);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFilteredPalettes(
                palettes
                    .map((palette) => {
                        if (palette.title.toLowerCase().includes(query.toLowerCase())) {
                            return palette;
                        }
                        return {
                            ...palette,
                            colors: palette.colors.filter((color) =>
                                color.name?.toLowerCase().includes(query.toLowerCase()),
                            ),
                        };
                    })
                    .filter((palette) => palette.colors.length > 0),
            );
        }, 200);
        return () => clearTimeout(timer);
    }, [query, palettes]);

    return (
        <div className={styles.root} data-test-id="brand-color-picker" {...props}>
            <div className={styles.header}>
                <div className={styles.search}>
                    <TextInput.Root
                        onChange={(event) => {
                            console.log('event', event.target.value);

                            setQuery(event.target.value);
                        }}
                    >
                        <TextInput.Slot name="left">
                            <IconMagnifier size={16} />
                        </TextInput.Slot>
                    </TextInput.Root>
                </div>
                <div className={styles.layoutSwitcher}>
                    <SegmentedControl.Root
                        onValueChange={(value) => {
                            setView(value as BrandColorView);
                        }}
                        defaultValue="grid"
                    >
                        <SegmentedControl.Item value="grid" aria-label="Grid">
                            <IconGridRegular size={20} />
                        </SegmentedControl.Item>
                        <SegmentedControl.Item value="list" aria-label="List">
                            <IconStackVertical size={20} />
                        </SegmentedControl.Item>
                    </SegmentedControl.Root>
                </div>
            </div>
            <ul className={styles.paletteList} data-layout={view}>
                {filteredPalettes.length > 0
                    ? filteredPalettes.map(({ id, title, colors }) => (
                          <li key={id} className={styles.palettePreview}>
                              <p className={styles.paletteTitle}>{title}</p>
                              <ul className={styles.colorList}>
                                  {colors.map((color) => (
                                      <li key={color.name} data-test-id="brand-color">
                                          <button
                                              className={styles.colorContainer}
                                              onClick={() => onColorSelected(color)}
                                              type="button"
                                              aria-label={`color value: ${color.name}`}
                                          >
                                              <span
                                                  className={styles.colorPreview}
                                                  style={{
                                                      background: colorToCss(color),
                                                      color: isColorLight(color)
                                                          ? 'var(--text-color)'
                                                          : 'var(--base-color)',
                                                  }}
                                              >
                                                  {areColorsEqual(color, currentColor) && <IconCheckMark size={20} />}
                                              </span>
                                              {view === 'list' && (
                                                  <span className={styles.colorName}>{color.name}</span>
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
BrandColorPicker.displayName = 'ColorPicker.Brand';
