/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import styles from './styles/asset-input.module.scss';

export type AssetInputPreviewIconProps = {
    children: ReactNode;
};

export const AssetInputPreviewIcon = ({ children }: AssetInputPreviewIconProps) => {
    return <div className={styles.previewIcon}>{children}</div>;
};
