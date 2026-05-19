/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import styles from './styles/asset-input.module.scss';

export type AssetInputMetadataItemProps = {
    children: ReactNode;
};

export const AssetInputMetadataItem = ({ children }: AssetInputMetadataItemProps) => {
    return <span className={styles.metadataItem}>{children}</span>;
};
