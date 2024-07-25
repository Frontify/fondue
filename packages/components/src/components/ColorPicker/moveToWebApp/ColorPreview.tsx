/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Color } from '../types';
import { colorToCss } from '../utils';

import styles from './styles/colorPicker.module.scss';

export const ColorPreview = ({ color }: { color?: Color }) => {
    return <div className={styles.colorPreview} style={{ background: colorToCss(color) }}></div>;
};
