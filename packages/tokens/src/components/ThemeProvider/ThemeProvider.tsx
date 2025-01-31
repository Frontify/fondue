/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import styles from './generated/themes.module.css';

export const ThemeProvider = ({
    children,
    theme = 'default',
}: {
    children: React.ReactNode;
    theme: keyof typeof styles;
}) => {
    return <div className={styles[theme]}>{children}</div>;
};
