/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import styles from './generated/themes.module.css';
type ThemeProviderProps = {
    children: ReactNode;
    theme: keyof typeof styles;
};
export const ThemeProvider = ({ children, theme = 'light' }: ThemeProviderProps) => {
    return <div className={styles[theme]}>{children}</div>;
};
