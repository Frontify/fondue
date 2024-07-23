/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

import styles from './styles/customColorPicker.module.scss';
import { type BrandColorPickerProps } from './types';

type BrandColorView = 'grid' | 'list';

export const CustomColorPicker = ({
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
        <div
            className={styles.root}
            data-picker-type="custom-color"
            data-test-id="custom-color-picker"
            {...props}
        ></div>
    );
};
CustomColorPicker.displayName = 'ColorPicker.Custom';
