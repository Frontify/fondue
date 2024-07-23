/* (c) Copyright Frontify Ltd., all rights reserved. */

import styles from './styles/colorPicker.module.scss';
import { type Color } from './types';
import { colorToCss } from './utils';

export const ColorPreview = ({ color }: { color?: Color }) => {
    return <div className={styles.colorPreview} style={{ background: colorToCss(color) }}></div>;
};
