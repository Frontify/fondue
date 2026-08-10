/* (c) Copyright Frontify Ltd., all rights reserved. */

import { colorAccessorByIndex } from '@components/common/helpers';

import styles from './Legend.module.scss';

type ColorBoxStyle = 'line' | 'rectangle' | 'circle' | 'square';

type LegendProps = {
    names: string[];
    style: ColorBoxStyle;
    colorAccessor?: (index: number) => string | undefined;
};

export const Legend = ({ names, style, colorAccessor = colorAccessorByIndex }: LegendProps) => {
    return (
        <div className={styles.root}>
            {names.map((title, index) => (
                <span className={styles.item} key={`${title}-legend-${index}`}>
                    <ColorBox color={colorAccessor(index)} style={style} />
                    <span className={styles.label}>{title}</span>
                </span>
            ))}
        </div>
    );
};

type ColorBoxProps = {
    color?: string;
    style: ColorBoxStyle;
};

const ColorBox = ({ color, style }: ColorBoxProps) => {
    return (
        <span
            className={`${styles.colorBox} ${styles[`shape-${style}`]}`}
            style={{
                backgroundColor: color,
            }}
        />
    );
};
