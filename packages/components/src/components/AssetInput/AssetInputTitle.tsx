/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import styles from './styles/asset-input.module.scss';

type AssetInputTitleProps = {
    children: ReactNode;
};

export const AssetInputTitle = ({ children }: AssetInputTitleProps) => {
    return <span className={styles.title}>{children}</span>;
};
