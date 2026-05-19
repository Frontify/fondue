/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import styles from './styles/asset-input.module.scss';

export type AssetInputMetadataProps = {
    children: ReactNode;
};

export const AssetInputMetadata = ({ children }: AssetInputMetadataProps) => {
    return <div className={styles.metadata}>{children}</div>;
};
